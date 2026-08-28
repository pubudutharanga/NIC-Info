const https = require('https');

const data = JSON.stringify({
  "host": "nicinfo.vercel.app",
  "key": "c615656243244ad2a1b515aa957cae39",
  "keyLocation": "https://nicinfo.vercel.app/c615656243244ad2a1b515aa957cae39.txt",
  "urlList": [
    "https://nicinfo.vercel.app/",
    "https://nicinfo.vercel.app/si/",
    "https://nicinfo.vercel.app/ta/",
    "https://nicinfo.vercel.app/old-to-new-nic",
    "https://nicinfo.vercel.app/nic-from-dob",
    "https://nicinfo.vercel.app/nic-to-birthday",
    "https://nicinfo.vercel.app/how-nic-works",
    "https://nicinfo.vercel.app/excel-nic-formula",
    "https://nicinfo.vercel.app/nic-check-digit",
    "https://nicinfo.vercel.app/guidelines.html"
  ]
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  res.on('data', (d) => {
    process.stdout.write(d);
  });
  
  if (res.statusCode === 200) {
    console.log('\nURLs submitted successfully to IndexNow!');
  } else {
    console.log('\nFailed to submit URLs.');
  }
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
