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
        ctx.body = {
            success: true,
            data: data
        }
    }).catch((err) => {
        ctx.body = {
            text: '查询失败！',
            data: err
        }
    })
})
// 获取货品名称列表
router.get('/namelist', async (ctx, next) => {
  await userService.getGoodNameList()
    .then((data) => {
        ctx.body = {
            success: true,
            data: data
        }
    }).catch((err) => {
        ctx.body = {
            text: '获取货品名称列表失败！'
        }
    })
})
// 获取货品详情
router.get('/detail/:id', async (ctx, next) => {
  await userService.getGoodDetail(ctx.params.id)
    .then((data) => {
        ctx.body = {
            success: true,
            data: data
        }
    }).catch(() => {
        ctx.body = {
            text: '获取货品详情失败！'
        }
    })
})
// 添加货品
router.post('/add', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.addGood(rb)
    .then((data) => {
        ctx.body = {
            success: true,
            text: '添加成功！'
        }
    }).catch((err) => {
        ctx.body = {
            text: '添加失败！'
        }
    })
})
// 修改货品
router.put('/update', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.updateGood(rb)
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
  await userService.deleteGood(ctx.params.id)
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
