import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


export default class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      editorState,
    });
  };

  getDetail = (editorState)=>{
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  fillText = ()=>{
    let descrip=('<a>返回的字段</a>');
    let str=htmlToDraft(descrip);
    if (str) {
      const contentState = ContentState.createFromBlockArray(str.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({       editorState: editorState     });
    }
  };
  componentDidMount(){
    this.fillText();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{
            border: '1px solid #000', 
            height: 200, 
            padding: 11
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
          style={{width: '100%'}}
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}