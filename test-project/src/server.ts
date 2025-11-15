import express from 'express';







// Only using express, others unused
const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;