import React,{PureComponent} from "react";
import { connect } from "react-redux";
import {DetailWrapper,Header,Content} from './style';
import {actionCreators} from './store'
import {useParams}from "react-router-dom";


function myWithRouter(Detail) {
    return (props) => {
      return <Detail {...props} params={useParams()} />
    }
  } ;

class Detail extends PureComponent{
    render(){
        return(
            <DetailWrapper>
                <Header>{this.props.title}</Header>
                <Content 
                dangerouslySetInnerHTML={{__html:this.props.content}}
                />
            </DetailWrapper>
        )
    }
    componentDidMount(){
        this.props.getDetail(this.props.params.id);
    }
}

const mapState = (state)=>({
    title:state.getIn(['detail','title']),
    content:state.getIn(['detail','content'])
});

const mapDispatch = (dispatch)=>({
    getDetail(id){
        dispatch(actionCreators.getDetail(id));
    }
});

export default connect(mapState,mapDispatch)(myWithRouter(Detail));