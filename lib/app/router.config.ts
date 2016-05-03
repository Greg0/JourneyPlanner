export default function($stateProvider) {
    'ngInject';
    return $stateProvider.state('app', {
        abstract: true,
        views: {
            '@': {
                template: require("./index.html"),
                controller: "AppController as appCtrl"
            }
        }
    });
}
