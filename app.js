const express = require("express");
const bodyParser = require("body-parser");
const asyncRedis = require("async-redis");

// Connect to redis server
const client = asyncRedis.createClient("redis://localhost:6379");

const app = express();

// Support json post body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = 3000;

// Default get
app.get("/", (req, res) => res.send("Hello Async Redis Test"));

app.get("/cached/:key", async (req, res) => {
  const key = req.params.key;

  const value = await client.get(key);

  if (value) {
    console.log("key=" + key + " value=" + value);
    res.status(200).send(value);
  } else {
    console.log("key=" + key + " Not found");
    res.status(400).send("Not found");
  }
});

app.post("/cached/:key/:value", async (req, res) => {
  const key = req.params.key;
  const value = req.params.value;

  await client.set(key, value);

  console.log("Set key=" + key + " value=" + value);

  res.status(200).send({ [key]: value });
});

app.post("/cached/:key/:value/:timeout", async (req, res) => {
  const key = req.params.key;
  const value = req.params.value;
  const timeout = req.params.timeout; // timeout in seconds

  await client.set(key, value, "EX", parseInt(timeout));

  console.log("Set key=" + key + " value=" + value);

  res.status(200).send({ [key]: value });
});

app.delete("/cached/:key", async (req, res) => {
  const key = req.params.key;

  await client.del(key);

  console.log("Del key=" + key);

  res.status(200).send("removed");
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
