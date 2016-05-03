import 'ionic-sdk/release/js/ionic.bundle';
import 'ng-cordova';

import {SearchService} from './searchService';
import {AppController} from './controller';

// Our modules
import modConfigRouter from './router.config.ts';
import modRun from './run.ts';
import modHome from '../home/index.ts';
import modMenu from '../menu/index.ts';
import modPlaces from '../places/index.ts';
import modTabs from '../tabs/index.ts';

// Style entry point
import '../scss/bootstrap';

// Create our crossPlatform module
let mod = angular.module('crossPlatform', [
    'ionic',
    'ngCordova',
    modHome.name,
    modPlaces.name,
    modTabs.name,
    modMenu.name,
]);
// ROUTER CONFIG
mod.config(modConfigRouter);
mod.controller('AppController', AppController);
mod.service('$searchService', SearchService);
// Run
mod.run(modRun);

export default mod;
