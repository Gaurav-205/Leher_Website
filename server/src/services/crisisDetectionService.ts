import * as natural from 'natural'
import Sentiment from 'sentiment'
import logger from '@utils/logger'

export interface CrisisDetectionResult {
  isCrisis: boolean
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  keywords: string[]
  context: string
  sentiment: {
    score: number
    comparative: number
    positive: string[]
    negative: string[]
  }
  patterns: string[]
  riskFactors: string[]
}

export interface CrisisPattern {
  pattern: RegExp
  severity: 'low' | 'medium' | 'high' | 'critical'
  weight: number
  description: string
}

class CrisisDetectionService {
  private sentiment: Sentiment
  private tokenizer: natural.WordTokenizer
  private stemmer: natural.Stemmer
  
  // Enhanced crisis patterns with ML-based scoring
  private crisisPatterns: CrisisPattern[] = [
    // Critical patterns (immediate danger)
    {
      pattern: /\b(suicide|kill\s+myself|end\s+it\s+all|not\s+worth\s+living|want\s+to\s+die|self\s+harm|hurt\s+myself|end\s+my\s+life|better\s+off\s+dead)\b/i,
      severity: 'critical',
      weight: 1.0,
      description: 'Direct self-harm expressions'
    },
    {
      pattern: /\b(cutting|overdose|poison|jump\s+off|hang\s+myself|shoot\s+myself|drown\s+myself|burn\s+myself)\b/i,
      severity: 'critical',
      weight: 0.95,
      description: 'Specific self-harm methods'
    },
    {
      pattern: /\b(final\s+solution|permanent\s+solution|escape\s+pain|end\s+the\s+pain|stop\s+the\s+pain)\b/i,
      severity: 'critical',
      weight: 0.9,
      description: 'Permanent solution references'
    },
    
    // High severity patterns
    {
      pattern: /\b(can'?t\s+take\s+it\s+anymore|give\s+up|lose\s+hope|hopeless|helpless|no\s+way\s+out|trapped|no\s+escape)\b/i,
      severity: 'high',
      weight: 0.8,
      description: 'Despair and hopelessness'
    },
    {
      pattern: /\b(want\s+to\s+disappear|disappear\s+forever|never\s+wake\s+up|sleep\s+forever|end\s+everything)\b/i,
      severity: 'high',
      weight: 0.75,
      description: 'Escape and disappearance wishes'
    },
    
    // Medium severity patterns
    {
      pattern: /\b(hate\s+living|life\s+is\s+pointless|nothing\s+matters|wish\s+i\s+was\s+dead|should\s+be\s+dead)\b/i,
      severity: 'medium',
      weight: 0.6,
      description: 'Life dissatisfaction'
    },
    {
      pattern: /\b(done\s+with\s+life|can'?t\s+go\s+on|deserve\s+to\s+die|world\s+without\s+me|everyone\s+better\s+off)\b/i,
      severity: 'medium',
      weight: 0.55,
      description: 'Self-worth issues'
    },
    
    // Low severity patterns (early warning signs)
    {
      pattern: /\b(feeling\s+empty|numb|dead\s+inside|no\s+point|meaningless|worthless)\b/i,
      severity: 'low',
      weight: 0.4,
      description: 'Emotional emptiness'
    },
    {
      pattern: /\b(always\s+sad|never\s+happy|can'?t\s+stop\s+crying|feel\s+like\s+crying|want\s+to\s+cry)\b/i,
      severity: 'low',
      weight: 0.3,
      description: 'Persistent sadness'
    }
  ]

  // Risk factor patterns
  private riskFactorPatterns = [
    /\b(isolated|lonely|alone|no\s+friends|no\s+one\s+cares|nobody\s+understands)\b/i,
    /\b(unemployed|jobless|failed|failure|rejected|abandoned)\b/i,
    /\b(abuse|abused|violence|violent|threatened|scared)\b/i,
    /\b(drugs|alcohol|drinking|substance|addiction|addicted)\b/i,
    /\b(family\s+problems|divorce|separation|death|loss|grief)\b/i,
    /\b(financial|money\s+problems|debt|broke|poverty)\b/i,
    /\b(medical|illness|sick|pain|chronic|terminal)\b/i,
    /\b(previous\s+attempt|tried\s+before|history\s+of|past\s+suicide)\b/i
  ]

  constructor() {
    this.sentiment = new Sentiment()
    this.tokenizer = new natural.WordTokenizer()
    this.stemmer = natural.PorterStemmer
  }

  /**
   * Analyze text for crisis indicators using ML-enhanced detection
   */
  analyzeCrisis(text: string): CrisisDetectionResult {
    const lowerText = text.toLowerCase()
    const tokens = this.tokenizer.tokenize(lowerText)
    
    // Get sentiment analysis
    const sentimentResult = this.sentiment.analyze(text)
    
    // Analyze patterns
    const matchedPatterns: CrisisPattern[] = []
    const matchedKeywords: string[] = []
    
    this.crisisPatterns.forEach(pattern => {
      if (pattern.pattern.test(text)) {
        matchedPatterns.push(pattern)
        // Extract matched keywords
        const matches = text.match(pattern.pattern)
        if (matches) {
          matchedKeywords.push(...matches)
        }
      }
    })
    
    // Analyze risk factors
    const riskFactors: string[] = []
    this.riskFactorPatterns.forEach(pattern => {
      const matches = text.match(pattern)
      if (matches) {
        riskFactors.push(...matches)
      }
    })
    
    // Calculate severity and confidence
    const severityScore = this.calculateSeverityScore(matchedPatterns, sentimentResult, riskFactors)
    const confidence = this.calculateConfidence(matchedPatterns, sentimentResult, riskFactors)
    
    // Determine final severity
    const severity = this.determineSeverity(severityScore)
    const isCrisis = severity !== 'low' || confidence > 0.7
    
    return {
      isCrisis,
      severity,
      confidence,
      keywords: [...new Set(matchedKeywords)], // Remove duplicates
      context: this.generateContext(matchedPatterns, riskFactors),
      sentiment: {
        score: sentimentResult.score,
        comparative: sentimentResult.comparative,
        positive: sentimentResult.positive,
        negative: sentimentResult.negative
      },
      patterns: matchedPatterns.map(p => p.description),
      riskFactors: [...new Set(riskFactors)]
    }
  }

  /**
   * Calculate severity score based on patterns, sentiment, and risk factors
   */
  private calculateSeverityScore(
    patterns: CrisisPattern[], 
    sentiment: any, 
    riskFactors: string[]
  ): number {
    let score = 0
    
    // Pattern-based scoring
    patterns.forEach(pattern => {
      const severityWeights = {
        'critical': 1.0,
        'high': 0.7,
        'medium': 0.5,
        'low': 0.3
      }
      score += pattern.weight * severityWeights[pattern.severity]
    })
    
    // Sentiment-based scoring
    if (sentiment.comparative < -0.5) {
      score += 0.3 // Very negative sentiment
    } else if (sentiment.comparative < -0.2) {
      score += 0.2 // Negative sentiment
    }
    
    // Risk factor scoring
    score += Math.min(riskFactors.length * 0.1, 0.3) // Cap at 0.3
    
    return Math.min(score, 1.0) // Cap at 1.0
  }

  /**
   * Calculate confidence score for the detection
   */
  private calculateConfidence(
    patterns: CrisisPattern[], 
    sentiment: any, 
    riskFactors: string[]
  ): number {
    let confidence = 0
    
    // Pattern confidence
    if (patterns.length > 0) {
      const avgPatternWeight = patterns.reduce((sum, p) => sum + p.weight, 0) / patterns.length
      confidence += avgPatternWeight * 0.6
    }
    
    // Sentiment confidence
    if (Math.abs(sentiment.comparative) > 0.3) {
      confidence += 0.2
    }
    
    // Risk factor confidence
    if (riskFactors.length > 2) {
      confidence += 0.2
    }
    
    return Math.min(confidence, 1.0)
  }

  /**
   * Determine severity level based on score
   */
  private determineSeverity(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 0.8) return 'critical'
    if (score >= 0.6) return 'high'
    if (score >= 0.4) return 'medium'
    return 'low'
  }

  /**
   * Generate contextual description
   */
  private generateContext(patterns: CrisisPattern[], riskFactors: string[]): string {
    const contexts: string[] = []
    
    if (patterns.length > 0) {
      contexts.push(`Detected ${patterns.length} crisis pattern(s)`)
    }
    
    if (riskFactors.length > 0) {
      contexts.push(`${riskFactors.length} risk factor(s) identified`)
    }
    
    return contexts.join(', ') || 'No specific crisis indicators detected'
  }

  /**
   * Get crisis response based on severity
   */
  getCrisisResponse(severity: string, confidence: number): string {
    const responses = {
      critical: "I'm extremely concerned about your safety right now. Please call these helplines immediately: Emergency 112, KIRAN 1800-599-0019, or Suicide Prevention 9152987821. You're not alone and people want to help you.",
      high: "I'm really worried about you. It sounds like you're going through a very difficult time. Please reach out to these helplines: KIRAN 1800-599-0019 or Emergency 112. You don't have to face this alone.",
      medium: "I can hear that you're struggling right now. It's okay to feel this way, but please know that there are people who care about you. Consider reaching out to a trusted friend or family member, or call KIRAN 1800-599-0019.",
      low: "I'm here to listen and support you. If these feelings persist or get worse, please don't hesitate to reach out to KIRAN 1800-599-0019 or talk to someone you trust."
    }
    
    return responses[severity as keyof typeof responses] || responses.low
  }

  /**
   * Log crisis detection for monitoring
   */
  logCrisisDetection(result: CrisisDetectionResult, userId: string, message: string): void {
    logger.warn('Crisis Detection Alert', {
      userId,
      severity: result.severity,
      confidence: result.confidence,
      keywords: result.keywords,
      riskFactors: result.riskFactors,
      sentiment: result.sentiment.comparative,
      messageLength: message.length,
      timestamp: new Date().toISOString()
    })
  }
}

export default new CrisisDetectionService()
