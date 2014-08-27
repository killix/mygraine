function share(_args){
	
	var shareTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
    var fontSizeVar ='16';
    var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var timePeriodField;
	var timePeriodLabel;
	var containingTab = _args.containingTab;
	var parentObject = this;
	
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
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Email Address',
	    left: 15,
	    height:54
	}));
	
	var emailField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    left: 100,
	    right: 10,
	    hintText: 'Email Address',
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	}));
	
	row.add(fieldLabel);
	row.add(emailField);
	
	shareTableData.push(row);
	
	var timePeriodRow = Ti.UI.createTableViewRow({
		title:'',
		hasChild:true
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Time Period',
	    left: 15,
	    height:54
	}));
	
	timePeriodRow.add(fieldLabel);
	
	timePeriodRow.addEventListener('click', function() {
		var timePeriodWindow = require('/ui/handheld/home/timePeriods');
		var callTimePeriodWindow = new timePeriodWindow({parentObject:parentObject,preSelectedValues:timePeriodField.value});
		containingTab.open(callTimePeriodWindow);
	});
	
	timePeriodField = Ti.UI.createTextField({
		value:''
	});
	
	timePeriodLabel = Ti.UI.createLabel(ef.combine($$.settingsLabel,{
		text:'',
		right:10
	}));
	
	timePeriodRow.add(timePeriodLabel);
	
	shareTableData.push(timePeriodRow);
	
	var shareTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:shareTableData,
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
	
	shareTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(shareTable);
	
	var sendButton = Titanium.UI.createButton({
		title:'Send',
		color:'#FFF',
		backgroundImage: 'none',
		font:{
			fontSize:18,
			fontFamily:fontFamilyVar
		}
	});
	
	self.setRightNavButton(sendButton);
	
	sendButton.addEventListener('click', function(e) {
		
		if(timePeriodField.value == ''){
			alert('Time Period is a required field.');
			return false;
		}
		
		var sendURL = "http://"+domain+"/model/mobile/services/migraines.cfc?method=shareMigraines";
		var sendData = {
		    userid: userid,
		    timeperiod:timePeriodField.value,
		    emailaddress:emailField.value
		};
		
		var	callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();
			
		var xhr = Ti.Network.createHTTPClient({
			enableKeepAlive:false,
	    	onload: function() {
	    		Ti.API.info(this.responseText);
				var json = JSON.parse(this.responseText);
				
				callLoadingWindow.close();
	    	},
	    	onerror: function(e) {
	    		//alert("STATUS: " + this.status);
		    	//alert("TEXT:   " + this.responseText);
		    	//alert("ERROR:  " + e.error);
		    	callLoadingWindow.close();
		    	alert(L('error_retrieving_data'));
	    	},
	    	timeout:999999
	    });
	    //xhr.setRequestHeader("ContentType", "image/jpeg");
		//xhr.setRequestHeader("enctype","multipart/form-data");
	    xhr.open("GET", sendURL);
		xhr.send(sendData);
		
	});
	
	function populateTimePeriod(selectedValues){
		timePeriodField.value = selectedValues;
		timePeriodLabel.text = selectedValues;
	}
	
	this.populateTimePeriod = function(selectedValues){
		populateTimePeriod(selectedValues);
	};
	
	return self;
	
};

module.exports = share;