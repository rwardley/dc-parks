/* Rosemary Wardley: Geog 777-Project 2 JS*/

var southWest = L.latLng(38.711464, -77.161431),
    northEast = L.latLng(39.004390, -76.881434),
    bounds = L.latLngBounds(southWest, northEast);
    //console.log(bounds);

//create the map
var map = L.map('map',{
center:[38.910612, -77.022481],
zoom:12,
zoomControl: true,
maxZoom: 16,
minZoom: 11,
maxBounds: bounds
});

// add location control to global name space for testing only
// on a production site, omit the "lc = "!
var lc = L.control.locate({
    position: 'topright',
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(map);

map.zoomControl.setPosition('bottomright');

$('#homeButton').on({
    hover: function(){
        $this.css('color', 'white');
    },
    click: function(){
        map.setView([38.910612, -77.022481], 9, true);
    }
});
    
//$('#homeButton').click(function(){
//    map.setView([41.713766, -71.549152], 10, true);
//});

$('.show').hide();
$('#splash').click(function() {
    $('.show').show();
    $('#splash').hide();
});
$('.show').click(function() {
    $('#splash').show();
    $('.show').hide();
});

//add NEW tile layer...replace project id and accessToken with your own
var light =
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery   <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.run-bike-hike',
    opacity: 0.65,
    accessToken:'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A#'
}).addTo(map);


$('#slide').on("input", function(){
  var value = $(this).val()
  updateOpacity(value)
    console.log(value);
});

//$('#mapButtonCheckBox').click(function(){
//    if(map.hasLayer(Wards)){
//      map.removeLayer(Wards);
//        console.log(Wards)
//} 
//    else {
//      map.addLayer(Wards);
//    }
//});

//function pointToLayer(feature,latlng){
//   var geojsonMarkerOptions = {
//        radius: 8,
//        color: "white",
//        //color: "white",
//        fillColor: "#f5666a",
//        weight: 1.25,
//        opacity: 1,
//        fillOpacity: 0.5
//    };
//
//    //var popupContent = '<a href="' + feature.properties.Wiki + '" target="_blank">' + feature.properties.Name + '</a>';
//    //var popupContent = feature.properties.Name;
//    //console.log(popupContent);
//    
//    //var layer = L.circleMarker(latlng, geojsonMarkerOptions);
//    
//    //bind the popup to the circle marker
//    //layer.bindPopup(popupContent);
//
//    layer.on({
//        mouseover: function() {
////             var popupContent = feature.properties.Name;
//             this.openPopup();
//        },
//        mouseout: function() {
//            //this.closePopup();
//        },
//        click: function() {
////            var popupContent = feature.properties.Wiki;
//            this.openPopup();
//        }
//    });
//
//    return layer;
//};

var Parks
var ParksData
// this is the array, build an input HTML to 
//do we need to put this in function getData(map)?
//load the data
$.ajax("data/Parks.json",{
dataType: "json",
    success: function(response){console.log(response)
        //create a Leaflet GeoJSON layer and add it to the map
        //.bindPopup(feature.NAME)
        Parks = L.geoJSON(response, {
            stroke: false,
            fillColor: "#f5666a",
            fillOpacity: 0.5,
//            marker.bindpopup(feature.NAME);
//            pointToLayer: pointToLayer
      })
            Parks.addTo(map)
                .bindPopup(function (layer) {
                console.log(layer)
    return layer.feature.properties.NAME;
})
            ParksData = response;
    }
});

//do we need to put this in function getData(map)?
//load the data
var Wards
$.ajax("data/Ward_from_2012.json",{
dataType: "json",
    success: function(response){console.log(response)
        //create a Leaflet GeoJSON layer and add it to the map
        Wards = L.geoJSON(response, {
            color: "#fef674",
            weight: 1.5,
            fill: false,
            //fillOpacity: 0.1,
      }).addTo(map);
    console.log(Wards)
    }
});

$('#mapButtonCheckBox').click(function(){
    if(map.hasLayer(Wards)){
      map.removeLayer(Wards);
} 
    else {
      map.addLayer(Wards);
    }
});

$("#filter-ward").change(function () {
        var end = this.value;
    console.log(end);
      // CALL THE FILTER FUNCTION, FEED IN ARGUMENT
        wardFilter(end)
    });

function wardFilter(wardNumber) {
    map.removeLayer(Parks);
    Parks = L.geoJSON(ParksData, {
            stroke: false,
            fillColor: "#f5666a",
            fillOpacity: 0.5,
            filter: function(feature){
                if (feature.properties.WARD == wardNumber){
                 return true   
                } 
            }
      })
            Parks.addTo(map)
                .bindPopup(function (layer) {
                console.log(layer)
    return layer.feature.properties.NAME;
    })
}

$("#filter-size").change(function () {
        var end = this.value;
    console.log(end);
      // CALL THE FILTER FUNCTION, FEED IN ARGUMENT
        sizeFilter(end)
    });

function sizeFilter(sizeType) {
    map.removeLayer(Parks);
    Parks = L.geoJSON(ParksData, {
            stroke: false,
            fillColor: "#f5666a",
            fillOpacity: 0.5,
            filter: function(feature){
                if (feature.properties.USE_TYPE == sizeType){
                 return true   
                } 
                ///console.log(feature)
            }
      })
            Parks.addTo(map)
                .bindPopup(function (layer) {
                console.log(layer)
    return layer.feature.properties.NAME;
    })
}

$("#filter-sport").change(function () {
        var end = this.value;
    console.log(end);
      // CALL THE FILTER FUNCTION, FEED IN ARGUMENT
        sportFilter(end)
    });

