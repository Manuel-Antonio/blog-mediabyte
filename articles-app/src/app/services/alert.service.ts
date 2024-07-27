import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<{ message: string, type: string } | null>(null);

  getAlert(): Observable<{ message: string, type: string } | null> {
    return this.alertSubject.asObservable();
  }

  showAlert(message: string, type: string = 'success') {
    this.alertSubject.next({ message, type });
  
    setTimeout(() => {
      this.alertSubject.next(null);
    }, 3000);
  }
}
