package com.lcaohoanq.pfolio.services;

import com.lcaohoanq.pfolio.models.Profile;
import com.lcaohoanq.pfolio.models.SocialLink;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class ProfileService {
    
    public Profile getProfile() {
        Profile profile = new Profile();
        profile.setName("Luu Cao Hoang");
        profile.setAvatarUrl("/assets/avatar.jpeg");
        profile.setGithubAccount("GitHub account is lcaohoanq");
        profile.setRole("Fullstack Web Developer");
        
        SocialLink github = new SocialLink();
        github.setType("github");
        github.setUrl("https://github.com/lcaohoanq");
        github.setIconUrl("/assets/github.png");
        
        SocialLink instagram = new SocialLink();
        instagram.setType("ig");
        instagram.setUrl("https://instagram.com/youraccount");
        instagram.setIconUrl("/assets/ig.png");
        
        profile.setSocialLinks(Arrays.asList(github, instagram));
        
        return profile;
    }
}