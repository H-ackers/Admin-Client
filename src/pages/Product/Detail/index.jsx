import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Space, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './index.less';
import { reqFindCategory } from '../../../api';

const{Item} = List;


// 商品管理的子路由组件——查看商品详情
export default function Detail() {
  const navigate = useNavigate();
  const [cName1, setCname1] = useState('');
  const [cName2, setCname2] = useState('');
  const {state:{details}} = useLocation();
  
  const {pCategoryId, categoryId} = details;
  const findCategory = async ()=>{
    if(pCategoryId === '0'){      //  如果是一级分类，获取并设置一级分类名称
      const res = await reqFindCategory(categoryId);
      setCname1(res.data.data.name);
    }else{                        //  如果是二级分类，获取并设置当前分类名称和所属父分类名称
      let res1 = await reqFindCategory(pCategoryId);
      let res2 = await reqFindCategory(categoryId);
      setCname1(res1.data.data.name);
      setCname2(res2.data.data.name);
    }
  };
  findCategory();
  

  // 定义回退(历史记录)的回调函数
  const forward = ()=>{
      navigate('/admin/product/product_home?title=商品管理', {push: true});
    };

  // 定义 Card 左侧标题
  const title = (
    <Space size='middle'>
      <a href='#!' onClick={forward}><ArrowLeftOutlined /></a>
      <span>商品详情</span>
    </Space>
  )
  
  
  return (
    <div>
      <Card
        title={title}
      >
        <List
          orientation="left"
          bordered
          dataSource={[details]}
          renderItem={item => {
            let {name, desc, pCategoryId, imgs, price, detail} = item
            return (
            <Item className='product-detail'>
                <span className='product-detail-item'>
                  <span className='product-detail-title'>商品名称:</span>
                  <span className='product-detail-description'>{name}</span>
                </span>
                <span className='product-detail-item'>
                  <span className='product-detail-title'>商品描述:</span>
                  <span className='product-detail-description'>{desc}</span>
                </span>
                <span className='product-detail-item'>
                  <span className='product-detail-title'>商品价格:</span>
                  <span className='product-detail-description'>{price}元</span>
                </span>
                <span className='product-detail-item'>
                  <span className='product-detail-title'>商品分类:</span>
                  <span className='product-detail-description'>
                    {
                      pCategoryId === '0' ? <span>{cName1}</span> : <span>{cName1}  {'--->' + cName2}</span>
                    }
                  </span>
                </span>
                <span className='product-detail-item'>
                  <span className='product-detail-title'>商品图片:</span>
                  <span className='product-detail-description'>
                    {
                      imgs.map(i=>(
                        <img key={i} src={`http://localhost:5000/upload/${i}`} alt="img" />
                      ))
                    }
                  </span>
                </span>
                <span className='product-detail-item'>
                  <span className='product-detail-title detail-title'>商品详情:</span>
                  <span className='product-detail-description' dangerouslySetInnerHTML={{__html:detail}}></span>
                </span>
            </Item>
          )}}
        />
      </Card>
    </div>
  )
}
