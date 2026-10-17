export const PLAN_PRICES = {
  starter: { monthly: 0, annual: 0, popular: false, sites: 1, label: "Starter" },
  pro: { monthly: 35, annual: 29, popular: true, sites: 1, label: "Pro" },
  agency3: { monthly: 69, annual: 49, popular: false, sites: 3, label: "Pro 3" },
  agency10: { monthly: 119, annual: 99, popular: false, sites: 10, label: "Pro Max" },
} as const;

export const BADGE_OPTION = { monthly: "12,99", annual: "9,99" } as const;

export const STARTER_MONTHLY_CONVERSATIONS = 50;

export type PaidPlanKey = "pro" | "agency3" | "agency10";

export const PAID_PLAN_KEYS: readonly PaidPlanKey[] = ["pro", "agency3", "agency10"];

export function annualDiscountPercent(key: PaidPlanKey): number {
  const plan = PLAN_PRICES[key];
  return Math.round((1 - plan.annual / plan.monthly) * 100);
}

export function maxAnnualDiscountPercent(): number {
  return Math.max(...PAID_PLAN_KEYS.map(annualDiscountPercent));
}
