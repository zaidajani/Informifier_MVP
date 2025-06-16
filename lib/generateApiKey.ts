import crypto from 'crypto';

export function generateApiKey() {
  return crypto.randomBytes(16).toString('hex'); 
}