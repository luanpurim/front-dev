/*Angular Dependencies*/
import { module } from 'angular';

/*Modules Dependencies*/
import modules from './modules/modules.module';
import core from './core/core.module';

/*CSS Dependencies*/
import "material_css";
import "md_data_table/md-data-table.css";

module('app', [
    core,
    modules,
]);
