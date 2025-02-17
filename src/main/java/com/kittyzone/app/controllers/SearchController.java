package com.kittyzone.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SearchController {

    @GetMapping("/")
    public String home() {
        return "search.html";
    }

    @GetMapping("/home")
    public String homePage() {
        return home();
    }
}
