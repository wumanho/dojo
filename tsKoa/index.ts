import Koa from 'koa'
import router from './router'
import { Server } from 'http'

const app = new Koa()
app.use(router.routes())
const run = (port: number): Server => {
  return app.listen(port)
}
run(8848)

export default run
