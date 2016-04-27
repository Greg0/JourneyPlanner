export class AppController {

    $scope: ng.IScope;
    $autocomplete : google.maps.places.Autocomplete;
    $searchService: SearchService;
    $state: angular.ui.IState;
    constructor(private $injector:ng.auto.IInjectorService, public $scope:ng.IScope, public $searchService: SearchService) {
        'ngInject';
        this.$injector = $injector;
        this.$scope = $scope;
        this.$cordovaGeolocation = this.$injector.get('$cordovaGeolocation');
        this.$scope.$on('$ionicView.enter', () => this.onEnter());
        this.$scope.$searchService = $searchService;
    }

    onEnter() {
    }

    setPosition() {
        let place = this.$autocomplete.getPlace();
        if (place !== undefined)
        {
            let position = place.geometry.location;
            this.$scope.$searchService.setPosition(position);
        }
    }



}
