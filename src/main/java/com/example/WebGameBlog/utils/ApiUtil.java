package com.example.WebGameBlog.utils;

import com.example.WebGameBlog.constant.SystemConstant;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Component
public class ApiUtil {

    public String GetApi(String value) throws IOException {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(SystemConstant.API + value);
        httpGet.setHeader("Accept", "application/json");
        httpGet.setHeader("Content-type", "application/json");
        CloseableHttpResponse response = client.execute(httpGet);
        if(response.getStatusLine().getStatusCode() != HttpStatus.OK.value()){
            return null;
        }
        InputStream content = response.getEntity().getContent();
        String jsonReponse = new BufferedReader(
                new InputStreamReader(content, StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.joining("\n"));
        client.close();

        return jsonReponse;
    }
}
