function loadingView(container){
	
	var self = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor:'yellow'
	});
	
	var loadingActivityIndicator = Ti.UI.createActivityIndicator({
		style  : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		color  : '#000',
		height : Ti.UI.SIZE,
		width  : Ti.UI.SIZE
	});
	
	loadingActivityIndicator.show();
	
	self.add(loadingActivityIndicator);
	
	return self;
	
};

module.exports = loadingView;