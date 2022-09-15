import * as actionTpyes from './actionTypes';
import { fromJS } from 'immutable';

const defaultState =fromJS({
    focused:false,
    mouseIn:false,
    list:[],
    page:1,
    totalPage:1
});

export default (state=defaultState,action)=>{
    switch (action.type){
        case actionTpyes.SEARCH_FOCUS:
            return state.set('focused',true);
        case actionTpyes.SEARCH_BLUR:
            return state.set('focused',false);
        case actionTpyes.CHANGE_LIST:
            return state.merge(
                {
                    list:action.data,
                    totalPage:action.totalPage
                }
            );
        case actionTpyes.CHANGE_MOUSE_ENTER:
            return state.set('mouseIn',true);
        case actionTpyes.CHANGE_MOUSE_LEAVE:
            return state.set('mouseIn',false);
        case actionTpyes.CHANGE_PAGE:
            return state.set('page',action.page);
        default:return state;
    }
}

