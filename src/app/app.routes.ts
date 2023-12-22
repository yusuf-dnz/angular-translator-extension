import { Routes } from '@angular/router';
import { TranslatorPageComponent } from './translator-page/translator-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

export const routes: Routes = [
  { path: 'translator-page', component: TranslatorPageComponent },
  { path: 'settings-page', component: SettingsPageComponent },
];
