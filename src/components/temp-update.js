import React from 'react';
import './../index.css';
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/FormCheckLabel'
import axios from 'axios';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class TempUpdate extends React.Component{
 
  constructor(props){
    super(props);
    this.state = {
      update: 'Click to get last update.',
      errMsg: '',
      temp_1: '',
      temp_2: '',
      temp_3: '',
      fan_on: '',
      charger_on: '',
      voltage: '',
      dt_created: ''
    }
  }
  
  getUpdate(self){
    axios.get('http://52.9.238.232/api/piplates')
      .then(function(response){
        console.log(response.data);
        console.log(response.status);
        if(response.status === 200){
          self.setState({ update: response.data,
                          errMsg: '' });
          self.parseUpdate(response.data);
        } else {
          console.log(response.status);
          self.setState({ update: '',
                          errMsg: response.status + response.message });
        }
      })
      .catch(err => 
        { console.log(err); 
          this.setState({ update: '',
                          errMsg: err.message })});  
  }

  parseUpdate(update){
    const jObj = JSON.parse(update);
    this.setState({temp_1: jObj.temp_1.toString()});
    this.setState({temp_2: jObj.temp_2.toString()});
    this.setState({temp_3: jObj.temp_3.toString()});
    this.setState({fan_on: jObj.fan_on.toString()});
    this.setState({charger_on: jObj.charger_on.toString()});
    this.setState({voltage: jObj.voltage.toString()});
    this.setState({dt_created: jObj.dt_created});
  }

  render(){
    return (
      <div>
        <Button variant="primary" onClick={() => this.getUpdate(this)}>PP</Button>
        <textarea readOnly rows="2" cols="120" value={this.state.errMsg + this.state.update} ></textarea>
        <Form inline>
          <FormGroup controlId="formTemp1Textarea">
            <ControlLabel>Temp 1&nbsp;</ControlLabel>
            <FormControl componentclass="textarea" placeholder="..." style={{width: "75px"}} defaultValue={this.state.temp_1}></FormControl>
          </FormGroup>
          &nbsp;
          <FormGroup controlId="formTemp2Textarea">
            <ControlLabel>Temp 2&nbsp;</ControlLabel>
            <FormControl componentclass="textarea" placeholder="..." style={{width: "75px"}} defaultValue={this.state.temp_2}></FormControl>
          </FormGroup>
          <FormGroup controlId="formTemp3Textarea">
            <ControlLabel>Temp 3&nbsp;</ControlLabel>
            <FormControl componentclass="textarea" placeholder="..." style={{width: "75px"}} defaultValue={this.state.temp_3}></FormControl>
          </FormGroup>
          <FormGroup controlId="formTempFanOn">
            <ControlLabel>fan on&nbsp;</ControlLabel>
            <FormControl componentclass="textarea" placeholder="..." style={{width: "75px"}} defaultValue={this.state.fan_on}></FormControl>
          </FormGroup>
          <FormGroup controlId="formTempChargerOn">
            <ControlLabel>Temp 3&nbsp;</ControlLabel>
            <FormControl componentclass="textarea" placeholder="..." style={{width: "75px"}} defaultValue={this.state.charger_on}></FormControl>
          </FormGroup>
          <FormGroup controlId="formTempvoltage">
            <ControlLabel>Voltage&nbsp;</ControlLabel>
            <FormControl componentclass="textarea" placeholder="..." style={{width: "75px"}} defaultValue={this.state.voltage}></FormControl>
          </FormGroup>
          <FormGroup controlId="formTempDtCreated">
            <ControlLabel>Created&nbsp;</ControlLabel>
            <FormControl componentclass="textarea" placeholder="..." style={{width: "75px"}} defaultValue={this.state.dt_created}></FormControl>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default TempUpdate;
