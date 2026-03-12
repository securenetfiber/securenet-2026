import { NextResponse } from 'next/server';
import { residentialPlans, businessPlans, COMPANY_INFO } from '@/lib/plans';

export async function GET() {
  const plans = [...residentialPlans, ...businessPlans].map((plan) => ({
    id: plan.fccId,
    provider: COMPANY_INFO.legalName,
    planName: plan.name,
    planType: plan.planType,
    monthlyPrice: plan.price,
    typicalDownloadMbps: plan.typicalDownload,
    typicalUploadMbps: plan.typicalUpload,
    typicalLatencyMs: plan.typicalLatency,
    dataAllowance: plan.dataAllowance,
    contractRequired: plan.contractRequired,
    fees: plan.fees.map((f) => ({
      name: f.name,
      amount: f.amount,
      frequency: f.frequency,
      note: f.note ?? null,
    })),
    support: {
      phone: COMPANY_INFO.phones,
      email: COMPANY_INFO.email,
    },
    disclosures: {
      privacy: `${COMPANY_INFO.website}${COMPANY_INFO.policyUrls.privacy}`,
      terms: `${COMPANY_INFO.website}${COMPANY_INFO.policyUrls.terms}`,
      acceptableUse: `${COMPANY_INFO.website}${COMPANY_INFO.policyUrls.acceptableUse}`,
    },
  }));

  return NextResponse.json(plans, {
    headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
  });
}
