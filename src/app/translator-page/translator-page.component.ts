import { Component, HostListener } from '@angular/core';
import { TranslatorApiService } from '../utils/translator-api.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatorConfig } from '../class/translator-config.model';

@Component({
  selector: 'app-translator-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './translator-page.component.html',
  styleUrl: './translator-page.component.css',
})
export class TranslatorPageComponent {
  translatedDataObject: Array<any> = [];
  translatedValue = { text: '', to: '' };
  textAreaValue: string = '';
  translateOptions: Array<any> = JSON.parse(localStorage.getItem('translator-configs')||'');
  option: number = 0;

  constructor(private translatorService: TranslatorApiService) {}

  ngOnInit() { 
    // console.log(JSON.parse(localStorage.getItem('languages')||''))
    // const my = new TranslatorConfig('tr','en');
    // console.log(my);
    }

  translate() {
    this.translatorService
      .translator(
        this.textAreaValue,
        this.translateOptions[this.option].from,
        this.translateOptions[this.option].to
      )
      .subscribe(
        (response) => {
          this.translatedDataObject = response;
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.translatedValue.text =
            this.translatedDataObject[0].translations[0].text;
          this.translatedValue.to =
            this.translatedDataObject[0].translations[0].to;
          // console.log(this.translatedValue.text, this.translatedValue.to);
        }
      );
  }

  translateFunc() {
    this.translate();
  }
  changeOption(option: number) {
    // İki kez çalışıyor
    this.option = option;
    console.log(this.option);
  }

  // @HostListener('document:keydown.enter', ['$event'])
  // onEnterKey(event: KeyboardEvent): void {
  //   // event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
  //   this.translateFunc();   // Buton fonksiyonunu çağır
  // }
}
