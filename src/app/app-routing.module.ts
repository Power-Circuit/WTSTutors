import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
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
    path: 'viewlesson',
    loadChildren: () => import('./pages/viewlesson/viewlesson.module').then( m => m.ViewlessonPageModule)
  },
  {
    path: 'profileselect',
    loadChildren: () => import('./pages/profileselect/profileselect.module').then( m => m.ProfileselectPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
 
  {
    path: 'comment',
    loadChildren: () => import('./pages/comment/comment.module').then( m => m.CommentPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./pages/aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'requestpremium',
    loadChildren: () => import('./pages/requestpremium/requestpremium.module').then( m => m.RequestpremiumPageModule)
  },
  {
    path: 'adminrequests',
    loadChildren: () => import('./pages/adminrequests/adminrequests.module').then( m => m.AdminrequestsPageModule)
  },
  {
    path: 'studyguide',
    loadChildren: () => import('./pages/studyguide/studyguide.module').then( m => m.StudyguidePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
