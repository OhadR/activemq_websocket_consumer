package com.ohadr.activemq.receiver.non_blocking;
 
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

import com.ohadr.activemq.websocket.ChatEndpoint;
 
/**
 * https://examples.javacodegeeks.com/enterprise-java/jms/jms-messagelistener-example/
 * 
 * @author OhadR
 *
 */
public class ConsumerMessageListener implements MessageListener {
    private String consumerName;
 
    public ConsumerMessageListener(String consumerName) {
        this.consumerName = consumerName;
    }
 
    public void onMessage(Message message) {
        TextMessage textMessage = (TextMessage) message;
        try {
            System.out.println(consumerName + " received "
                    + textMessage.getText());
            ChatEndpoint.onMessageFromQueue( textMessage.getText() );
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
 
}