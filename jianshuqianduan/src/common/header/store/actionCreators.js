import * as actionTpyes from './actionTypes';
import { fromJS } from 'immutable';
import axios from 'axios';

const changeList= (data)=>({
    type:actionTpyes.CHANGE_LIST,
    data:fromJS(data),
    totalPage:Math.ceil(data.length/5)
});
export const searchFocus =()=>({
    type:actionTpyes.SEARCH_FOCUS
});
export const searchBlur =()=>({
    type:actionTpyes.SEARCH_BLUR
});
export const changeMouseEnter =()=>({
    type:actionTpyes.CHANGE_MOUSE_ENTER
});
export const changeMouseLeave =()=>({
    type:actionTpyes.CHANGE_MOUSE_LEAVE
});
export const changePage =(page)=>({
    type:actionTpyes.CHANGE_PAGE,
    page
});
export const getList =()=>{
    return(dispatch)=>{
        axios.get('/api/headerList.json').then((res)=>{
            const data =res.data;
            dispatch(changeList(data.data));
        }).catch(()=>{
            console.log('error');
        })
    }
};