import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../services/profile.service";
import { GetProfileResponse } from "../interfaces/profile.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  profile?: GetProfileResponse;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
      },
      error: (error) => {
        console.error("Error loading profile:", error);
      },
    });
  }

  handleNavigate(type: string): void {
    const social = this.profile?.data.getProfile?.socialLinks.find(
      (link) => link.type === type,
    );
    if (social?.url) {
      window.open(social.url, "_blank");
    }
  }
}
