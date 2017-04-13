import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AskComponent } from './ask.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidePanelComponent } from './shared/side-panel/side-panel.component';
import { ModuleSummaryComponent } from './shared/module/module-summary.component';
import { ModuleSummaryListComponent } from './shared/module/module-summary-list.component';
import { LoginFormComponent } from './shared/login-form/login-form.component';
import { AboutusComponent } from './shared/about-us/aboutus.component';
import { LoginheaderComponent } from './shared/header/loginheader.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule} from "@angular/router";
import { SignUpFormComponent } from './shared/sign-up-form/sign-up-form.component';
import { QuestionSummaryComponent } from './shared/question/question-list/question-summary.component';
import { QuestionListComponent } from './shared/question/question-list/question-list.component';
import { routing } from "./ask.routing";
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthenticationService } from "./services/authentication.service";
import { AuthGuard } from "./guards/auth.guard";
import { ModuleService } from "./services/module.service";
import { FeaturedComponent } from './components/home/featured/featured.component';
import { QuestionService } from "./services/question.service";
import { QuestionDescriptionComponent } from "./shared/question/question-add/question-description.component";
import { SearchQuestionsComponent } from "./components/home/search-question/search-questions.component";
import { SearchModuleComponent } from './components/home/search-module/search-module.component';
import { ModuleDetailsComponent } from './components/home/module-details/module-details.component';
import { AddQuestionComponent } from './components/home/add-question/add-question.component';
import { QuestionDetailsComponent } from './shared/question/question-add/question-details.component';
import { InputErrorComponent } from './shared/messages/input-error/input-error.component';

@NgModule({
  declarations: [
    AskComponent,
    HeaderComponent,
    FooterComponent,
    SidePanelComponent,
    ModuleSummaryComponent,
    ModuleSummaryListComponent,
    LoginFormComponent,
    AboutusComponent,
    LoginheaderComponent,
    HomeComponent,
    QuestionDescriptionComponent,
    SignUpFormComponent,
    QuestionSummaryComponent,
    QuestionListComponent,
    LoginComponent,
    SignUpComponent,
    FeaturedComponent,
    SearchQuestionsComponent,
    SearchModuleComponent,
    ModuleDetailsComponent,
    AddQuestionComponent,
    QuestionDetailsComponent,
    InputErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    routing
  ],
  providers: [
    AuthenticationService,
    ModuleService,
    QuestionService,
    AuthGuard
  ],
  bootstrap: [AskComponent]
})
export class AppModule { }
