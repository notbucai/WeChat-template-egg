import { Subscription } from 'egg';
import AccessToken, { TokenJSON, Option } from '../bin/AccessToken';

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
    const config = this.app.config.wx;
    const option: Option = {
      appID: config.appID,
      appsecret: config.appsecret,
      async getAccessToken(): Promise<TokenJSON> {
        const default_token: string = JSON.stringify({
          access_token: '',
          expires_in: 0,
        });
        return JSON.parse((await _this.app.redis.get('access_token')) || default_token);
      },
      async setAccessToken(token: TokenJSON): Promise<void> {
        // console.log('setAccessToken => ', token);
        await _this.app.redis.set('access_token', JSON.stringify(token));
      },
    };

    const wechat = new AccessToken(option);

    this.ctx.wechat = wechat;
  }
}
