const router = require('koa-router')()
const userService = require('../mysql/mysqlConfig');

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

// 登录
router.post('/login', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.login(rb)
    .then((data) => {
      if(!data.length) {
        ctx.body = {
          success: true,
          data: data,
          text: '登录失败！'
        }
      } else {
        ctx.body = {
          success: true,
          data: data
        }
      }
    }).catch((err) => {
        ctx.body = {
            data: err,
            text: '登录失败！'
        }
    })
})
// 获取人员列表
router.post('/list', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.getUserList(rb)
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

// 获取人员名称列表
router.get('/namelist', async (ctx, next) => {
  await userService.getUserNameList()
    .then((data) => {
        ctx.body = {
          success: true,
          data: data
        }
    }).catch((err) => {
        ctx.body = {
            data: err,
            text: '登录失败！'
        }
    })
})

// 获取人员详情
router.get('/detail/:id', async (ctx, next) => {
  await userService.getUserDetail(ctx.params.id)
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
// 添加人员
router.post('/add', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.addUser(rb)
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
// 修改人员
router.put('/update', async (ctx, next) => {
  const rb = ctx.request.body
  await userService.updateUser(rb)
    .then((data) => {
        ctx.body = {
            success: true,
            text: '修改成功！'
        }
    }).catch((err) => {
        ctx.body = {
            data:err,
            text: '修改失败！'
        }
    })
})

// 删除人员
router.delete('/delete/:id', async (ctx, next) => {
  await userService.deleteUser(ctx.params.id)
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
