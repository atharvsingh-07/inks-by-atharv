import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TaxReport from "@/models/TaxReport";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    await connectDB();
    const reports = await TaxReport.find({ sessionId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json({ reports });
  } catch (err) {
    console.error("History fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}
