import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import * as fromApp from './store';
import {
  FooterComponent,
  NewTodoComponent,
  TodoListComponent,
  TodoListItemComponent,
} from './todos/components';
import { TodoComponent } from './todos/containers';
import { TodosService } from './todos/services';
import { TodosEffects } from './todos/store/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const routes: Routes = [
  { path: ':filter', component: TodoComponent },
  { path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    NewTodoComponent,
    TodoListComponent,
    TodoListItemComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.forRoot(fromApp.reducers, {
      metaReducers: fromApp.metaReducers,
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: fromApp.CustomRouterStateSerializer,
    }),
    EffectsModule.forRoot([TodosEffects]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'Todo MVP app using Angular & NgRx',
          maxAge: 50,
        })
      : [],
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [TodosService],
})
export class AppModule {}
