import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1567649835781_5637';

  // add your egg config in here
  config.middleware = ['xml2js', 'viewGlobalData'];

  // 配置
  config.wx = {
    appID: 'wxba62b0e3bb44e94c',
    appsecret: '0533d5b3e2a5b12b6a0ffc14e5b69089',
    token: 'sadfoukandsfjhoif23',
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };

  // redis
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 2,
    },
  };
  // schedule
  config.customLogger = {
    scheduleLogger: {
      // consoleLevel: 'NONE',
      // file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
    },
  };

  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };
  config.bodyParser = {
    enable: true,
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
