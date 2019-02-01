pragma soliditypp ^0.4.0;

contract Vitplayer {
    event CreateVideo(address indexed viteAddress, uint videoId);
    event AddHash(address indexed viteAddress, uint videoId);

    address owner;
    mapping (uint => Video) videoMap;

    struct VideoHash { 
        string startTime;
        string endTime;
        string hashStr;
    }

    struct Video {
        string videoPath;
        string videoName;
        VideoHash[] videoHashList;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Caller have to be owner(service address)");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    onMessage createVideo(uint videoId, string calldata videoPath, string calldata videoName) onlyOwner {
        Video storage video = videoMap[videoId];
        video.videoPath = videoPath;
        video.videoName = videoName;

        videoMap[videoId] = video;
        emit CreateVideo(msg.sender, videoId);
    }

	onMessage addHash(uint videoId, string calldata startTime, string calldata endTime, string calldata hashStr) onlyOwner {
        VideoHash memory videoHash = VideoHash(startTime, endTime, hashStr);
        videoMap[videoId].videoHashList.push(videoHash);

        emit AddHash(msg.sender, videoId);
    }
}
