import { StartupInput } from "./taxEngine";
import { TaxResult } from "./taxEngine";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function getGeminiAdvisorNotes(
  input: StartupInput,
  result: TaxResult
): Promise<string[]> {
  if (!GEMINI_API_KEY) {
    // Fallback to engine-generated notes if no key
    return result.advisorNotes;
  }

  const prompt = `You are an expert Indian startup tax advisor. Based on the following startup profile and calculated tax obligations, provide 5-6 specific, actionable, and legally accurate advisory notes. Reference specific sections of Indian tax law (Income Tax Act 1961, GST Act 2017, Companies Act 2013) where relevant. Be concise — each note should be 2-3 sentences max. Do not use bullet points or numbering in your output, just return a JSON array of strings.

STARTUP PROFILE:
- Entity Type: ${input.entity}
- Sector: ${input.sector}
- Annual Turnover Band: ${input.turnover}
- DPIIT Startup India Status: ${input.startupIndia}
- Year of Incorporation: ${input.incYear}
- Pays salaries/vendor fees (TDS): ${input.hasTds}
- External Funding: ${input.funding}
- Monthly Profit: ₹${input.monthlyProfit.toLocaleString("en-IN")}

CALCULATED TAX OBLIGATIONS:
- Effective Tax Rate: ${(result.effectiveTaxRate * 100).toFixed(2)}%
- GST Status: ${result.gstStatus}
- TDS Required: ${result.tdsRequired}
- Estimated Annual Tax: ₹${result.estimatedAnnualTax.toLocaleString("en-IN")}
- Tax Regime: ${result.incomeTax.regime}

Return ONLY a valid JSON array of strings, no markdown, no explanation. Example format:
["Note 1 here.", "Note 2 here.", "Note 3 here."]`;

  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      console.error("Gemini API error:", response.status);
      return result.advisorNotes;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Strip markdown code fences if present
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    if (Array.isArray(parsed) && parsed.every((s: unknown) => typeof s === "string")) {
      return parsed;
    }

    return result.advisorNotes;
  } catch (err) {
    console.error("Gemini parsing error:", err);
    return result.advisorNotes;
  }
}
