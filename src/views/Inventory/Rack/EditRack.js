import React, {useEffect,useState} from 'react';
import FormComponent from './FormComponent';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label, Row,Input } from 'reactstrap';
import auth from '../../../auth';
import $ from 'jquery';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
import Swal from 'sweetalert2';

const EditForm = (props) => {

    const [formValues, setformValues]= useState({});
    const [openSnackBar, setopenSnackBar] = useState(false);
    const [dataRack, setdataRack] = useState({});
    const [hasError1, setHasError1] = useState(false);
    const [hasError2, setHasError2] = useState(false);
    const [hasError3, setHasError3] = useState(false);
    const [hasError4, setHasError4] = useState(false);

  useEffect(()=>{
    fetch('/api/DC_RACK')
    .then(response => response.json())
    .then((rack) => 
    {  
        
            var filter = Object.values(rack).filter(rack => rack.RACK_ID == props.match.params.id);
            setdataRack(filter[0]);
            console.log('filter',filter[0]);     
            //console.log('SelectedCommDate',filter[0].RACK_COMM_DT,filter[0].RACK_DECOMM_DT);    
    }
    );
  },[])

  //to handle form submit validation
  const onSubmit = (e,type)=> 
  {
      e.preventDefault();
     
      var $inputs = $('#formRack :input');//get form values
      var username = localStorage.getItem('username').toUpperCase();
  
      var values = {};
      $inputs.each(function () {
          if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
            values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
                } 
                else {
            values[this.name] = $(this).val() == undefined ? "" : $(this).val();
          }
          values['RACK_ID'] =  props.match.params.id;
          values['RACK_CONTRACTUAL_POWER'] = '';
          values['RACK_UPDATE_BY'] = username ? username : "TMIMS_FORM";

       });

       if(values.SITE_NAME ){
        setHasError1(false);
        }
        if(values.LOCN_NAME){
          setHasError2(false);
        }
        if(values.RACK_ROOM ){
          setHasError3(false);
          }
        if(values.RACK_COMM_DT){
          setHasError4(false);
        }
  

      /** validate value is null */
      if(!values.SITE_NAME ){
        setHasError1(true);
      }
      if(!values.LOCN_NAME){
        setHasError2(true);
      }
      if(!values.RACK_ROOM ){
        setHasError3(true);
      }
      if(!values.RACK_COMM_DT){
        setHasError4(true);
      }

      if ( values.SITE_NAME && values.LOCN_NAME && values.RACK_NO && values.RACK_ROOM ){

          if(type === 'delete'){
            if(values.RACK_DECOMM_DT === "" || values.RACK_DECOMM_DT === 'null' ){
      
              Swal.fire({
               width: '30%',
               icon: 'error',
               fontsize: '8px',
               text: 'Decommission Date cannot be null!',
               //footer: '<a href>Why do I have this issue?</a>'
             })
            } 
             else{
              axios.post('/api/DC_RACK_UPDATE', values).then((res) => {
                //console.log('success to update : ', res.data,values);   
                  if(res.data == "success"){
                    props.history.push('/ListRack')
                  }
                })
                  .catch((err) => {
                  console.log('failed to update : ', err);
                  });

             }

          }else{
            axios.post('/api/DC_RACK_UPDATE', values).then((res) => {
              //console.log('success to update : ', res.data,values);   
                if(res.data == "success"){
                  setopenSnackBar(true);
                  setTimeout(function(){ props.history.push('/ListRack') }, 2000);
                }
              })
                .catch((err) => {
                console.log('failed to update : ', err);
                });
     
          }
      }     
 }

const handleChange = (e) => {
  
    var $inputs = $('#formRack :input');//get form values

    var values = {};
    $inputs.each(function () {
        if ($(this).is(':radio') == true || $(this).is(':checkbox') == true){
          values[this.name] = $('input[name=' + $(this).attr('name') + ']:checked').val() == undefined ? "" : $('input[name=' + $(this).attr('name') + ']:checked').val();
              } 
              else {
          values[this.name] = $(this).val() == undefined ? "" : $(this).val();
        }
     });

    setformValues({values}); // save form value to state
  

};
  const handleClose = (event, reason) => {

    //console.log('close',event, reason);
    
  
    if (reason === 'clickaway') {
      return;
    }
  
     setopenSnackBar(false);
  
  };
  return (<div className="animated fadeIn">
  <FormComponent 
    actionForm={'EDIT'} 
    values={formValues}
    rackid={props.match.params.id}
    props={props.rack}
    onSubmit={onSubmit} 
    onChange={handleChange}
    hasError1={hasError1}
    hasError2={hasError2}
    hasError3={hasError3}
    hasError4={hasError4}
    dataRack={dataRack}
    flagDecommDate={false}
    btnReset={true}
  />
  <Snackbar
        open={openSnackBar} autoHideDuration={1500} onClose={handleClose} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert variant="filled"  onClose={handleClose} severity="success" >
             Data has been updated.
          </Alert>
    </Snackbar>
 </div >);

}

export default EditForm;