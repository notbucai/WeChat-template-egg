import { Service } from 'egg';
import { tags, user } from '../bin/api';
/**
 * User Service
 */
export default class User extends Service {
  // 创建
  public async createTag({ name }) {
    const form_data = {
      tag: { name },
    };
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await tags.create(access_token, form_data)).body);
  }
  // 获取所有标签
  public async getTags() {
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await tags.get(access_token)).body);
  }
  // 获取便签下的用户
  public async getUserByTagId({ tagid, next_openid = '' }) {
    const form_data = {
      tagid,
      next_openid,
    };
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await tags.getById(access_token, form_data)).body);
  }
  // 删除
  public async delTag({ id }) {
    const form_data = {
      tag: { id },
    };
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await tags.delete(access_token, form_data)).body);
  }
  // 修改
  public async updateTag({ id, name }) {
    const form_data = {
      tag: { id, name },
    };
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await tags.update(access_token, form_data)).body);
  }
  // TODO 标签管理暂时停

  // 获取用户信息
  public async userInfo({ openid }) {
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await user.info(access_token, openid)).body);
  }
  // 批量获取用户信息
  public async userInfoBatchget({ openids }) {
    const form_data = {
      user_list: [
        ...openids.map((item: string) => ({
          openid: item,
          lang: 'zh_CN',
        })),
      ],
    };
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await user.infoBatchget(access_token, form_data)).body);
  }
  // 批量用户列表
  public async getUserList({ next_openid = '' }) {
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await user.get(access_token, next_openid)).body);
  }
}
