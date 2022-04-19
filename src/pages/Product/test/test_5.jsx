import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function PictureDemo(){
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);


  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );

  const onChange = ({ file, fileList: newFileList }) => {
    console.log(file);
    setFileList(newFileList);
  };

  const onPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisible(true);
  }

  return (
    <>
      <ImgCrop 
        modalTitle={'图片裁剪'}
        quality={1} 
        rotate
      >
        <Upload
          action="/api1/manage/img/upload" 
          accept='image/*' 
          listType="picture-card"  
          name='image' 
          fileList={fileList} 
          onChange={onChange} 
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
    </>
  );
};