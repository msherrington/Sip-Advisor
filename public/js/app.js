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
    });
  }

  function addMarker(location) {
    var latLng = { lat: location.latitude, lng: location.longitude };
    console.log(latLng);
    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: '../assets/images/marker.png'
    });
    marker.setMap(map);
    // marker.addListener('click', () => {
    //   markerClick(marker, location);
    // });
  }

  // function markerClick(marker, location) {
  //   // If there is an open infowindow on the map, close it
  //   if(infowindow) infowindow.close();
  //
  //   // Locate the data that we need from the individual bike object
  //   const locationName = location.name;
  //   const noOfBikes = location.additionalProperties.find(obj => obj.key === 'NbBikes').value;
  //   const noOfSpaces = location.additionalProperties.find(obj => obj.key === 'NbEmptyDocks').value;
  //
  //   // Update the infowindow variable to be a new Google InfoWindow
  //   infowindow = new google.maps.InfoWindow({
  //     content: `
  //     <div class="infowindow">
  //       <h3>${locationName}</h3>
  //       <p>Available bikes: <strong>${noOfBikes}</strong></p>
  //       <p>Free spaces: <strong>${noOfSpaces}</strong></p>
  //     </div>`
  //   });
  //   // Finally, open the new InfoWindow
  //   infowindow.open(map, marker);
  // }

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