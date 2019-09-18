import { getAccess_token } from './api';

export declare interface Option {
  appID: string;
  appsecret: string;
  getAccessToken: () => Promise<TokenJSON>;
  setAccessToken: (token: TokenJSON) => Promise<void>;
}

export declare interface TokenJSON {
  access_token: string;
  expires_in: number;
}

export declare interface WeChatInterface extends Option {
  isAccessToken(tokenJSON: TokenJSON): boolean;
}

export default class AccessToken implements WeChatInterface {

  appID: string;
  appsecret: string;
  token: TokenJSON;
  getAccessToken: () => Promise<TokenJSON>;
  setAccessToken: (token: TokenJSON) => Promise<void>;

  constructor(option: Option) {
    this.appID = option.appID;
    this.appsecret = option.appsecret;
    this.getAccessToken = option.getAccessToken;
    this.setAccessToken = option.setAccessToken;
    this.init();
  }

  private async init() {
    const token: TokenJSON = await this.getAccessToken();
    this.token = token;
    if (!this.isAccessToken()) {
      this.token = await this.updateAccessToken();
      console.log('token更新=> ', this.token);
      await this.setAccessToken(this.token);
    }
  }

  async updateAccessToken(): Promise<TokenJSON> {
    const data: TokenJSON = await getAccess_token(this.appID, this.appsecret);
    data.expires_in = data.expires_in * 1000 + Date.now() - 20 * 1000;
    return data;
  }

  isAccessToken(): boolean {
    const token = this.token;
    if (!token || !token.access_token || !token.expires_in) {
      return false;
    }
    const now = Date.now();
    // 五分钟缓冲时间 如果超过1个小时55分钟就算过期
    if (now - token.expires_in >= 0) {
      return false;
    }

    return true;
  }
}
