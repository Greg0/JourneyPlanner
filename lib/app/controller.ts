export class AppController {

    $scope: ng.IScope;
    $autocomplete : google.maps.places.Autocomplete;
    $searchService: SearchService;
    constructor(private $injector:ng.auto.IInjectorService, public $scope:ng.IScope, public $searchService: SearchService) {
        'ngInject';
        this.$injector = $injector;
        this.$scope = $scope;
        this.$cordovaGeolocation = this.$injector.get('$cordovaGeolocation');
        this.$scope.$on('$ionicView.enter', () => this.onEnter());
        this.$scope.$searchService = $searchService;
    }

    onEnter() {
        this.$autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('topBarSearchInput')),
            {types: ['geocode']});

        this.$autocomplete.addListener('place_changed', this.setPosition.bind(this));
    }

    setPosition() {
        let place = this.$autocomplete.getPlace();
        if (place !== undefined)
        {
            let position = place.geometry.location;
            this.$scope.$searchService.setPosition(position);
        }
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
                this.$autocomplete.setBounds(circle.getBounds());

            }, (err) => {
                console.log("unable to find location");
            });
    }

}
