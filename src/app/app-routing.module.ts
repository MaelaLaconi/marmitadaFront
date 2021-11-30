import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {CookbookComponent} from "./cookbook/cookbook.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {UpdateComponent} from "./update/update.component";
import {CategoryComponent} from "./category/category.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'cookbook', component: CookbookComponent },
  { path: 'edit/:id', component: UpdateComponent },
  { path: 'category/:category', component: CategoryComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
