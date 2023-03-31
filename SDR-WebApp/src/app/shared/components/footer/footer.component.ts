import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  copyrightYear: string;
  constructor() {}

  ngOnInit(): void {
    this.getCurrentYear();
  }

  getCurrentYear(): void {
    let date = new Date();
    this.copyrightYear = date.getFullYear().toString();
  }
}
