import { Car } from './carservice';
import { CarActions, ADDCAR, REMOVECAR, SETCAR, UPDATECAR } from './common.action';
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
    
          return {
              ...state,
              cars: action.payload
            };
        case UPDATECAR:
            
           let updatedstate = Object.assign({},state)
           let Index        = updatedstate.cars.findIndex(car=>car.id === action.payload.id);
           console.log(action.payload);
           console.log(Index);
           updatedstate.cars[Index] = action.payload;
           console.log(updatedstate);
           return updatedstate;
            // cars: { ...state.cars.find(ex => ex.id === action.payload.id) }
          
        default: {
            return state;
          }
    }
}
export const getCarState = createFeatureSelector<any>('common');
export const getAvailableCars = createSelector(getCarState, (state: any) => state?state.cars:[]);