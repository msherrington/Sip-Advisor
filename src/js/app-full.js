/* global google:ignore mapStyles:ignore */
$(() => {

  const $map = $('#map');
  let map = null;
  let infowindow = null;
  if ($map.length) initMap();

  function initMap() {
    const drinks = $map.data('drinks');
    console.log(drinks);
    // const latLng = { lat: -33.43774451396826, lng: -70.6505012512207 };
    map = new google.maps.Map($map.get(0), {
      zoom: 12,
      // center: latLng,
      scrollwheel: false,
      styles: mapStyles
    });
    const marker = new google.maps.Marker({
      //icon: bikon,
      // position: latLng,
      map
    });
  }

  const infoWindow = new google.maps.InfoWindow({map: map});
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
  //     infoWindow.setContent('Location found.');
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
    let input = document.getElementById('location');
    let autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      console.log(place);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      $('input[name="latitude"]').val(lat);
      $('input[name="longitude"]').val(lng);
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);

});
