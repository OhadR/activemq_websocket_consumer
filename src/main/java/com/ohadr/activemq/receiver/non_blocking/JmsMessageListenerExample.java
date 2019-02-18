package com.ohadr.activemq.receiver.non_blocking;
 
import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.Queue;
import javax.jms.Session;

import org.apache.activemq.ActiveMQConnection;
import org.apache.activemq.ActiveMQConnectionFactory;

import com.ohadr.activemq.websocket.ChatEndpoint;

/**
 * based on: https://examples.javacodegeeks.com/enterprise-java/jms/jms-messagelistener-example/
 * 
 * @author OhadR
 *
 */
public class JmsMessageListenerExample {

    //URL of the JMS server. DEFAULT_BROKER_URL will just mean that JMS server is on localhost
    public static String url = ActiveMQConnection.DEFAULT_BROKER_URL;

    public static void registerListener(ChatEndpoint endpoint, String queueName) throws JMSException, InterruptedException {
        Connection connection = null;
        try {
            // Producer
            ConnectionFactory connectionFactory = new ActiveMQConnectionFactory( url );
            		
            connection = connectionFactory.createConnection();
            Session session = connection.createSession(false,
                    Session.AUTO_ACKNOWLEDGE);
            Queue queue = session.createQueue(queueName);

            //sending a message:
//            String payload = "Important Task";
//            Message msg = session.createTextMessage(payload);
//            MessageProducer producer = session.createProducer(queue);
//            System.out.println("Sending text '" + payload + "'");
//            producer.send(msg);
 
            // Consumer
            MessageConsumer consumer = session.createConsumer(queue);
            consumer.setMessageListener(new ConsumerMessageListener("Consumer", endpoint));
            connection.start();
            Thread.sleep(300000);
            session.close();
        } finally {
            if (connection != null) {
                connection.close();
            }
 //           broker.stop();
        }
    }
 
}