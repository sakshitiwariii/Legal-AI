# backend/rag_pipeline.py

import os
from dotenv import load_dotenv

from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_pinecone import PineconeVectorStore

from langchain.chains import (
    create_history_aware_retriever,
    create_retrieval_chain
)

from langchain.chains.combine_documents import (
    create_stuff_documents_chain
)

from langchain_core.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder
)

from langchain_core.messages import (
    HumanMessage,
    AIMessage
)

# =========================
# LOAD ENV
# =========================

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# =========================
# PROMPTS
# =========================

contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which may reference previous conversation context, "
    "rewrite the question so it can be understood independently. "
    "Do NOT answer the question."
)

contextualize_q_prompt = ChatPromptTemplate.from_messages([
    ("system", contextualize_q_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}")
])

qa_system_prompt = (
    "You are an Indian Legal AI Assistant.\n\n"

    "Use ONLY the retrieved legal context to answer.\n"

    "If the answer is not found in the context, "
    "say you do not know.\n\n"

    "Provide concise and professional answers.\n"

    "Mention relevant legal sections whenever possible.\n\n"

    "{context}"
)

qa_prompt = ChatPromptTemplate.from_messages([
    ("system", qa_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}")
])

# =========================
# MAIN RAG FUNCTION
# =========================

def ask_legal_ai(messages, model_name="gpt-3.5-turbo"):

    # =========================
    # INITIALIZE RESOURCES
    # =========================

    embeddings = OpenAIEmbeddings(
        openai_api_key=OPENAI_API_KEY
    )

    vector_store = PineconeVectorStore(
        index_name="legal-docs",
        embedding=embeddings
    )

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 4}
    )

    llm = ChatOpenAI(
        model=model_name,
        temperature=0,
        openai_api_key=OPENAI_API_KEY
    )

    # =========================
    # HISTORY AWARE RETRIEVER
    # =========================

    history_aware_retriever = (
        create_history_aware_retriever(
            llm,
            retriever,
            contextualize_q_prompt
        )
    )

    # =========================
    # QA CHAIN
    # =========================

    question_answer_chain = (
        create_stuff_documents_chain(
            llm,
            qa_prompt
        )
    )

    # =========================
    # FINAL RAG CHAIN
    # =========================

    rag_chain = create_retrieval_chain(
        history_aware_retriever,
        question_answer_chain
    )

    # =========================
    # CHAT HISTORY
    # =========================

    chat_history = []

    for msg in messages[:-1]:

        if msg["role"] == "user":

            chat_history.append(
                HumanMessage(content=msg["content"])
            )

        elif msg["role"] == "assistant":

            chat_history.append(
                AIMessage(content=msg["content"])
            )

    # =========================
    # CURRENT QUESTION
    # =========================

    user_input = messages[-1]["content"]

    # =========================
    # INVOKE RAG
    # =========================

    response = rag_chain.invoke({
        "input": user_input,
        "chat_history": chat_history
    })

    # =========================
    # SOURCES
    # =========================

    sources = []

    if "context" in response:

        for doc in response["context"]:

            sources.append({
                "source": doc.metadata.get("source", ""),
                "law": doc.metadata.get("law", ""),
                "section": doc.metadata.get("section", "")
            })

    # =========================
    # RETURN
    # =========================

    return {
        "answer": response["answer"],
        "sources": sources
    }