import { module } from 'angular';
import template from './dashboard.html';
import controller from './dashboard.controller';
import dashboardService from './dashboard.service'

export default (() => {
    const dashboard = {       
            template,
            controller        
    };

    return module('app.dashboard', [])
        .component('dashboard', dashboard)
        .service('dashboardService', dashboardService)
        .name;
})();
