import { HeaderInterceptor } from './services/header-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { TableGridComponent, CreateDialogComponent } from './table-grid/table-grid.component';
 import {AppRoutingModule} from './app-routing.module';
import { AppContentComponent } from './app-content/app-content.component';
// import { AppHeaderComponent } from './app-header/app-header.component';
import {TableModule} from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StateModule } from "./state/state.module";
import { CommonService } from './services/common.service';
import { reducers } from './app.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    TableGridComponent,
    AppContentComponent,
    HeaderComponent,
    SidenavListComponent,
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers,{
      initialState: {
        auth: {
          loggedIn: true,
        },
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
  ],
  providers: [
    AppRoutingModule,
    CommonService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true } 
  
  ],
  entryComponents:[
    CreateDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
