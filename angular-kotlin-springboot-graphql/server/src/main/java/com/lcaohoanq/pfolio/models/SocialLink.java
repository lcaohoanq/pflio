package com.lcaohoanq.pfolio.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SocialLink {
    private String type;
    private String url;
    private String iconUrl;
}