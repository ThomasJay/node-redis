# node-redis

Usage of Redis in Node

We are using async-redis so we can use async/await rather then callbacks as supported by the base redis code.

We will connect to a redis server.

We have a call GET /cached/{key} that will return the value for a key or a not found error

We have a call POST /cached/{key}/{value} that will set the value for a key without any timeout.

We have a call POST /cached/{key}/{value}/{timeout} that will set the value for a key WITH a timeout in seconds.

We have a call DELETE /cached/{key} that will remove the value for a key.

You can also check to see if an object exists:
const itemExists = await client.exists('key');

Want to store an object? Use JSON as follows:

client.set("coolStuff", JSON.stringify({ firstName: 'Tom', lastName: 'Jay', skills: ['Javascript', 'Redis', 'Node']})
)

To retrieve JSON from a value:
const jsonObject = JSON.parse(await client.get("coolStuff"));

Remember to use try/catch as needed.

Note: Added Docker support

docker build -t node-redis .

docker-compose up
