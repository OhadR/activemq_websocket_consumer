package com.ohadr.activemq.websocket;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

import com.ohadr.activemq.websocket.model.Message;
import com.ohadr.common.utils.JsonUtils;

public class MessageDecoder implements Decoder.Text<Message> {

    @Override
    public Message decode(String s) throws DecodeException {
        Message message = JsonUtils.convertFromJson(s, Message.class);
        return message;
    }

    @Override
    public boolean willDecode(String s) {
        return (s != null);
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
