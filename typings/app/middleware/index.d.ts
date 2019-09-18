// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportViewGlobalData from '../../../app/middleware/viewGlobalData';
import ExportXml2js from '../../../app/middleware/xml2js';

declare module 'egg' {
  interface IMiddleware {
    viewGlobalData: typeof ExportViewGlobalData;
    xml2js: typeof ExportXml2js;
  }
}
