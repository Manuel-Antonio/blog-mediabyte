import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticleListComponent, canActivate: [AuthGuard] },
  { path: 'articles/new', component: ArticleFormComponent, canActivate: [AuthGuard]  },
  { path: 'articles/edit/:id', component: ArticleFormComponent, canActivate: [AuthGuard]  },
  { path: 'articles/:id', component: ArticleDetailComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
