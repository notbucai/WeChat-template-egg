import { Service } from 'egg';

/**
 * 消息发送
 */
export default class WeChat extends Service {

  public async sendText({ FromUserName, ToUserName, Content }) {
    return `<xml>
    <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
    <CreateTime>${Date.now()}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${Content}]]></Content>
    </xml>`;
  }

  public async sendImage({ FromUserName, ToUserName, MediaId }) {
    return `<xml>
    <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
    <CreateTime>${Date.now()}</CreateTime>
    <MsgType><![CDATA[image]]></MsgType>
    <Image>
    <MediaId><![CDATA[${MediaId}]]></MediaId>
    </Image>
    </xml>`;
  }

  public async sendVoice({ FromUserName, ToUserName, MediaId }) {
    return `<xml>
      <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[voice]]></MsgType>
      <Voice>
        <MediaId><![CDATA[${MediaId}]]></MediaId>
      </Voice>
    </xml>`;
  }

  public async sendNews({ FromUserName, ToUserName }) {
    return `<xml>
    <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
    <CreateTime>${Date.now()}</CreateTime>
    <MsgType><![CDATA[news]]></MsgType>
    <ArticleCount>2</ArticleCount>
    <Articles>
      <item>
        <Title><![CDATA[标题]]></Title>
        <Description><![CDATA[简介]]></Description>
        <PicUrl><![CDATA[http://img4.cache.netease.com/photo/0001/2010-04-17/64EFS71V05RQ0001.jpg]]></PicUrl>
        <Url><![CDATA[http://blog.ncgame.cc]]></Url>
      </item>
      <item>
        <Title><![CDATA[标题1]]></Title>
        <Description><![CDATA[简介2]]></Description>
        <PicUrl><![CDATA[http://img4.cache.netease.com/photo/0001/2010-04-17/64EFS71V05RQ0001.jpg]]></PicUrl>
        <Url><![CDATA[http://blog.ncgame.cc]]></Url>
      </item>
    </Articles>
  </xml>`;
  }

  public async sendVideo({ FromUserName, ToUserName, MediaId, title, content }) {
    return `<xml>
      <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
      <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[video]]></MsgType>
      <Video>
        <MediaId><![CDATA[${MediaId}]]></MediaId>
        <Title><![CDATA[${title}]]></Title>
        <Description><![CDATA[${content}]]></Description>
      </Video>
    </xml>`;
  }

  public async location({ FromUserName, ToUserName, Location_X, Location_Y, Scale, Label }) {
    return this.service.weChatMsg.sendText({ FromUserName, ToUserName, Content: `纬度：${Location_X} 精度：${Location_Y} , 缩放大小：${Scale} , 位置信息：${Label}` });
  }

}
