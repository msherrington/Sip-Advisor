'use strict';

/* global google:ignore mapStyles:ignore */
$(function () {

  var $map = $('#map');
  var map = null;
  var infowindow = null;
  if ($map.length) initMap();

  function initMap() {
    // const latLng = { lat: -33.43774451396826, lng: -70.6505012512207 };
    map = new google.maps.Map($map.get(0), {
      zoom: 12,
      // center: latLng,
      scrollwheel: false,
      styles: mapStyles
    });
    var marker = new google.maps.Marker({
      //icon: bikon,
      // position: latLng,
      map: map
    });
  }

  var infoWindow = new google.maps.InfoWindow({ map: map });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  }
});