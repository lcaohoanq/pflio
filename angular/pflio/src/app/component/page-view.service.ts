import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from "../../environments/environment";

interface ViewStats {
  totalViews: number;
  viewsByPage: { [key: string]: number };
  viewsByDate: { [key: string]: number };
}

interface PageView {
  timestamp: string;
  page: string;
  userAgent: string;
  referrer: string;
  screenResolution: string;
}

@Injectable({
  providedIn: 'root'
})
export class PageViewService {
  private apiUrl = environment.apiUrl.views;
  private viewStatsSubject = new BehaviorSubject<ViewStats | null>(null);
  viewStats$ = this.viewStatsSubject.asObservable();
  private currentCount = 0;

  constructor(private http: HttpClient) {}

  recordPageView() {
    // Increment count for this session
    this.currentCount++;

    const pageView: PageView = {
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenResolution: `${window.screen.width}x${window.screen.height}`
    };

    return this.http.post(this.apiUrl, pageView).pipe(
      tap(() => this.getViewStats())
    );
  }

  getViewStats() {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => {
        const validEntries = data.filter(entry => entry.timestamp && entry.page);

        const stats: ViewStats = {
          totalViews: validEntries.length,
          viewsByPage: this.groupByPage(validEntries),
          viewsByDate: this.groupByDate(validEntries)
        };
        this.viewStatsSubject.next(stats);
      })
    ).subscribe();
  }

  private groupByPage(data: any[]): { [key: string]: number } {
    return data.reduce((acc, view) => {
      if (view.page) {
        acc[view.page] = (acc[view.page] || 0) + 1;
      }
      return acc;
    }, {});
  }

  private groupByDate(data: any[]): { [key: string]: number } {
    return data.reduce((acc, view) => {
      if (view.timestamp) {
        const date = new Date(view.timestamp).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {});
  }
}
