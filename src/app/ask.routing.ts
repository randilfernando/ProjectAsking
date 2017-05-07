import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {HOME_ROUTES} from "./components/home/home.routes";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {AuthGuard} from "./guards/auth.guard";
import {Error404Component} from "./components/error-pages/error-404/error-404.component";
import {Error403Component} from "./components/error-pages/error-403/error-403.component";

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'featured', pathMatch: 'full'},
  {path: '', component: HomeComponent, children: HOME_ROUTES, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forbidden', component: Error403Component},
  {path: '**', component: Error404Component}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
