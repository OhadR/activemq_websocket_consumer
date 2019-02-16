package com.ohadr.activemq.websocket;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import com.ohadr.activemq.websocket.model.Message;
import com.ohadr.common.utils.JsonUtils;

public class MessageEncoder implements Encoder.Text<Message> {

    @Override
    public String encode(Message message) throws EncodeException {
        String json = JsonUtils.convertToJson(message);
        return json;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {
        // Custom initialization logic
    }

    @Override
    public void destroy() {
        // Close resources
    }
}
