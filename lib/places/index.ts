import modConfig from './config';
import {PlacesController} from './controller';

let mod = angular.module('crossPlatform.places', [
    'ionic',
    'ui.router'
]);

mod.config(modConfig);
mod.controller('PlacesController', PlacesController);

export default mod;
