var globalInterface, currentLat, currentLng, deviceReady, windowReady;
var geoSuccess = function(position){
	currentLat = position.coords.latitude;
	currentLng = position.coords.longitude;
};
var geoError = function(error){
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};
var onWatchSuccess = function(position){
	currentLat = position.coords.latitude;
	currentLng = position.coords.longitude;
	globalInterface.updateDistances();
};
document.addEventListener("deviceready", onDeviceReady, false);
var onDeviceReady = function(){
	deviceReady = true;
	if (windowReady == true){
		createMap();
	}
};
var createMap = function(){
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
	//currentLat = 46;
	//currentLng = -118;
      var options={
        elt:document.getElementById('map'),       /*ID of element on the page where you want the map added*/ 
        zoom:10,                                  /*initial zoom level of the map*/ 
        latLng:{lat: currentLat, lng: currentLng},  /*center of map in latitude/longitude */ 
        mtype:'map',                              /*map type (map)*/ 
        bestFitMargin:0,                          /*margin offset from the map viewport when applying a bestfit on shapes*/ 
        zoomOnDoubleClick:true                    /*zoom in when double-clicking on map*/ 
      }; 
      window.map = new MQA.TileMap(options);
      MQA.withModule('smallzoom',function() {
    	  /*
    	   * the the style display property of the map MUST not be set to "none" when adding a control!
    	   */
          map.addControl(
        	new MQA.SmallZoom(), 
        	new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5,5))
        );
        $("#map").css({display: "none"});
        $(".mask").css({display: "none"});
        $("#splash_content").animate({opacity : 1}, 3000);
      });
}
console.log("JS loading");
function loaded(){
	console.log("document ready");
	globalInterface = new Interface();
	console.log("globalInterface created");
	globalInterface.getSchools();
	console.log("schools retrieved");
	var img = document.getElementById("splash_img");
	var button = document.getElementById("splash_button");
	var routeTab = document.getElementById("route_tab");
	var schoolTab = document.getElementById("school_tab");
	var sortTab = document.getElementById("sort_tab");
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	if (windowHeight < 2*img.height){
		img.height = windowHeight/2;
		button.height = img.height/4;
		routeTab.height = 3*img.height/5;
		schoolTab.height = 3*img.height/5;
		sortTab.height = img.height/4
	}
	else if (windowWidth < 2*img.width){
		img.width = windowWidth/2;
		button.width = 3*img.width/5;
		routeTab.width = img.width/5;
		schoolTab.width = img.width/5;
		sortTab.width = 3*img.width/5;
	}
	console.log("heights and widths calculated");
	$("#body").css({width: windowWidth});
	$("#list_interface_wrapper").css({width: windowWidth});
	if ($("#list_interface").height() < windowHeight){
		$("#list_interface").css({height: windowHeight});
	}
	$("#school_tab").css({top: (windowHeight - schoolTab.height)/2, left: -schoolTab.width});
	document.getElementById("school_tab").onclick = function(){
		globalInterface.hideSchoolInfo(3000);
	};
	$("#route_tab").css({top: (windowHeight - routeTab.height)/2, left: $("#list_interface_wrapper").width() - routeTab.width});
	document.getElementById("route_tab").onclick = function(){
		globalInterface.hideRoute(3000);
	};
	$("#school_info_inner_wrapper").offset({top: 2*sortTab.height});
	$("#directions_inner_wrapper").offset({top: 2*sortTab.height});
	$("#splash_img").offset({top: (windowHeight - img.height*1.25)/2});
	$("#splash_button").offset({top: (windowHeight - img.height*1.25)/2 + img.height/2});
	$("#sort_interface").css({height: windowHeight, width: windowWidth, top: -windowHeight});
	globalInterface.sortInterfaceStartPos = -windowHeight;
	globalInterface.listInterfaceOffset = windowWidth;
	$("#sort_inner_wrapper").css({height: img.height, width: img.width});
	$("#sort_inner_wrapper").css({top: ($("#sort_interface").height()-$("#sort_inner_wrapper").height())/2, left: ($("#sort_interface").width()-$("#sort_inner_wrapper").width())/2});
	$("#sort_tab").css({width: button.width, top: $("#sort_interface").height(), left: ($("#sort_interface").width()-button.width)/2});
	document.getElementById("sort_tab").onclick = function(){
		globalInterface.showSortInterface(3000);
	};
	$("#splash_content").css({"display" : "block"});
	$("#map").css({height: windowHeight, width: windowWidth, top: 0, left: 0});
	$("#directions").css({width: windowWidth, top: 0, left: 0});
	windowReady = true;
	if (deviceReady == true){
		createMap();
	}
}