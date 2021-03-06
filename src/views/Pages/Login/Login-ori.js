import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import auth from "../../../auth";
class Login extends Component {


  constructor(props){
    super(props)
    this.state = {

      username:"",
      password:"",
      authenticated:{
        status:false,
        region:"",
        division:"",
         ldapBind: "",
         ldapSearch: "",
        invalidTmUser:"", 
        invalidTmUser2: "", 
        LdapFailedfindUser: "", 
        wrongPass: "",
        wrongUsername: ""
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleChange2(event) {
    this.setState({password: event.target.value});
  }


  render() {
   // console.log('auth',auth.isAuthenticated());
    
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                  {/* <span>{auth.isAuthenticated().ldapSearch}</span> */}
                    <Form /*action="/dco/login" method="post" */>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username"  id="username" name="username"  autoComplete="username" onChange={this.handleChange}  />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" id="password" name="password" autoComplete="current-password"  onChange={this.handleChange2} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4"   onClick={() => {
                            auth.handleLogin(this.state.username,this.state.password,() => {
                              this.props.history.push("/");
                            });
                          }} 
                          >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                    <img src="/assets/img/avatars/telekom.png"/>
                    <h2>TM iSHIELDs</h2><h4>New USER</h4>
                      {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p> */}
                      <a href="https://idss.tm.com.my/idss/">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
