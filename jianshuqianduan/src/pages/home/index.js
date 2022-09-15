import React,{PureComponent} from "react";
import { connect } from "react-redux";
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import {actionCreators} from './store';
import {HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './style';

class Home extends PureComponent{
    
    handleScrollTop(){
        window.scrollTo(0,0);
    }

    render(){
        return(
            <HomeWrapper>
                <HomeLeft>
                    <img
                    alt="" 
                    className="banner-img" 
                    src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
                    />
                    <Topic/>
                    <List/>
                </HomeLeft>
                <HomeRight>
                    <Recommend/>
                    <Writer/>
                </HomeRight>
                {this.props.showScroll?<BackTop onClick={this.handleScrollTop}>回到顶部</BackTop>:null}
            </HomeWrapper>
        )
    }
    componentDidMount(){
            this.props.changeHomeData();
            this.bindEvents()
        }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.props.changeScrollShow)
    }
    bindEvents(){
        window.addEventListener('scroll',this.props.changeScrollShow)
    }

}
const mapState=(state)=>({
    showScroll:state.getIn(['home','showScroll'])
})
const mapDispatch=(dispatch) =>({
    changeHomeData(){
        dispatch(actionCreators.getHomeInfo());
},
    changeScrollShow(){
        if(document.documentElement.scrollTop>100){
            dispatch(actionCreators.toggleTopShow(true));
        }else{
            dispatch(actionCreators.toggleTopShow(false));
        }
    }
})

export default connect(mapState,mapDispatch)(Home);