##  一、高阶函数
      1.高阶函数是一类特别的函数
        - 接收函数类型的参数
        - 返回值是函数
      2.常见的高阶函数
        - 定(计)时器：setTimeout() 、setInterval()
        - Promise: Promise( () => {} ) 、Promise.then( value => {}, reason => {} )
        - 数组遍历相关的方法：forEach() / filter() / map() / reduce() / find() / findIndex()
        - 函数对象的 bind() 方法
      3.高阶函数更加动态，更具有扩展性

##  二、高阶组件
      1.本质就是一个函数
      2.特点：接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向北包装组件传入特定属性
      3.作用：扩展组件的功能
      4.高阶组件也是高阶函数：接收一个组件函数，返回的是一个新的组件函数

##  三、常用的字符串截取方法
      1.取字符串的前i个字符
        str=str.substring(0,i);

      2.去掉字符串的前i个字符
        str=str.substring(i); 

      3.从右边开始取i个字符
        str=str.substring(str.length()-i); 
        str=str.substring(str.length()-i,str.length()); 

      4.从右边开始去掉i个字符
        str=str.substring(0,str.Length-i);

      5.从开始截取到中间某个指定字符  midChar (该字符出现的第一次)
        str=str.substring(0,str.indexOf(midChar));
        
      6.从开始截取到指定某段字符串结尾  midStr
        str=str.substring(0,str.indexOf(midStr)+midStr.length());
        
      7.如果字符串中有"abc"则替换成"ABC"
        str=str.replace("abc","ABC");

##  四、函数式组件父组件调用子组件的方法
      优点：
          1、写法简单易懂
          2、假如子组件嵌套了HOC，也可以指向真实子组件
      缺点：
          1、需要自定义props属性
          2、需要自定义暴露的方法
```js
      // 父组件
      import React from 'react';
      import Child from './Child';

      const Parent = () => {
        let ChildRef = React.useRef();

        // 调用子组件的方法的回调
        function handleOnClick() {
          ChildRef.current.getDetail();
        }

        return (
          <div>
            <button onClick={handleOnClick}>点击调用子组件的方法</button>
            <Child onRef={ChildRef} />
          </div>
        )
      }

      export default Parent;


      // 子组件
      import React, { useState, useEffect, useImperativeHandle } from 'react';

      export default function Child(props){

        // 用于暴露外部 ref 能访问的属性
        useImperativeHandle(props.onRef, ()=>{
          return {
            getDetail: getDetail,
          };
        });

        // 给父组件调用子组件的方法提供数据
        const getDetail = ()=>{
          console.log('我是子组件的方法，被父组件执行了');
        };

        return (
          <div>子组件</div>
        );
      }
```

##  五、判断一个对象是否为空对象

```js
      方法一：将对象转换成字符串，再判断是否等于“{}”
      let obj = {};
      console.log(JSON.stringify(obj)==="{}");  //  返回 true，为空对象

      方法二：for in循环
      let res = function(obj){
        for(let key in obj){
          return false;   //  若不为空，可遍历，返回 false
        }
        return true;
      }
      console.log(res(obj));  //  返回 true，则为空对象
      
      方法三：Object.keys()方法，返回对象的属性名组成的一个数组，若长度为0，则为空对象（ES6的写法）
      console.log(Object.keys(obj).length===0);   //  返回 true，则为空对象

      方法四：Object.getOwnPropertyNames方法获取对象的属性名，存到数组中，若长度为0，则为空对象
      console.log(Object.getOwnPropertyNames(obj).length==0);   //  返回 true，则为空对象

      方法五：jQuery中的isEmptyObject()方法，其原理是利用for in的方式来判断（注意：使用这种方式记得引用jquery）
      console.log($.isEmptyObject(obj));    //  返回 true， 则为空对象
```

##  六、