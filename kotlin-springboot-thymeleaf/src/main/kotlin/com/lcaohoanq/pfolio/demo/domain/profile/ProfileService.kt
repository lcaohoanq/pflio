package com.lcaohoanq.pfolio.demo.domain.profile

import com.lcaohoanq.pfolio.demo.domain.social.SocialLink
import org.springframework.stereotype.Service

@Service
class ProfileService : IProfileService {

    override fun getProfile(): Profile {
        var profile = Profile(
            name = "Luu Cao Hoang",
            avatarUrl = "/assets/avatar.jpeg",
            githubAccount = "GitHub account is lcaohoanq",
            role = "Backend Developer",
        )

        with(profile) {
            socialLinks = listOf(
                SocialLink(
                    type = "github",
                    url = "https://github.com/lcaohoanq",
                    iconUrl = "/assets/github.png"
                ), SocialLink(
                    type = "instagram",
                    url = "https://www.instagram.com/lcaohoanq",
                    iconUrl = "/assets/ig.png"
                )
            )
        }

        return profile
    }

}