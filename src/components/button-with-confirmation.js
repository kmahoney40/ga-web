import React from 'react';
import './../index.css';
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class ButtonWithConfirmation extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleYes = this.handleYes.bind(this);

    this.state = {
      showAlert: false,
      show: false,
      errMsg: ''
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleYes(){
    this.postDoor(this);
  }

  postDoor(self){
    axios.post('http://52.9.238.232/api/door?cmd=true')
      .then(function(response){
        console.log(response.status);
        if(response.status === 200){
          self.setState({ show: false });
        } else {
          console.log(response.status);
          self.setState({ errMsg: response.status + ' ' + response.message })
        }
      }
    )
    .catch(err => {console.log(err); this.setState({ errMsg: err.message + ': Try again?' })});
  }

  handleShow() {
    this.setState({ show: true });
  }

  render(){
    return (
      <div>
        <Button bsstyle="primary" bssize="large" onClick={this.handleShow}>
          Toggel Door
        </Button>
        <Modal className="static-modal" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Toggle Door?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <label>{this.state.errMsg}</label>
            <Button className="btn-warning" onClick={this.handleYes}>Yes</Button>
            <Button onClick={this.handleClose}>No</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ButtonWithConfirmation;
