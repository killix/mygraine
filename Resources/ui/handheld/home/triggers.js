function triggersWindow(){
	
	var triggersTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Triggers',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		layout:'vertical',
		backgroundColor:'#FFF'
	}));
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false,
		hasCheck:true
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Wine',
	    left: 15,
	    height:54
	}));
	
	row.add(fieldLabel);
	
	triggersTableData.push(row);
	
	var triggersTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		data:triggersTableData,
   		rowheight:54,
		selectionStyle:'NONE',
		backgroundColor: 'transparent'
	});
	
	triggersTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(triggersTable);
	
	return self;
	
};

module.exports = triggersWindow;
	