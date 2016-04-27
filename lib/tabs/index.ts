import modConfig from './config';

let mod = angular.module('crossPlatform.tabs', [
    'ionic',
    'ui.router'
]);

mod.config(modConfig);

export default mod;
