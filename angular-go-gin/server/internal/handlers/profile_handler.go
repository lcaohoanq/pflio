package handlers

import (
	"github.com/gin-gonic/gin"
)

type SocialLink struct {
	Type    string `json:"type"`
	URL     string `json:"url"`
	IconUrl string `json:"iconUrl"`
}

type ProfileResponse struct {
	Name          string       `json:"name"`
	AvatarUrl     string       `json:"avatarUrl"`
	GithubAccount string       `json:"githubAccount"`
	Role          string       `json:"role"`
	SocialLinks   []SocialLink `json:"socialLinks"`
}

func GetProfile(c *gin.Context) {
	profile := ProfileResponse{
		Name:          "Luu Cao Hoang",
		AvatarUrl:     "/assets/avatar.jpeg",
		GithubAccount: "GitHub account is lcaohoanq",
		Role:          "Fullstack Web Developer",
		SocialLinks: []SocialLink{
			{
				Type:    "github",
				URL:     "https://github.com/lcaohoanq",
				IconUrl: "/assets/github.png",
			},
			{
				Type:    "ig",
				URL:     "https://instagram.com/youraccount",
				IconUrl: "/assets/ig.png",
			},
		},
	}

	c.JSON(200, profile)
}
