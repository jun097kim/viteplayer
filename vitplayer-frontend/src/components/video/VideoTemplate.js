import React, { Component } from 'react';
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
      <div className="VideoTemplate">
        <p className="title">Video List</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Video No
              </TableCell>
              <TableCell scope="col" border="bottom">
                Video Name
              </TableCell>
              <TableCell scope="col" border="bottom">
                Upload Date
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video, index) => (
              <>
                <TableRow
                  onClick={() => {
                    history.push(`/verify?id=${video._id}`);
                  }}
                >
                  <TableCell scope="row">
                    <strong>{index + 1}</strong>
                  </TableCell>
                  <TableCell>{video.videoName}</TableCell>
                  <TableCell>{video.createdAt}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default VideoTemplate;
