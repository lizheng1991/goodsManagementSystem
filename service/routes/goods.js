const router = require('koa-router')()
const userService = require('../mysql/mysqlConfig');

router.prefix('/goods')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
// 获取货品详情
router.get('/detail/:id', async (ctx, next) => {
  await userService.getGoodDetail(ctx.params.id)
    .then((data) => {
        console.log(data)
        ctx.body = {
            data: data
        }
    }).catch(() => {
        ctx.body = {
            data: 'err'
        }
    })
})
// 添加货品
router.post('/add', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.add(rb)
    .then((data) => {
        console.log(data)
        ctx.body = {
            data: data
        }
    }).catch((err) => {
      console.log(err)
        ctx.body = {
            data: 'err'
        }
    })
})

module.exports = router
