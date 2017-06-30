import { module } from 'angular';

export default module('app.core.constant', [])
    .constant('const', {
        someConstant: '123'
    })
    .name