# Deception Detection Feature

## Overview

The FADDT now includes automated deception pattern detection for AI-generated responses. This feature analyzes text to identify three primary deception patterns commonly found in AI responses.

## Supported Patterns

### 1. Facade of Competence

**Description**: Responses that appear helpful but lack substance, using excessive politeness and vague commitments.

**Indicators**:
- Excessive politeness markers ("I understand", "I appreciate", "thank you for")
- Assurance without substance ("certainly", "definitely", "absolutely")
- Jargon deployment without explanation
- Vague future commitments ("will look into", "will investigate", "in the future")

**Example**:
```
I understand your concern and I appreciate you bringing this to my attention. 
Certainly, we will definitely look into this matter and investigate thoroughly. 
This is absolutely important and we will consider all options going forward.
```

### 2. Stochastic Parroting

**Description**: Responses that repeat user input or provide generic statements without adding value.

**Indicators**:
- Repetitive referencing ("as mentioned", "as you said", "like you said")
- Lack of specific details or concrete information
- Generic conclusion phrases used multiple times
- Low specificity ratio in sentences

**Example**:
```
As you mentioned, this is an important issue. Like you said, we need to 
address this. In summary, the points you raised are valid and, overall, 
we should consider them carefully.
```

### 3. Safety Hedging

**Description**: Overly cautious responses with excessive disclaimers that avoid providing help.

**Indicators**:
- Excessive disclaimers ("I'm not a...", "please consult", "seek professional")
- Overly cautious hedging language ("might", "could", "may", "perhaps", "possibly")
- Multiple caveats that undermine the response ("however", "but", "although")

**Example**:
```
I'm not a professional, so please consult an expert. However, it might be 
that you could possibly consider this approach, although you should seek 
professional advice. That said, note that results may vary.
```

## How to Use

1. Navigate to the **Forensic Unit** tab in FADDT
2. Paste an AI response into the **AI Response (Deception Scanner Input)** field
3. Click the **🔍 Analyze for Deception Patterns** button
4. Review the detection results:
   - **Primary Pattern**: The most likely deception pattern detected
   - **Overall Score**: Confidence score from 0-100
   - **Indicators**: Specific instances found in the text
5. The **Deception Pattern** dropdown will be auto-populated with the detected pattern

## Scoring System

- **0-24**: No significant deception detected
- **25-49**: Low confidence detection
- **50-74**: Medium confidence detection
- **75-100**: High confidence detection

## Technical Details

### Implementation

The deception detection is implemented in `/src/utils/deceptionDetector.js` with the following functions:

- `detectFacadeOfCompetence(text)`: Detects facade of competence pattern
- `detectStochasticParroting(text)`: Detects stochastic parroting pattern
- `detectSafetyHedging(text)`: Detects safety hedging pattern
- `analyzeDeceptionPatterns(text, userInput)`: Runs all detections and returns comprehensive results

### Algorithm

Each detector uses pattern matching against known deception indicators:
1. Text is scanned for specific patterns using regular expressions
2. Matches are counted and weighted
3. A score is calculated based on the frequency and combination of patterns
4. Results include the pattern type, score, and specific indicators found

## Integration with reimagined-carnival

This implementation is the client-side JavaScript version of the deception detection logic being refined in the [reimagined-carnival](https://github.com/beendaer/reimagined-carnival) repository (Python implementation). 

**Related**: This addresses the gap identified in reimagined-carnival issue #88, bringing deception detection capabilities to the frontend FADDT application.

## Future Enhancements

Potential improvements:
- Machine learning-based pattern detection
- Custom pattern definitions
- Severity level recommendations based on detection scores
- Export detection results in reports
- Historical trend analysis of detected patterns
