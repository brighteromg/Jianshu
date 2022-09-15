import React,{PureComponent} from "react";
import { connect } from "react-redux";
import {Navigate} from "react-router";
import {useParams}from "react-router-dom";


function myWithRouter(Write) {
    return (props) => {
      return <Write {...props} params={useParams()} />
    }
  } 

class Write extends PureComponent{
    render(){
        const {loginStatus}=this.props;
        if(loginStatus){
            return(
            <div>写文章</div>
        )
        }else{
            return <Navigate to="/login"/>
        }
        
    }
}
const mapState =(state)=>({
    loginStatus:state.getIn(['login','login'])
})
export default connect(mapState,null)(myWithRouter(Write));