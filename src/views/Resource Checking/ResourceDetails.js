import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,Progress
} from 'reactstrap';
import TableRack from './RackTable';
import TableSpace from './SpaceTable';
import TableNetwork from './NetworkTable';
import { connect } from "react-redux";

class ResourceDetails extends Component {
    constructor(props) {
        super(props);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.state={
            formValues: '',
            open: false,
            message: '',
            dataRack: {},
            dataPort: {},
            dataSpace: []
          }
        
      }
    
      componentDidMount(){
      
        this.props.fetchRack();
        this.props.fetchPort();
        var siteName = this.props.match.params.id
        this.getSpace()
        var filterRack = Object.values(this.props.rack).filter((r)=> r.SITE_NAME === siteName)
        var filterPort = Object.values(this.props.port).filter((r)=> r.SITE_NAME === siteName)
        //console.log('componentWillReceiveProps',filterRack,filterPort);
        this.setState({
            dataRack: filterRack,
            dataPort: filterPort,
        })
      }
    
      componentWillReceiveProps(props){
        //console.log('componentWillReceiveProps',props);
        var siteName = this.props.match.params.id
        var filterRack = Object.values(props.rack).filter((r)=> r.SITE_NAME === siteName)
        var filterPort = Object.values(props.port).filter((r)=> r.SITE_NAME === siteName)
        //console.log('filter',filterRack,filterPort);
        this.setState({
            dataRack: filterRack,
            dataPort: filterPort,
        })
      }
      handleBackBtn(){
        window.history.back();
      }

      getSpace(){
        var siteName = this.props.match.params.id
        fetch('/api/DC_CAGE')
        .then(response => response.json())
        .then((space) => 
        {  
           // console.log('space',space);
           var filterspace = Object.values(space).filter((r)=> r.SITE_NAME === siteName)
            this.setState({
                dataSpace: filterspace,
            })            
        }
        );
       
      }


    render(){
        const rack = this.state.dataRack
        const port = this.state.dataPort
        const space = this.state.dataSpace
    return(
        <div className="animated fadeIn" >
            <Row>
            {/* <Button color="info" onClick={this.handleBackBtn}>
                     <i className="fa fa-history"></i>&nbsp; Back
                </Button>&nbsp;&nbsp;&nbsp; */}
                <Card>
                    <CardHeader>
                        <strong>Rack Details</strong>
                        {/* <small> Form</small> */}
                    </CardHeader>
                    <CardBody>
                        <TableRack data={rack} />
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Card>
                    <CardHeader>
                        <strong>Space Details</strong>
                        {/* <small> Form</small> */}
                    </CardHeader>
                    <CardBody>
                        <TableSpace data={space} />
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Card>
                    <CardHeader>
                        <strong>Network Details</strong>
                        {/* <small> Form</small> */}
                    </CardHeader>
                    <CardBody>
                        <TableNetwork data={port} />
                    </CardBody>
                </Card>
            </Row>
            </div>
        );
    }
    }
    
    const mapStateToProps = state => {
        return {
          rack: state.rack,
          port:  state.port
        };
      };
      
      const mapDispachToProps = dispatch => {
        return {
      
        fetchRack: () => dispatch({ type: "FETCH_RACK"}),
          fetchPort: () => dispatch({ type: "FETCH_PORT"}),
        
        };
      };
export default connect(mapStateToProps,mapDispachToProps)(ResourceDetails);
