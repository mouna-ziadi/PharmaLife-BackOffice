import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserComponent } from './views/user-management/user.component';
import { DeliveryPersonComponent } from './views/deliveryP-management/delivery-person.component';
import { LoginComponent } from './views/login/login.component';
import { ProductManagementComponent } from './views/product-management/product-management.component';
import { StatComponent } from './StatComponent/stat/stat.component';
import { ArticleComponent } from './views/article/article.component';
import { CommentComponent } from './views/comment/comment.component';
import { CommandsComponent } from './views/purchase-commands/commands/commands.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {path: 'users', component: UserComponent},
  {path: 'deliveryPersons', component: DeliveryPersonComponent},
  {path: 'login', component:LoginComponent},
  {path:'product-management',component: ProductManagementComponent},
  {path:'',component:StatComponent},
  {path:'article-management',component: ArticleComponent},
  {path:'comment-management',component: CommentComponent},
  {path:'dashboardCommandsPurchase',component: CommandsComponent},

  

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
