export default function ($stateProvider:angular.ui.IStateProvider, $urlRouterProvider:angular.ui.IUrlRouterProvider) {
    'ngInject';
    $stateProvider.state('app.tabs.home', {
        url: "/home",
        views: {
            'tab-home': {
                template: require("./templates/index.html"),
                controller: "HomeController as homeCtrl"
            }
        }
    });
    $stateProvider.state('app.search-results', {
        cache: false,
        url: "/search-results",
        views: {
            'content@app': {
                template: require("./templates/search-results.html"),
                controller: "SearchResultsController as searchCtrl"
            }
        }
    });
    $urlRouterProvider.otherwise("/home");
}
