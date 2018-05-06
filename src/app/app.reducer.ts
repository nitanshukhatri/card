import {Action} from '@ngrx/store';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCommon from './services/common.reducer';
// export interface State{
//     common:fromCommon.State
// }
// export interface State{
//     ui:fromUi.State
//     auth:fromAuth.State
// }

export  const reducers:ActionReducerMap<any> ={
    
    common:fromCommon.commonReducer

}
