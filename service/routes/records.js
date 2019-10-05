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
        ctx.body = {
            success: true,
            data: data
        }
    }).catch((err) => {
        ctx.body = {
            text: '查询失败！'
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
// 修改货品
router.put('/update', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.update(rb)
    .then((data) => {
        ctx.body = {
            success: true,
            text: '修改成功！'
        }
    }).catch((err) => {
        ctx.body = {
            text: '修改失败！'
        }
    })
})

// 删除货品
router.delete('/delete/:id', async (ctx, next) => {
  await userService.delete(ctx.params.id)
    .then((data) => {
        ctx.body = {
            success: true,
            text: '删除成功！'
        }
    }).catch((err) => {
        ctx.body = {
            text: '删除失败！'
        }
    })
})

module.exports = router
