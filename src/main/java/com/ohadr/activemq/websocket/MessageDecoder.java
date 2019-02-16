package com.ohadr.activemq.websocket;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

import com.ohadr.common.utils.JsonUtils;

public class MessageDecoder implements Decoder.Text<String> {

    @Override
    public String decode(String s) throws DecodeException {
    	String message = JsonUtils.convertFromJson(s, String.class);
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
