#!/bin/sh

cd bin

# run gvite development environment
killall -9 gvite
sh run.sh

# contract file path
CONTRACT_PATH="../${1}"

# compile contract
./solc ${CONTRACT_PATH}
