const Koa = require('koa')
const app = new Koa()
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors')
const static = require('koa-static')
const koaBody = require('koa-body')
const multer = require('@koa/multer')

const listObj = {
  imgUrlList: []
}

const storage = multer.diskStorage({
  destination (req, file, cb) {
    // 存放路径
    cb(null, './static/img')
  },
  filename(req, file, cb) {
    const fileFormat = file.originalname.split(".")
    cb(null, Date.now().toString().substring(5) + "." + fileFormat[fileFormat.length - 1])
  },
})

const upload = multer({ storage })

app.use(static(path.join(__dirname, 'static')))

// 单文件上传
router.post('/upload', upload.single('file'), async (ctx) => {
  const { filename ,mimetype } = ctx.file
  // console.log('ctx.request.body', ctx.file.filename)
  // console.log('ctx.request.body', ctx.file)
  ctx.body = { 
    url: `http://localhost:3000/img/${filename}` ,
    type: mimetype
  }
})

// 多文件上传
router.post('/upload-multiple-files', upload.fields([
    { name: 'avatar', maxCount: 3 }, { name: 'boop', maxCount: 2 }
  ]), async ctx => {
    // console.log('ctx.request.files', ctx.request.files)
    ctx.body = { url: listObj.imgUrlList }
  }
)



app.use(cors()).use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("server is running on http://127.0.0.1:3000")
})
