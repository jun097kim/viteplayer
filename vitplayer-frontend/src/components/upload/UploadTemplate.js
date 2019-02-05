import React, { Component } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import './UploadTemplate.scss';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/status-bar/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/dashboard/dist/style.css';
const XHRUpload = require('@uppy/xhr-upload');

class UploadTemplate extends Component {
  constructor() {
    super();
    this.uppy = Uppy({ autoProceed: true }).use(XHRUpload, {
      endpoint: '/api/video/upload',
      fieldName: 'video',
      timeout: 0
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
        <Dashboard uppy={this.uppy} />
      </div>
    );
  }
}

export default UploadTemplate;
