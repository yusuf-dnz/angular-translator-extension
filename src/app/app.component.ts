import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { TranslatorPageComponent } from './translator-page/translator-page.component';
import { FormsModule } from '@angular/forms';
import { TranslatorApiService } from './utils/translator-api.service';
import { TranslatorConfig } from './class/translator-config.model';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslatorPageComponent,
    FormsModule,
    SettingsPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-app';

  constructor(
    private translatorService: TranslatorApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.navigate(['settings-page'])
    if (!localStorage.getItem('languages')) {
      console.log('languages eklendi');
      this.getLanguages();
    }

    if (!localStorage.getItem('translator-configs')) {
      console.log('config eklendi');
      const firstConfig = new TranslatorConfig('', 'en');
      localStorage.setItem('translator-configs', JSON.stringify([firstConfig]));
    }
  }

  getLanguages() {
    this.translatorService.getLanguages().subscribe(
      (response) => {
        const arr = response.translation;
        localStorage.setItem('languages', JSON.stringify(arr));
      },
      (error) => {
        console.log(error);
      },
      () => { }
    );
  }
}
