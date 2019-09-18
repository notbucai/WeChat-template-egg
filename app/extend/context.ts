import { Context } from 'egg';

export default {
  isAjax(this: Context) {
    return this.get('X-Requested-With') === 'XMLHttpRequest';
  },
  async getSignature(this: Context, noncestr: string, timestamp: number) {
    const signatureStr = [
      'url=' + this.URL.href,
      'timestamp=' + timestamp,
      'jsapi_ticket=' + await this.app.getJsapiTicket(),
      'noncestr=' + noncestr,
    ].sort().join('&');
    return this.app.sha1(signatureStr);
  },
};
