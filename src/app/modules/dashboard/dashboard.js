/*Angular Dependencies*/
import { module } from 'angular';

/*Component Dependencies*/
import template from './dashboard.html';
import controller from './dashboard.controller';
import dashboardService from './dashboard.service';
import './dashboard.css';

/*Third Dependencies*/
import mdDataTable from "angular-material-data-table";

export default (() => {
    const dashboard = {       
            template,
            controller        
    };

    return module('app.dashboard', [mdDataTable])
        .component('dashboard', dashboard)
        .service('dashboardService', dashboardService)
        .name;
})();
