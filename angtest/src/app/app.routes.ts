import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent, ResultComponent } from './components/index';

export const appRoutes: Routes  = [
  { path: 'form', component: FormComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'form' }
];

export const appRoutingProviders: any[] = [
  
];

export const CustomRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);
