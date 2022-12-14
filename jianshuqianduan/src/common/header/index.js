import React,{Component} from "react";
import {connect} from "react-redux";
import { CSSTransition } from "react-transition-group";
import { actionCreators } from './store';
import { Link } from "react-router-dom";
import {actionCreators as loginActioncreators} from '../../pages/login/store'
import { HeaderWrapper,Logo,Nav,NavItem,NavSearch,
         Addition,Button,SearchWrapper,SearchInfo,
         SearchInfoTitle,SearchInfoSwitch,SearchInfoList,
         SearchInfoItem} 
    from "./style";

class Header extends Component{
    getListArea = ()=>{
        const {focused,list,page,mouseIn,totalPage,
            handleMouseEnter,handleMouseLeave,handleChangePage}=this.props;
        const jsList=list.toJS();
        const pageList=[];

        if(jsList.length){
             for(let i=((page-1)*5);i<(page*5);i++){
            pageList.push(
                <SearchInfoItem
                key= {jsList[i]}
                >{jsList[i]}</SearchInfoItem>
            )
        }
        }
        if(focused|| mouseIn){
            return(
                <SearchInfo 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                  <SearchInfoTitle>
                    热门搜索
                    <SearchInfoSwitch
                    onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}
                    >
                        <i 
                        ref={(icon)=>{this.spinIcon=icon}}
                        className="iconfont spin">&#xe851;</i>
                        换一批</SearchInfoSwitch>
                  </SearchInfoTitle>
                  <SearchInfoList>
                    {pageList}
                  </SearchInfoList>
               </SearchInfo>
            )
        }else{
            return null;
        }
    }
    render(){
        const {focused,handleInputFocus,handleInputBlur,list,login,logout}=this.props;
        return(
            <HeaderWrapper>
    <Link to='./'><Logo/></Link>
    <Nav>
       <Link to={'./'}><NavItem className="left active">首页</NavItem></Link>
       <NavItem className="left">下载APP</NavItem>
       {
        login?
        <NavItem className="right" onClick={logout}>退出</NavItem>:
        <Link to={'/login'}><NavItem className="right">登录</NavItem></Link>
       }
       <NavItem className="right">
           <i className="iconfont">&#xe636;</i>
           </NavItem>
     <SearchWrapper>
           <CSSTransition
             in={focused}
             timeout={200}
             classNames="slide"
           >
           <NavSearch
           className={focused?'focused':''}
           onFocus={()=>handleInputFocus(list)}
           onBlur={handleInputBlur}
           ></NavSearch>
           </CSSTransition>
           <i className={focused?'focused iconfont zoom':'iconfont zoom'}
           >&#xe848;</i>
           {this.getListArea(focused)}
       </SearchWrapper>
    </Nav>
    <Addition>
        <Link to={'/write'}>
        <Button className="writting">
        <i className="iconfont">&#xe600;</i>
           写文章</Button> 
        </Link>
        <Button className="reg">注册</Button>
     
    </Addition>
    </HeaderWrapper>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        focused:state.getIn(['header','focused']),
        list: state.getIn(['header','list']),
        page: state.getIn(['header','page']),
        mouseIn:state.getIn(['header','mouseIn']),
        totalPage:state.getIn(['header','totalPage']),
        login:state.getIn(['login','login'])
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        handleInputFocus(list){
            (list.size ===0)&& dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.changeMouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.changeMouseLeave());
        },
        handleChangePage(page,totalPage,spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');
            if(originAngle){
                originAngle= parseInt(originAngle,10);
            }else{
                originAngle=0;
            }
            spin.style.transform='rotate('+(originAngle+360)+'deg)'; 
            if(page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
        },
        logout(){
            dispatch(loginActioncreators.logout())
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);