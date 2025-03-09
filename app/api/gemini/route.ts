import { GoogleGenerativeAI, GoogleGenerativeAIError } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Define the request body interface
interface RequestBody {
  prompt: string;
}

// Initialize Google AI with environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
  },
});

/**
 * POST handler for AI content generation
 * @param req Next.js Request object
 * @returns NextResponse with generated content or error
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Parse request body
    const body = await req.json() as RequestBody;
    const { prompt } = body;

    // Validate input
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Generate content with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const result = await model.generateContent(prompt, { signal: controller.signal });
    clearTimeout(timeout);

    // Check if response is valid
    if (!result?.response?.text) {
      throw new Error("No content generated");
    }

    return NextResponse.json({ 
      message: result.response.text(),
      generatedAt: new Date().toISOString()
    }, { status: 200 });

  } catch (error) {
    // Type-specific error handling
    if (error instanceof GoogleGenerativeAIError) {
      return NextResponse.json(
        { error: "AI generation failed", details: error.message },
        { status: 503 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timed out" },
        { status: 504 }
      );
    }

    // Generic error handling
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

// Configuration for the API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};