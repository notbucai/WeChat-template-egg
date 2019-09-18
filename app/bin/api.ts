import axios from 'axios';
import { post, get } from 'request';
import { promisify } from 'util';

export const baseUrl = 'https://api.weixin.qq.com/cgi-bin/';

export const http = axios.create({
  baseURL: baseUrl,
});
function toQuerystring(query: any): string {
  const urlSP = new URLSearchParams(query);
  return urlSP.toString();
}

// -------- 获取token ---------

export const getAccess_token = async (appid: string, secret: string) => {
  const query = toQuerystring({ appid, secret, grant_type: 'client_credential' });
  return (await http.get('token?' + query)).data;
};
// -------- 获取jsapi_ticket ---------

export const getJsapi_ticket = async (access_token: string) => {
  const query = toQuerystring({ access_token, type: 'jsapi' });
  return (await http.get('ticket/getticket?' + query)).data;
};

// -------- 素材相关 ---------

export const mediaApi = {
  // 上传临时素材
  async upload(access_token: string, type: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token, type });
    return (await promisify(post)({ url: baseUrl + 'media/upload?' + query, formData: form }, undefined));
  },
  // 获取临时素材
  async get(access_token: string, media_id: string) {
    const query = toQuerystring({ access_token, media_id });
    return (await http.get(baseUrl + 'media/get?' + query, {
      responseType: 'stream',
    })).data;
  },
};

export const materialApi = {
  // 获取永久素材
  async get(access_token: string, media_id: string): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'material/get_material?' + query, form: JSON.stringify({ media_id }) }, undefined));
  },
  // 上传图文消息内的图片获取URL 小于1m
  async uploadimg(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'media/uploadimg?' + query, formData: form }, undefined));
  },
  // 上传图文素材
  async add_news(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'material/add_news?' + query, form: JSON.stringify(form) }, undefined));
  },

  // 新增其他类型永久素材
  async add_material(access_token: string, type: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token, type });
    return (await promisify(post)({ url: baseUrl + 'material/add_material?' + query, formData: form }, undefined));
  },

  // 删除永久素材
  async del_material(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'material/del_material?' + query, form: JSON.stringify(form) }, undefined));
  },

  // 获取素材总数
  async get_materialcount(access_token): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await http.get('material/get_materialcount?' + query)).data;
  },
  // 获取素材列表
  async batchget_material(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'material/batchget_material?' + query, form: JSON.stringify(form) }, undefined));
  },
};

/// ------- 用户相关 -----
// -------- 用户标签相关 ---------
export const tags = {
  // 创建标签
  async create(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'tags/create?' + query, form: JSON.stringify(form) }, undefined));
  },
  // 获取公众号已创建的标签
  async get(access_token: string): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(get)({ url: baseUrl + 'tags/get?' + query }, undefined));
  },
  // 获取标签下的用户
  async getById(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'user/tag/get?' + query, form: JSON.stringify(form) }, undefined));
  },
  // 编辑标签
  async update(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'tags/update?' + query, form: JSON.stringify(form) }, undefined));
  },
  // 删除标签
  async delete(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'tags/delete?' + query, form: JSON.stringify(form) }, undefined));
  },
  // 批量为用户打标签
  async batchtagging(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'tags/members/batchtagging?' + query, form: JSON.stringify(form) }, undefined));
  },
  // 批量为用户取消标签
  async batchuntagging(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'tags/members/batchuntagging?' + query, form: JSON.stringify(form) }, undefined));
  },
  // 获取用户身上的标签列表
  async getidlist(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'tags/members/getidlist?' + query, form: JSON.stringify(form) }, undefined));
  },
};
// --------- 用户资料相关 -----------
export const user = {
  async info(access_token: string, openid: string): Promise<any> {
    const query = toQuerystring({ access_token, openid, lang: 'zh_CN' });
    return (await promisify(get)({ url: baseUrl + 'user/info?' + query }, undefined));
  },
  async infoBatchget(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token, });
    return (await promisify(post)({ url: baseUrl + 'user/info/batchget?' + query, form: JSON.stringify(form) }, undefined));
  },
  async get(access_token: string, next_openid = ''): Promise<any> {
    const query = toQuerystring({ access_token, next_openid });
    return (await promisify(get)({ url: baseUrl + 'user/get?' + query, }, undefined));
  },
};

// ----- 账号管理 ----
// ------ 二维码 ---
export const qrcode = {
  async create(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'qrcode/create?' + query, form: JSON.stringify(form) }, undefined));
  },
};
// ------ 二维码 ---
export const shorturl = {
  async shorturl(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'shorturl?' + query, form: JSON.stringify(form) }, undefined));
  },
};

// ------ 消息管理 ---
export const message = {
  async sendall(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'message/mass/sendall?' + query, form: JSON.stringify(form) }, undefined));
  },
};

// ----- 菜单管理 ----
export const menu = {
  async create(access_token: string, form: any): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(post)({ url: baseUrl + 'menu/create?' + query, form: JSON.stringify(form) }, undefined));
  },
  async delete(access_token: string): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(get)({ url: baseUrl + 'menu/delete?' + query }, undefined));
  },
  async get(access_token: string): Promise<any> {
    const query = toQuerystring({ access_token });
    return (await promisify(get)({ url: baseUrl + 'menu/get?' + query }, undefined));
  },
};
