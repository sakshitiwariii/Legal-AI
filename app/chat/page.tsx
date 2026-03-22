"use client"

import { useState, useRef, useEffect } from "react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  sources?: any[]
  confidence?: number
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "welcome",
        content: "Hello! I'm Lex, your AI legal intelligence assistant. I can help you with questions about Indian law, including the Constitution, BNSS, BNS, Consumer Protection Act, RTI Act, and PWDVA. Every answer is cited from official sources.",
        role: "assistant"
      }])
    }
  }, [])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user"
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Call RAG API
      const response = await fetch('/api/rag-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: input.trim(),
          indexName: 'legal-docs'
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        role: "assistant",
        sources: data.sources?.map((source: any, i: number) => ({
          title: `Source ${i + 1}`,
          section: source.metadata?.section || 'Legal Document',
          excerpt: source.content.substring(0, 100) + '...',
          tag: 'legal'
        })) || [],
        confidence: Math.floor(Math.random() * 30) + 70 // Simulated confidence
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('RAG query failed:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble accessing the legal database right now. Please try again later or contact support.",
        role: "assistant"
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="page active" id="page-chatbot">
      <div className="lex-shell">
        {/* Sidebar */}
        <div className="lex-sidebar">
          <div className="lex-sidebar-head">
            <div className="lex-brand">Lex</div>
            <div className="lex-brand-sub">Legal Intelligence · RAG-Powered</div>
            <button className="lex-new-btn" onClick={() => setMessages([])}>✦ New Consultation</button>
          </div>

          <div className="lex-section-label">Recent</div>
          <div className="lex-history">
            <div className="lex-history-item active">
              <div className="lhi-title">Arrest rights under BNSS 2023</div>
              <div className="lhi-meta">Today · 2 sources</div>
            </div>
            <div className="lex-history-item">
              <div className="lhi-title">Article 21 — Right to Life scope</div>
              <div className="lhi-meta">Yesterday · 4 sources</div>
            </div>
          </div>

          <div className="lex-sidebar-foot">
            <div className="lex-model-pill">
              <div>
                <div className="lmp-name">Claude Sonnet</div>
                <div style={{fontSize: '.66rem', color: 'var(--text3)', marginTop: '1px'}}>Indian Law RAG · v2.1</div>
              </div>
              <span className="lmp-badge">Active</span>
            </div>
          </div>
        </div>

        {/* Chat Main */}
        <div className="lex-main">
          <div className="lex-topbar">
            <div className="lex-topbar-left">
              <div className="lex-online"></div>
              <span className="lex-topbar-title">Legal AI</span>
              <span className="lex-topbar-sub">— 6 documents indexed</span>
            </div>
            <div className="lex-topbar-right">
              <button className="lex-tb-btn" onClick={() => setMessages([])}>✦ New</button>
              <button className="lex-tb-btn">Clear</button>
              <button className="lex-tb-btn">Export</button>
            </div>
          </div>

          <div className="lex-messages" ref={messagesRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`lex-msg-group ${msg.role === 'user' ? 'lex-user' : ''}`}>
                <div>
                  <div className={`lex-av ${msg.role === 'user' ? 'lex-av-user' : 'lex-av-ai'}`}>
                    {msg.role === 'user' ? 'U' : 'L'}
                  </div>
                </div>
                <div>
                  <div className="lex-msg-name">
                    {msg.role === 'user' ? 'You' : 'Lex'}
                    {msg.role === 'assistant' && <span className="lex-name-badge">LEGAL AI</span>}
                  </div>
                  <div className="lex-msg-body">
                    <p>{msg.content}</p>
                  </div>
                  {msg.sources && (
                    <div className="lex-sources-block">
                      <div className="lex-src-head">
                        <div className="lex-src-label">
                          <span>📚</span>Sources & Citations
                          <span className="lex-src-count">{msg.sources.length}</span>
                        </div>
                      </div>
                      <div className="lex-src-items">
                        {msg.sources.map((src, i) => (
                          <div key={i} className="lex-src-card">
                            <div className="lex-src-num">{i + 1}</div>
                            <div className="lex-src-body">
                              <div className="lex-src-title">{src.title}</div>
                              <div className="lex-src-excerpt">{src.excerpt}</div>
                              <span className="lex-src-tag lex-tag-const">{src.section}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {msg.confidence && (
                    <div className="lex-conf">
                      <span className="lex-conf-label">Confidence</span>
                      <div className="lex-conf-track">
                        <div className="lex-conf-fill" style={{width: `${msg.confidence}%`}}></div>
                      </div>
                      <span className="lex-conf-pct">{msg.confidence}%</span>
                    </div>
                  )}
                  {msg.role === 'assistant' && (
                    <div className="lex-msg-actions">
                      <button className="lex-m-action">📋 Copy</button>
                      <button className="lex-m-action">👍</button>
                      <button className="lex-m-action">👎</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="lex-msg-group lex-typing">
                <div><div className="lex-av lex-av-ai">L</div></div>
                <div>
                  <div className="lex-msg-name">Lex <span className="lex-name-badge">THINKING</span></div>
                  <div className="lex-msg-body">
                    <div className="ltd"></div>
                    <div className="ltd"></div>
                    <div className="ltd"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lex-input-area">
            <div className="lex-input-wrap">
              <textarea
                ref={inputRef}
                className="lex-textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Indian law — arrest rights, property, consumer protection, RTI…"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px'
                }}
              />
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <button className="lex-attach" title="Attach document">📎</button>
                <button
                  className="lex-send"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M12.5 7L1.5 1.5l2.5 5.5-2.5 5.5L12.5 7z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="lex-disclaimer">Lex provides legal information only — not legal advice. Consult a qualified advocate for your specific matter.</div>
          </div>
        </div>

        {/* Sources Panel */}
        <div className="lex-sources-panel">
          <div className="lsp-head">
            <div className="lsp-title">Context & Sources</div>
            <div className="lsp-active-ref">
              <div className="lsp-ref-label">Active Query</div>
              <div className="lsp-ref-text">Sources appear here after your first question.</div>
            </div>
          </div>
          <div className="lsp-body">
            <div className="lsp-section">
              <div className="lsp-sec-title">Indexed Documents</div>
              <div className="lsp-doc-card">
                <div className="lsp-doc-head">
                  <span className="lsp-doc-icon">📜</span>
                  <span className="lsp-doc-name">Constitution of India</span>
                </div>
                <div className="lsp-doc-meta">
                  <span className="lsp-doc-pages">448 Articles · 2023</span>
                  <div className="lsp-rel">
                    <div className="lsp-rel-bar">
                      <div className="lsp-rel-fill" id="lr-const"></div>
                    </div>
                    <span className="lsp-rel-pct" id="lr-const-p">—</span>
                  </div>
                </div>
              </div>
              <div className="lsp-doc-card">
                <div className="lsp-doc-head">
                  <span className="lsp-doc-icon">📖</span>
                  <span className="lsp-doc-name">BNSS 2023</span>
                </div>
                <div className="lsp-doc-meta">
                  <span className="lsp-doc-pages">531 Sections</span>
                  <div className="lsp-rel">
                    <div className="lsp-rel-bar">
                      <div className="lsp-rel-fill" id="lr-bnss"></div>
                    </div>
                    <span className="lsp-rel-pct" id="lr-bnss-p">—</span>
                  </div>
                </div>
              </div>
              <div className="lsp-doc-card">
                <div className="lsp-doc-head">
                  <span className="lsp-doc-icon">⚖️</span>
                  <span className="lsp-doc-name">BNS 2023</span>
                </div>
                <div className="lsp-doc-meta">
                  <span className="lsp-doc-pages">358 Sections</span>
                  <div className="lsp-rel">
                    <div className="lsp-rel-bar">
                      <div className="lsp-rel-fill" id="lr-bns"></div>
                    </div>
                    <span className="lsp-rel-pct" id="lr-bns-p">—</span>
                  </div>
                </div>
              </div>
              <div className="lsp-doc-card">
                <div className="lsp-doc-head">
                  <span className="lsp-doc-icon">🛡️</span>
                  <span className="lsp-doc-name">Consumer Protection Act 2019</span>
                </div>
                <div className="lsp-doc-meta">
                  <span className="lsp-doc-pages">107 Sections</span>
                  <div className="lsp-rel">
                    <div className="lsp-rel-bar">
                      <div className="lsp-rel-fill" id="lr-cpa"></div>
                    </div>
                    <span className="lsp-rel-pct" id="lr-cpa-p">—</span>
                  </div>
                </div>
              </div>
              <div className="lsp-doc-card">
                <div className="lsp-doc-head">
                  <span className="lsp-doc-icon">🔎</span>
                  <span className="lsp-doc-name">RTI Act 2005</span>
                </div>
                <div className="lsp-doc-meta">
                  <span className="lsp-doc-pages">31 Sections</span>
                  <div className="lsp-rel">
                    <div className="lsp-rel-bar">
                      <div className="lsp-rel-fill" id="lr-rti"></div>
                    </div>
                    <span className="lsp-rel-pct" id="lr-rti-p">—</span>
                  </div>
                </div>
              </div>
              <div className="lsp-doc-card">
                <div className="lsp-doc-head">
                  <span className="lsp-doc-icon">👩‍⚖️</span>
                  <span className="lsp-doc-name">PWDVA 2005</span>
                </div>
                <div className="lsp-doc-meta">
                  <span className="lsp-doc-pages">37 Sections</span>
                  <div className="lsp-rel">
                    <div className="lsp-rel-bar">
                      <div className="lsp-rel-fill" id="lr-pwdva"></div>
                    </div>
                    <span className="lsp-rel-pct" id="lr-pwdva-p">—</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lsp-foot">
            <div className="lsp-rag">
              <div className="lsp-rag-dot"></div>
              <div className="lsp-rag-text">
                <strong>RAG Pipeline Active</strong> · text-embedding-3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
