import express from 'express';
import cors from 'cors';
import { config } from './config';
import apiRouter from './routes';
import { ensureMediaDirectory } from './lib/media';

const app = express();

ensureMediaDirectory();

app.use(
  cors({
    origin: config.corsOrigin,
  }),
);

app.use(express.json());
app.use('/api', apiRouter);
app.use('/media', express.static(config.mediaRoot, {
  setHeaders: (res, filePath) => {
    if(filePath.endsWith('master.m3U8')) {
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    } else if(filePath.endsWith('.ts')) {
      res.setHeader('Content-Type', 'video/MP2T');
    }
  },
})); 

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    mediaRoot: config.mediaRoot,
    implementation: 'starter',
  });
});

app.listen(config.port, () => {
  console.log(`API server running on http://localhost:${config.port}`);
  console.log(`Health check: http://localhost:${config.port}/health`);
});
