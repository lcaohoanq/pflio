import { Component } from "@angular/core";

interface SocialLink {
  name: string;
  url: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  informationURL: SocialLink[] = [
    {
      name: "github",
      url: "https://github.com/lcaohoanq",
    },
    {
      name: "ig",
      url: "https://www.instagram.com/lcaohoanq/",
    },
  ];

  // Convert the array to a map
  informationURLMap: { [key: string]: string } = this.informationURL.reduce<{
    [key: string]: string;
  }>((acc, item) => {
    acc[item.name] = item.url;
    return acc;
  }, {});

  handleNavigate(name: string): void {
    const url = this.informationURLMap[name];

    if (url) {
      window.open(url, "_blank");
    }
  }
}
