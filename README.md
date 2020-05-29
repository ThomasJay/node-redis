# node-redis

Usage of Redis in Node

We are using async-redis so we can use async/await rather then callbacks as supported by the base redis code.

We will connect to a redis server.

We have a call GET /cached/{key} that will return the value for a key or a not found error

We have a call POST /cached/{key}/{value} that will set the value for a key without any timeout.

We have a call POST /cached/{key}/{value}/{timeout} that will set the value for a key WITH a timeout in seconds.

We have a call DELETE /cached/{key} that will remove the value for a key.
