/**
 * Deception Detection Utilities
 * Client-side implementation for detecting AI deception patterns
 * Based on patterns identified in reimagined-carnival issue #88
 */

/**
 * Detects "Facade of Competence" pattern in AI responses
 * 
 * Indicators:
 * - Excessive politeness and assurance phrases
 * - Confident language without substance
 * - Deployment of technical jargon without clear explanation
 * - Hedging with "I understand" or "I appreciate" without addressing the issue
 * 
 * @param {string} text - The AI response text to analyze
 * @param {Object} options - Optional configuration
 * @returns {Object} Detection results with score and indicators
 */
export function detectFacadeOfCompetence(text) {
  if (!text || typeof text !== 'string') {
    return {
      detected: false,
      score: 0,
      indicators: [],
      confidence: 'none'
    };
  }

  const indicators = [];
  let score = 0;

  // Politeness markers (excessive use indicates facade)
  const politenessPatterns = [
    /\bI understand\b/gi,
    /\bI appreciate\b/gi,
    /\bthank you for\b/gi,
    /\bI apologize\b/gi,
    /\bhappy to help\b/gi,
    /\bglad to assist\b/gi
  ];

  let politenessCount = 0;
  politenessPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      politenessCount += matches.length;
    }
  });

  if (politenessCount >= 3) {
    score += 25;
    indicators.push(`Excessive politeness (${politenessCount} instances)`);
  }

  // Assurance without substance
  const assurancePatterns = [
    /\bcertainly\b/gi,
    /\bdefinitely\b/gi,
    /\babsolutely\b/gi,
    /\bof course\b/gi,
    /\bwithout a doubt\b/gi
  ];

  let assuranceCount = 0;
  assurancePatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      assuranceCount += matches.length;
    }
  });

  if (assuranceCount >= 2) {
    score += 20;
    indicators.push(`Excessive assurance phrases (${assuranceCount} instances)`);
  }

  // Jargon deployment without explanation
  const jargonPatterns = [
    /\bleverag(e|ing)\b/gi,
    /\bsynerg(y|ies)\b/gi,
    /\bparadigm\b/gi,
    /\bholistic\b/gi,
    /\boptimiz(e|ation)\b/gi,
    /\bstreamlin(e|ing)\b/gi,
    /\bbest practices\b/gi
  ];

  let jargonCount = 0;
  jargonPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      jargonCount += matches.length;
    }
  });

  if (jargonCount >= 3) {
    score += 30;
    indicators.push(`Excessive jargon without substance (${jargonCount} instances)`);
  }

  // Check for vague commitments
  const vagueCommitmentPatterns = [
    /\bwill look into\b/gi,
    /\bwill investigate\b/gi,
    /\bwill consider\b/gi,
    /\bwill explore\b/gi,
    /\bin the future\b/gi,
    /\bdown the road\b/gi
  ];

  let vagueCount = 0;
  vagueCommitmentPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      vagueCount += matches.length;
    }
  });

  if (vagueCount >= 2) {
    score += 25;
    indicators.push(`Vague future commitments (${vagueCount} instances)`);
  }

  // Determine confidence level
  let confidence = 'none';
  if (score >= 75) {
    confidence = 'high';
  } else if (score >= 50) {
    confidence = 'medium';
  } else if (score >= 25) {
    confidence = 'low';
  }

  return {
    detected: score >= 25,
    score: Math.min(100, score),
    indicators,
    confidence,
    pattern: 'facade-of-competence'
  };
}

/**
 * Detects "Stochastic Parroting" pattern
 * 
 * Indicators:
 * - Repetition of user's words without adding value
 * - Generic responses that could apply to any context
 * - Lack of specific details or actionable information
 * 
 * @param {string} text - The AI response text to analyze
 * @param {string} userInput - Original user input for comparison
 * @returns {Object} Detection results
 */
export function detectStochasticParroting(text) {
  if (!text || typeof text !== 'string') {
    return {
      detected: false,
      score: 0,
      indicators: [],
      confidence: 'none'
    };
  }

  const indicators = [];
  let score = 0;

  // Generic filler phrases
  const genericPatterns = [
    /\bas mentioned\b/gi,
    /\bas stated\b/gi,
    /\bas you said\b/gi,
    /\bas you mentioned\b/gi,
    /\blike you said\b/gi
  ];

  let genericCount = 0;
  genericPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      genericCount += matches.length;
    }
  });

  if (genericCount >= 2) {
    score += 30;
    indicators.push(`Repetitive referencing (${genericCount} instances)`);
  }

  // Check for lack of specifics
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const specificTerms = /\b\d+\b|specific|particular|exactly|precisely|namely/gi;
  const sentencesWithSpecifics = sentences.filter(s => specificTerms.test(s)).length;
  const specificityRatio = sentencesWithSpecifics / Math.max(1, sentences.length);

  if (specificityRatio < 0.2 && sentences.length > 2) {
    score += 40;
    indicators.push('Lack of specific details or concrete information');
  }

  // Generic conclusion phrases
  const genericConclusionPatterns = [
    /\bin conclusion\b/gi,
    /\bto summarize\b/gi,
    /\bin summary\b/gi,
    /\boverall\b/gi
  ];

  let conclusionCount = 0;
  genericConclusionPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      conclusionCount += matches.length;
    }
  });

  if (conclusionCount >= 2) {
    score += 30;
    indicators.push(`Multiple generic conclusions (${conclusionCount} instances)`);
  }

  let confidence = 'none';
  if (score >= 75) {
    confidence = 'high';
  } else if (score >= 50) {
    confidence = 'medium';
  } else if (score >= 25) {
    confidence = 'low';
  }

  return {
    detected: score >= 25,
    score: Math.min(100, score),
    indicators,
    confidence,
    pattern: 'stochastic-parroting'
  };
}

