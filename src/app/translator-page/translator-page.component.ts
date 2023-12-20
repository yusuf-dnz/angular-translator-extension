import { Component } from '@angular/core';
import { TranslatorApiService } from '../utils/translator-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-translator-page',
  standalone: true,
  imports: [],
  templateUrl: './translator-page.component.html',
  styleUrl: './translator-page.component.css',
})
export class TranslatorPageComponent {
  translatedText = Observable<any>;
  constructor(private translatorService: TranslatorApiService) {}
  ngOnInit() {
    this.translate();
  }
  translate() {
    this.translatorService.translator('Hello', 'en', 'tr').subscribe(
      (response) => {
        this.translatedText = response;
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log('Çeviri sonucu' + this.translatedText);
      }
    );
  }
}
