export class SearchResultsController {

    maps:string;
    $injector: ng.auto.IInjectorService;
    $cordovaGeolocation: ngCordova.IGeolocationService;
    errorMsg:string;
    position:ngCordova.IGeoPosition;

    constructor(private $injector:ng.auto.IInjectorService, public $scope:ng.IScope) {
        'ngInject';
        this.$injector = $injector;
        this.$scope = $scope;
        this.$cordovaGeolocation = this.$injector.get('$cordovaGeolocation');
        this.$scope.$on('$ionicView.enter', () => this.onEnter());
    }

    onEnter() {
        let targetDiv = document.getElementById("googleMap");
        this.maps = "hello";
        this.$cordovaGeolocation
            .getCurrentPosition(<ngCordova.IGeolocationOptions>{timeout: 10000, enableHighAccuracy: false})
            .then((position) => {
                console.log("position found");
                this.position = position;
                console.log(position);

                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var mapOptions = {
                    center: latLng,
                    zoom: 1,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                this.maps = new google.maps.Map(targetDiv, mapOptions);
                console.log('show');
            }, (err) => {
                console.log("unable to find location");
                this.errorMsg = "Error : " + err.message;
            });
    }

}
