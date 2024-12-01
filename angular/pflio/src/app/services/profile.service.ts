import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SocialLink {
  type: string;
  url: string;
  iconUrl: string;
}

interface Profile {
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
  private apiUrl = 'https://6512cbd2b8c6ce52b3963937.mockapi.io/api/v1/profiles';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }
}
