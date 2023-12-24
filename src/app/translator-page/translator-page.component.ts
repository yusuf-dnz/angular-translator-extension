import { Component, HostListener } from '@angular/core';
import { TranslatorApiService } from '../utils/translator-api.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatorConfig } from '../class/translator-config.model';
import { Router } from '@angular/router';

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
  translateOptions: Array<any> = JSON.parse(
    localStorage.getItem('translator-configs') || ''
  );
  option: number = 0;
  selectedOption: string = '';


  constructor(
    private translatorService: TranslatorApiService,
    private router: Router
  ) { }

  ngOnInit() { }

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
        }
      );
  }

  translateFunc() {
    this.translate();
  }
  selectOption(option: string) {
    const x = this.translateOptions.findIndex(function (obj) {
      return obj.id === option;
    });
    this.option = x;
  }

  goSettings() {
    this.router.navigate(['settings-page']);
  }
  copyToClipboard() {
    navigator.clipboard.writeText(this.translatedValue.text)
      .then(function () {
      })
      .catch(function (err) {
        console.error("Clipboard error! ", err);
      });
  }
  @HostListener('document:keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent): void {
    event.preventDefault();
    this.translateFunc();
  }

}
