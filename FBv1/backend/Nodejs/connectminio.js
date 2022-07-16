var Minio = require('minio')

var minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});

console.log("minio connected");

module.exports = minioClient;

var metaData = {
    'Content-Type': 'application/octet-stream',
    'X-Amz-Meta-Testing': 1234,
    'example': 5678,
    'userid' : 'nahid'
}
minioClient.fPutObject('story', 'ssmeta.jpg', '/home/nahid/Pictures/Screenshot from 2022-07-15 21-49-56.png', metaData, function(err, etag) {
    if (err) return console.log(err)
    console.log('File uploaded successfully.')
});
