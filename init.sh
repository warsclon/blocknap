export PORT=8888

echo "------------------"
echo "  Init BlockNap   "
echo "      ${PORT}     "
echo "------------------"

nohup node app.js > blocknap.log &
echo $! > blocknap.pid
