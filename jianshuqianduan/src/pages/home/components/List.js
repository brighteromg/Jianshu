import React,{PureComponent} from "react";
import {ListItem,ListInfo,LoadMore} from '../style'
import {actionCreators} from '../store';
import{connect} from 'react-redux';
import {Link} from 'react-router-dom';
class List extends PureComponent{
    render(){
        const {list,page,getMoreList} =this.props;
        return(
            <div>{
                list.map ((item,index) => {
                    return(
                        <Link key={index} to={'./detail/'+item.get('id')}>
                        <ListItem>
                        <img 
                         className="list-pic"
                         src= {item.get('imgUrl')}
                         alt=''
                         />
                        <ListInfo>
                       <div className="title">{item.get('title')}</div>
                       <p className="desc">{item.get('desc')}</p>
                       </ListInfo>
                       </ListItem>
                       </Link>
                    )
                })
                }
                <LoadMore
                onClick={()=> getMoreList(page)}
                >更多文字</LoadMore>
            </div>
        )
    }
}
const mapState =(state)=>({
    list:state.getIn(['home','articleList']),
    page:state.getIn(['home','articlePage'])
});
const mapDispatch =(dispatch)=>({
    getMoreList(page){
        dispatch(actionCreators.getMoreList(page))
    }
});
export default connect(mapState,mapDispatch)(List);