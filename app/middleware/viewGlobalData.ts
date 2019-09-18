import { Context } from 'egg';

// 这里是你自定义的中间件
export default function (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const
      timestamp = Date.now(),
      nonceStr = Math.floor(Math.random() * 100000000).toString();

    ctx.state = {
      sdkconfig: {
        debug: true,
        signature: await ctx.getSignature(nonceStr, timestamp),
        timestamp,
        nonceStr,
        appId: ctx.app.config.wx.appID,
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'onVoicePlayEnd',
          'uploadVoice',
          'downloadVoice',
          'translateVoice',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'scanQRCode',
          'openAddress',
          'chooseImage',
        ],
      },
    };
    await next();
  };
}
