import React, { Component } from 'react'
import Auxilliary from '../Auxilliary/Auxilliary';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import {connect} from 'react-redux';
class Layout extends Component {
    state={
        showSideDrawer:false
    }
    sideDrawerClosed=()=>{
          this.setState({
            showSideDrawer:false
          })
    }
    sideDrawertoggler=()=>{
        this.setState((prevState)=>{
          return {showSideDrawer:!prevState.showSideDrawer
          }
        })
    }
    
    render() {
        return (
            <div>
            <Auxilliary>
            <Toolbar isAuth={this.props.isAuthenticated}
            toggler={this.sideDrawertoggler}/>
            <SideDrawer  isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosed}/>
            <main className={classes.Content}>
            {this.props.children}
            </main>
            </Auxilliary>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        isAuthenticated:state.authReducer.token!==null
    }
}

export default connect(mapStateToProps)(Layout);
