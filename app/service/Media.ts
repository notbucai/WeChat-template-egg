import { Service } from 'egg';
import { http, mediaApi, materialApi } from '../bin/api';
import { createReadStream } from 'fs';
import { Stream } from 'stream';
/**
 * request 需要json解析body
 */

interface ArticleInterface {
  title: string;
  thumb_media_id: string;
  author?: string;
  digest?: string;
  show_cover_pic: number;
  content: string;
  content_source_url: string;
  need_open_comment?: string;
  only_fans_can_comment?: string;
}
/**
 * 素材管理
 */
export default class Media extends Service {

  private async getMedialLocation(mediaPath: any): Promise<Stream> {
    let media: Stream;
    if (/^(http:\/\/|https:\/\/)/.test(mediaPath)) {
      media = (await http.get(mediaPath, {
        responseType: 'stream',
      })).data;
    } else {
      const readS = createReadStream(mediaPath);
      media = readS;
    }
    return media;
  }

  // 上传图片 获取链接
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
  public async uploadImg({ mediaPath }) {
    const media = await this.getMedialLocation(mediaPath);
    const form_data = { media };
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await materialApi.uploadimg(access_token, form_data)).body);
  }

  // 添加临时素材
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
  public async addMedia({ type, mediaPath }) {
    const media = await this.getMedialLocation(mediaPath);

    const form_data = { media };
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await mediaApi.upload(access_token, type, form_data)).body);
  }

  // 添加永久其他素材
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729
  public async addMaterial({ type, mediaPath }, description?: object | null) {
    const media = await this.getMedialLocation(mediaPath);
    const form_data: any = { media };
    if (description) {
      form_data.description = JSON.stringify(description);
    }
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await materialApi.add_material(access_token, type, form_data)).body);
  }

  // 添加永久图文素材
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
  public async addNewsMaterial(article: ArticleInterface) {
    const access_token = await this.app.getAccessToken();
    const form_data = { articles: [article] };
    return JSON.parse((await materialApi.add_news(access_token, form_data)).body);
  }

  // 获取临时素材
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738727
  public async getMedia(media_id: string) {
    const access_token = await this.app.getAccessToken();
    return await mediaApi.get(access_token, media_id);
  }
  // 获取永久素材
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738727
  public async getMaterial(media_id: string) {
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await materialApi.get(access_token, media_id)).body);
  }

  // 删除永久素材
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738732
  public async delMaterial(media_id: string) {
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await materialApi.del_material(access_token, { media_id })).body);
  }
  // 获取素材总数
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738733
  public async getMaterialcount() {
    const access_token = await this.app.getAccessToken();
    return (await materialApi.get_materialcount({ access_token }));
  }
  // 获取素材列表
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738734
  public async getBatchgetMaterial({ type = 'image', offset = 0, count = 10 }) {
    const form = {
      type, offset, count,
    };
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await materialApi.batchget_material(access_token, form)).body);
  }
}
