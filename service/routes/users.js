const router = require('koa-router')()
const userService = require('../mysql/mysqlConfig');

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
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
            text: '获取人员列表失败！'
        }
    })
})

module.exports = router
