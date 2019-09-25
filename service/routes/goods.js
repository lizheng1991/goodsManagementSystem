const router = require('koa-router')()
const userService = require('../mysql/mysqlConfig');

router.prefix('/goods')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
// 获取货品列表
router.post('/list', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.getGoodList(rb)
    .then((data) => {
        console.log(data)
        ctx.body = {
            data: data
        }
    }).catch((err) => {
        ctx.body = {
            data: err
        }
    })
})
// 获取货品名称列表
router.get('/namelist', async (ctx, next) => {
  await userService.getGoodNameList()
    .then((data) => {
        ctx.body = {
            data: data
        }
    }).catch((err) => {
        ctx.body = {
            data: err
        }
    })
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
  await userService.addGood(rb)
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
// 修改货品
router.put('/update', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.updateGood(rb)
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

// 删除货品
router.delete('/delete/:id', async (ctx, next) => {
  await userService.deleteGood(ctx.params.id)
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
