import { Service } from 'egg';

/**
 * Test Service
 */
export default class WeChatEvent extends Service {

  public async unsubscribe({ ToUserName, FromUserName, EventKey }) {
    console.log(ToUserName, FromUserName, EventKey);
    console.log(`${FromUserName} 取消了对 ${ToUserName} 的关注`);
  }
  public async subscribe({ ToUserName, FromUserName, EventKey, Ticket }): Promise<string> {
    console.log(ToUserName, FromUserName, EventKey, Ticket);
    return this.service.weChatMsg.sendText({ ToUserName, FromUserName, Content: `欢迎关注${ToUserName}公众号,二维码scene_id：${EventKey}  Ticket ${Ticket}` });
  }
  public async LOCATION({ ToUserName, FromUserName, Latitude, Longitude, Precision }): Promise<string> {
    console.log(ToUserName, FromUserName, Latitude, Longitude, Precision);
    return this.service.weChatMsg.sendText({ ToUserName, FromUserName, Content: `您的地理位置为：${Latitude}/${Longitude} 精度: ${Precision}` });
  }
}
