import { NextRequest, NextResponse } from 'next/server';
import { queryRAG } from '@/lib/rag';

export async function POST(req: NextRequest) {
  try {
    const { question, indexName = 'legal-docs' } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const result = await queryRAG(question, indexName);

    return NextResponse.json({
      answer: result.text,
      sources: result.sourceDocuments?.map((doc: any) => ({
        content: doc.pageContent,
        metadata: doc.metadata,
      })) || [],
    });

  } catch (error) {
    console.error('RAG query error:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}