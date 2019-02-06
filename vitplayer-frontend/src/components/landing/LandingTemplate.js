import React from 'react';
import './LandingTemplate.scss';
import LinkIcon from 'static/images/link.svg';

const LandingTemplate = () => {
  return (
    <div className="LandingTemplate">
      <div className="left">
        <div className="title">
          Streaming video verification
          <br />
          based blockchain
        </div>
        <div className="subtitle">Find the fake part of your video</div>
      </div>
      <img src={LinkIcon} alt="link" />
    </div>
  );
};

export default LandingTemplate;
