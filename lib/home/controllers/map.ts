import {SearchService} from "../../app/searchService";
import IonicHistoryService = ionic.navigation.IonicHistoryService;
export class HomeController {
// http://plnkr.co/edit/nN7vktAwPc0FmM37byz5?p=preview
    maps;
    errorMsg:string;
    $injector:ng.auto.IInjectorService;
    $cordovaGeolocation:ngCordova.IGeolocationService;
    position:ngCordova.IGeoPosition;
    $searchService:SearchService;
    $state:angular.ui.IStateService;
    $ionicHistory:IonicHistoryService;

    constructor(private $injector:ng.auto.IInjectorService,
                public $scope:ng.IScope,
                public $state:angular.ui.IStateService,
                public $ionicHistory:IonicHistoryService) {
        'ngInject';
        this.$injector = $injector;
        this.$scope = $scope;
        this.$cordovaGeolocation = this.$injector.get('$cordovaGeolocation');
        this.$searchService = this.$scope.$searchService;
        this.$state = $state;
        this.$ionicHistory = $ionicHistory;
        this.$scope.$on('$ionicView.enter', () => this.onEnter());
    }

    processSearch() {
        this.$ionicHistory.nextViewOptions({
            disableBack: true
        });
        this.$state.go('app.search-results');
    }

    onEnter() {
        let targetDiv = document.getElementById("googleMap");
        this.$cordovaGeolocation
            .getCurrentPosition(<ngCordova.IGeolocationOptions>{timeout: 10000, enableHighAccuracy: false})
            .then((position) => {
                console.log("position found");
                this.position = position;
                console.log(position);

                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                this.maps = new google.maps.Map(targetDiv, mapOptions);
                console.log('show');

                if (this.$searchService.getPlaceId() !== null) {
                    var request = {
                        placeId: this.$searchService.getPlaceId()
                    };

                    let placesService = new google.maps.places.PlacesService(this.maps);
                    placesService.getDetails(request, (place, status) => {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            let placeLocation = place.geometry.location;

                            new google.maps.Marker({
                                map: this.maps,
                                position: placeLocation
                            });
                            this.maps.panTo(placeLocation);
                        }
                    });

                    console.log('search place');
                }


            }, (err) => {
                console.log("unable to find location");
                this.errorMsg = "Error : " + err.message;
            });
        this.$scope.$apply();
    }

}
