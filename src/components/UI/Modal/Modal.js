import React,{Component}  from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from './Backdrop/Backdrop';
import classes from './Modal.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !==this.props.show 
        || nextProps.children !==this.props.children 
    }
    render(){
    return (
        <Auxilliary>
        <Backdrop show={this.props.show}
        clicked={this.props.modalClosed}
        />
        <div 
        className={classes.Modal}
        disabled={!this.props.show}
        style={{
            transform:this.props.show ? 'translateY(0)' :
            'translateY(-200vh)'
            //opacity:props.show ? '1':'0'
        }}>
         {this.props.children}
        </div>
        </Auxilliary>
    )
}


}

export default Modal;
