import React , {useState} from 'react';
import { Route, Redirect, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from 'material-table';


export default function TableDCSite(props) {
  //console.log('table',props);

  const [state, setState] = useState({
    columns: [
      {
        title: '#',
        field: 'row',
        render: (cell) => <p>{cell.tableData.id + 1}</p>
      },
      {
        title: 'Rack ID',
        field: 'RACK_ID',
      },
      {
        title: 'Rack No',
        field: 'RACK_NO',
      },
      {
        title: 'Rack Type',
        field: 'RACK_TYPE',
      },
      {
        title: 'Rack Size',
        field: 'RACK_SIZE',
      },
      {
        title: 'DC Site',
        field: 'SITE_NAME',
      },
      {
        title: 'DC Location',
        field: 'LOCATION_NAME',
      },

      {
        title: 'Power Density',
        field: 'RACK_POWER_DENSITY',
      },
      {
        title: 'Commision Date',
        field: 'RACK_COMM_DT_V',
      },
      {
        title: 'Decommision Date',
        field: 'RACK_DECOMM_DT_V',
      },
      {
        title: 'Customer Name',
        field: 'RACK_CUSTOMER',
      },
      {
        title: 'Service ID',
        field: 'RACK_SERVICEID',
      },
    ],
  });

  return (
    <MaterialTable
      title="Rack"
      //hover={true}
      options={{    
          //hover: true,
          filtering: true,
      }}
      icons={{ Filter: () => <div /> }} 
      columns={state.columns}
      data={props.data}
    />
  );
}