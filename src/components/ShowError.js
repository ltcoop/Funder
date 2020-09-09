import React from 'react';
import Modal from 'react-bootstrap/Modal';

class ShowError extends React.Component {
  constructor(props) {
    super(props);	
	
  }

  state = {
	shown: false,
	showModal: false  
  }   
  
  static getDerivedStateFromProps(props, state) {
//alert(this.props.showModal);	  
     if (!state.shown && props.showModal != state.showModal) {
		 //alert(state.showModal);
		 return {
			 
			 showModal: props.showModal
	     }
	 }
	 else {
		 
		 return null
	 }
  }
  
  render() {
	  
    return (
	  <Modal
        bsSize="sm"	  
	    show={this.state.showModal}
		onHide={() => this.setState({ shown: true, showModal: false })}
	  >
	    <Modal.Header closeButton>
		No Data Found
		</Modal.Header>
	    <Modal.Body>{this.props.errmsg}</Modal.Body>
	  </Modal>
	
    );
  }

}

export default ShowError;