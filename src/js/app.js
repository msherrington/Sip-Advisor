/* global google:ignore mapStyles:ignore */
$(() => {

  const $map = $('#map');
  let map = null;
  let infowindow = null;
  if ($map.length) initMap();

  function initMap() {
    // const latLng = { lat: 51.515113, lng: -0.072051 };
    map = new google.maps.Map($map.get(0), {
      zoom: 14,
      scrollwheel: false,
      // center: latLng,
      styles: mapStyles
    });

    map.addListener('click', () => {
      if(infowindow) infowindow.close();
    });

    const drinks = $map.data('drinks');
    $.each(drinks, (index, location) => {
      addMarker(location);
      // console.log(location);
    });
  }

  function addMarker(location) {
    const latLng = { lat: location.latitude, lng: location.longitude };

    // console.log(location);
    const marker = new google.maps.Marker({
      position: latLng,
      map,
      animation: google.maps.Animation.DROP,
      icon: '../assets/images/marker.png'
    });
    marker.setMap(map);
    marker.addListener('click', () => {
      markerClick(marker, location);
    });
  }

  function markerClick(marker, location) {
    // If there is an open infowindow on the map, close it
    if(infowindow) infowindow.close();

    // Locate the data that we need from the individual bike object
    const drinkName = location.name;
    const drinkImage = location.image;
    const drinkDescription = location.description;
    const drinkLocation = location.location;
    const drinkId = location._id;

    // Update the infowindow variable to be a new Google InfoWindow
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
      // position: marker
    });
    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
  }

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    const infoWindow = new google.maps.InfoWindow();
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here!');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }


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
