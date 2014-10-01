function alertsWindow(_args){
	
	var alertsTableData = [];
	var json = '';
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	var tabbar = _args.tabbar;
	var containingTab = _args.containingTab;
	var parentObject = this;
	
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
		
		var loadURL = "http://"+domain+"/model/mobile/services/alerts.cfc?method=getAlertList";
		var loadData = {
			userid: userid
		};
		
		var	callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();
			
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() {

	    		var json = JSON.parse(this.responseText);
	    		
	    		if(json.ALERTS.length == 0){
	    			alertsTableData.push(blankAlertRow());
	    		}
	    		
	    		for (i = 0; i < json.ALERTS.length; i++) {
					alertsTableData.push(alertRow(json,i));
				}
				
				alertsTable.setData(alertsTableData);
				
				callLoadingWindow.close();
			},
	    	onerror: function(e) {
	    		Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
				callLoadingWindow.close();
				alert(L('error_retrieving_data'));
	    	},
	    	timeout:5000
	    });
	    xhr.open("POST", loadURL);
		xhr.send(loadData);
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
		
		var alertDetails = json.ALERTS[i];

		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:true,
			id:alertDetails.ID,
			leftImage:'/images/'+alertDetails.ICON
		});
		
		var alertLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text:alertDetails.ALERT,
		    left:50,
		    height:54
		}));
		
		row.add(alertLabel);
		
		row.addEventListener('click', function(e) {
			var migraineAlertWindow = require('/ui/handheld/home/alertDetails');
			var callMigraineAlertWindow = new migraineAlertWindow({containingTab:containingTab,alertid:e.rowData.id,parentObject:parentObject});
			containingTab.open(callMigraineAlertWindow);
		});
		
		return row;
	}
	
	self.addEventListener('open',function(e){
		loadAlerts();
	});
	
	return self;
	
};

module.exports = alertsWindow;
	