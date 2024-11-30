package com.lcaohoanq.pfolio.controllers;

import com.lcaohoanq.pfolio.services.ProfileService;
import com.lcaohoanq.pfolio.models.Profile;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    private final ProfileService profileService;

    public HomeController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("profile", profileService.getProfile());
        return "home";
    }
}