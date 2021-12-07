import React, { Component } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row, Modal, Tabs, Tab} from 'react-bootstrap';
import {  } from 'react-bootstrap';
//import { Fetcher } from '../../Helpers/fetcher.js';
import { isEmpty } from 'lodash';
import "./index.css";


class Login extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			username: '',
			password: ''
		}
	}

	 setvalue = ( e ) => {
		 console.log(e.target.value)
		this.setState( {
			[ e.target.name ]: e.target.value,
		} );
	}

	 loginUser = ( e ) => {
	 	e.preventDefault();
		const username = this.state.username;
		const password = this.state.password;

		 if(username === 'rahul' && password  === 'rahul'){
			this.setState({
				username: '',
				password:''
			})
			window.location.href='/add-campaign'	 
		 }
		
		
	// 	const username = this.state.username;
	// 	const password = this.state.password;

	// 	if ( username === '' || password === '' ) {
	// 		this.setState( {
	// 			showModal: true,
	// 			modalHeading: 'Error',
	// 			modalContent: 'Please enter username & password.'
	// 		} )
	// 	} else {
	// 		const data = {
	// 			username: username,
	// 			password: password
	// 		}
	// 		return Fetcher.post( this.props.app.apiPath + '/login', { headers: { "Content-type": "application/json" }, method: 'POST', body: JSON.stringify( data ) } )
	// 			.then( res => {

	// 				console.log(res);
	// 				let modalHeading;
	// 				if ( res.message === 'Bad credentials' ) {
	// 					modalHeading = 'Error';
	// 					this.setState( {
	// 						showModal: true,
	// 						modalHeading: modalHeading,
	// 						modalContent: 'Wrong username or password.'
	// 					} )
	// 				} else if ( !isEmpty( res.token ) && !isEmpty( res.userid ) ) {

	// 					modalHeading = 'Success';
	// 					this.props.setUserToken( res.userid, res.token, res.role )

	// 				}else{
	// 					console.log('Login failed:',res);
	// 				}
	// 			} )
	// 			.catch( err => {
	// 				console.log( 'Error in Login', err )
	// 				this.setState( {
	// 					showModal: true,
	// 					modalHeading: 'Error',
	// 					modalContent: err.message
	// 				} )
	// 			} );

	// 	}
	 }

	// setMessageShow = ( status ) => {
	// 	this.setState( {
	// 		showModal: status,
	// 	} );
	//}

	 startstop() {
		 document.getElementById('stop_btn').innerHTML = 'Stop';
	 }
	render() {
		return (
			<div className="app flex-row align-items-center">
				<Container>
					<Row className="justify-content-center">
						<Col md="4"  className="login-wrapper">
							<Card className="p-4">
								<Card.Body>
									<Form onSubmit={this.loginUser}>
										

										<h2 className="serviceName">Please Login</h2>
										<InputGroup className="mb-3 input-wrapper">
											<label htmlFor="username" className="label">Username&nbsp;<i className="ion-asterisk"></i></label>
											<Form.Control className="field-username" name="username" type="text" placeholder="Username" onChange={e => this.setvalue( e )} value={this.state.username} autoComplete="username" />
										</InputGroup>
										<InputGroup className="mb-4 input-wrapper">
											<label htmlFor="password" className="label">Password&nbsp;<i className="ion-asterisk"></i></label>
											<Form.Control name="password" type="password" placeholder="Password" onChange={e => this.setvalue( e )} value={this.state.password} autoComplete="current-password" />
										</InputGroup>
										{this.state.showModal&& <div className="login-error">{this.state.modalContent}</div>}
										<Row>
											<Col xs="6">
												<Button type="submit" color="primary" onClick="startstop()" className="px-4">Login</Button>
											</Col>
											{/* <Col xs="6" className="text-right">
													<Button color="link" className="px-0">Forgot password?</Button>
												</Col> */}
										</Row>
									</Form>
									
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>

			</div>
		);
	}
}

export default Login;