import KoaRouter from 'koa-router'
import userController from '../controller/userController'

const router = new KoaRouter({ prefix: '/api' })
router.get('/', userController.helloWorld)

export default router
