import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
    path: '',
    redirectTo: 'login',
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
  },  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'cloudlessons',
    loadChildren: () => import('./pages/cloudlessons/cloudlessons.module').then( m => m.CloudlessonsPageModule)
  },
  {
    path: 'uploadlesson',
    loadChildren: () => import('./pages/uploadlesson/uploadlesson.module').then( m => m.UploadlessonPageModule)
  },
  {
    path: 'playvid',
    loadChildren: () => import('./pages/playvid/playvid.module').then( m => m.PlayvidPageModule)
  },
  {
    path: 'viewlesson',
    loadChildren: () => import('./pages/viewlesson/viewlesson.module').then( m => m.ViewlessonPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
