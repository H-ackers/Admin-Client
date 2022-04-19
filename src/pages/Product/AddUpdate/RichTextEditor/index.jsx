// 富文本编辑器
import React, { useState, useEffect, useImperativeHandle } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


export default function RichTextEditor(props){
  const {detail} = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // 用于暴露外部ref能访问的属性
  useImperativeHandle(props.onRef, ()=>{
    return {
      getDetail: getDetail,
    };
  });

  // 监听富文本编辑器内容的改变
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  // 给表单提交提供数据
  const getDetail = ()=>{
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  // 写入获取的原有数据
  const fillText = ()=>{
    if(detail){
      let descTag=detail;
      let context=htmlToDraft(descTag);
      if (context) {
        const contentState = ContentState.createFromBlockArray(context.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  };

  // 使用富文本编辑器上传图片时的回调函数
  const uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();       //  使用原生XML发送ajax请求
        xhr.open('POST', '/api1/manage/img/upload');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const {url} = response.data;
          resolve({data:{link:url}});       //  上传成功后获取图片地址，展示到小窗口
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  };

  // 修改分类时，页面初次渲染调用函数写入原有数据
  useEffect(()=>{
    fillText();
  },[]);

    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{
            border: '1px solid #000', 
            minHeight: 200, 
            padding: 11
          }}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            image: { 
              uploadCallback: uploadImageCallBack, 
              urlEnabled: true, 
              uploadEnabled: true, 
              previewImage: true, 
              inputAccept: 'image/*', 
              alt: { present: false, mandatory: false, previewImage: true } 
            },
          }}
        />
        {/* <textarea
          disabled
          style={{width: '100%'}}
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
}

