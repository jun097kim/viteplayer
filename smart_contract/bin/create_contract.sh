echo $1

cat $1

echo "---------------------------"

curl -X POST \
  http://127.0.0.1:48132/ \
  -H 'content-type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "id": 0,
    "method": "vmdebug_createContract",
    "params": [
        {
        "fileName":"'`pwd`/$1'",
        "params":{}
        }
    ]
}'
