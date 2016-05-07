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
    activeTask:string;
    weatherMarker;

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

    activateTask(taskName) {
        if (this.activeTask === taskName) {
            this.activeTask = null;
        }
        else {
            this.activeTask = taskName;
        }
    }

    processSearch() {
        this.$ionicHistory.nextViewOptions({
            disableBack: true
        });
        this.$state.go('app.search-results');
    }

    onEnter() {
        this.loadMap();
        this.$scope.$apply();
    }

    runTask(event) {
        if (this.activeTask === 'weather') {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&units=metric&lang=pl&appid=fbe3237e0b37df2af5117c11ef210a24");

            xhr.onreadystatechange = (e) => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let response = JSON.parse(xhr.responseText);
                        let temp = response.main.temp;
                        let description = response.weather[0].description;
                        let iconName = response.weather[0].icon;
                        let iconAddr = "http://openweathermap.org/img/w/" + iconName + ".png";

                        console.log("Temp: " + temp + "; Description: " + description);

                        let image = {
                            url: iconAddr,
                            size: new google.maps.Size(50, 50),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(0, 50)
                        };

                        if (this.weatherMarker !== undefined) {
                            this.weatherMarker.setMap(null);
                        }

                        this.weatherMarker = new google.maps.Marker({
                            position: {lat: lat, lng: lng},
                            map: this.maps,
                            icon: image,
                        });
                    }
                    else {
                        console.log("Weather API problem");
                    }
                }
            };

            xhr.send(null);
        }
    }

    addEvents() {
        google.maps.event.addListener(this.maps, "click", this.runTask.bind(this));
    }

    loadMap() {
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

                this.addEvents();

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
    }

}
