import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

interface SocialLink {
  type: string;
  url: string;
  iconUrl: string;
}

export interface Profile {
  name: string;
  avatarUrl: string;
  githubAccount: string;
  role: string;
  socialLinks: SocialLink[];
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.apiUrl.profile;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }
}
