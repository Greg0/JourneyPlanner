export default function($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
    'ngInject';
    $stateProvider.state('app.home', {
        url: "/home",
        views: {
          'tab-home': {
            template: require("./index.html"),
            controller: "HomeController as homeCtrl"
         }
       }
    });
    $urlRouterProvider.otherwise("/home");
}
