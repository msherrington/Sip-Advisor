'use strict';

var mapStyles = [{
  'featureType': 'administrative',
  'elementType': 'geometry.fill',
  'stylers': [{
    'color': '#ff0000'
  }] }, {
  'featureType': 'administrative',
  'elementType': 'labels.text',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative',
  'elementType': 'labels.text.fill',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative.country',
  'elementType': 'geometry.fill',
  'stylers': [{
    'saturation': '24'
  }] }, {
  'featureType': 'administrative.country',
  'elementType': 'labels.text',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative.country',
  'elementType': 'labels.text.fill',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative.country',
  'elementType': 'labels.text.stroke',
  'stylers': [{
    'visibility': 'off'
  }] }, {
  'featureType': 'administrative.province',
  'elementType': 'geometry.fill',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative.province',
  'elementType': 'labels.text.fill',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative.locality',
  'elementType': 'geometry.fill',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative.locality',
  'elementType': 'labels.text.fill',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative.neighborhood',
  'elementType': 'geometry.fill',
  'stylers': [{
    'visibility': 'on'
  }, {
    'hue': '#ff0000'
  }] }, {
  'featureType': 'administrative.neighborhood',
  'elementType': 'labels.text.fill',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative.neighborhood',
  'elementType': 'labels.text.stroke',
  'stylers': [{
    'visibility': 'off'
  }] }, {
  'featureType': 'administrative.land_parcel',
  'elementType': 'geometry.fill',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'administrative.land_parcel',
  'elementType': 'labels.text.fill',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'landscape.man_made',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#f7f1df'
  }] }, {
  'featureType': 'landscape.man_made',
  'elementType': 'geometry.fill',
  'stylers': [{
    'color': '#f7f5ed'
  }] }, {
  'featureType': 'landscape.natural',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#d0e3b4'
  }] }, {
  'featureType': 'landscape.natural',
  'elementType': 'geometry.fill',
  'stylers': [{
    'color': '#bfe9c5'
  }] }, {
  'featureType': 'landscape.natural.landcover',
  'elementType': 'geometry.fill',
  'stylers': [{
    'saturation': '-18'
  }, {
    'color': '#bfe9c5'
  }] }, {
  'featureType': 'landscape.natural.terrain',
  'elementType': 'geometry',
  'stylers': [{
    'visibility': 'off'
  }] }, {
  'featureType': 'landscape.natural.terrain',
  'elementType': 'geometry.fill',
  'stylers': [{
    'visibility': 'on'
  }, {
    'color': '#bfe9c5'
  }] }, {
  'featureType': 'landscape.natural.terrain',
  'elementType': 'geometry.stroke',
  'stylers': [{
    'hue': '#ff0000'
  }] }, {
  'featureType': 'poi',
  'elementType': 'labels',
  'stylers': [{
    'visibility': 'off'
  }] }, {
  'featureType': 'poi.business',
  'elementType': 'all',
  'stylers': [{
    'visibility': 'off'
  }] }, {
  'featureType': 'poi.medical',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#fbd3da'
  }] }, {
  'featureType': 'poi.park',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#bde6ab'
  }] }, {
  'featureType': 'road',
  'elementType': 'geometry.stroke',
  'stylers': [{
    'visibility': 'off'
  }] }, {
  'featureType': 'road',
  'elementType': 'labels',
  'stylers': [{
    'visibility': 'on'
  }] }, {
  'featureType': 'road.highway',
  'elementType': 'geometry.fill',
  'stylers': [{
    'color': '#ffe15f'
  }] }, {
  'featureType': 'road.highway',
  'elementType': 'geometry.stroke',
  'stylers': [{
    'color': '#efd151'
  }] }, {
  'featureType': 'road.arterial',
  'elementType': 'geometry.fill',
  'stylers': [{
    'color': '#ffffff'
  }] }, {
  'featureType': 'road.local',
  'elementType': 'geometry.fill',
  'stylers': [{
    'color': 'black'
  }] }, {
  'featureType': 'transit.station.airport',
  'elementType': 'geometry.fill',
  'stylers': [{
    'color': '#cfb2db'
  }] }, {
  'featureType': 'water',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#a2daf2'
  }] }];