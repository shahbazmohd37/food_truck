import {GETTRUCKDATA} from '../action/index';

export default function foodTruckReducer(state = [], action) {
    switch(action.type) {
        case GETTRUCKDATA: 
           return Object.assign({}, state,{truckDetails: action.data});
        default :
        return state;
    }
}
