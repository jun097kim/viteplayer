#!/bin/sh

# 원본 영상이 키프레임 단위로 분할되므로,
# segment의 길이가 정확히 10초가 아닐 수 있음

# -reset_timestamps: 각 segment에 대해 타임스탬프 리셋
ffmpeg -i $1  -c copy -f segment -segment_time 10 -reset_timestamps 1 $1_%02d.mp4
