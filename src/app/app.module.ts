import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularCesiumModule } from 'angular-cesium';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RemoveCesiumStuffDirective } from './remove-cesium-stuff.directive';
@NgModule({
  declarations: [
    AppComponent,
    RemoveCesiumStuffDirective
  ],
  imports: [
    BrowserModule,
    AngularCesiumModule.forRoot(),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