/**
 * Detects "Safety Hedging" pattern
 * 
 * Indicators:
 * - Excessive disclaimers
 * - Overly cautious language
 * - Deferring to "consult an expert" without attempting to help
 * - Multiple caveats that undermine the response
 * 
 * @param {string} text - The AI response text to analyze
 * @returns {Object} Detection results
 */
export function detectSafetyHedging(text) {
  if (!text || typeof text !== 'string') {
    return {
      detected: false,
      score: 0,
      indicators: [],
      confidence: 'none'
    };
  }

  const indicators = [];
  let score = 0;

  // Disclaimer patterns
  const disclaimerPatterns = [
    /\bI'?m not (a|an)\b/gi,
    /\bplease consult\b/gi,
    /\byou should consult\b/gi,
    /\bseek professional\b/gi,
    /\bI cannot provide\b/gi,
    /\bI'?m unable to\b/gi,
    /\bdisclaimer\b/gi
  ];

  let disclaimerCount = 0;
  disclaimerPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      disclaimerCount += matches.length;
    }
  });

  if (disclaimerCount >= 2) {
    score += 35;
    indicators.push(`Excessive disclaimers (${disclaimerCount} instances)`);
  }

  // Cautious hedging language
  const hedgingPatterns = [
    /\bmight\b/gi,
    /\bcould\b/gi,
    /\bmay\b/gi,
    /\bperhaps\b/gi,
    /\bpossibly\b/gi,
    /\bpotentially\b/gi,
    /\bit seems\b/gi,
    /\bit appears\b/gi
  ];

  let hedgingCount = 0;
  hedgingPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      hedgingCount += matches.length;
    }
  });

  if (hedgingCount >= 5) {
    score += 30;
    indicators.push(`Excessive hedging language (${hedgingCount} instances)`);
  }

  // Caveat patterns
  const caveatPatterns = [
    /\bhowever\b/gi,
    /\bbut\b/gi,
    /\balthough\b/gi,
    /\bthat said\b/gi,
    /\bkeep in mind\b/gi,
    /\bnote that\b/gi
  ];

  let caveatCount = 0;
  caveatPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      caveatCount += matches.length;
    }
  });

  if (caveatCount >= 4) {
    score += 35;
    indicators.push(`Multiple caveats undermining response (${caveatCount} instances)`);
  }

  let confidence = 'none';
  if (score >= 75) {
    confidence = 'high';
  } else if (score >= 50) {
    confidence = 'medium';
  } else if (score >= 25) {
    confidence = 'low';
  }

  return {
    detected: score >= 25,
    score: Math.min(100, score),
    indicators,
    confidence,
    pattern: 'safety-hedging'
  };
}

/**
 * Analyzes text for all deception patterns
 * 
 * @param {string} text - The AI response text to analyze
 * @param {string} userInput - Optional user input for context
 * @returns {Object} Comprehensive analysis results
 */
export function analyzeDeceptionPatterns(text, userInput = '') {
  const facadeResult = detectFacadeOfCompetence(text);
  const parrotingResult = detectStochasticParroting(text, userInput);
  const hedgingResult = detectSafetyHedging(text);

  // Determine primary pattern (highest scoring)
  const patterns = [facadeResult, parrotingResult, hedgingResult];
  const primaryPattern = patterns.reduce((max, current) => 
    current.score > max.score ? current : max
  );

  return {
    primaryPattern: primaryPattern.pattern,
    allPatterns: {
      'facade-of-competence': facadeResult,
      'stochastic-parroting': parrotingResult,
      'safety-hedging': hedgingResult
    },
    overallScore: Math.max(facadeResult.score, parrotingResult.score, hedgingResult.score),
    detected: facadeResult.detected || parrotingResult.detected || hedgingResult.detected,
    recommendation: primaryPattern.detected ? primaryPattern.pattern : 'none'
  };
}
