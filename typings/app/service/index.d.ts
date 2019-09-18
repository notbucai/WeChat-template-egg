// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/service/Account';
import ExportMedia from '../../../app/service/Media';
import ExportMenu from '../../../app/service/Menu';
import ExportMessage from '../../../app/service/Message';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';
import ExportWeChatEvent from '../../../app/service/WeChatEvent';
import ExportWeChatMsg from '../../../app/service/WeChatMsg';

declare module 'egg' {
  interface IService {
    account: ExportAccount;
    media: ExportMedia;
    menu: ExportMenu;
    message: ExportMessage;
    test: ExportTest;
    user: ExportUser;
    weChatEvent: ExportWeChatEvent;
    weChatMsg: ExportWeChatMsg;
  }
}
