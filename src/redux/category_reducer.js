/*
  1.该文件用于创建一个为 Category 组件服务的 reducer, reducer 的本质就是一个函数
  2.reducer 函数会接收到两个参数，分别为之前的状态(preState)，和 动作对象(action)
*/ 

// 初始化状态
const initialState ={category: []};
export default function categoryReducer(state=initialState, action){
  // 从 action 对象中获取：type、data
  const {type, data} = action;
  // 根据 type 决定如何加工数据
  switch (type) {
    case 'save':  //  若动作类型为 保存
      state.category = data;
      // return Object.assign({}, state, {...state, category: [...state.category]});
      return {...state, category: [...state.category]};
    
    default:
      return state;
  }
}
