export default function($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
    'ngInject';
    $stateProvider.state('app.tabs', {
        url: "/tabs",
        views: {
          'content@app': {
            template: require("./index.html")
         }
       }
    });
    $urlRouterProvider.otherwise("/tabs");
}
