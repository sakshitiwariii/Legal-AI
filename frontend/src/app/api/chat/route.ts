import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const backendUrl = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

    const response = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error connecting to Python backend:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service" },
      { status: 500 }
    );
  }
}
