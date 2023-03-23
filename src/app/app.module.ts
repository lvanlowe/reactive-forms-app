import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router'
import { ReactFormsComponent } from './react-forms/react-forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SkillFormComponent } from './skill-form/skill-form.component';


const routes: Routes = [
  { path: 'home', component: ReactFormsComponent },
  { path: 'skill', component: SkillFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ReactFormsComponent,
    SkillFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
