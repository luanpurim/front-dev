/*Angular Dependencies*/
import { module } from 'angular';
import ngRoute from 'angular-route';
import angularMaterial from 'angular-material';

/*Custom Configs*/
import routeConfig from './route.config';
import themeConfig from "./theme.config";

export default module('app.core.module', [
        ngRoute,
        angularMaterial,
    ])
    .config(routeConfig)
    .config(themeConfig)
    .name;