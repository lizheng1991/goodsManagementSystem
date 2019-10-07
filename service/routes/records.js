const router = require('koa-router')()
const userService = require('../mysql/mysqlConfig');

router.prefix('/records')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
// 获取出入库记录列表
router.post('/list', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.getRecordList(rb)
    .then((data) => {
        ctx.body = {
            success: true,
            data: data
        }
    }).catch((err) => {
        ctx.body = {
            data: err,
            text: '查询失败！'
        }
    })
})
// 获取货品详情
router.get('/detail/:id', async (ctx, next) => {
    await userService.getRecordDetail(ctx.params.id)
      .then((data) => {
          ctx.body = {
              success: true,
              data: data
          }
      }).catch(() => {
          ctx.body = {
              text: '获取记录详情失败！'
          }
      })
})

// 出入库
router.post('/import', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.import(rb)
    .then((data) => {
        ctx.body = {
            success: true,
            text: '提交成功！'
        }
    }).catch((err) => {
        ctx.body = {
            text: '提交失败！'
        }
    })
})

module.exports = router
