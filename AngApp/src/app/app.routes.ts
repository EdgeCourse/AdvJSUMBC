import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FrameworksComponent } from './pages/frameworks/frameworks.component';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'frameworks', component: FrameworksComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'admin', component: AdminComponent },
  ];
