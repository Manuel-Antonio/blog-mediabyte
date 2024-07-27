import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alert: { message: string, type: string } | null = null;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.getAlert().subscribe(alert => {
      this.alert = alert;
    });
  }
}
