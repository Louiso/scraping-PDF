const https = require('https'); // or 'https' for https:// URLs
const http = require('http');
const fs = require('fs');
const path = require('path')


const downloadFileByUrl = (urlFile, fileName) => {
  return new Promise((resolve) => {
    const outputPath = path.resolve(__dirname, './downloads', fileName)
    const file = fs.createWriteStream(outputPath);

    const protocol = urlFile.match(/^https/) ? https : http;

    protocol.get(urlFile, function(response) {
      response.pipe(file);

      // after download completed close filestream
      file.on("finish", () => {
          file.close();
          //console.log("Download Completed");
          resolve(outputPath)
      });
    })
  })
}

module.exports = {
  downloadFileByUrl
}