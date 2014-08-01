function alertsWindow(){
	
	var alertsTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Alerts',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		layout:'vertical'
	}));
	
	var alertsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:alertsTableData,
   		top:0,
		right:0,
		left:0,
		bottom:0,
		selectionStyle:'NONE',
		backgroundColor: '#FFF'
	});
	
	alertsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(alertsTable);
	
	function loadAlerts(){
		json = '';
		alertsTableData = [];
		
		for(i=0;i<4;i++){
			alertsTableData.push(alertRow(json));
		}	
		
		alertsTable.setData(alertsTableData);
	}
	
	function alertRow(json){
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:true
		});
		
		var alertLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text: 'New Migraine Pattern Detected!',
		    left: 15,
		    height:54
		}));
		
		row.add(alertLabel);
		
		return row;
	}
	
	self.addEventListener('focus',function(e){
		loadAlerts();
	});
	
	return self;
	
};

module.exports = alertsWindow;
	