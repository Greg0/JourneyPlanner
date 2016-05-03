import {SearchService} from "../../app/searchService";

import IonicHistoryService = ionic.navigation.IonicHistoryService;
export class SearchResultsController {

    $injector: ng.auto.IInjectorService;
    $cordovaGeolocation: ngCordova.IGeolocationService;
    position:ngCordova.IGeoPosition;
    $state: angular.ui.IStateService;
    $searchService: SearchService;
    $ionicHistory: IonicHistoryService;
    bounds;
    predictions;
    query;

    constructor(private $injector:ng.auto.IInjectorService,
                public $scope:ng.IScope,
                $state: angular.ui.IState,
                public $ionicHistory: IonicHistoryService) {
        'ngInject';
        this.$injector = $injector;
        this.$scope = $scope;
        this.$state = $state;

        this.$ionicHistory = $ionicHistory;
        this.$cordovaGeolocation = this.$injector.get('$cordovaGeolocation');
        this.$searchService = this.$scope.$searchService;
        this.$scope.$on('$ionicView.enter', () => this.onEnter());
    }

    loadBounds() {
        this.$cordovaGeolocation
            .getCurrentPosition(<ngCordova.IGeolocationOptions>{timeout: 10000, enableHighAccuracy: false})
            .then((position) => {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });

                this.bounds = circle.getBounds();
            }, (err) => {
                console.log("unable to find location");
            });
    }

    search() {
        this.$autocompleteService = new google.maps.places.AutocompleteService();
        if(event.target.value.length == 0)
        {
            return false;
        }
        let ctrl = this;
        this.$autocompleteService.getPlacePredictions({ input: event.target.value, bounds: this.bounds }, function(predictions, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
            }

            ctrl.predictions = predictions;
            ctrl.$scope.$apply();
        })
    }

    showResult(item) {
        let placeId = item.place_id;
        this.$searchService.setPlaceId(placeId);


        this.$ionicHistory.nextViewOptions({
            disableBack: true
        });
        this.$state.go('app.tabs.home');
    }

    onEnter() {
        this.loadBounds();

        let searchInput = document.getElementById('searchInput');
        searchInput.focus();
    }
}
