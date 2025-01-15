package com.lcaohoanq.pfolio.demo.domain.profile

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class ProfileController(
    private val profileService: ProfileService
) {

    @GetMapping("/")
    fun home(model: Model): String {
        model.addAttribute("profile", profileService.getProfile())
        return "home"
    }

    @GetMapping("/api/data")
    fun getMyProfile(): ResponseEntity<Any> {
        return ResponseEntity.ok().body(
            profileService.getProfile()
        )
    }

}