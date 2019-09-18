import { Subscription } from 'egg';
import JsapiTicket, { ResJSON, Option } from '../bin/JsapiTicket';

export default class extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true, // 立即执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const _this = this;
    const option: Option = {
      access_token: await this.app.getAccessToken(),
      async getJsapiTicket(): Promise<ResJSON> {
        const default_token: string = JSON.stringify({
          access_token: '',
          expires_in: 0,
        });
        return JSON.parse((await _this.app.redis.get('jsapi_ticket')) || default_token);
      },
      async setJsapiTicket(token: ResJSON): Promise<void> {
        // console.log('setAccessToken => ', token);
        await _this.app.redis.set('jsapi_ticket', JSON.stringify(token));
      },
    };

    const wechat = new JsapiTicket(option);

    this.ctx.wechat = wechat;
  }
}
