import { getJsapi_ticket } from './api';

export declare interface Option {
  access_token: string;
  getJsapiTicket: () => Promise<ResJSON>;
  setJsapiTicket: (ticket: ResJSON) => Promise<void>;
}

export declare interface ResJSON {
  ticket: string;
  expires_in: number;
}

export declare interface WeChatInterface extends Option {
  is(ResJSON: ResJSON): boolean;
}

export default class JsapiTicket implements WeChatInterface {

  access_token: string;
  ticket: ResJSON;
  getJsapiTicket: () => Promise<ResJSON>;
  setJsapiTicket: (ticket: ResJSON) => Promise<void>;

  constructor(option: Option) {
    this.access_token = option.access_token;
    this.getJsapiTicket = option.getJsapiTicket;
    this.setJsapiTicket = option.setJsapiTicket;
    this.init();
  }

  private async init() {
    const ticket: ResJSON = await this.getJsapiTicket();
    this.ticket = ticket;
    if (!this.is()) {
      this.ticket = await this.updateJsapiTicket();
      console.log('ticket更新=> ', this.ticket);
      await this.setJsapiTicket(this.ticket);
    }
  }

  async updateJsapiTicket(): Promise<ResJSON> {
    const data: ResJSON = await getJsapi_ticket(this.access_token);
    data.expires_in = data.expires_in * 1000 + Date.now() - 20 * 1000;
    return data;
  }

  is(): boolean {
    const ticket = this.ticket;
    if (!ticket || !ticket.ticket || !ticket.expires_in) {
      return false;
    }
    const now = Date.now();
    // 五分钟缓冲时间 如果超过1个小时55分钟就算过期
    if (now - ticket.expires_in >= 0) {
      return false;
    }

    return true;
  }
}
