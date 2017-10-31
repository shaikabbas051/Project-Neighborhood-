var markers = ko.observableArray();//Global Variable

function initMap(){
	//setup map
	map  = new google.maps.Map(document.getElementById('map'),{
		center: {lat: 17.385044,lng: 78.486671},
		zoom: 11,
		
	});
	//call viewModel
	ko.applyBindings(new viewModel());
}//end initMap function

//viewModel
var viewModel = function(data){
	
	//create infowindow object
	var infowindow = new google.maps.InfoWindow({maxWidth: 200});
	//loop to itterate through marker
	for(var i = 0; i < models.length; i++){
		//declaring name and loation
	   	var titles = models[i].name;
	 	var positions = models[i].location;
		//marker object
		var marker = new google.maps.Marker({
	  		map: map,
			position: positions,
			title: titles,
			animation: google.maps.Animation.DROP
		});//marker end
		//push each marker in to markers array
		markers.push(marker);
		markers().forEach(function(marker) {
			marker.addListener('click', function() {
				populateInfoWindow(this, infowindow);
			});
		});
	};//end of for loop

	
	//when listItems are clicked, show infowindow of associated marker
	this.showInfowindow = function(marker) {
        populateInfoWindow(marker, infowindow);
    };
	
	//set infowindow when click event made on marker or on listItems
	function populateInfoWindow(marker, infowindow){
			if(infowindow.marker != marker){
				infowindow.marker = marker;
				infowindow.setContent(marker.title);
				infowindow.open(map, marker);
			}
	}//end populate window
	
	this.findPlace = ko.observable("");
    this.filterSearch=function(){
        if(this.findPlace().lenth===0){
            markers().forEach(function(marker) {
                marker.setVisible(false);
            });
        }
    }

    this.listItems = ko.computed(function() {
        var filter = this.findPlace().toLowerCase();
        if (!filter) {
            markers().forEach(function(marker){
				marker.setVisible(true)
			});
            return markers();

        } else {
            return ko.utils.arrayFilter(markers(), function(item) {
                var itIsAMatch = item.title.toLowerCase().indexOf(filter) > -1;
                item.setVisible(itIsAMatch);
                return itIsAMatch;
            });
        }
    }, this);
}//end viewModel
	

 