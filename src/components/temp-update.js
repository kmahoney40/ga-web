import React from 'react';
// import ReactDOM from 'react-dom';
import './../index.css';
import Button from 'react-bootstrap/lib/Button'
import axios from 'axios';

class TempUpdate extends React.Component{
 
  constructor(props){
    super(props);
    this.state = {
      update: 'Click to get last update.'
    }
  }
  
  getUpdate(self){
    axios.get('http://52.9.238.232/api/piplates')
      .then(function(response){
      console.log(response.data);
      console.log(response.status);
      
      self.setState({
        update: response.data
      });
    });  
  }

  render(){
    return (
      <div>
        <Button variant="primary" onClick={() => this.getUpdate(this)}>PP</Button>
        <textarea rows="2" cols="150" value={this.state.update} ></textarea>
      </div>
    );
  }
}

export default TempUpdate;
