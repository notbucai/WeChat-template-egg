import { Controller } from 'egg';
import { join } from 'path';

export default class HomeController extends Controller {

  public async verify() {
    const ctx = this.ctx;
    const { timestamp, nonce, signature, echostr } = ctx.query;
    const { token } = ctx.app.config.wx;

    // token、timestamp、nonce 进行字典排序 再使用 sha1 进行加密比对signature 确定是否属于微信
    const sha1AfterStr = this.app.sha1([token, timestamp, nonce].sort().join(''));
    if (sha1AfterStr === signature) {
      ctx.body = echostr.toString();
    } else {
      ctx.body = 'Args Error';
    }
  }

  public async accept() {
    const { xml, data } = this.ctx.request.body;
    console.log(xml, data);
    const {
      ToUserName,
      FromUserName,
      MsgType,
      MsgId,
      Content,
      MediaId,
      Event,
      EventKey,
      Ticket,
      Latitude,
      Precision,
      Longitude,
      Location_X,
      Location_Y,
      Scale,
      Label,
    } = data.xml;
    console.log(MsgType, MsgId, MediaId, Content);

    // 回复 变成来缘，来源变成回复

    switch (MsgType) {
      case 'text':
        this.ctx.body = await this.service.weChatMsg.sendText({ ToUserName, FromUserName, Content });
        // this.ctx.body = await this.service.weChatMsg.sendNews({ ToUserName, FromUserName });

        if (Content === '1') {
          // console.log(await this.service.media.addMedia({ type: 'voice', mediaPath: join(__dirname, './1.mp3') }));
          console.log(await this.service.media.addMaterial({ type: 'image', mediaPath: join(__dirname, './1.jpg') }));
          // console.log('==>', await this.service.media.addMaterial({ type: 'image', mediaPath: 'https://i0.hdslb.com/bfs/archive/776fd90403e6b6fc22ef62cd5346dd38a828b59f.jpg@880w_440h.jpg' }));
          // console.log('88 ==>', await this.service.media.addMaterial({ type: 'video', mediaPath: join(__dirname, './2.mp4') }, {
          //   title: '1.mp4',
          //   introduction: 'xxads',
          // }));
        } else if (Content === '2') {
          console.log('2 =>  ', await this.service.media.uploadImg({ mediaPath: 'http://static.nodejs.cn/_static/img/ad/api_nav_qcloud.jpg' }));
        } else if (Content === '3') {
          console.log('3 =>  ', await this.service.media.addNewsMaterial({ title: '图文标题', content: '<h1>标题</h1><p>内容</p>', content_source_url: 'http://blog.ncgame.cc', show_cover_pic: 1, thumb_media_id: 'fF0uNp_pqRd9ORp6Hy_kAwwNRmjA8HRXiYCWqmzwPJA' }));
        } else if (Content === '4') {
          console.log('4 =>  ', await this.service.media.getMedia('Vp6p_kfolNdRwp4ZAQYKIh3Gm2ICOF_cJGnJBWW5za-VCCInoOC4-HjDJUJga_o7'));
        } else if (Content === '5') {
          console.log('5 =>  ', await this.service.media.getMaterial('fF0uNp_pqRd9ORp6Hy_kA3EWEOlt80EiKka2O-dvyno'));
        } else if (Content === '6') {
          console.log('6 =>  ', await this.service.media.delMaterial('fF0uNp_pqRd9ORp6Hy_kAzRCNz4ydxZI3yjfMWORf40'));
        } else if (Content === '7') {
          console.log('7 =>  ', await this.service.media.getMaterialcount());
        } else if (Content === '8') {
          console.log('8 =>  ', await this.service.media.getBatchgetMaterial({}));
        } else if (Content === '10') {
          console.log('10 =>  ', await this.service.user.createTag({ name: '标签' }));
        } else if (Content === '11') {
          console.log('11 =>  ', await this.service.user.getTags());
        } else if (Content === '12') {
          console.log('12 =>  ', await this.service.user.updateTag({ id: 100, name: '不才' }));
        } else if (Content === '13') {
          console.log('13 =>  ', await this.service.user.delTag({ id: 100 }));
        } else if (Content === '14') {
          console.log('14 =>  ', await this.service.user.getUserByTagId({ tagid: 2 }));
        } else if (Content === '15') {
          console.log('15 =>  ', await this.service.user.userInfo({ openid: FromUserName }));
        } else if (Content === '16') {
          console.log('16 =>  ', await this.service.user.userInfoBatchget({ openids: [FromUserName] }));
        } else if (Content === '17') {
          console.log('17 =>  ', await this.service.user.getUserList({}));
        } else if (Content === '18') {
          console.log('18 =>  ', await this.service.account.create({ type: 1, scene_id: 12 }));
        } else if (Content === '19') {
          console.log('19 =>  ', await this.service.account.create({ type: 2, scene_str: 'BUCAI', expire_seconds: 7200, }));
        } else if (Content === '20') {
          console.log('20 =>  ', await this.service.account.create({ type: 4, scene_str: 'BUCAI__12', }));
        } else if (Content === '21') {
          console.log('21 =>  ', await this.service.account.create({ type: 3, scene_id: 33, }));
        } else if (Content === '22') {
          console.log('22 =>  ', await this.service.account.showqrcode({ ticket: 'gQG87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyQkZITFJTSFBibi0xcUZRWXh0MTIAAgRttHxdAwQ8AAAA' }));
        } else if (Content === '23') {
          console.log('23 =>  ', await this.service.account.shorturl({ long_url: await this.service.account.showqrcode({ ticket: 'gQG87zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyQkZITFJTSFBibi0xcUZRWXh0MTIAAgRttHxdAwQ8AAAA' }) }));
        } else if (Content === '24') {
          console.log('24 =>  ', await this.service.message.sendNew({ media_id: 'fF0uNp_pqRd9ORp6Hy_kA08tC5ao-GncgLxeQ0KwurI' }));
        } else if (Content === '25') {
          console.log('25 =>  ', await this.service.menu.create({
            data: {
              "button": [
                {
                  "name": "扫码",
                  "sub_button": [
                    {
                      "type": "scancode_waitmsg",
                      "name": "扫码带提示",
                      "key": "rselfmenu_0_0",
                      "sub_button": []
                    },
                    {
                      "type": "scancode_push",
                      "name": "扫码推事件",
                      "key": "rselfmenu_0_1",
                      "sub_button": []
                    }
                  ]
                },
                {
                  "name": "发图",
                  "sub_button": [
                    {
                      "type": "pic_sysphoto",
                      "name": "系统拍照发图",
                      "key": "rselfmenu_1_0",
                      "sub_button": []
                    },
                    {
                      "type": "pic_photo_or_album",
                      "name": "拍照或者相册发图",
                      "key": "rselfmenu_1_1",
                      "sub_button": []
                    },
                    {
                      "type": "pic_weixin",
                      "name": "微信相册发图",
                      "key": "rselfmenu_1_2",
                      "sub_button": []
                    }
                  ]
                },
                {
                  "name": "菜单",
                  "sub_button": [
                    {
                      "name": "发送位置",
                      "type": "location_select",
                      "key": "rselfmenu_2_0"
                    },
                    {
                      "type": "view",
                      "name": "搜索",
                      "url": "http://www.soso.com/"
                    },
                    {
                      "type": "miniprogram",
                      "name": "wxa",
                      "url": "http://mp.weixin.qq.com",
                      "appid": "wx286b93c14bbf93aa",
                      "pagepath": "pages/lunar/index"
                    },
                    {
                      "type": "click",
                      "name": "赞一下我们",
                      "key": "V1001_GOOD"
                    }]
                }]
            },
          }));
        }
        break;
      case 'image':
        this.ctx.body = await this.service.weChatMsg.sendImage({ ToUserName, FromUserName, MediaId });
        break;
      case 'voice':
        this.ctx.body = await this.service.weChatMsg.sendVoice({ ToUserName, FromUserName, MediaId });
        break;
      case 'location':
        this.ctx.body = await this.service.weChatMsg.location({ ToUserName, FromUserName, Location_X, Location_Y, Scale, Label });
        break;
      case 'video':
        this.ctx.body = await this.service.weChatMsg.sendVideo({ ToUserName, FromUserName, title: '标题', content: '内容简介', MediaId });
        break;
      case 'event':

        switch (Event.toLowerCase()) {
          case 'subscribe':
            this.ctx.body = await this.service.weChatEvent.subscribe({ ToUserName, FromUserName, EventKey, Ticket });
            break;
          case 'unsubscribe':
            await this.service.weChatEvent.unsubscribe({ ToUserName, FromUserName, EventKey });
            this.ctx.body = 'success';
            break;
          case 'location':
            this.ctx.body = await this.service.weChatEvent.LOCATION({ ToUserName, FromUserName, Latitude, Precision, Longitude });
            break;
          default:
            this.ctx.body = 'success';
            break;
        }
        break;
      default:
        this.ctx.body = 'success';
        console.log('body => default');
        break;
    }
    // console.log('body=>: ', this.ctx.body);

  }
}
