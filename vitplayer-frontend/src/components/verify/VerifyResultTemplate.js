import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';
import './VerifyResultTemplate.scss';

const getMatches = result => {
  const matches = [];
  for (let [key, value] of Object.entries(result.comparedHash)) {
    matches.push(
      <div className="part" key={key}>
        <div>{key}</div>
        <div className={classNames('bar', value ? 'blue' : 'red')} />
      </div>
    );
  }
  console.log('matches:', matches);
  return matches;
};

const getHashes = result => {
  const { originalHash, testHash } = result;
  const hashes = [];
  for (let i = 0; i < originalHash.length; i++) {
    const obj = { startTime: originalHash[i].startTime };

    if (originalHash[i]) {
      obj.originalHash = originalHash[i].hashStr;
      console.log(obj);
    }

    if (testHash[i]) {
      obj.testHash = testHash[i].hashStr;
    }

    hashes.push(obj);
  }
  console.log(hashes);
  return hashes;
};

const VerifyResultTemplate = ({ location }) => {
  const result = location.state.result;

  return (
    <div className="VerifyResultTemplate">
      <p className="title">Video Verification Result</p>
      <div className="matches">{getMatches(result)}</div>
      <div className="hashes">
        <p>Hash List</p>
        <Table>
          <TableHeader>
            <TableCell scope="col" border="bottom">
              Start Time
            </TableCell>
            <TableCell scope="col" border="bottom">
              Original Hash
            </TableCell>
            <TableCell scope="col" border="bottom">
              Your Video Hash
            </TableCell>
          </TableHeader>
          <TableBody>
            {getHashes(result).map((hash, index) => {
              return (
                <TableRow>
                  <TableCell scope="row">
                    <strong>{hash.startTime}</strong>
                  </TableCell>
                  <TableCell>{hash.originalHash}</TableCell>
                  <TableCell>{hash.testHash}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withRouter(VerifyResultTemplate);
