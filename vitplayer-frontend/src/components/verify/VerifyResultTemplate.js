import React from 'react';
import { withRouter } from 'react-router-dom';
import './VerifyResultTemplate.scss';

const getMatches = comparedHash => {
  const matches = [];
  for (let [key, value] of Object.entries(comparedHash)) {
    matches.push(
      <div className="part" key={key}>
        <div>{key}</div>
        <div className={value ? 'blue' : 'red'} />
      </div>
    );
  }
  console.log('matches:', matches);
  return matches;
};

const VerifyResultTemplate = ({ location }) => {
  const comparedHash = location.state.comparedHash;

  return (
    <div className="VerifyResultTemplate">
      <div className="matches">{getMatches(comparedHash)}</div>
    </div>
  );
};

export default withRouter(VerifyResultTemplate);
