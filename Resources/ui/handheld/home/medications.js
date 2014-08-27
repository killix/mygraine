function medicationWindow(_args){
	
	var medsTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var json;
	var containingTab = _args.containingTab;
	var parentObject = this;
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	var homeObject = _args.parentObject;
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Medications',
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
	
	var addButton = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.ADD
	});
	
	addButton.addEventListener('click',function(e){
		var medWindow = require('/ui/handheld/home/medForm');
		var callMedWindow = new medWindow({containingTab:containingTab,parentObject:parentObject,medid:0});
		containingTab.open(callMedWindow);
	});
	
	self.setRightNavButton(addButton);
	
	var medsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:medsTableData,
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
	
	medsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	medsTable.addEventListener('delete',function(e){
		var medid = e.rowData.medid;
		var deleteURL = "http://"+domain+"/model/mobile/services/meds.cfc?method=deleteMed";
		var deleteDATA = {
			userid: userid,
		    medid:medid
		};

		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
		    	loadMeds();
			},
		    onerror: function(e) {
		    	Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
		    	alert(L('error_retrieving_data'));
		    },
		    timeout:5000
		});
		
		xhr.open("GET", deleteURL);
		xhr.send(deleteDATA);
	});
	
	self.add(medsTable);
	
	function loadMeds(){
		json = '';
		medsTableData = [];
		
		var loadURL = "http://"+domain+"/model/mobile/services/meds.cfc?method=getMeds";
		var loadData = {
			userid: userid
		};
		
		var	callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();
			
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() {
	    		
	    		var medsTableData = [];
	    		var json = JSON.parse(this.responseText);
	    		
	    		if(json.MEDS.length == 0){
	    			medsTableData.push(blankMedicationRow());
	    		}
	    		
	    		for (i = 0; i < json.MEDS.length; i++) {
					medsTableData.push(medRow(json,i));
				}
				
				medsTable.setData(medsTableData);
				
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
	    xhr.open("GET", loadURL);
		xhr.send(loadData);

	}
	
	function blankMedicationRow(){
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:false
		});
		
		var medLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text: 'You have no medications at this time!',
		    left: 15,
		    height:54
		}));
		
		row.add(medLabel);
		
		return row;
	}
	
	function medRow(json,i){
		
		med = json.MEDS[i];
		
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:true,
			medid:med.ID
		});
		
		row.addEventListener('click', function(e) {
			var medid = e.rowData.medid;
			var medWindow = require('/ui/handheld/home/medForm');
			var callMedWindow = new medWindow({containingTab:containingTab,parentObject:parentObject,medid:medid});
			containingTab.open(callMedWindow);
		});
		
		var medLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text: med.MEDICATION,
		    left: 15,
		    height:54
		}));
		
		row.add(medLabel);
		
		if(med.ADDTOCALENDAR == 1){
			var medCalendarImage = Ti.UI.createImageView({
				image:'/images/calendar.png',
				right:10
			});
			
			row.add(medCalendarImage);
		}
		
		return row;
	}
	
	this.loadMeds = function(){
		loadMeds();
	};
	
	self.addEventListener('open',function(e){
		loadMeds();
	});
	
	self.addEventListener('close',function(e){
		homeObject.loadHistory();
	});
	
	return self;
	
};

module.exports = medicationWindow;
	