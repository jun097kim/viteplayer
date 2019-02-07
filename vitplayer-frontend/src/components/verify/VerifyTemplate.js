import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';
import './VerifyTemplate.scss';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
const XHRUpload = require('@uppy/xhr-upload');

class VerifyTemplate extends Component {
  constructor(props) {
    super(props);

    const id = new URLSearchParams(props.history.location.search).get('id');
    this.uppy = Uppy({ autoProceed: true }).use(XHRUpload, {
      endpoint: `/api/video/verify/${id}`,
      fieldName: 'video',
      timeout: 0
    });

    this.uppy.on('complete', result => {
      console.log('successful files:', result.successful);
      console.log('failed files:', result.failed);
    });
  }

  componentDidMount() {
    const { history } = this.props;
    this.uppy.on('upload-success', (file, body) => {
      history.push({
        pathname: '/result',
        state: { result: body }
      });
    });
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    return (
      <div className="VerifyTemplate">
        <DragDrop uppy={this.uppy} note="Please upload a video to verify" />
      </div>
    );
  }
}

export default withRouter(VerifyTemplate);
