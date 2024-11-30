package com.lcaohoanq.pfolio.models;

import lombok.Data;
import java.util.List;

@Data
public class Profile {
    private String name;
    private String avatarUrl;
    private String githubAccount;
    private String role;
    private List<SocialLink> socialLinks;
}