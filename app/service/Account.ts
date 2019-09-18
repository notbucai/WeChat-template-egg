import { Service } from 'egg';
import { qrcode, shorturl } from '../bin/api';

export default class Account extends Service {

  /**
   * type 1 表示QR_SCENE 2表示QR_STR_SCENE 3表示 QR_LIMIT_SCENE 4表示 QR_LIMIT_STR_SCENE
   */
  public async create({ type = 1, expire_seconds = -1, scene_id = 0, scene_str = '' }) {
    const access_token = await this.app.getAccessToken();
    const form: any = {
      action_name: type === 1 ? 'QR_SCENE' : type === 2 ? 'QR_STR_SCENE' : type === 3 ? 'QR_LIMIT_SCENE' : type === 4 ? 'QR_LIMIT_STR_SCENE' : 'QR_SCENE',
      action_info: {
        scene: { scene_str, scene_id },
      },
    };
    if (expire_seconds !== -1) {
      form.expire_seconds = expire_seconds;
    }
    return JSON.parse((await qrcode.create(access_token, form)).body);
  }

  public async showqrcode({ ticket }) {
    return 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + ticket;
  }
  public async shorturl({ action = 'long2short', long_url }) {
    const access_token = await this.app.getAccessToken();
    const form: any = {
      action,
      long_url,
    };
    return JSON.parse((await shorturl.shorturl(access_token, form)).body);
  }
}
