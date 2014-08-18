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
		layout:'vertical',
		backgroundColor:'#d7d6d5'
	}));
	
	var alertsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:alertsTableData,
   		top:8,
		right:8,
		left:8,
		bottom:8,
		borderWidth:1,
		borderColor:'#CCC',
		borderRadius:2,
		selectionStyle:'NONE',
		backgroundColor: '#FFF',
		editable:true
	});
	
	alertsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(alertsTable);
	
	function loadAlerts(){
		json = '';
		alertsTableData = [];
		
		alertsTableData.push(blankAlertRow(json));
		
		alertsTable.setData(alertsTableData);
	}
	
	function blankAlertRow(json){
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:false
		});
		
		var alertLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text: 'You have no alerts at this time!',
		    left: 15,
		    height:54
		}));
		
		row.add(alertLabel);
		
		return row;
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
	