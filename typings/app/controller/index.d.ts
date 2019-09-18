// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/controller/Test';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    test: ExportTest;
    home: ExportHome;
  }
}
