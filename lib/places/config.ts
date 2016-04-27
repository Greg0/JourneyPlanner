export default function($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
    'ngInject';
    $stateProvider.state('app.tabs.places', {
        url: "/places",
        views: {
          'tab-places': {
            template: require("./index.html"),
            controller: "PlacesController as placCtrl"
         }
       }
    });
    $urlRouterProvider.otherwise("/places");
}
