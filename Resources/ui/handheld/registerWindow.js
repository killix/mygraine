function settingsForm(_args){
	
	var settingsTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var tabbar = _args.tabbar;
	var loginObject = _args.loginObject;
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Register',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		backgroundColor:'#d7d6d5',
		modal:true
	}));
	
	var navWin = Ti.UI.iOS.createNavigationWindow({window:self,modal:true});
	
	var mainContainerView = Ti.UI.createScrollView({
	  	width:Ti.UI.FILL,
	  	height:Ti.UI.FILL,
	  	top:0,
	  	layout:'vertical',
	  	contentWidth: 'auto',
  		contentHeight: 'auto',
  		showVerticalScrollIndicator: true,
  		showHorizontalScrollIndicator: false
	});

	self.add(mainContainerView);
	
	var dobPickerView = Titanium.UI.createView({
		width:Ti.UI.FILL,
		height:251,
		bottom:-251,
		layout:'vertical',
		zIndex:2
	});
	
	var dobPicker = Ti.UI.createPicker({
		selectionIndicator : true,
		type: Ti.UI.PICKER_TYPE_DATE,
		bottom:0
	});
	
	var slideUp =  Titanium.UI.createAnimation({bottom:0,duration:300});
	var slideDown =  Titanium.UI.createAnimation({bottom:-251,duration:300});
	
	var space = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var done = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.DONE,
		width:20
	});
	
	done.addEventListener('click', function() {
		dobPickerView.animate(slideDown);
	});
	
	var dobToolbar = Ti.UI.iOS.createToolbar({
		items:[space,done],
		width:Ti.UI.FILL,
		height:43,
		backgroundColor:'#bbb'
	});
	
	dobPickerView.add(dobToolbar);
	dobPickerView.add(dobPicker);
	
	self.add(dobPickerView);
	
	dobPicker.addEventListener('change', function(e) {
		var pickerdatetime = e.value;
	    var day = parseInt(pickerdatetime.getDate());
	    var month = parseInt(pickerdatetime.getMonth())+1;
	    var year = pickerdatetime.getFullYear();
	    var newdate = month + "/" + day + "/" + year;
	    
		dobField.value = newdate;
	});
	
	var genderPickerView = Titanium.UI.createView({
		width:Ti.UI.FILL,
		height:251,
		bottom:-251,
		layout:'vertical',
		zIndex:2
	});
	
	var genderPicker = Ti.UI.createPicker({
		selectionIndicator : true,
		bottom:0
	});
	
	var data = [];
	data[0]=Ti.UI.createPickerRow({title:'Male',value:'Male'});
	data[1]=Ti.UI.createPickerRow({title:'Female',value:'Female'});
	
	genderPicker.add(data);

	var space = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var genderDone = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.DONE,
		width:20
	});
	
	genderDone.addEventListener('click', function() {
		genderPickerView.animate(slideDown);
	});
	
	var genderToolbar = Ti.UI.iOS.createToolbar({
		items:[space,genderDone],
		width:Ti.UI.FILL,
		height:43,
		backgroundColor:'#bbb'
	});
	
	genderPickerView.add(genderToolbar);
	genderPickerView.add(genderPicker);
	
	self.add(genderPickerView);
	
	genderPicker.addEventListener('change', function(e) {
		var gendervalue = genderPicker.getSelectedRow(0).value;
		genderField.value = gendervalue;
	});
	
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
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,
	    autocorrect:false,
	    autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	}));
	
	row.add(fieldLabel);
	row.add(emailField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Password',
	    left: 15,
	    height:54
	}));
	
	var passwordField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    left: 100,
	    right: 10,
	    hintText: 'Password',
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
	    passwordMask:true,
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	}));
	
	row.add(fieldLabel);
	row.add(passwordField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'First Name',
	    left: 15,
	    height:54
	}));
	
	var firstNameField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    left: 100,
	    right: 10,
	    hintText: 'First Name',
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	}));
	
	row.add(fieldLabel);
	row.add(firstNameField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Last Name',
	    left: 15,
	    height:54
	}));
	
	var lastNameField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    left: 100,
	    right: 10,
	    hintText: 'Last Name',
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	}));
	
	row.add(fieldLabel);
	row.add(lastNameField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Gender',
	    left: 15,
	    height:54
	}));
	
	var genderField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    left: 100,
	    right: 10,
	    hintText: 'Gender',
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
		bubbleParent: false
	}));
	
	genderField.addEventListener('focus', function(e) {
		genderField.blur();
		dobPickerView.animate(slideDown);
		genderPickerView.animate(slideUp);
		var gendervalue = genderPicker.getSelectedRow(0).value;
		genderField.value = gendervalue;
	});
	
	row.add(fieldLabel);
	row.add(genderField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Date of Birth',
	    left: 15,
	    height:54
	}));
	
	var dobField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    left: 100,
	    right: 10,
	    hintText: 'Date of Birth',
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
		bubbleParent: false
	}));
	
	dobField.addEventListener('focus', function(e) {
		dobField.blur();
		genderPickerView.animate(slideDown);
		dobPickerView.animate(slideUp);
		var pickerdatetime = dobPicker.value;
	    var day = parseInt(pickerdatetime.getDate());
	    var month = parseInt(pickerdatetime.getMonth())+1;
	    var year = pickerdatetime.getFullYear();
	    var newdate = month + "/" + day + "/" + year;
	    
		dobField.value = newdate;
	});
	
	row.add(fieldLabel);
	row.add(dobField);
	
	settingsTableData.push(row);
	
	var settingsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:settingsTableData,
   		top:4,
		right:4,
		left:4,
		bottom:4,
		borderWidth:1,
		borderColor:'#CCC',
		borderRadius:2,
		selectionStyle:'NONE',
		backgroundColor: '#FFF'
	});
	
	mainContainerView.add(settingsTable);
	
	var saveButton = Titanium.UI.createButton({
		title:'Save',
		color:'#FFF',
		backgroundImage: 'none',
		font:{
			fontSize:18,
			fontFamily:fontFamilyVar
		}
	});
	
	self.setRightNavButton(saveButton);
	
	saveButton.addEventListener('click', function(e) {
		
		var	callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();
			
		var saveURL = "http://"+domain+"/model/mobile/services/users.cfc?method=createUser";
		var saveData = {
		    emailaddress: emailField.value,
		    password: passwordField.value,
		    firstname: firstNameField.value,
		    lastname: lastNameField.value,
		    gender:genderField.value,
		    dateofbirth: dobField.value
		};

		var xhr = Ti.Network.createHTTPClient({
			enableKeepAlive:false,
	    	onload: function() {
	    		loginObject.newLogin(emailField.value,passwordField.value);
	    		navWin.close();
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
	    xhr.open("POST", saveURL);
		xhr.send(saveData);
		
	});
	
	var cancelButton = Titanium.UI.createButton({
		title:'Cancel',
		color:'#FFF',
		backgroundImage: 'none',
		font:{
			fontSize:18,
			fontFamily:fontFamilyVar
		}
	});
	
	self.setLeftNavButton(cancelButton);
	
	cancelButton.addEventListener('click', function(e) {
		navWin.close();
	});
	
	this.openRegister = function() {
		navWin.open({animated:true});
	};
	
	return this;
};

module.exports = settingsForm;
	