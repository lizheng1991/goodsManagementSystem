const router = require('koa-router')()
const userService = require('../mysql/mysqlConfig');

router.prefix('/records')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
// 获取出入库记录列表
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

// 入库
router.post('/import', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.import(rb)
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
// 出库
router.post('/export', async (ctx, next) => {
    const rb = ctx.request.body
    await userService.export(rb)
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
  await userService.update(rb)
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
  await userService.delete(ctx.params.id)
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
