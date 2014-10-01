function medicationsWindow(_args){
	
	var medicationsTableData = [];
	var medicationsTable;
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var selectedValues = [];
	var parentObject = _args.parentObject;
	var preSelectedValues = _args.preSelectedValues;
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	
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
		backgroundColor:'#FFF'
	}));
	
	function loadMeds(){
		json = '';
		medicationsTableData = [];
		
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
	    			var row = Ti.UI.createTableViewRow({
						title:'',
						hasChild:false,
						hasCheck:false
					});
					
					var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
					    text:'You have no medications at this time!',
					    left:15,
					    height:54
					}));
					
					row.add(fieldLabel);
					
					medicationsTableData.push(row);
	    		}
	    		
	    		for (i = 0; i < json.MEDS.length; i++) {
	    			
	    			med = json.MEDS[i];
		
					if(preSelectedValues.indexOf(med.ID) != -1){
						var checkedVar = true;
						selectedValues.push(med.ID);
					}
					else{
						var checkedVar = false;
					}
					
					var row = Ti.UI.createTableViewRow({
						title:'',
						hasChild:false,
						hasCheck:checkedVar,
						val:med.ID
					});
					
					row.addEventListener('click', function(e) {
						var checked = e.rowData.hasCheck;
						if(checked){
							e.rowData.hasCheck = false;
							selectedValues.pop(e.rowData.val);
						}
						else{
							e.rowData.hasCheck = true;
							selectedValues.push(e.rowData.val);
						}
					});
					
					var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
					    text:med.MEDICATION,
					    left:15,
					    height:54
					}));
					
					row.add(fieldLabel);
					
					medicationsTableData.push(row);
				}
				
				medicationsTable.setData(medicationsTableData);
				
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
 	
 	medicationsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		data:medicationsTableData,
   		rowheight:54,
		selectionStyle:'NONE',
		backgroundColor: 'transparent'
	});
	
	medicationsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(medicationsTable);
	
	self.addEventListener('open', function(e) {
		loadMeds();
	});
	
	self.addEventListener('close', function(e) {
		parentObject.populateMedications(selectedValues);
	});
	
	return self;
	
};

module.exports = medicationsWindow;
	