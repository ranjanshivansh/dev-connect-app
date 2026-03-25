function normalizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function normalizeCode(code: string): string[] {
  return code
    .toLowerCase()
    .replace(/[^a-z0-9]/g, " ")
    .split(/\s+/)
    .filter(t => t.length > 2); // 🔥 remove noise
}

function jaccardSimilarity(
  setA: Set<string>,
  setB: Set<string>
): number {
  const intersection = new Set<string>(
    [...setA].filter(x => setB.has(x))
  );

  const union = new Set<string>([...setA, ...setB]);
  if (union.size === 0) 
    {
        return 0;
    }
  return intersection.size / union.size;
}

function codeSimilarity(codeA: string, codeB: string): number {
  const tokensA = normalizeCode(codeA);
  const tokensB = normalizeCode(codeB);

  const freqA: Record<string, number> = {};
  const freqB: Record<string, number> = {};

  for (const t of tokensA) {
    freqA[t] = (freqA[t] || 0) + 1;
  }

  for (const t of tokensB) {
    freqB[t] = (freqB[t] || 0) + 1;
  }

  let dot = 0;
  let magA = 0;
  let magB = 0;

  const allTokens = new Set([...tokensA, ...tokensB]);

  for (const token of allTokens) {
    const a = freqA[token] || 0;
    const b = freqB[token] || 0;

    dot += a * b;
    magA += a * a;
    magB += b * b;
  }

  if (magA === 0 || magB === 0) return 0;

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export function calculateProjectSimilarity(a: any, b: any): number {
   const descA: Set<string> = new Set(normalizeText(a.description || ""));
   const descB: Set<string> = new Set(normalizeText(b.description || ""));

   const tagsA: Set<string> = new Set(a.tags || []);
   const tagsB: Set<string> = new Set(b.tags || []);

   const techA: Set<string> = new Set(a.technologies || []);
   const techB: Set<string> = new Set(b.technologies || []);

  const descScore = jaccardSimilarity(descA, descB);
  const tagsScore = jaccardSimilarity(tagsA, tagsB);
  const techScore = jaccardSimilarity(techA, techB);
  const codeScore = codeSimilarity(a.code || "", b.code || "");
console.log("CODE Score:",codeScore);
console.log(tagsScore);
console.log(descScore);
  const finalScore =
    descScore * 0.1 +
  tagsScore * 0.1 +
  techScore * 0.1 +
  codeScore * 0.6;

  return Math.round(finalScore * 100);
}