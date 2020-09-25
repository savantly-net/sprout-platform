import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../state/reducers';

// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

const Dashboard = () => {


  const appSettings = useSelector((state: IRootState) => state.appSettings );

  return (<div>
    <div className="row">
      <div className="col-xl-12 grid-margin stretch-card">
        <div className="card card-statistics">
          <div className="card-body">
            <h1>{appSettings.getValueByName('WEB_SITE_NAME')}</h1>
          </div>
        </div>
      </div>
    </div>
  </div> );
};
  
export default Dashboard;