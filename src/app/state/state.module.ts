import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from "@angular/core";
import {StoreModule,} from '@ngrx/store'
import{routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'
import { environment } from "../../environments/environment";
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

@NgModule({
    imports: [
      CommonModule,
      StoreModule.forRoot({ routerReducer: routerReducer}),
      StoreRouterConnectingModule.forRoot(),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    declarations: []
  })
  export class StateModule {
  
    constructor(@Optional() @SkipSelf() parentModule: StateModule) {
      if (parentModule) {
        throw new Error(
          'StateModule is already loaded. Import it in the AppModule only');
      }
    }
  
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: StateModule,
        providers: []
      };
    }
  
  }