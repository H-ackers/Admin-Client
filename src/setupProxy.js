const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    createProxyMiddleware('/api1',{//遇到 /api1 前缀的请求，就会触发该代理配置
      target:'http://localhost:5000',//请求转发给指定的地址
      changeOrigin:true,//控制服务器收到的请求头中 Host 字段的值
      pathRewrite:{'^/api1':''} //重写请求路径
    }),
    createProxyMiddleware('/api2',{
      target:'http://localhost:5001',
      changeOrigin:true,
      pathRewrite:{'^/api2':''}
    })
  )
}