import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'professor',
    loadChildren: './professor/professor.module#ProfessorPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'professor-novo',
    loadChildren: './professor-novo/professor-novo.module#ProfessorNovoPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'professor-editar/:id',
    loadChildren: './professor-editar/professor-editar.module#ProfessorEditarPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'professor-detalhe/:id',
    loadChildren: './professor-detalhe/professor-detalhe.module#ProfessorDetalhePageModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
