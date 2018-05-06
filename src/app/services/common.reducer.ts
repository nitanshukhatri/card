import { Car } from './carservice';
import { CarActions, ADDCAR, REMOVECAR, SETCAR } from './common.action';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';


export function commonReducer(state , action: CarActions) {
    switch (action.type) {
        case ADDCAR:
            var newState=Object.assign({},state)
            console.log(newState,'newState')
            newState.cars.push(action.payload)
            return newState;
            
        case REMOVECAR:
        return {
            ...state,
            cars: action.payload
          };
          case SETCAR:
          console.log('setcar')
          return {
              ...state,
              cars: action.payload
            };
        default: {
            return state;
          }
    }
}
export const getCarState = createFeatureSelector<any>('common');
export const getAvailableCars = createSelector(getCarState, (state: any) => state?state.cars:[]);