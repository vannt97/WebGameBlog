package com.example.WebGameBlog.controller;

import com.example.WebGameBlog.utils.ApiUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URLEncoder;
import java.rmi.server.ExportException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class WebController {

    @Autowired
    ApiUtil apiUtil;

    @RequestMapping("/")
    public String home(Model model, @RequestParam(required = false) Optional<String> search ) throws IOException {
        this.setDataHeader(model);
        if (search.isPresent()){
            model.addAttribute("search", search.get());
            String encodedurl = URLEncoder.encode(search.get(),"UTF-8");
            Optional<String> json = Optional.ofNullable(apiUtil.GetApi("/blogs/pagination?status=PUBLISH&search=" + encodedurl));
            HashMap<String, Object> respone = (HashMap<String, Object>) (new ObjectMapper().readValue(json.get(), HashMap.class)).get("data");
            model.addAttribute("isResult", respone.get("empty"));
            model.addAttribute("posts",respone.get("content"));
            model.addAttribute("last",respone.get("last"));
            return  "pages/search";
        }else {
            model.addAttribute("labelhome",true);

            return  "pages/home";
        }
    }

    @RequestMapping("/category/{slug}")
    public String category(Model model, @PathVariable String slug) throws IOException {
        this.setDataHeader(model);
        Optional<String> json = Optional.ofNullable(apiUtil.GetApi("/blogs/pagination?status=PUBLISH&category=" + slug));
        if(json.isPresent()){
            HashMap<String, Object> respone = (HashMap<String, Object>) (new ObjectMapper().readValue(json.get(), HashMap.class)).get("data");
            model.addAttribute("posts", respone.get("content"));
            model.addAttribute("title", slug);
            model.addAttribute("totalElement",respone.get("totalElements"));
            model.addAttribute("size",respone.get("size"));
            model.addAttribute("labelcateogry",true);
            return  "pages/category";
        }else {
            return  "pages/error404";
        }
    }

    @RequestMapping("/error404")
    public String error404(Model model) throws IOException {
        this.setDataHeader(model);
        return  "pages/error404";
    }

    @RequestMapping("/{title}")
    public String detail(@PathVariable Optional<String> title, Model model) throws IOException, ParseException {
        this.setDataHeader(model);
        Optional<String> json = Optional.ofNullable(apiUtil.GetApi("/blog/" + title.get()));
        if(json.isPresent()){
            HashMap<String, Object> respone = (HashMap<String, Object>) (new ObjectMapper().readValue(json.get(), HashMap.class)).get("data");
            model.addAttribute("title", respone.get("title"));
            model.addAttribute("categories", respone.get("categories"));
            model.addAttribute("createDate",respone.get("createdDate"));
            model.addAttribute("thumbnail",respone.get("thumbnail"));
            model.addAttribute("content",respone.get("content"));
            model.addAttribute("id",respone.get("id"));
            return "pages/detail";
        }else {
            return  "pages/error404";

        }
//        String succes = (String) (new ObjectMapper().readValue(json.get(), HashMap.class)).get("succes");

//        if(Boolean.TRUE.equals(respone.get("succes"))){
////            HashMap<String,Object> data = (HashMap<String, Object>) respone.get("data");
////            model.addAttribute("title", data.get("title"));
////            model.addAttribute("categories", data.get("categories"));
////            String dateString  = (String) data.get("createdDate");
////            System.out.println(dateString);
//        }else {
//        }

    }

    @RequestMapping("/contact-us")
    public String contact(Model model) throws IOException {
        this.setDataHeader(model);
        return "pages/contact";
    }

    @RequestMapping("/privacy-policy")
    public String privacy(Model model) throws  IOException{
        this.setDataHeader(model);
        return "pages/privacy-policy";
    }

    private void setDataHeader(Model model) throws IOException {
        Optional<String> json = Optional.ofNullable(apiUtil.GetApi("/blogs?status=PUBLISH"));
        List<Object> result = (List<Object>) (new ObjectMapper().readValue(json.get(), HashMap.class)).get("data");
        model.addAttribute("blogs",result);
    }
}
