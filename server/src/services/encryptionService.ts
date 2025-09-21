import * as CryptoJS from 'crypto-js'
import logger from '@utils/logger'

export interface EncryptionConfig {
  algorithm: string
  keySize: number
  iterations: number
}

export interface EncryptedMessage {
  encrypted: string
  iv: string
  salt: string
  timestamp: number
}

class EncryptionService {
  private config: EncryptionConfig = {
    algorithm: 'AES',
    keySize: 256,
    iterations: 10000
  }

  /**
   * Generate a unique encryption key for each user
   */
  generateUserKey(userId: string, masterKey: string): string {
    const salt = CryptoJS.lib.WordArray.random(128/8)
    const key = CryptoJS.PBKDF2(masterKey + userId, salt, {
      keySize: this.config.keySize/32,
      iterations: this.config.iterations
    })
    return key.toString()
  }

  /**
   * Encrypt sensitive message content
   */
  encryptMessage(message: string, userKey: string): EncryptedMessage {
    try {
      const salt = CryptoJS.lib.WordArray.random(128/8)
      const iv = CryptoJS.lib.WordArray.random(128/8)
      
      // Derive key from user key and salt
      const key = CryptoJS.PBKDF2(userKey, salt, {
        keySize: this.config.keySize/32,
        iterations: this.config.iterations
      })
      
      // Encrypt the message
      const encrypted = CryptoJS.AES.encrypt(message, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      
      return {
        encrypted: encrypted.toString(),
        iv: iv.toString(),
        salt: salt.toString(),
        timestamp: Date.now()
      }
    } catch (error) {
      logger.error('Encryption failed:', error)
      throw new Error('Failed to encrypt message')
    }
  }

  /**
   * Decrypt sensitive message content
   */
  decryptMessage(encryptedMessage: EncryptedMessage, userKey: string): string {
    try {
      const salt = CryptoJS.enc.Hex.parse(encryptedMessage.salt)
      const iv = CryptoJS.enc.Hex.parse(encryptedMessage.iv)
      
      // Derive key from user key and salt
      const key = CryptoJS.PBKDF2(userKey, salt, {
        keySize: this.config.keySize/32,
        iterations: this.config.iterations
      })
      
      // Decrypt the message
      const decrypted = CryptoJS.AES.decrypt(encryptedMessage.encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      
      return decrypted.toString(CryptoJS.enc.Utf8)
    } catch (error) {
      logger.error('Decryption failed:', error)
      throw new Error('Failed to decrypt message')
    }
  }

  /**
   * Encrypt user data (profile, preferences, etc.)
   */
  encryptUserData(data: any, userKey: string): string {
    try {
      const jsonString = JSON.stringify(data)
      const encrypted = this.encryptMessage(jsonString, userKey)
      return JSON.stringify(encrypted)
    } catch (error) {
      logger.error('User data encryption failed:', error)
      throw new Error('Failed to encrypt user data')
    }
  }

  /**
   * Decrypt user data
   */
  decryptUserData(encryptedData: string, userKey: string): any {
    try {
      const encryptedMessage: EncryptedMessage = JSON.parse(encryptedData)
      const decryptedJson = this.decryptMessage(encryptedMessage, userKey)
      return JSON.parse(decryptedJson)
    } catch (error) {
      logger.error('User data decryption failed:', error)
      throw new Error('Failed to decrypt user data')
    }
  }

  /**
   * Hash sensitive data for storage (one-way)
   */
  hashSensitiveData(data: string, salt?: string): { hash: string; salt: string } {
    const usedSalt = salt || CryptoJS.lib.WordArray.random(128/8).toString()
    const hash = CryptoJS.PBKDF2(data, usedSalt, {
      keySize: 256/32,
      iterations: this.config.iterations
    })
    
    return {
      hash: hash.toString(),
      salt: usedSalt
    }
  }

  /**
   * Verify hashed data
   */
  verifyHashedData(data: string, hash: string, salt: string): boolean {
    try {
      const computedHash = CryptoJS.PBKDF2(data, salt, {
        keySize: 256/32,
        iterations: this.config.iterations
      })
      return computedHash.toString() === hash
    } catch (error) {
      logger.error('Hash verification failed:', error)
      return false
    }
  }

  /**
   * Generate secure random token
   */
  generateSecureToken(length: number = 32): string {
    return CryptoJS.lib.WordArray.random(length).toString()
  }

  /**
   * Encrypt session data
   */
  encryptSessionData(sessionData: any, sessionKey: string): string {
    try {
      const jsonString = JSON.stringify(sessionData)
      const encrypted = this.encryptMessage(jsonString, sessionKey)
      return JSON.stringify(encrypted)
    } catch (error) {
      logger.error('Session encryption failed:', error)
      throw new Error('Failed to encrypt session data')
    }
  }

  /**
   * Decrypt session data
   */
  decryptSessionData(encryptedSession: string, sessionKey: string): any {
    try {
      const encryptedMessage: EncryptedMessage = JSON.parse(encryptedSession)
      const decryptedJson = this.decryptMessage(encryptedMessage, sessionKey)
      return JSON.parse(decryptedJson)
    } catch (error) {
      logger.error('Session decryption failed:', error)
      throw new Error('Failed to decrypt session data')
    }
  }

  /**
   * Check if message contains sensitive information
   */
  containsSensitiveInfo(message: string): boolean {
    const sensitivePatterns = [
      /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit card
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
      /\b\d{10}\b/, // Phone number
      /\b[A-Z]{2}\d{2}[A-Z]{2}\d{4}\b/, // Indian vehicle number
      /\b\d{12}\b/, // Aadhaar number
      /\b[A-Z]{5}\d{4}[A-Z]{1}\b/ // PAN number
    ]
    
    return sensitivePatterns.some(pattern => pattern.test(message))
  }

  /**
   * Sanitize message by removing/masking sensitive information
   */
  sanitizeMessage(message: string): string {
    let sanitized = message
    
    // Mask credit card numbers
    sanitized = sanitized.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '****-****-****-****')
    
    // Mask phone numbers
    sanitized = sanitized.replace(/\b\d{10}\b/g, '****-****-**')
    
    // Mask email addresses
    sanitized = sanitized.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '***@***.***')
    
    // Mask Aadhaar numbers
    sanitized = sanitized.replace(/\b\d{12}\b/g, '****-****-****')
    
    return sanitized
  }
}

export default new EncryptionService()
