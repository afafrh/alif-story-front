import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ConceptComponent } from './pages/concept/concept.component';

const routes: Routes = [
  {path: 'concept', component: ConceptComponent}, // Route to ConceptComponent
  { path: 'about-us', component: AboutUsComponent }, // Route to AboutUsComponent
  { path: '', component: HomeComponent }, // Ensure HomeComponent is your default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
