import { Application } from 'egg';
import * as crypto from 'crypto';
export default {
  async getAccessToken(this: Application): Promise<string> {
    return JSON.parse(await this.redis.get('access_token') || '{}').access_token;
  },
  async getJsapiTicket(this: Application): Promise<string> {
    return JSON.parse(await this.redis.get('jsapi_ticket') || '{}').ticket;
  },

  sha1(str: string): string {
    const sha1: crypto.Hash = crypto.createHash('sha1');
    return sha1.update(str).digest('hex');
  },

};
