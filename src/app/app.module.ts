import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { ExperienciaItemComponent } from './components/experiencia-item/experiencia-item.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { EducacionItemComponent } from './components/educacion-item/educacion-item.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillsItemComponent } from './components/skills-item/skills-item.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ProyectosItemComponent } from './components/proyectos-item/proyectos-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AddExperienciaComponent } from './components/add-experiencia/add-experiencia.component';
import { UpdateExperienciaComponent } from './components/update-experiencia/update-experiencia.component';
import { AddEducacionComponent } from './components/add-educacion/add-educacion.component';
import { UpdateEducacionComponent } from './components/update-educacion/update-educacion.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    SobreMiComponent,
    ExperienciaComponent,
    ExperienciaItemComponent,
    EducacionComponent,
    EducacionItemComponent,
    SkillsComponent,
    SkillsItemComponent,
    ProyectosComponent,
    ProyectosItemComponent,
    FooterComponent,
    LoginComponent,
    AddExperienciaComponent,
    UpdateExperienciaComponent,
    AddEducacionComponent,
    UpdateEducacionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgxTypedJsModule,
    NgCircleProgressModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
