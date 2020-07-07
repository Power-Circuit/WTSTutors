import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

 /* {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },*/
  
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'land',
    loadChildren: () => import('./pages/land/land.module').then( m => m.LandPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'chalkboard',
    loadChildren: () => import('./pages/chalkboard/chalkboard.module').then( m => m.ChalkboardPageModule)
  },
  {
    path: 'lessontype',
    loadChildren: () => import('./pages/lessontype/lessontype.module').then( m => m.LessontypePageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'viewtutorial',
    loadChildren: () => import('./pages/viewtutorial/viewtutorial.module').then( m => m.ViewtutorialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
