import { NextRequest, NextResponse } from "next/server";
import { calculateTax, StartupInput } from "@/lib/taxEngine";
import { getGeminiAdvisorNotes } from "@/lib/gemini";
import { getRelevantLaws } from "@/lib/taxLaws";
import { connectDB } from "@/lib/mongodb";
import TaxReport from "@/models/TaxReport";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input: StartupInput = body.input;

    const required: (keyof StartupInput)[] = [
      "entity", "sector", "turnover", "startupIndia",
      "incYear", "hasTds", "funding",
    ];
    for (const field of required) {
      if (!input[field] && input[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // 1. Local tax calculation
    const result = calculateTax(input);

    // 2. Gemini AI advisor notes (graceful fallback if no key)
    const aiNotes = await getGeminiAdvisorNotes(input, result);
    result.advisorNotes = aiNotes;

    // 3. Relevant law sections
    const relevantLaws = getRelevantLaws(
      input.entity,
      input.sector,
      input.turnover,
      input.startupIndia,
      input.funding,
      input.hasTds
    );

    // 4. Save to MongoDB
    await connectDB();
    const sessionId = body.sessionId || crypto.randomUUID();
    const report = await TaxReport.create({
      sessionId,
      input,
      result: { ...result, relevantLaws },
    });

    return NextResponse.json({
      success: true,
      reportId: report._id,
      sessionId,
      result,
      relevantLaws,
    });
  } catch (err) {
    console.error("Tax analysis error:", err);
    return NextResponse.json(
      { error: "Failed to calculate tax. Please try again." },
      { status: 500 }
    );
  }
}
