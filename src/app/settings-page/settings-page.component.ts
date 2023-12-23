import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatorConfig } from '../class/translator-config.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css',
})
export class SettingsPageComponent {
  translateOptions: Array<any> = JSON.parse(
    localStorage.getItem('translator-configs') || ''
  );
  languagesData = JSON.parse(localStorage.getItem('languages') || '');
  languages = Object.keys(this.languagesData);
  from: string = '';
  to: string = '';
  selectedOption: string = '';

  constructor() { }

  ngOnInit() { }

  addOption() {
    var from = this.from
    var to = this.to
    const some = this.translateOptions.some(function (obje) {
      return obje.id === `${from}-${to}`;
    });

    if (this.to !== '' && this.to !== this.from && !some) {
      const x = new TranslatorConfig(this.from, this.to);
      this.translateOptions.push(x);
      localStorage.setItem(
        'translator-configs',
        JSON.stringify(this.translateOptions)
      );
    } else {
      console.log("Eklenmedi")
    }
  }

  deleteOption() {
    var selectedOption = this.selectedOption;
    const x = this.translateOptions.filter(function (obj) {
      return obj.id !== selectedOption;
    });
    localStorage.setItem('translator-configs', JSON.stringify(x));
    this.translateOptions = x;
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }
}
