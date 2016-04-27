export class SearchResultsController {

    maps:string;
    $injector: ng.auto.IInjectorService;
    $cordovaGeolocation: ngCordova.IGeolocationService;
    errorMsg:string;
    position:ngCordova.IGeoPosition;
    $state: angular.ui.IState;
    bounds;
    predictions;
    query;

    constructor(private $injector:ng.auto.IInjectorService, public $scope:ng.IScope, $state: angular.ui.IState) {
        'ngInject';
        this.$injector = $injector;
        this.$scope = $scope;
        this.$state = $state;
        this.$cordovaGeolocation = this.$injector.get('$cordovaGeolocation');
        this.$scope.$on('$ionicView.enter', () => this.onEnter());
    }

    geolocate() {

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
                //this.$autocompleteService.setBounds(circle.getBounds());

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
            console.log(ctrl.predictions);
            ctrl.$scope.$apply();
        })
    }

    onEnter() {
        this.geolocate();
    }

}
