'use strict';

/* global google:ignore mapStyles:ignore */
$(function () {

  // Declaring map variables
  var $map = $('#map');
  var map = null;
  var infowindow = null;

  // Call function to initialise map
  if ($map.length) initMap();

  function initMap() {
    // Embed google map
    map = new google.maps.Map($map.get(0), {
      zoom: 14,
      scrollwheel: false,
      styles: mapStyles
    });
    // Event listener to close infowindows by clicking anywhere on map
    map.addListener('click', function () {
      if (infowindow) infowindow.close();
    });
    // Loop through drinks database
    var drinks = $map.data('drinks');
    $.each(drinks, function (index, location) {
      // Place marker for each drink location
      addMarker(location);
    });
  }

  function addMarker(location) {
    // Retrieve lat long of each drink
    var latLng = { lat: location.latitude, lng: location.longitude };
    // Create dropping drink marker for each drink in database
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: '../assets/images/marker.png'
    });
    // Place drink markers on map
    marker.setMap(map);
    // Event listener for drink markers
    marker.addListener('click', function () {
      markerClick(marker, location);
    });
  }

  function markerClick(marker, location) {
    // Close any open infowindows
    if (infowindow) infowindow.close();

    // Locate data from individual drink posts
    var drinkName = location.name;
    var drinkImage = location.image;
    var drinkDescription = location.description;
    var drinkLocation = location.location;
    var drinkId = location._id;

    // Update the infowindow with relevant drink data
    infowindow = new google.maps.InfoWindow({
      content: '\n      <div class="infowindow">\n        <img src="https://s3-eu-west-1.amazonaws.com/wdi25-london-project2/' + drinkImage + '">\n        <h1>' + drinkName + '</h1>\n        <p><strong>' + drinkDescription + '</strong></p>\n        <p>' + drinkLocation + '</p>\n        <p><a href="/drinks/' + drinkId + '">View this post</a></p>\n      </div>',
      maxWidth: 200
    });
    // Open the new InfoWindow
    infowindow.open(map, marker);
  }

  // HTML5 geolocation
  if (navigator.geolocation) {
    var locationMarker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP
    });
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      locationMarker.setPosition(pos);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, locationMarker, map.getCenter());
    });
  } else {
    // If browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, locationMarker, pos) {
    locationMarker.setPosition(pos);
    locationMarker.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  }

  function initialize() {
    // Variables for Google Places autocomplete search box
    var input = document.getElementById('location');
    var autocomplete = new google.maps.places.Autocomplete(input);

    // Event listener for Google autocomplete box
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      // Variables for storing location's lat/long
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      // Push location's lat/long from hidden inputs to variables
      $('input[name="latitude"]').val(lat);
      $('input[name="longitude"]').val(lng);
    });
  }

  // Listening for window load to start Google Places search
  google.maps.event.addDomListener(window, 'load', initialize);
});