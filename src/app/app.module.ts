import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RecipeComponent,
    CookbookComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatButtonModule,
        MatListModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
