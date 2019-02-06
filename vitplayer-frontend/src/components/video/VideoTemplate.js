import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import * as VideoAPI from 'lib/api/video';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';
import './VideoTemplate.scss';

@withRouter
class VideoTemplate extends Component {
  state = {
    videos: []
  };

  getVideoList = () => {
    VideoAPI.list().then(res => {
      this.setState({ videos: res.data });
    });
  };

  componentDidMount() {
    this.getVideoList();
  }

  render() {
    const { videos } = this.state;
    const { history } = this.props;

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              VideoName
            </TableCell>
            <TableCell scope="col" border="bottom">
              CreatedAt
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map(video => (
            <Fragment>
              <TableRow
                onClick={() => {
                  history.push(`/verification?id=${video._id}`);
                }}
              >
                <TableCell scope="row">
                  <strong>{video.videoName}</strong>
                </TableCell>
                <TableCell>{video.createdAt}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default VideoTemplate;
