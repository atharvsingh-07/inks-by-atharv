import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITaxReport extends Document {
  sessionId: string;
  createdAt: Date;
  input: {
    entity: string;
    sector: string;
    turnover: string;
    startupIndia: string;
    incYear: string;
    hasTds: string;
    funding: string;
    monthlyProfit: number;
  };
  result: object;
}

const TaxReportSchema = new Schema<ITaxReport>({
  sessionId: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
  input: {
    entity: String,
    sector: String,
    turnover: String,
    startupIndia: String,
    incYear: String,
    hasTds: String,
    funding: String,
    monthlyProfit: Number,
  },
  result: { type: Schema.Types.Mixed },
});

const TaxReport: Model<ITaxReport> =
  mongoose.models.TaxReport ||
  mongoose.model<ITaxReport>("TaxReport", TaxReportSchema);

export default TaxReport;
