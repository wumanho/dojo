import { Context } from 'koa'

const user = () => {
  return {
    helloWorld(ctx: Context): void {
      ctx.body = 'hello World'
    },
  }
}

export default user()
