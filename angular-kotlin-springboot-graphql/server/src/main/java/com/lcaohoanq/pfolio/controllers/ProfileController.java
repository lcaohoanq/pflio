package com.lcaohoanq.pfolio.controllers;

import com.lcaohoanq.pfolio.models.Profile;
import com.lcaohoanq.pfolio.models.SocialLink;
import com.lcaohoanq.pfolio.services.IProfileService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ProfileController {

    private final IProfileService profileService;
    
    @QueryMapping(name = "getProfile")
    public Profile getProfile() {
        return profileService.getProfile();
    }
    
    @SchemaMapping(typeName = "Profile", field = "socialLinks")
    public List<SocialLink> getSocialLinks(Profile profile) {
        return profile.getSocialLinks();
    }    
    

}