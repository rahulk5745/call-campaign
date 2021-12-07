import React,{useState, Component } from 'react'
import { Form, Row, Col, Card, Button, Modal, Tabs, Tab } from 'react-bootstrap';
import fs from 'fs'

export default class AddCampaign extends React.Component {
  constructor() {
    super();
    this.state = {
      campaignName: "",
      fileData: "",
      numberData:"",
      calleridData:"",
      channelData:"",
      timeData:"1", 
      waitTime:"1",
      //delete:false
    };
  }
  onChangecCampaignName = e => {
    e.preventDefault();
    this.setState({
      campaignName: e.target.value
    });
  };

  onChangeNumber = e => {
    e.preventDefault();
    //const str = e.target.value
    //let data = new Blob([str],{type: 'text/plain'})
    this.setState({
     // numberData:  fs.writeFile('./number.csv',e.target.value.split(",")) 
     numberData:e.target.value
    } 
    );
  };

  // downloadTxtFile = (e) => {
  //   const element = document.createElement("a");
  //   const file = new Blob(e.target.value], {type: 'text/plain'});
  //   element.href = URL.createObjectURL(file);
  //   element.download = "myFile.txt";
  //   document.body.appendChild(element); // Required for this to work in FireFox
  //   element.click();
  // }
  onChangeCallerid = e => {
    e.preventDefault();
    this.setState({
      calleridData: e.target.value
    });
  };
  onChangeChannel = e => {
    e.preventDefault();
    this.setState({
      channelData: e.target.value
    });
  };
  onChangeTime = e => {
    e.preventDefault();
    this.setState({
      timeData: e.target.value
    });
  };

  onChangeWaitTime = e => {
    e.preventDefault();
    this.setState({
      waitTime: e.target.value
    });
  };


  onSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", this.uploadInput.files[0]);
    data.append("campaign", this.state.campaignName);
    data.append("number", this.state.numberData);
    //data.append("bn", this.state.numberData);

    data.append("callerid", this.state.calleridData);
    data.append("channel", this.state.channelData);
    data.append("time", this.state.timeData);
    data.append("waitTime", this.state.waitTime);
   
    console.log(data)
    fetch("http://localhost:8787/campaign", {
      method: "POST",
      body: data

    }).then(response => {
      if(response.status === 200) {
        //response.status === 200
      console.log("Started Successfully") ;
      console.log("ResponseStatus:"+response.status);
      return response.json();
      } else if(response.status !==200 ){
        console.log("Something went wrong")
        console.log("ResponseStatus:"+response.status);
        return response.json();
      } 
    });
    this.setState({
      campaignName: "",
      fileData: "",
      numberData:"",
      calleridData:"",
      channelData:"",
      timeData:"",
      waitTime:"",
      delete:true
    });
  };

  

  onDelete= e => {
    if( this.state.delete === true)
    {
      e.preventDefault();
      fetch("http://localhost:8787/del-campaign", {
        method: "DELETE"
        
      }).then(response => {
        if(response.status === 200) {
          //response.status === 200
        console.log("Deleted Successfully") ;
        console.log("ResponseStatus:"+response.status);
        return response.json();
        } else if(response.status !==200 ){
          console.log("Something went wrong")
          console.log("ResponseStatus:"+response.status);
          return response.json();
        } 
      });
      this.setState({
        campaignName: "",
        fileData: "",
        numberData:"",
        calleridData:"",
        channelData:"",
        timeData:"",
        waitTime:"",
        delete:false
      });
      
    };
    }
     

  render () {
    return(
        <div className="login-wrapper">
             <Form className="add-campaign-form" onSubmit={this.onSubmit}>
                            <Form.Group className=" input-wrapper">
                            <label className="label">Campaign Name&nbsp;<i className="ion-asterisk"></i></label>
											<Form.Control
											className="mobileBox "
											required
											name="Caimpaign Name"
                                            value={this.state.campaignName}
                                            onChange={this.onChangecCampaignName}
											type="text"


									/>
									</Form.Group>
                                         <Form.Group  controlId="prompt-file-upload">
                                         <div className=" input-wrapper">
                                         <label className="label">Profile&nbsp;<i className="ion-asterisk"></i></label>
                                         <input type="file" name="file"  ref={ref => {
                                        this.uploadInput = ref;
                                         }  }/>
                                         <input type="radio" value="" name="" /><textarea 
                                  className="postbox-tags-textarea"
                                  placeholder="Number"
                                  contentEditable
                                  suppressContentEditableWarning  
                                  onChange={this.onChangeNumber}>
                                </textarea>
                                           </div>
                                           

                                            {/* <div className=" input-wrapper">
                                            <label className="label">Number&nbsp;<i className="ion-asterisk"></i></label>
                                              <textarea value={this.state.numberData} onChange={this.onChangeNumber}>Number

                                            </textarea>
                                            </div> */}
                                            <div className=" input-wrapper">
                                               <input type="radio" value="" name="" />
                                            <label className="label">Caller Id&nbsp;<i className="ion-asterisk"></i></label>
                                               <textarea value={this.state.calleridData} onChange={this.onChangeCallerid}
                                  className="postbox-tags-textarea"
                                  placeholder="Caller Id"
                                  contentEditable
                                  suppressContentEditableWarning>
                                </textarea>
                                            </div>
                                    </Form.Group>

									<Form.Group className=" input-wrapper">
                  <label className="label">Channel&nbsp;<i className="ion-asterisk"></i></label>

                  <Form.Control
											className="mobileBox"
											required
											name="mobile"
                                            value={this.state.channelData}
                                            onChange={this.onChangeChannel}
											type="number"
											maxLength="10"
											default="10"

									/>
									</Form.Group>
									<Form.Group className=" input-wrapper">
                  <label className="label">Time Between Calls in seconds&nbsp;<i className="ion-asterisk"></i></label>

											<Form.Control
											className="mobileBox"
											required
											name="mobile"
                                            value={this.state.timeData}
                                            onChange={this.onChangeTime}
											type="number"
											maxLength="10"
											default="10"

									/>
									</Form.Group>
                  <Form.Group className=" input-wrapper">
                  <label className="label">Wait Time in seconds&nbsp;<i className="ion-asterisk"></i></label>

											<Form.Control
											className="mobileBox"
											required
											name="waitTime"
                                            value={this.state.waitTime}
                                            onChange={this.onChangeWaitTime}
											type="number"
											maxLength="10"
											default="10"

									/>
									</Form.Group>
                                    <Button variant="primary" type="submit">Start</Button>
                                    <Button variant="primary" onClick = {this.onDelete}>Stop</Button>
</Form>
        </div>
   )
}
}

