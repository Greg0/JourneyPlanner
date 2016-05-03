import modConfig from './config';
import {HomeController} from './controllers/map';
import {SearchResultsController} from './controllers/searchResults';

let mod = angular.module('crossPlatform.home', [
    'ionic',
    'ui.router'
]);

mod.config(modConfig);
mod.controller('HomeController', HomeController);
mod.controller('SearchResultsController', SearchResultsController);

export default mod;
