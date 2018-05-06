
import { Action } from '@ngrx/store';

export const ADDCAR = '[Car] Add Car';
export const REMOVECAR = '[Car] Remove Car';
export const SETCAR = '[Car] SET Car';

export class AddCar implements Action {
    readonly type = ADDCAR;
    constructor(public payload: any) {}
}
export class RemoveCar implements Action {
    readonly type = REMOVECAR;
    constructor(public payload: any) {}
}
export class SetCar implements Action {
    readonly type = SETCAR;
    constructor(public payload: any) {
        console.log('invokeds')
    }
}

export type CarActions = AddCar | RemoveCar |SetCar;