import { module } from 'angular';
import routeConfig from './route.config';
import ngRoute from 'angular-route';
import angularMaterial from 'angular-material';
import themeConfig from "./theme.config";
import "material_css";
import "md_data_table/md-data-table.css";
import mdDataTable from "angular-material-data-table";

export default module('app.core.module', [
        ngRoute,
        angularMaterial,
        mdDataTable
    ])
    .config(routeConfig)
    .config(themeConfig)
    .name;