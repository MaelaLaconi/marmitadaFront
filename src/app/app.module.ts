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
import { DialogComponent } from './shared/dialog/dialog.component';
import { FormComponent } from './shared/form/form.component';
import { CardComponent } from './shared/card/card.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateComponent } from './update/update.component';
import {MatInputModule} from "@angular/material/input";
import { CategoryComponent } from './category/category.component';
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ResearchComponent } from './research/research.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RecipeComponent,
    CookbookComponent,
    DialogComponent,
    FormComponent,
    UpdateComponent,
    CardComponent,
    CategoryComponent,
    ResearchComponent
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
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatButtonToggleModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
