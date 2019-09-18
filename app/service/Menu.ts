import { Service } from 'egg';
import { menu } from '../bin/api';

export default class Menu extends Service {
  public async create({ data }) {
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await menu.create(access_token, data)).body);
  }
  public async delete() {
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await menu.delete(access_token)).body);
  }
  public async get() {
    const access_token = await this.app.getAccessToken();
    return JSON.parse((await menu.get(access_token)).body);
  }
}
