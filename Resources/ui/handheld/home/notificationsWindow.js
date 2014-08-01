function notificationsWindow(){
	
	var self = Ti.UI.createWindow({
		backgroundColor:'white', 
	   	width:Ti.UI.FILL, 
	   	height:Ti.UI.FILL,
	   	title:'Alerts'
	});
	
	var navigationWindow = Titanium.UI.iOS.createNavigationWindow({
		window:self
	});

	navigationWindow.addEventListener('open', function() {
		
	});
	
	var button = Titanium.UI.createButton({
	    title: 'Close'
	});
	button.addEventListener('click', function(){
	    navigationWindow.close();
	});
	
	self.add(button);

	return navigationWindow;
	
};

module.exports = notificationsWindow;