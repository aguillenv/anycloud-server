import * as express from "express";

const port = 8088;
const app = express();

// 1 GB post payload limit
app.use(express.json({ limit: "1000MB" }));
app.get('/', (_, res) => res.send('Hello'));
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
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).end("error");
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
