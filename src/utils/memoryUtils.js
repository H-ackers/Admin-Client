/*
  用于在内存中保存一些数据的工具模块
*/ 

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  user: {},   //  保存当前登录的 user
  category: {},   //  保存当前选中的分类对象
  form: {},     //  保存商品分类列表的 Modal 的 form
  status: '',   //  保存添加分类的状态码
};