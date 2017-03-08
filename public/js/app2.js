'use strict';

/* global google:ignore mapStyles:ignore */
$(function () {

  var $map = $('#map');
  var map = null;
  var infowindow = null;
  if ($map.length) initMap();

  function initMap() {
    // const drinks = $map.data('drinks');
    // console.log(drinks);
    // const latLng = { lat: -33.43774451396826, lng: -70.6505012512207 };
    map = new google.maps.Map($map.get(0), {
      zoom: 12,
      // center: latLng,
      scrollwheel: false,
      styles: mapStyles
    });
    // getBars();

    // const marker = new google.maps.Marker({
    //   //icon: bikon,
    //   // position: latLng,
    //   map
    // });
  }

  function getBars() {
    var drinks = $map.data('drinks');
    console.log(drinks);
    $.each(drinks, function (index, location) {
      // console.log(location);
      addMarker(location);
    });
  }

  function addMarker(location) {
    var latLng = { lat: location.latitude, lng: location.longitude };
    var marker = new google.maps.Marker({
      position: location,
      map: map
      // animation: google.maps.Animation.DROP
      // icon: '../assets/images/music-icon.png'
    });
    // marker.addListener('click', toggleBounce);

    // function toggleBounce() {
    //   if (marker.getAnimation() !== null) {
    //     marker.setAnimation(null);
    //   } else {
    //     marker.setAnimation(google.maps.Animation.BOUNCE);
    //   }
    // }
  }

  // const infoWindow = new google.maps.InfoWindow({map: map});
  //
  // // Try HTML5 geolocation.
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //
  //     infoWindow.setPosition(pos);
  //     infoWindow.setContent('You are here.');
  //     map.setCenter(pos);
  //   }, function() {
  //     handleLocationError(true, infoWindow, map.getCenter());
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   handleLocationError(false, infoWindow, map.getCenter());
  // }
  //
  // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //   infoWindow.setPosition(pos);
  //   infoWindow.setContent(browserHasGeolocation ?
  //     'Error: The Geolocation service failed.' :
  //     'Error: Your browser doesn\'t support geolocation.');
  // }


  function initialize() {
    var input = document.getElementById('location');
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      console.log(place);
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      $('input[name="latitude"]').val(lat);
      $('input[name="longitude"]').val(lng);
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
});