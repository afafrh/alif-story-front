import { Component } from '@angular/core';
import { NewsletterPopupComponent } from './core/components/newsletter-popup/newsletter-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alif-story-front';

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

  openDialog() {
    this.dialog.closeAll();
    
    const dialogRef = this.dialog.open(NewsletterPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
