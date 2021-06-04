import * as express from "express";
import { randomBytes } from "crypto";
import { ds, datastore } from "anycloud26";

const port = 8088;
const app = express();

// 1 GB post payload limit
app.use(express.json({ limit: "1000MB" }));
app.get('/', (_, res) => res.send('Hello'));
app.get('/ds/get/:key', async (req, res) => {
  const key = req.params.key;
  res.send(await ds[key]);
});
app.get('/ds/del/:key', async (req, res) => {
  const key = req.params.key;
  res.send(delete ds[key]);
});
app.post('/ds/set/:key', async (req, res) => {
  const key = req.params.key;
  const val = req.body;
  res.send(ds[key] = val);
});
app.get('/dscls/get/:key', async (req, res) => {
  const key = req.params.key;
  res.send(await datastore.get(key));
});
app.get('/dscls/del/:key', async (req, res) => {
  const key = req.params.key;
  res.send(await datastore.del(key));
});
app.post('/dscls/set/:key', async (req, res) => {
  const key = req.params.key;
  const val = req.body;
  res.send(await datastore.set(key, val));
});
app.get('/health', (_, res) => res.send('ok'));
app.post("/fibo", (req, res, next) => {
  const fibo = (n: number) => {
    if (n < 2) return 1;
    else return fibo(n - 2) + fibo(n - 1);
  };
  try {
    const num = fibo(req.body.input);
    res.end(num.toString());
  } catch (err) {
    next(err);
  }
});
app.get("/crypto", (req, res, next) => {
  try {
    randomBytes(32).toString("hex");
    res.end("ok");
  } catch (err) {
    next(err);
  }
});
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).end("error");
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
