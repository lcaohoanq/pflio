import { Component, OnInit } from "@angular/core";
import { Profile, ProfileService } from "./services/profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  profile: Profile | any = null; // Initialize profile as null
  informationURLMap: { [key: string]: string } = {};

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data[0]; // Assuming the API returns a single profile in an array
        this.informationURLMap = this.profile.socialLinks.reduce((acc: { [key: string]: string }, item: any) => {
          acc[item.type] = item.url;
          return acc;
        }, {});
      },
      error: (error) => {
        console.error('Error fetching profile data', error);
      },
      complete: () => {
        console.log('Profile data fetch complete');
      },
    });
  }

  handleNavigate(name: string): void {
    const url = this.informationURLMap[name];
    if (url) {
      window.open(url, '_blank');
    }
  }
}
