function migraineDetails(){
	
	var loadingView = require('/ui/handheld/loadingView');
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		backgroundColor:'transparent', 
	   	width:Ti.UI.FILL, 
	   	height:Ti.UI.FILL,
	   	titleControl:Ti.UI.createLabel({
			text:'Migraine Details',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		})
	}));
	
	var navigationWindow = Titanium.UI.iOS.createNavigationWindow({
		window:self
	});
	
	var slideDown = Ti.UI.createAnimation({
		top:0,
		duration:200
	});
	
	var slideUp = Ti.UI.createAnimation({
		top:-44,
		duration:200
	});
	
	var loadingView = Ti.UI.createView({
	  	backgroundColor:'#F5F5F5',
	  	width:Ti.UI.FILL,
	  	height:44,
	  	top:-44,
	  	zIndex:2
	});
	
	var loadingActivityIndicator = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		color:'#595959',
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		message:'Loading your migraine data...'
	});
	
	loadingActivityIndicator.show();
	
	loadingView.add(loadingActivityIndicator);
	
	self.add(loadingView);
	
	var view1 = Ti.UI.createView({
	  	backgroundColor:'red',
	  	height:Ti.UI.FILL,
	  	top:0,
	  	width:Ti.UI.FILL
	});
	
	var view2 = Ti.UI.createView({
	  	backgroundColor:'blue',
	  	height:Ti.UI.FILL,
	  	top:0,
	  	width:Ti.UI.FILL
	});
	
	var view3 = Ti.UI.createView({
	  	backgroundColor:'green',
	  	height:Ti.UI.FILL,
	  	top:0,
	  	width:Ti.UI.FILL
	});
	
	var scrollableView = Ti.UI.createScrollableView({
  		views:[view1,view2,view3],
  		showPagingControl:false
	});
	
	self.add(scrollableView);
	
	navigationWindow.addEventListener('open', function() {
		//loadingView.animate(slideDown);
	});
	
	setTimeout(function(e){
		//loadingView.animate(slideUp);
	},3000);
	
	var buttonView = Ti.UI.createView({
		width:'98%', 
	   	height:44, 
		backgroundColor:'#00BFFF',
		bottom:4,
		layout:'vertical'
	});
	
	var closeButton = Titanium.UI.createButton({
		title:'Close',
		width:Ti.UI.FILL,
		height:42,
		color:'#FFF',
		font:{
			fontSize:14,
	    	fontFamily:'Helvetica Neue',
	    	fontWeight:'bold'
	   	}
	});
	
	closeButton.addEventListener('click', function() {
		navigationWindow.close();
	});
	
	var buttonBottomBorderView = Ti.UI.createView({
		width:Ti.UI.FILL, 
	   	height:2, 
		backgroundColor:'#007fcf'
	});
	
	buttonView.add(closeButton);
	
	buttonView.add(buttonBottomBorderView);
	
	self.add(buttonView);
	
	return navigationWindow;
	
};

module.exports = migraineDetails;