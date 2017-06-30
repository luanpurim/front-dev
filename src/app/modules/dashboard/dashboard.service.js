import { module } from 'angular';

class dashboardService {
    constructor($http) {
        'ngInject';       
    }    
}

export default module('service.dashboardService', [])
    .service('dashboardService', dashboardService)
    .name;