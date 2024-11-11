import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  date: Date = new Date();
  currentHour: string = '';
  private subscription?: Subscription;

  ngOnInit(): void {
    // Chama updateCurrentHour() após a inicialização do componente
    this.updateCurrentHour();
    
    // Inicia a atualização contínua da hora
    this.subscription = interval(1000)
      .pipe(
        map(() => {
          this.updateCurrentHour();
        })
      )
      .subscribe();
  }

  private updateCurrentHour(): void {
    const hours = this.date.getHours().toString().padStart(2, '0');
    const minutes = this.date.getMinutes().toString().padStart(2, '0');
    this.currentHour = `${hours}:${minutes}`;
    this.date.setSeconds(this.date.getSeconds() + 1);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
