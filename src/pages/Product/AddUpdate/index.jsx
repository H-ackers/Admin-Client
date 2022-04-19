import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Spin, Space, Form, Input, InputNumber, Cascader, Upload, Modal, Button,message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { ArrowLeftOutlined, SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { reqGetCategories, reqRemoveProductImg, reqAddOrUpdateProduct } from '../../../api';
import RichTextEditor from './RichTextEditor';


const {Item} = Form;
const {TextArea} = Input;
const antIcon = <SyncOutlined style={{ fontSize: 24 }} spin />;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// 商品管理的子路由组件——添加/修改商品
export default function AddUpdate() {

  let RichRef = React.useRef();
  const navigate = useNavigate();
  // 取出路由传递的参数
  const {state:{details, text}} = useLocation();
  // 初始化 loading 状态为 false
  const [loading, setLoading] = useState(false);
  // 初始化分类列表的 parentId
  const [parentId, setParentId] = useState('0');
  // 定义一级下拉品类菜单的初始值
  const [options, setOptions] = useState([]);
  // 定义初始化 Form 显示内容的函数调用的开关
  const [num, setNum] = useState(1);
  // 定义修改分类时 Form 的初始展示值
  const [initValues, setInitValues] = useState({});
  // 判断是否为修改分类
  const [isUpdate, setUpdate] = useState(false);
  // 保存修改分类时的商品 _id
  const [productId, setProductId] = useState('');
  // 定义商品图片的初始列表
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  // 定义商品描述的初始显示
  const [detail, setDetail] = useState('');

  
  // 表单提交时验证并处理数据
  const onFinish = async (values) => {

    const _id = productId;                          //  收集产品 _id 

    const {name, desc, price, category} = values;   //  收集 form 信息
    let pCategoryId, categoryId;                    //  收集所属分类 _id
    if(category.length >= 2){
      pCategoryId = category[0];
      categoryId = category[1];
    }else{
      categoryId = category[0];
      pCategoryId = '0';
    }

    let imgs;                                       //  收集图片信息
    if(fileList.length > 0){                        //  获取图片名称数组
      imgs = fileList.map(i=>{                      //  通过遍历 fileList 生成新数组，赋值给 imgArr
        if(!i.response){
          return i.name
        }else{
          return i.response.data.name
        }
      })
    }

    const detail = RichRef.current.getDetail()      //  获取富文本编辑器内容信息

    // 生成 product 对象，用于接口发送请求
    const product = { name, desc, price, pCategoryId, categoryId, imgs, detail};
    if(isUpdate){       //  如果是修改商品，为 product 对象添加属性 _id ，该属性是待修改产品的 _id
      product._id = _id;
    }

    // 调用接口发送请求 添加/修改商品信息
    const res = await reqAddOrUpdateProduct(product);
    const {status} = res.data;
    if(status === 0){
      navigate('/admin/product/product_home?title=商品管理', {replace: true});
      message.success(productId === '' ? '添加商品成功!' : '修改商品成功!');
    }else{
      console.warn('操作失败!');
    }
  };

  // 定义回退(到历史记录)的回调函数
  const forward = ()=>{
    navigate('/admin/product/product_home?title=商品管理', {push: true});
  };

  // 定义 Card 左侧标题内容
  const title = (
    <Space size='middle'>
      <a href='#!' onClick={forward}><ArrowLeftOutlined /></a>
      <span>{text}</span>
    </Space>
  )

  //  定义写入 Form 初始值的回调函数
  const saveInitVal = ()=>{   
    if(num === 1){            //  控制函数调用的次数和时机
      setNum(2);              //  修改开关
      if(details){            //  判断 details 是否为 undefined
        setLoading(true);     //  当修改分类时设置 loading 为 true
        setUpdate(true);      //  设置修改分类状态为 true
        const {_id, pCategoryId, categoryId, name, price, desc, imgs, detail} = details;
        setProductId(_id);                //  保存要修改分类的 _id
        let categoryArr;                  //  定义修改分类时 商品分类 的初始值[]
        if(pCategoryId === '0'){          //  判断要修改的分类是否为一级分类
          categoryArr = [categoryId];     //  如果是一级分类，则商品分类的初始值为 该一级分类名称
        }else{                            //  如果不是一级分类，则商品分类的初始值为 该子分类的父分类名称 / 该子分类名称
          categoryArr = [pCategoryId, categoryId];
        }
        if(imgs && imgs.length > 0){      //  判断是否有图片信息//  如果有则遍历图片名称数组
          const imgList = imgs.map((i, index) => (             
            {
              uid:('' + (-index)),
              name:i,
              status: 'done',
              url: `http://localhost:5000/upload/${i}`,
            }
          ))
          setFileList(imgList);   //  生成商品图片的初始列表
        }
        
        setDetail(detail);    //  保存当前要修改商品描述的内容
        setInitValues({       //  写入 Form 初始值
          name: name,
          desc: desc,
          price: price,
          category: categoryArr
        });
      }
    }
    
  };
  saveInitVal();              //  调用写入 Form 初始值的函数


  // 动态生成 options
  const initOptions = async (data)=>{   //  接收一个请求的一级品类列表数组
    const option = data.map(i=>({       //  遍历接收的数组生成一个新数组 option
      value: i._id,                     //  把每个品类对象的 _id 设置为 option 的 value
      label: i.name,                    //  把每个品类对象的 name 设置为 option 的 label
      isLeaf: false,
    }))

    if(isUpdate){                       //  修改分类状态为 true 时，按需请求二级分类列表
      const {pCategoryId} = details;
      if(pCategoryId !== '0'){          //  判断当前要修改的分类是否为二级分类，如果是 则请求二级分类列表
        const subList = await getCategory(pCategoryId)
        const childOption = subList.data.data.map(i=>({   //  根据请求结果生成二级 option 数组
          value: i._id,
          label: i.name,
        }))
        const targetOption = option.find(option => option.value === pCategoryId)  //  查找一级 option 中与当前要修改分类的 pCategory 相等的 value 的 option 项
        if(targetOption !== undefined){     //  如果查找到，则把生成的二级 option 数组 作为 该查找到的 option 项的 children(子 option数组)
          targetOption.children = childOption
        }
      }
    }
    // 更新一级下拉品类菜单(把生成的新数组 option 存入 options)
    setOptions(option)
    setLoading(false)                       //  更新完成 options 之后 设置 loading 状态为 false
  }

  
  // 获取商品分类列表
  const getCategory = async (parentId)=>{
    const res = await reqGetCategories(parentId);
    const {data} = res.data;
    if(parentId === '0'){   //  如果请求的是一级品类列表
      initOptions(data)     //  把请求的一级品类列表传入函数 initOptions
    }else{
      return res
    }
  }
  

  // 定义异步获取下级菜单的方法
  const loadData = async selectedOptions => {
    // 获取当前选中的品类对象
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const {value} = targetOption;               // 获取当前选中品类的 _id
    const subList = await getCategory(value);   // 根据 _id 请求当前品类的二级列表
    if(subList !==undefined){             // 判断请求的结果是否是 undefined
      if(subList.data.data.length > 0){   // 判断请求的二级品类列表是否为空
        const {data} = subList.data
        targetOption.loading = false;     //  设置当前一级品类的加载状态为 false
        const subOption = data.map(i=>({  //  生成当前品类的二级品类 option 数组
          value: i._id,
          label: i.name,
        }))
        targetOption.children = subOption //  把生成的二级品类数组设置为当前一级品类的下级品类列表
      }else{                              //  如果请求的二级品类列表为空
        targetOption.isLeaf = true;       //  设置当前一级品类的下拉状态为无
        targetOption.loading = false;     //  设置当前一级品类的加载状态为 false
      }
    }else{                                //  如果请求的结果为 undefined 设置当前一级品类的加载状态为 false
      targetOption.loading = false;
    }
    setOptions([...options]);
  };

  // 监听上传图片的回调
  const changeImg = async ({ file, fileList: newFileList }) => {
    if(file.status === 'done'){
      const res = file.response;
      if(res.status === 0){                         //  判断图片上传成功时提示用户上传成功
        message.success('图片上传成功!');
      }else{
        message.error('操作失败!');
      }
    }else if(file.status === 'removed'){            //  点击删除图片
      const {name} = file.response.data;
      const res = await reqRemoveProductImg(name)   //  发送删除图片的请求
      if(res.data.status === 0){                    //  删除成功，提示用户操作成功
        message.success('操作成功!'); 
      }else{
        message.error('操作失败!');
      }
    }
    setFileList(newFileList);
  };
  // 定义关闭 Modal 的回调
  const handleCancel = () => setPreviewVisible(false);

  // 定义图片上传按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );

  // 查看图片大图时的回调
  const onPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // 设置 Modal 的展示状态和显示内容
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisible(true);
  }


  // 页面初次渲染后调用 getCategory 方法，获取一级品类列表
  useEffect(()=>{
    getCategory(parentId)
  },[])

  return (
    <Card title={title}>
      <Spin indicator={antIcon} spinning={loading} style={{background: '#ffffff96',maxHeight: '-webkit-fill-available'}}>
        <Form
          name="basic"
          wrapperCol={{
            span: 10,
          }}
          initialValues={initValues}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入商品名称!',
              },
            ]}
          >
            <Input placeholder='请输入商品名称' />
          </Item>
          <Item
            label="商品描述"
            name="desc"
            rules={[
              {
                required: true,
                message: '请输入商品描述!',
              },
            ]}
          >
            <TextArea placeholder="请输入商品描述" allowClear />
          </Item>
          <Item
            label="商品价格"
            name="price"
            rules={[
              {
                required: true,
                message: '请输入商品价格!',
              },
            ]}
          >
            <InputNumber addonAfter="元" placeholder="请输入商品价格" min={1} style={{ width: '100%' }}/>
          </Item>
          <Item
            label="商品分类"
            name="category"
            rules={[
              {
                required: true,
                message: '请输入商品分类!',
              },
            ]}
          >
            <Cascader options={options} loadData={loadData} placeholder="请选择" style={{ width: '100%' }}/>
          </Item>
          <Item
            label="商品图片"
            name="imgs"
            style={{paddingLeft: 12}}
            wrapperCol
          >
            <ImgCrop
              modalTitle={'图片裁剪'}                //  指定裁剪框的标题
              quality={1}                           //  指定裁剪图片的品质
              rotate                                //  指定裁剪时可旋转
            >
              <Upload
                action="/api1/manage/img/upload"    //  指定上传到的地址
                accept='image/*'                    //  指定上传的文件类型
                listType="picture-card"             //  指定文件的显示样式
                name='image'                        //  指定发送给后台的请求参数名
                fileList={fileList}
                onChange={changeImg}
                onPreview={onPreview}
              >
                {fileList.length >= 10 ? null : uploadButton}
              </Upload>
            </ImgCrop>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Item>
          <Item
            label=" 商品详情"
            name="detail"
            style={{paddingLeft: 12}}
            wrapperCol
          >
            <RichTextEditor detail={detail} onRef={RichRef}/>
          </Item>
          <Item style={{paddingLeft: 12}}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Spin>
    </Card>
  )
}