function sportFilter(sportType) {
    map.removeLayer(Parks);
    Parks = L.geoJSON(ParksData, {
            stroke: false,
            fillColor: "#f5666a",
            fillOpacity: 0.5,
            filter: function(feature){
                if (feature.properties.Sport == sportType){
                 return true   
                } 
                console.log(feature)
            }
      })
            Parks.addTo(map)
                .bindPopup(function (layer) {
                console.log(layer)
    return layer.feature.properties.NAME;
    })
}

$("#filter-type").change(function () {
        var end = this.value;
    console.log(end);
      // CALL THE FILTER FUNCTION, FEED IN ARGUMENT
        typeFilter(end)
    });

function typeFilter(Type) {
    map.removeLayer(Parks);
    Parks = L.geoJSON(ParksData, {
            stroke: false,
            fillColor: "#f5666a",
            fillOpacity: 0.5,
            filter: function(feature){
                if (feature.properties.USE_TYPE == Type){
                 return true   
                } 
                ///console.log(feature)
            }
      })
            Parks.addTo(map)
                .bindPopup(function (layer) {
                console.log(layer)
    return layer.feature.properties.NAME;
    })
}

//$("#input-park").change(function () {
//        var end = this.value;
//    loop through parkData.properties.NAME as array
//    console.log(end);
//      // CALL THE FILTER FUNCTION, FEED IN ARGUMENT
//        wardFilter(end)
//    });

// Add Data from CARTO using the SQL API
// Declare Variables
// Create Global Variable to hold CARTO points
var cartoDBPoints = null;

// Set your CARTO Username
var cartoDBusername = "rwardley";

// Write SQL Selection Query to be Used on CARTO Table
// Name of table is 'data_collector'
var sqlQuery = "SELECT * FROM data_collector";

var parkIcon = L.icon({
    iconUrl: "js/images/noun_Park.png",

    iconSize:     [35, 30], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location    
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Get CARTO selection as GeoJSON and Add to Map
function getGeoJSON(){
  $.getJSON("https://"+cartoDBusername+".cartodb.com/api/v2/sql?format=GeoJSON&q="+sqlQuery, function(data) {
      console.log(data)
    cartoDBPoints = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng, {icon: parkIcon});
        marker.bindPopup(feature.properties.name);
        return marker;
      }
    }).addTo(map);
  });
};

// Run showAll function automatically when document loads
$( document ).ready(function() {
  getGeoJSON();
});

// Create Leaflet Draw Control for the draw tools and toolbox
    var drawControl = new L.Control.Draw({
      draw : {
        polygon : false,
        polyline : false,
        rectangle : false,
        circle : false
      },
      edit : false,
      remove: false
    });

    // Boolean global variable used to control visiblity
    var controlOnMap = false;

    // Create variable for Leaflet.draw features
    var drawnItems = new L.FeatureGroup();
        
    // Function to add the draw control to the map to start editing
    function startEdits(){
      if(controlOnMap == true){
        map.removeControl(drawControl);
        controlOnMap = false;
      }
      map.addControl(drawControl);
      controlOnMap = true;
    };

    // Function to remove the draw control from the map
    function stopEdits(){
      map.removeControl(drawControl);
      controlOnMap = false;
    };

    // Function to run when feature is drawn on map
    map.on('draw:created', function (e) {
      var layer = e.layer;
      drawnItems.addLayer(layer);
      map.addLayer(drawnItems);
      dialog.dialog("open");
    });

    // Submit data to the PHP using a jQuery Post method
    var submitToProxy = function(q){
      $.post("php/callProxy.php", { // <--- Enter the path to your callProxy.php file here
        qurl:q,
        cache: false,
        timeStamp: new Date().getTime()
      }, function(data) {
        console.log(data);
        refreshLayer();
      });
    };

    // Use the jQuery UI dialog to create a dialog and set options
    var dialog = $("#dialog").dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      position: {
        my: "center center",
        at: "center center",
        of: "#map"
      },
      buttons: {
        "Add to Database": setData,
        Cancel: function() {
          dialog.dialog("close");
          map.removeLayer(drawnItems);
        }
      },
      close: function() {
        form[ 0 ].reset();
        console.log("Dialog closed");
      }
    });

    // Stops default form submission and ensures that setData or the cancel function run
    var form = dialog.find("form").on("submit", function(event) {
      event.preventDefault();
    });

    function setData() {
        var enteredUsername = username.value;
        var enteredDescription = description.value;
        drawnItems.eachLayer(function (layer) {
            var sql = "INSERT INTO data_collector (the_geom, description, name, latitude, longitude) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
            var a = layer.getLatLng();
            var sql2 ='{"type":"Point","coordinates":[' + a.lng + "," + a.lat + "]}'),4326),'" + enteredDescription + "','" + enteredUsername + "','" + a.lat + "','" + a.lng +"')";
            var pURL = sql+sql2;
            submitToProxy(pURL);
            console.log("Feature has been submitted to the Proxy");
        });
        map.removeLayer(drawnItems);
        drawnItems = new L.FeatureGroup();
        console.log("drawnItems has been cleared");
        dialog.dialog("close");
    };
    
    // refresh the layers to show the updated dataset
    function refreshLayer() {
      if (map.hasLayer(cartoDBPoints)) {
        map.removeLayer(cartoDBPoints);
          console.log(cartoDBPoints)
      };
      getGeoJSON();
    };


//var bball = L.geoJson(myJson, {filter: bballFilter}).addTo(map);
//
//function bballFilter(feature) {
//  if (bbcourt != false) return true
//}
