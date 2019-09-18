import { Context } from 'egg';
import { Parser } from 'xml2js';
import { promisify } from 'util';

const xmlParser = new Parser({ explicitArray: false, ignoreAttrs: true });
const xmlparseString = promisify(xmlParser.parseString);

// 这里是你自定义的中间件
export default function (): any {
  return async (ctx: Context, next: () => Promise<any>) => {

    if (ctx.request.type.trim() === 'text/xml') {
      const xmlData = await xmlparseString(ctx.request.body);
      ctx.request.body = {
        data: xmlData,
        xml: ctx.request.body,
      };
    }
    await next();
  };
}
