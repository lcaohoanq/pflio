package com.lcaohoanq.pfolio.demo.domain.profile

import com.lcaohoanq.pfolio.demo.domain.social.SocialLink

data class Profile(
    val name: String,
    val avatarUrl: String,
    val githubAccount: String,
    val role: String,
    var socialLinks: List<SocialLink> = emptyList()
)
