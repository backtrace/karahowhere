function resizeSplash(){
	var img = document.getElementById("splash_img");
	var button = document.getElementById("splash_button");
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	if (windowHeight < 2*img.height){
		img.height = windowHeight/2;
		button.height = img.height/4;
	}
	else if (windowWidth < 2*img.width){
		img.width = windowWidth/2;
		button.width = 3*img.width/5;
	}
	$("#splash_img").offset({top: (windowHeight - img.height*1.25)/2});
	$("#splash_button").offset({top: (windowHeight - img.height*1.25)/2 + img.height*1.01});
	
	
}
