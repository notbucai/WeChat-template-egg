import { Controller } from 'egg';

export default class Test extends Controller {

  public async home() {
    await this.ctx.render('test.ejs', {
      title: '标题',
    });
  }

}
