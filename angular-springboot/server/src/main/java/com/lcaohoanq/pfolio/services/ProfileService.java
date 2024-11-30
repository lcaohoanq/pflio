package com.lcaohoanq.pfolio.services;

import com.lcaohoanq.pfolio.models.Profile;
import com.lcaohoanq.pfolio.models.SocialLink;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class ProfileService implements IProfileService{

    @Override
    public Profile getProfile() {
        Profile profile = Profile.builder()
            .name("Luu Cao Hoang")
            .avatarUrl("/assets/avatar.jpeg")
            .githubAccount("GitHub account is lcaohoanq")
            .role("Fullstack Web Developer")
            .build();

        SocialLink github = SocialLink.builder()
            .type("github")
            .url("https://github.com/lcaohoanq")
            .iconUrl("/assets/github.png")
            .build();

        SocialLink instagram = SocialLink.builder()
            .type("ig")
            .url("https://instagram.com/lcaohoanq")
            .iconUrl("/assets/ig.png")
            .build();

        profile.setSocialLinks(Arrays.asList(github, instagram));
        
        return profile;
    }
}