import { Service } from 'egg';
import { message } from '../bin/api';

export default class Message extends Service {
  public async sendNew({ is_to_all = true, tag_id = 0, media_id }) {
    const access_token = await this.app.getAccessToken();
    const formData = { filter: { is_to_all, tag_id }, mpnews: { media_id }, msgtype: 'mpnews', send_ignore_reprint: 0 };
    return (await message.sendall(access_token, formData)).body;
  }
  public async sendText({ is_to_all = true, tag_id = 0, content }) {
    const access_token = await this.app.getAccessToken();
    const formData = {
      filter: { is_to_all, tag_id },
      text: {
        content,
      },
      msgtype: 'text',
      send_ignore_reprint: 0,
    };
    return (await message.sendall(access_token, formData)).body;
  }
}
