import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GetProfileResponse } from "../interfaces/profile.interface";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private apollo: Apollo) {}

  getProfile(): Observable<GetProfileResponse> {
    return this.apollo
      .watchQuery<{ getProfile: GetProfileResponse }>({
        query: gql`
          query {
            getProfile {
              name
              avatarUrl
              githubAccount
              role
              socialLinks {
                type
                url
                iconUrl
              }
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.getProfile));
  }
}
