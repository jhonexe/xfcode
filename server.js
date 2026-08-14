import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import checkoutHandler from './api/create-checkout-session.js';

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || '';

async function getPayPalAccessToken() {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
        throw new Error('PAYPAL_CLIENT_ID / PAYPAL_SECRET no configurados en .env');
    }
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
    const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`PayPal token error (${res.status}): ${text}`);
    }
    const data = await res.json();
    return data.access_token;
}

async function createPayPalOrder(amount) {
    const token = await getPayPalAccessToken();
    const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [{
                description: 'XF CODE Store',
                amount: { currency_code: 'USD', value: amount }
            }]
        })
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(`PayPal create order error (${res.status}): ${JSON.stringify(data)}`);
    }
    return data;
}

async function capturePayPalOrder(orderId) {
    const token = await getPayPalAccessToken();
    const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(`PayPal capture error (${res.status}): ${JSON.stringify(data)}`);
    }
    return data;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/create-checkout-session' && req.method === 'POST') {
    req.body = await readBody(req);
    try {
      await checkoutHandler(req, res);
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message || 'Error interno del servidor' }));
    }
    return;
  }

  if (url.pathname === '/api/paypal/create-order' && req.method === 'POST') {
    req.body = await readBody(req);
    try {
      const amount = Number(req.body.amount);
      if (isNaN(amount) || amount <= 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Monto inválido' }));
        return;
      }
      const order = await createPayPalOrder(amount.toFixed(2));
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(order));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message || 'Error al crear orden de PayPal' }));
    }
    return;
  }

  if (url.pathname === '/api/paypal/capture-order' && req.method === 'POST') {
    req.body = await readBody(req);
    try {
      if (!req.body.orderId) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Falta orderId' }));
        return;
      }
      const details = await capturePayPalOrder(req.body.orderId);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(details));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message || 'Error al capturar orden de PayPal' }));
    }
    return;
  }

  let pathname = decodeURIComponent(url.pathname);

  if (pathname === '/index' || pathname === '/index.html') {
    res.statusCode = 301;
    res.setHeader('Location', '/');
    res.end();
    return;
  }

  if (pathname === '/') pathname = '/index.html';

  let filePath = path.join(__dirname, pathname);
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  // Clean URLs: si la ruta no tiene extensión y existe el archivo con .html, servirlo
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    const withHtml = filePath + '.html';
    if (fs.existsSync(withHtml)) filePath = withHtml;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>404 - Not Found</h1>');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.statusCode = 200;
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
  console.log('   - Página principal: /index.html (o /)');
  console.log('   - API Stripe local: /api/create-checkout-session (POST)');
  console.log('   - STRIPE_SECRET_KEY: ' + (process.env.STRIPE_SECRET_KEY ? 'configurada' : 'NO configurada (el checkout devolverá error)'));
  console.log('   - PayPal local: ' + (PAYPAL_CLIENT_ID && PAYPAL_SECRET ? 'configurado' : 'NO configurado (.env)'));
  console.log('     - POST /api/paypal/create-order  { amount }');
  console.log('     - POST /api/paypal/capture-order  { orderId }');
});
