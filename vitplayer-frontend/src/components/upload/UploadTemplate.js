import React, { Component } from 'react';
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';
import './UploadTemplate.scss';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
const XHRUpload = require('@uppy/xhr-upload');

class UploadTemplate extends Component {
  constructor() {
    super();
    this.uppy = Uppy({ autoProceed: true }).use(XHRUpload, {
      endpoint: '/api/video/upload',
      fieldName: 'video'
    });

    this.uppy.on('complete', result => {
      console.log('successful files:', result.successful);
      console.log('failed files:', result.failed);
    });
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    return (
      <div>
        <DragDrop uppy={this.uppy} note="Support only videos" />
      </div>
    );
  }
}

export default UploadTemplate;
