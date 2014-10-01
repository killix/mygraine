function main(_args){
	
	var settingsTableData = [];
	var domain = Ti.App.Properties.getString('domain');
	var appid = Ti.App.Properties.getString('appid');
	var loadingWindow = require('/ui/common/loadingWindow');
	var parentObject = _args.parentObject;
	var tabgroup = _args.tabgroup;
	var Cloud = require("ti.cloud");
		Cloud.debug = true;
		
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
	
	var self = Ti.UI.createWindow({
		title:L('settings_location'),
		backgroundColor: '#FFF',
		backButtonTitle:L('general_back'),
		backgroundImage:'/images/masterBG.png'
	});
	
	var picker_view = Titanium.UI.createView({
		height:251,
		bottom:-251,
		zIndex:10,
		layout:'vertical'
	});
	
	self.add(picker_view);
	
	var cancel =  Titanium.UI.createButton({
		title:L('general_cancel'),
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	var done =  Titanium.UI.createButton({
		title:L('general_done'),
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE});
	var spacer =  Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
	var toolbar =  Ti.UI.iOS.createToolbar({
		top:0,
		items:[spacer,done]
	});
	
	var slide_in =  Titanium.UI.createAnimation({bottom:0});
	var slide_out =  Titanium.UI.createAnimation({bottom:-251});
	
	//CANCEL BUTTON
	cancel.addEventListener('click', function() {
		picker_view.animate(slide_out);
	});
	
	var sectionView = Ti.UI.createView({
		backgroundColor:'#6699cc'
	});
	
	var section = Ti.UI.createTableViewSection({
		headerView:sectionView,
		hasChild:false
	});
	
	settingsTableData.push(section);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var countryLabel = Titanium.UI.createLabel({
	    text: L('settings_country'),
	    left: 10,
	    height:44
	});
	
	var countryField = Titanium.UI.createTextField({
	    left: 100,
	    right: 10,
	    textAlign: 'right',
	    height:44
	});

	row.add(countryLabel);
	row.add(countryField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var UTCCodeLabel = Titanium.UI.createLabel({
	    text: L('settings_time_zone'),
	    left: 10,
	    height:44
	});
	
	var UTCCodeField = Titanium.UI.createTextField({
	    left: 100,
	    right: 10,
	    textAlign: 'right',
	    height:44
	});

	row.add(UTCCodeLabel);
	row.add(UTCCodeField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var zipCodeLabel = Titanium.UI.createLabel({
	    text: L('settings_zip_code'),
	    left: 10,
	    height:44
	});
	
	var zipCodeField = Titanium.UI.createTextField({
	    text: L('settings_zip_code'),
	    left: 100,
	    right: 10,
	    textAlign: 'right',
		keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,
	    height:44,
	    autocorrect:false
	});
	addKeyboardToolbar(zipCodeField);

	row.add(zipCodeLabel);
	row.add(zipCodeField);
	
	settingsTableData.push(row);
	
	var settingsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		data:settingsTableData,
   		rowHeight:44,
		selectionStyle:'NONE',
		backgroundColor: 'transparent'
	});
	
	self.add(settingsTable);
	
	settingsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	/* country Picker  */
	var countryPickerView = Titanium.UI.createView({
		height:251,
		bottom:-251,
		zIndex:10,
		layout:'vertical'
	});
	
	var countryDone =  Titanium.UI.createButton({
		title:L('general_done'),
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE});
	var spacer =  Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
	var countryToolbar =  Ti.UI.iOS.createToolbar({
		top:0,
		items:[spacer,countryDone]
	});
	
	var countryPicker = Ti.UI.createPicker({
	  	useSpinner: true,
	  	selectionIndicator: true
	});
	
	function loadCountries(){
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() { 
	
				var data = [];
		    	var json = JSON.parse(this.responseText);
	
		    	for (i = 0; i < json.COUNTRY.length; i++) {
					var country = json.COUNTRY[i];
					data[i]=Ti.UI.createPickerRow({title:country.COUNTRYLABEL,value:country.COUNTRYID});	    		
		    	}
	
				countryPicker.add(data);
				countryPicker.selectionIndicator = true;
	
				countryPickerView.add(countryToolbar);
				countryPickerView.add(countryPicker);
				self.add(countryPickerView);
	
				loadUTCCodes();
	
	    	},
	    	onerror: function(e) {
	    		Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
		    	callLoadingWindow.close();
		    	alert(L('error_retrieving_remote_data'));
		    	ef.sendErrorEmail(this.status,this.responseText,e.error,'medForm.js - 1',1);
	    	},
	    	timeout:5000
	    });
	
		var getCountriesURL = "http://"+domain+"/model/mobileServices/settings.cfc?method=getCountries";
	    xhr.open("POST", getCountriesURL);
		xhr.send();
}

	countryDone.addEventListener('click', function() {
		var pickerValue = countryPicker.getSelectedRow(0).title;
		countryField.value = pickerValue;
		countryPickerView.animate(slide_out);
	});
	
	countryPicker.addEventListener('change', function(e) {
		var pickerValue = countryPicker.getSelectedRow(0).title;
		countryField.value = pickerValue;
	});
	
	countryField.addEventListener('focus', function() {
		countryField.blur();
		var pickerValue = countryPicker.getSelectedRow(0).title;
		countryField.value = pickerValue;
		countryPickerView.animate(slide_in);
	});
	/* country Picker End */

	/* Time Zone Picker */
	var UTCCodePickerView = Titanium.UI.createView({
		height:251,
		bottom:-251,
		zIndex:10,
		layout:'vertical'
	});
	
	var UTCCodeDone =  Titanium.UI.createButton({
		title:L('general_done'),
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE});
	var spacer =  Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
	var UTCCodeToolbar =  Ti.UI.iOS.createToolbar({
		top:0,
		items:[spacer,UTCCodeDone]
	});
	
	var UTCCodePicker = Ti.UI.createPicker({
	  	useSpinner: true,
	  	selectionIndicator: true
	});

	var UTCCodeColumn = Ti.UI.createPickerColumn();

	UTCCodePickerView.add(UTCCodeToolbar);

	self.add(UTCCodePickerView);
	
	UTCCodeDone.addEventListener('click', function() {
		var pickerValue = UTCCodePicker.getSelectedRow(0).title;
		UTCCodeField.value = pickerValue;
		UTCCodePickerView.animate(slide_out);
	});
	
	UTCCodePicker.addEventListener('change', function(e) {
		var pickerValue = UTCCodePicker.getSelectedRow(0).title;
		UTCCodeField.value = pickerValue;
	});
	
	UTCCodeField.addEventListener('focus', function() {
		UTCCodeField.blur();
		var pickerValue = UTCCodePicker.getSelectedRow(0).title;
		UTCCodeField.value = pickerValue;
		UTCCodePickerView.animate(slide_in);
	});
	/* Time Zone Picker End */
	
	var saveButton = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.SAVE
	});
	
	saveButton.addEventListener('click', function() {
		
		var memberid = Ti.App.Properties.getString('memberid');
		var loadingWindow = require('ui/common/loadingWindow');
			callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();

		var saveURL = "http://"+domain+"/model/mobileServices/settings.cfc?method=memberLocationUpdate";
		var saveData = {
			appid: appid,
		    memberid: memberid,
		    countryId: countryPicker.getSelectedRow(0).value,
		    UTCCodeAndOffset: UTCCodePicker.getSelectedRow(0).value,
		    zipCode: zipCodeField.value
		};

		var xhr = Ti.Network.createHTTPClient({
			enableKeepAlive:false,
	    	onload: function() {
				parentObject.resetLocationInfo(countryField.value);
	    		callLoadingWindow.close();
				self.close();
	    	},
	    	onerror: function(e) {
	    		alert("STATUS: " + this.status);
		    	alert("TEXT:   " + this.responseText);
		    	alert("ERROR:  " + e.error);
		    	callLoadingWindow.close();
		    	alert(L('error_retrieving_remote_data'));
		    	ef.sendErrorEmail(this.status,this.responseText,e.error,'/settings/main.js - 1',1);
	    	},
	    	timeout:999999
	    });
	    xhr.setRequestHeader("ContentType", "image/jpeg");
		xhr.setRequestHeader("enctype","multipart/form-data");
	    xhr.open("POST", saveURL);
		xhr.send(saveData);
	});
	
	self.setRightNavButton(saveButton);
	
	function addKeyboardToolbar(TheEdit){
	  	var flexSpace = Ti.UI.createButton({
	      	systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
	      	right:0
	  	});
	  	var doneButton = Ti.UI.createButton({
	      	systemButton:Ti.UI.iPhone.SystemButton.DONE,
	      	right:0
	  	});
	 
	  	TheEdit.keyboardToolbar = [flexSpace, doneButton];
	  	TheEdit.addEventListener('focus', function(e) {
	      	TheEdit.keyboardToolbar = [flexSpace, doneButton];
	      	doneButton.activeFld = TheEdit;
	    });
	  	doneButton.addEventListener('click', function(e) {
	    	e.source.activeFld.blur();
		});
	};
	
	function loadMemberSettings(){
		var memberid = Ti.App.Properties.getString('memberid');
		var loadURL = "http://"+domain+"/model/mobileServices/settings.cfc?method=getSettings";
		var loadData = {
			appid:appid,
		    memberid: memberid
		};
		
		var	callLoadingWindow = new loadingWindow();
		
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() { 
	    		
	    		var json = JSON.parse(this.responseText);
	    		var settings = json.SETTINGS[0];
	    		var	memberid = settings.MEMBERID;	
	    		var zipcode = settings.ZIPCODE.trim();
	    		var countryLabel = settings.COUNTRYLABEL;
	    		var UTCDisplay = settings.UTCDISPLAY;

				var _col = UTCCodePicker.columns[0];
				var len = _col.rowCount;
					
				for(var x = len-1; x >= 0; x-- ){
					var _row = _col.rows[x];
					
					if ( _row.getTitle() == UTCDisplay ) {
						UTCCodePicker.setSelectedRow(0, x, false);
						break;
					}
				}
				
				var _col = countryPicker.columns[0];
				var len = _col.rowCount;
				
				for(var x = len-1; x >= 0; x-- ){
					var _row = _col.rows[x];
					
					if ( _row.getTitle() == countryLabel ) {
						countryPicker.setSelectedRow(0, x, false);
						break;
					}
				}

				zipCodeField.value = zipcode;
	    	},
	    	onerror: function(e) {
	    		Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
		    	callLoadingWindow.close();
		    	alert(L('error_retrieving_remote_data'));
	    	},
	    	timeout:5000
	    });
	    xhr.open("POST", loadURL);
		xhr.send(loadData);
	}

	function loadUTCCodes(){
		var memberid = Ti.App.Properties.getString('memberid');
		var loadURL = "http://"+domain+"/model/mobileServices/UTC.cfc?method=getUTCCodes";

		var	callLoadingWindow = new loadingWindow();
		
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() { 
	    		
				callLoadingWindow.open();
				
				var data = [];
		    	var json = JSON.parse(this.responseText);

		    	for (i = 0; i < json.UTCCODES.length; i++) {
					var vals = json.UTCCODES[i];
					data[i]=Ti.UI.createPickerRow({title:vals.UTCDISPLAY,value:vals.UTCCODEOFFSET});	    		
		    	}

				UTCCodePicker.add(data);
				UTCCodePicker.selectionIndicator = true;

				UTCCodePickerView.add(UTCCodePicker);
				UTCCodePickerView.add(toolbar);

				loadMemberSettings();

	    		callLoadingWindow.close();
	    	},
	    	onerror: function(e) {
	    		Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
		    	callLoadingWindow.close();
		    	alert(L('error_retrieving_remote_data'));
	    	},
	    	timeout:5000
	    });
	    xhr.open("POST", loadURL);
		xhr.send();
	}
	
	loadCountries();

	return self;
};

module.exports = main;