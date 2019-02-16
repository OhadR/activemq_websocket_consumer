package com.ohadr.activemq.websocket;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import com.ohadr.common.utils.JsonUtils;

public class MessageEncoder implements Encoder.Text<String> {

    @Override
    public String encode(String message) throws EncodeException {
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
