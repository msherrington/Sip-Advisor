/* global google:ignore mapStyles:ignore */
$(() => {

  // Declaring map variables
  const $map = $('#map');
  let map = null;
  let infowindow = null;

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
    map.addListener('click', () => {
      if(infowindow) infowindow.close();
    });
    // Loop through drinks database
    const drinks = $map.data('drinks');
    $.each(drinks, (index, location) => {
      // Place marker for each drink location
      addMarker(location);
    });
  }

  function addMarker(location) {
    // Retrieve lat long of each drink
    const latLng = { lat: location.latitude, lng: location.longitude };
    // Create dropping drink marker for each drink in database
    const marker = new google.maps.Marker({
      position: latLng,
      map,
      animation: google.maps.Animation.DROP,
      icon: '../assets/images/marker.png'
    });
    // Place drink markers on map
    marker.setMap(map);
    // Event listener for drink markers
    marker.addListener('click', () => {
      markerClick(marker, location);
    });
  }

  function markerClick(marker, location) {
    // Close any open infowindows
    if(infowindow) infowindow.close();

    // Locate data from individual drink posts
    const drinkName = location.name;
    const drinkImage = location.image;
    const drinkDescription = location.description;
    const drinkLocation = location.location;
    const drinkId = location._id;

    // Update the infowindow with relevant drink data
    infowindow = new google.maps.InfoWindow({
      content: `
      <div class="infowindow">
        <img src="https://s3-eu-west-1.amazonaws.com/wdi25-london-project2/${drinkImage}">
        <h1>${drinkName}</h1>
        <p><strong>${drinkDescription}</strong></p>
        <p>${drinkLocation}</p>
        <p><a href="/drinks/${drinkId}">View this post</a></p>
      </div>`,
      maxWidth: 200
    });
    // Open the new InfoWindow
    infowindow.open(map, marker);
  }


  // HTML5 geolocation
  if (navigator.geolocation) {
    const locationMarker = new google.maps.Marker({
      map,
      animation: google.maps.Animation.DROP
    });
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      locationMarker.setPosition(pos);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, locationMarker, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, locationMarker, pos) {
    locationMarker.setPosition(pos);
    locationMarker.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }


  function initialize() {
    const input = document.getElementById('location');
    const autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      console.log(place);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      $('input[name="latitude"]').val(lat);
      $('input[name="longitude"]').val(lng);
    });
  }

  // event listener for
  google.maps.event.addDomListener(window, 'load', initialize);

});
