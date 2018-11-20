import React from 'react';
import './../index.css';
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class ButtonWithConfirmation extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleYes = this.handleYes.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleYes(){
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render(){
    return (
      <div>
        <p>Click to get the full Modal experience!</p>

        <Button bsstyle="primary" bssize="large" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal className="static-modal" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Toggle Door?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button className="btn-warning" onClick={this.handleYes}>Yes</Button>
            <Button onClick={this.handleClose}>No</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ButtonWithConfirmation;
