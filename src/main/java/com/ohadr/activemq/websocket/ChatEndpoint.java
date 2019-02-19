package com.ohadr.activemq.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.jms.JMSException;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;

import com.ohadr.activemq.receiver.non_blocking.JmsMessageListenerExample;


@ServerEndpoint(value = "/amq/{action}", 
				decoders = MessageDecoder.class, 
				encoders = MessageEncoder.class)
public class ChatEndpoint {
	private static Logger log = Logger.getLogger(ChatEndpoint.class);

    private Session session;
    private static final Set<ChatEndpoint> chatEndpoints = new CopyOnWriteArraySet<>();
    private static HashMap<String, String> users = new HashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("action") String queueName) 
    		throws IOException, EncodeException, JMSException, InterruptedException {

		log.info("onOpen");
        this.session = session;
        chatEndpoints.add(this);
        users.put(session.getId(), queueName);

        JmsMessageListenerExample.registerListener(queueName);
        broadcast("Listening to " + queueName);
    }

    @OnMessage
    public void onMessage(Session session, String message) throws IOException, EncodeException {
		log.info("onMessage");

		String fullMessage = users.get(session.getId()) + ": " + message;
        broadcast(fullMessage);
    }

    public static void onMessageFromQueue(String message)
    {
		log.info("onMessage: " + message);
        broadcast(message);
    }

    @OnClose
    public void onClose(Session session) throws IOException, EncodeException {
		log.info("onClose");
        chatEndpoints.remove(this);
        String from = users.get(session.getId());
        String message = "Disconnected from " + from;
        broadcast(message);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        // Do error handling here
    }

    private static void broadcast(String message) {
        chatEndpoints.forEach(endpoint -> {
            synchronized (endpoint) {
                try {
                    endpoint.session.getBasicRemote()
                        .sendObject(message);
                } catch (IOException | EncodeException e) {
                	log.error("error broadcasting.", e);
                    e.printStackTrace();
                }
            }
        });
    }

}
