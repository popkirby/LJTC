import koa from 'koa';
import router from 'koa-router';
import serve from 'koa-static';
import appView from './appView';
import path from 'path';
import route from 'koa-router';

const app = koa();
export default app;

const appRouter = route();
appRouter.get(/\/.*/, appView);

app.use(router(app));
app.use(serve(path.join(__dirname, '../client')));
app.use(appRouter.routes());

const port = process.env.PORT || 5000;
app.listen(port, function() {
  if (process.send) {
    process.send('online');
  } else {
    console.log('server is running at http://localhost:' + port);
  }
});

