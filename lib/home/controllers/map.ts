export class HomeController {
// http://plnkr.co/edit/nN7vktAwPc0FmM37byz5?p=preview
    maps:string;
    $injector: ng.auto.IInjectorService;
    $cordovaGeolocation: ngCordova.IGeolocationService;
    errorMsg:string;
    position:ngCordova.IGeoPosition;

    constructor(private $injector:ng.auto.IInjectorService, public $scope:ng.IScope, $searchService: SearchService) {
        'ngInject';
        this.$injector = $injector;
        this.$scope = $scope;
        this.$cordovaGeolocation = this.$injector.get('$cordovaGeolocation');
        this.$scope.$on('$ionicView.enter', () => this.onEnter());
        this.$searchService = this.$scope.$searchService;
    }

    center() {
        console.log("centering");

        var latLng = this.$searchService.$position;
        this.maps.panTo(latLng);
    }

    onEnter() {
        let searchBtn = document.getElementById('searchButton');

        searchBtn.addEventListener('click', () => {
            let latLng = this.$searchService.$position;
            this.maps.panTo(latLng);
        });

        console.log(this.$searchService.$position);
        let targetDiv = document.getElementById("googleMap");
        this.maps = "hello";
        this.$cordovaGeolocation
            .getCurrentPosition(<ngCordova.IGeolocationOptions>{timeout: 10000, enableHighAccuracy: false})
            .then((position) => {
                console.log("position found");
                this.position = position;
                console.log(position);

                if (this.$searchService.$position !== undefined)
                {
                    var latLng = this.$searchService.$position;
                }
                else
                {
                    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                }

                var mapOptions = {
                    center: latLng,
                    zoom: 15,
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
