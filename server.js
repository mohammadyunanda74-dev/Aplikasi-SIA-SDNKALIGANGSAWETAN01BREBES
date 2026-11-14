/**
 * SERVER LOKAL SIA SEKOLAH - SDN KALIGANGSA WETAN 01
 * Web Server Ringan Tanpa Dependensi Luar (Native Node.js)
 * Cara Menjalankan:
 *   node server.js
 * Kemudian buka di browser:
 *   http://localhost:8080
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.csv': 'text/csv; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, reqPath);

  // Security check: cegah directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 Terlarang: Akses di luar direktori dibatasi.');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`<h2>404 Halaman Tidak Ditemukan</h2><p>Berkas <code>${reqPath}</code> tidak ditemukan pada server.</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(' SIA SEKOLAH - SDN KALIGANGSA WETAN 01');
  console.log(' Kecamatan Brebes, Kabupaten Brebes');
  console.log('====================================================');
  console.log(` Server lokal aktif di: http://localhost:${PORT}`);
  console.log(` Akses dari HP/Jaringan WiFi: http://[IP-Komputer]:${PORT}`);
  console.log(' Tekan Ctrl + C untuk menghentikan server.');
  console.log('====================================================');
});
