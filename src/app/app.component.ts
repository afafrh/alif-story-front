import { Component, OnInit } from '@angular/core';
import { NewsletterPopupComponent } from './core/components/newsletter-popup/newsletter-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'alif-story-front';

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: data => {
        if (data.get('isFromSocial') === 'true') this.openDialog();
        else setTimeout(() => this.openDialog(), 10000);
      }
    });
  }

  openDialog() {
    this.dialog.closeAll();
    
    const dialogRef = this.dialog.open(NewsletterPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
