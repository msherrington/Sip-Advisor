'use strict';

/* global google:ignore mapStyles:ignore */
$(function () {

  var $map = $('#map');
  var map = null;
  var infowindow = null;
  if ($map.length) initMap();
  var marker = null;

  function initMap() {
    map = new google.maps.Map($map.get(0), {
      zoom: 13,
      scrollwheel: false,
      styles: mapStyles
    });
    var drinks = $map.data('drinks');
    $.each(drinks, function (index, location) {
      addMarker(location);
      // console.log(location);
    });
  }

  function addMarker(location) {
    var latLng = { lat: location.latitude, lng: location.longitude };

    console.log(location);
    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: '../assets/images/marker.png'
    });
    marker.setMap(map);
    marker.addListener('click', function () {
      markerClick(marker, location);
    });
  }

  function markerClick(marker, location) {
    // If there is an open infowindow on the map, close it
    if (infowindow) infowindow.close();

    // Locate the data that we need from the individual bike object
    var drinkName = location.name;
    var drinkImage = location.image;
    var drinkDescription = location.description;
    var drinkInfo = location.otherInfo;
    var drinkLocation = location.location;
    var drinkId = location._id;

    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: '\n      <div class="infowindow">\n        <img src="https://s3-eu-west-1.amazonaws.com/wdi25-london-project2/' + drinkImage + '">\n        <h1>' + drinkName + '</h1>\n        <p><strong>' + drinkDescription + '</strong></p>\n        <p>' + drinkLocation + '</p>\n        <p><a href="/drinks/' + drinkId + '">View this post</a></p>\n      </div>',
      maxWidth: 200
      // position: location
    });
    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
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
      infoWindow.setContent('You are here!');
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