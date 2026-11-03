import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

export function saveImagesPlugin(): Plugin {
  return {
    name: 'save-images-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-images', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const targetDir = path.resolve(process.cwd(), 'public/images');
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }

            const savedFiles: Record<string, string> = {};

            for (const [key, val] of Object.entries(data)) {
              if (typeof val === 'string' && val.startsWith('data:image/')) {
                // Determine extension
                const match = val.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
                if (match) {
                  let ext = match[1].toLowerCase();
                  if (ext === 'jpeg') ext = 'jpg';
                  if (ext === 'svg+xml') ext = 'svg';
                  const base64Data = match[2];
                  const buffer = Buffer.from(base64Data, 'base64');
                  const filename = `${key}.${ext}`;
                  const filePath = path.join(targetDir, filename);
                  fs.writeFileSync(filePath, buffer);
                  savedFiles[key] = `/images/${filename}`;
                }
              }
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, savedFiles }));
          } catch (err: unknown) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: (err as Error)?.message || 'Server error' }));
          }
        });
      });
    },
  };
}
