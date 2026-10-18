/* Original applied cases, with explicit objective mappings. No official-exam claim. */
const COVERAGE_BANK=[...COVERAGE_MARKET_CREDIT,...COVERAGE_OPERATIONAL_LIQUIDITY,...COVERAGE_INVESTMENT_CURRENT];
QUESTIONS.push(...COVERAGE_BANK);CARDS.push(...COVERAGE_BANK);
COVERAGE_BANK.forEach(q=>{if(!OBJECTIVE_LABELS[q.objective])OBJECTIVE_LABELS[q.objective]=q.concept;});
