import { NextRequest, NextResponse } from 'next/server';
import { createVectorStore } from '@/lib/rag';
import { extractTextFromPDF } from '@/lib/pdf';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const indexName = formData.get('indexName') as string || 'legal-docs';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Extract text from PDF
    const text = await extractTextFromPDF(file);

    // Split text into chunks and create embeddings
    const documents = [text]; // You can split this further if needed
    const vectorStore = await createVectorStore(documents, indexName);

    return NextResponse.json({
      success: true,
      message: 'Document ingested successfully',
      chunks: documents.length
    });

  } catch (error) {
    console.error('Document ingestion error:', error);
    return NextResponse.json(
      { error: 'Failed to ingest document' },
      { status: 500 }
    );
  }
}