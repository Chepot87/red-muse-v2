// Local preview only. No packages or build step required.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpeg':'image/jpeg'};
const server = http.createServer((req,res) => {
  let name;
  try { name = decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  if (name === '/') name = '/index.html';
  const file = path.resolve(root, '.' + name);
  if (!file.startsWith(root + path.sep) || !types[path.extname(file)]) { res.writeHead(404).end('Not found'); return; }
  fs.readFile(file,(error,data) => {
    if (error) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-store'});
    res.end(data);
  });
});
server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? 'Port 4173 is occupied. The preview may already be running: http://127.0.0.1:4173' : error.message); process.exitCode = 1; });
server.listen(4173,'127.0.0.1',() => console.log('Red Muse review: http://127.0.0.1:4173 (Ctrl+C to stop)'));
