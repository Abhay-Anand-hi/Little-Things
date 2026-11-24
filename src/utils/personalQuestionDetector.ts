/**
 * Personal Question Detector for Little Things Easter Egg.
 * Accurately detects questions directed personally at the creator/developer
 * while strictly ignoring standard Little Things gift/intent/shopping searches.
 */

// Normalized pattern matching for personal questions directed to the creator
const PERSONAL_QUESTION_PATTERNS: RegExp[] = [
  // "Did you love someone?", "Do you love someone?", "Did you ever fall in love?", "Have you ever loved someone?"
  /^(do|did|have|had)\s+you\s+(ever\s+)?(love|loved|fall\s+in\s+love|fallen\s+in\s+love|been\s+in\s+love)(\s+(someone|somebody|anyone|anybody|her))?/i,
  
  // "Have you ever loved someone?", "Did you ever love someone?"
  /^(do|did|have|had)\s+you\s+(ever\s+)?(love|loved)\s+(someone|somebody|anyone|anybody|her|a\s+girl)/i,
  
  // "Who do you love?", "Who did you love?", "Whom did you love?"
  /^(who|whom)\s+(do|did)\s+you\s+(ever\s+)?love/i,
  
  // "What kind of girl do you imagine?", "What kind of girl do you like/want/love/dream of?"
  /^what\s+kind\s+of\s+(girl|woman|person)\s+do\s+you\s+(imagine|dream\s+of|like|want|love|look\s+for)/i,
  
  // "Why did you make Little Things?", "Why did you create/build this?"
  /^why\s+did\s+you\s+(make|build|create|code|design|write)\s+(this|little\s+things|the\s+app|the\s+website|it)/i,
  /^why\s+(was|is)\s+little\s+things\s+(made|created|built)/i,
  /^who\s+(made|created|built|designed|coded)\s+(this|little\s+things|the\s+website|the\s+app)/i,
  
  // Heartbreak / personal history questions
  /^(who\s+broke\s+your\s+heart|did\s+(she|someone)\s+break\s+your\s+heart|who\s+hurt\s+you|did\s+someone\s+hurt\s+you)/i,
  /^(did|have)\s+you\s+(ever\s+)?(had|got)\s+your\s+heart\s+broken/i,
  
  // "Do you miss her?", "Do you miss someone?"
  /^(do|did)\s+you\s+miss\s+(her|someone|anyone|somebody)/i,
  
  // "Are you in love?", "Were you in love?"
  /^(are|were)\s+you\s+(ever\s+)?in\s+love/i,
  
  // "Who is she?", "Who was she?", "Tell me about her", "Tell me your story"
  /^who\s+(is|was)\s+(she|the\s+girl)\b/i,
  /^tell\s+me\s+(about\s+her|your\s+story|your\s+love\s+story)/i,
  
  // "Is this for someone?", "Who is this website for?" (when asking about the maker's muse)
  /^is\s+this\s+(for|about)\s+someone\s+(real|special)/i,
  /^who\s+inspired\s+(this|little\s+things)/i,
  /^what\s+inspired\s+(you|little\s+things)/i
];

// Strict negative checks to guarantee normal Little Things searches NEVER trigger this
const SAFE_NORMAL_SEARCH_PREFIXES: RegExp[] = [
  /^(gift|gifts|idea|ideas|thing|things|surprise|what\s+to\s+buy|what\s+should\s+i|flowers|date|dates|budget|under|recommend|suggest)/i,
  /for\s+(her|him|us|them|boyfriend|girlfriend|husband|wife|partner|mom|dad)/i
];

export function isPersonalCreatorQuestion(query: string): boolean {
  if (!query) return false;
  
  // Normalize query: trim, remove leading/trailing punctuation and quotes, collapse multiple spaces
  const clean = query
    .trim()
    .toLowerCase()
    .replace(/^["'“‘]+|["'”’?.,!;:]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (clean.length < 5) return false;

  // Safeguard against normal queries that mention gifts/items for her/him/us
  const isExplicitShoppingQuery = SAFE_NORMAL_SEARCH_PREFIXES.some(p => p.test(clean));
  if (isExplicitShoppingQuery) {
    return false;
  }

  // Check if it matches any of the personal question patterns
  return PERSONAL_QUESTION_PATTERNS.some(pattern => pattern.test(clean));
}
