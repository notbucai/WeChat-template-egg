import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/', controller.home.verify);
  router.post('/', controller.home.accept);
  router.get('/test', controller.test.home);
};
