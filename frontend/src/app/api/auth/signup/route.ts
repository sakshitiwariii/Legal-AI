import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const backendUrl = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

    const response = await fetch(`${backendUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      return NextResponse.json(errorBody || { detail: "Signup failed" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error connecting to Python backend:", error);
    return NextResponse.json(
      { detail: "Failed to connect to backend service" },
      { status: 500 }
    );
  }
}
