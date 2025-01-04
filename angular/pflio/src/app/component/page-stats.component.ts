import { Component, OnInit } from '@angular/core';
import { PageViewService } from "./page-view.service";

@Component({
  selector: 'app-page-stats',
  templateUrl: 'page-stats.html',
  styleUrls: ['page-stats.scss']
})
export class PageStatsComponent implements OnInit {
  constructor(public pageViewService: PageViewService) {}

  ngOnInit() {
    this.pageViewService.recordPageView().subscribe();
  }

  objectEntries(obj: { [key: string]: number }) {
    return Object.entries(obj || {});
  }
}
