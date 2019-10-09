import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicInformationComponent } from './form/components/basic-information/basic-information.component';


const routes: Routes = [{
  path: '',
  component: BasicInformationComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
