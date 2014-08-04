function loadingWindow(_args){
	
	var loadingWindow = Ti.UI.createWindow({
		backgroundColor:'transparent'
	}),
	loadingBackgroundView = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0
	}),
	loadingView = Ti.UI.createView({
		borderRadius    : 10,
		backgroundColor:'#000',
		opacity:0.8,
		borderRadius:8
	}),
	loadingActivityIndicator = Ti.UI.createActivityIndicator({
		style  : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		color  : '#FFF',
		height : Ti.UI.SIZE,
		width  : Ti.UI.SIZE
	});

	loadingView.add(loadingActivityIndicator);
	loadingWindow.add(loadingBackgroundView);
	loadingWindow.add(loadingView);
	loadingView.width = 150;
	loadingView.height = 150;
	loadingView.top = null;
	loadingView.bottom = null;
	loadingView.left = null;
	loadingView.right = null;
	loadingActivityIndicator.show();
	
	this.open = function() {
		loadingWindow.open();
	};
	
	this.close = function() {
		loadingWindow.close();	
	};
}

module.exports = loadingWindow;