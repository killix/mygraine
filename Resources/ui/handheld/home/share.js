function share(_args){
	
	var fontFamilyVar = 'Source Sans Pro';
    var fontSizeVar ='16';
    var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	var loadingWindow = require('/ui/handheld/loadingWindow');
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Share',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		backgroundColor:'#d7d6d5'
	}));
	
	return self;
	
};

module.exports = share;