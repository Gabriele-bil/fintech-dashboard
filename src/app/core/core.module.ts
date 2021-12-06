import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { AuthInterceptor } from './modules/auth/interceptors/auth.interceptor';
import { StoreModule } from "@ngrx/store";
import { coreFeatureKey, coreReducer } from "./store/core.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CoreEffects } from "./store/core.effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(coreFeatureKey, coreReducer),
    EffectsModule.forFeature([CoreEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule { }
