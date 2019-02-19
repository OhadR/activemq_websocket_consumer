# activemq_websocket_consumer

This project runs a javascript that connects to ActiveMQ and registers a consumer using websocket. Other projects (of mine, xxx) shows how to register a listener using Java. But the challenge is to do so from the client - from javascript.

## How to Run?

from command line, use the following command:

	mvn clean tomcat7:run -Dohadr.project.port=8093

Note that 'ohadr.project.port' is a property that lets you set the port that the application will be listening to. If none is set, the default port is 8080. You can use a different port that 8093, of course.

## Debug within Eclipse

See how in this README: https://gitlab.com/OhadR/activemq-spring-sandbox#debug-within-eclipse

## Using my own websocket

In the first stage, I wrote my own websocket-backend (`ChatEndpoint`) with its decoder/encoder. This class is connected via websocket to the front-end (`ohad.js`). `ChatEndpoint.onOpen()` registers a listener on ActiveMQ, and when a message is queued, the listener consumes it and notifies `ChatEndpoint.onMessage()`, which sends the data to the client over the websocket.

## Using ActiveMQ's STOMP

The second stage, I realized that ActiveMQ supports [STOMP](https://en.wikipedia.org/wiki/Streaming_Text_Oriented_Messaging_Protocol) (STOMP stands for Streaming Test Oriented Messaging Protocol, which is a layer over websocket), so there is no need in the backend that I have written. Thus, I wrote `direct-amq-websocket.js` which uses Apache-ActiveMQ's `stomp.js`. This code opens a websocket directly to ActiveMQ, and consume messages.

There is a button for sending a single message, for tests, to save time (you do not need to send the message from another application)

## References

https://www.baeldung.com/java-websockets


## Application Screenshot

![screenshot](/src/main/webapp/images/app-screenshot.JPG)
