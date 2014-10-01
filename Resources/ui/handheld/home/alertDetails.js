function alertDetailsWindow(){
	
	var alertDetailsTableData = [];
	var json = '';
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
		
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Alert Details',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		layout:'vertical',
		backgroundColor:'#d7d6d5'
	}));
	
	var alertDetailsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:alertDetailsTableData,
   		top:4,
		right:4,
		left:4,
		bottom:4,
		borderWidth:1,
		borderColor:'#CCC',
		borderRadius:2,
		selectionStyle:'NONE',
		backgroundColor: '#FFF',
		editable:true
	});
	
	alertDetailsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(alertDetailsTable);
	
	return self;
	
};

module.exports = alertDetailsWindow;
	