function registerWindow(_args){
	
	var settingsTableData = [];
	var DOBfield;
	var domain = Ti.App.Properties.getString('domain');
	var memberid = Ti.App.Properties.getString('memberid');
	var appid = Ti.App.Properties.getString('appid');
	var loadingWindow = require('ui/handheld/loadingWindow');
	var loginWindow = _args.loginWindow;
	
	var self = Ti.UI.createWindow({
		title:L('general_register'),
		backgroundColor:'#f2f2f2',
		barColor:'#f2f2f2',
		translucent:true
	});
	
	var navWin = Ti.UI.iOS.createNavigationWindow({window:self});
	
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
	
	//SET TEXTFIELD VALUE AND CLOSE PICKER
	done.addEventListener('click', function() {
		var pickerdate = picker.value;
	    var day = parseInt(pickerdate.getDate());
	    var month = parseInt(pickerdate.getMonth())+1;
	    var year = pickerdate.getFullYear();
	    var newdate = month + "/" + day + "/" + year;
		DOBfield.value = newdate;
		picker_view.animate(slide_out);
	});

	//Set initial value to today’s date.
	var dateValue = new Date();
	var minDate = new Date();
		minDate.setFullYear(1900);
		minDate.setMonth(0);
		minDate.setDate(1);
	//maxDate cannot be greater than today’s date.
	var maxDate = dateValue;

	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		value:dateValue,
		selectionIndicator:true
	});
	
	var DOBfield = Ti.UI.createTextField({
	    left: 100,
	    right: 10,
	    hintText: L('general_date_of_birth'),
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE
	});
	
	//UPDATE VALUE IF CHANGED
	picker.addEventListener('change', function(e) {
		var pickerdate = e.value;
	    var day = parseInt(pickerdate.getDate());
	    var month = parseInt(pickerdate.getMonth())+1;
	    var year = pickerdate.getFullYear();
	    var newdate = month + "/" + day + "/" + year;
		DOBfield.value = newdate;
	});
	
	picker_view.add(toolbar);
	picker_view.add(picker);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		height:Ti.UI.SIZE
	});
	
	var iconImageView = Titanium.UI.createImageView({
		image:'/images/reg_icn_me.png',
		width:95,
		height:95,
		top:5
	});
	
	row.add(iconImageView);
	
	var percentContainer = Titanium.UI.createView({
	    width:'93%',
   		backgroundColor:'#FFF',
   		borderRadius:1,
		borderColor:'#6699CC',
		borderWidth:1,
	    height:44,
	    top:127,
	    bottom:22,
	    backgroundImage:'/images/masterBG.png'
	});
	
	var percentDoneContainer = Titanium.UI.createView({
	    width:'25%',
	    height:44,
	    left:0,
	    backgroundColor:'#6699CC',
	    layout:'horizontal'
	});
	
	percentContainer.add(percentDoneContainer);
	
	var percentLabel = Titanium.UI.createLabel({
	    text: '25%',
	    height:44,
	    width:Ti.UI.FILL,
	    textAlign: 'center',
	    left:'auto',
	    right:'auto',
	    font: {
			fontFamily: 'Helvetica Neue',
			fontSize:18,
			fontWeight:'bold'
		},
		color:'#FFF'
	});
	
	percentDoneContainer.add(percentLabel);
	
	row.add(percentContainer);
	
	var textContainer = Titanium.UI.createView({
		width:'93%',
		height:Ti.UI.SIZE,
		top:193,
		bottom:22
	});
	
	var textLabel = Titanium.UI.createLabel({
	    text:L('registration_please_provide'),
	    left:0,
	    width:Ti.UI.FILL,
	    height:Ti.UI.SIZE,
	    font:{
	    	fontSize:14
	    }
	});
	
	textContainer.add(textLabel);
	
	row.add(textContainer);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:''
	});
	
	var fieldLabel = Titanium.UI.createLabel({
	    text: L('general_email'),
	    left: 10,
	    height:44
	});
	
	var emailField = Ti.UI.createTextField({
	    left: 100,
	    right: 10,
	    hintText: L('general_email'),
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:44,
	    autocorrect:false,
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,
	    autocorrect:false,
	    autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
	});
	
	row.add(fieldLabel);
	row.add(emailField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:''
	});
	
	var fieldLabel = Titanium.UI.createLabel({
	    text: L('general_password'),
	    left: 10,
	    height:44
	});
	
	var passwordField = Ti.UI.createTextField({
	    left: 100,
	    right: 10,
	    hintText:L('general_password'),
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:44,
	    autocorrect:false,
	    autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	    passwordMask:true,
		clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS
	});
	
	row.add(fieldLabel);
	row.add(passwordField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:''
	});
	
	var fieldLabel = Titanium.UI.createLabel({
	    text: L('general_first_name'),
	    left: 10,
	    height:44
	});
	
	var firstNameField = Ti.UI.createTextField({
	    left: 100,
	    right: 10,
	    hintText: L('general_first_name'),
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:44,
	    autocorrect:false
	});
	
	row.add(fieldLabel);
	row.add(firstNameField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:''
	});
	
	var fieldLabel = Titanium.UI.createLabel({
	    text: L('general_last_name'),
	    left: 10,
	    height:44
	});
	
	var lastNameField = Ti.UI.createTextField({
	    left: 100,
	    right: 10,
	    hintText: L('general_last_name'),
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:44,
	    autocorrect:false
	});
	
	row.add(fieldLabel);
	row.add(lastNameField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:''
	});
	
	var fieldLabel = Titanium.UI.createLabel({
	    text:L('general_date_of_birth'),
	    left: 10,
	    height:44
	});
	
	row.add(fieldLabel);
	row.add(DOBfield);
	
	//SET TEXTFIELD VALUE AND CLOSE PICKER
	DOBfield.addEventListener('focus', function() {
		DOBfield.blur();
		var pickerdate = picker.value;
	    var day = parseInt(pickerdate.getDate());
	    var month = parseInt(pickerdate.getMonth())+1;
	    var year = pickerdate.getFullYear();
	    var newdate = month + "/" + day + "/" + year;
		DOBfield.value = newdate;
		picker_view.animate(slide_in);
	});

	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel({
	    text: L('general_gender'),
	    left: 10,
	    height:44
	});
	
	row.add(fieldLabel);
	
	var fieldBackground = Titanium.UI.createView({
		backgroundColor:'#FFF',
		height:30,
		width:116,
		right:10,
		borderRadius:4
	});
	
	row.add(fieldBackground);
	
	var genderBar = Ti.UI.iOS.createTabbedBar({
	    labels:[L('general_male'),L('general_female')],
	    backgroundColor:'#336699',
	    height:30,
	    right:10,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    width:Ti.UI.SIZE
	});
	
	row.add(genderBar);
	
	settingsTableData.push(row);
	
	var nextButton = Ti.UI.createButton(ef.combine($$.loginButton,{
		title:L('general_next')
	}));
	
	nextButton.addEventListener('click', function(){
		var alertString = '';
		if(emailField.value == ''){
			alertString = alertString + L('general_email') + '\n';
		}
		if(passwordField.value == ''){
			alertString = alertString +L('general_password') + '\n';
		}
		if(firstNameField.value == ''){
			alertString = alertString + L('general_first_name') + '\n';
		}
		if(lastNameField.value == ''){
			alertString = alertString + L('general_last_name') + '\n';
		}
		if(DOBfield.value == ''){
			alertString = alertString + L('general_date_of_birth') + '\n';
		}
		if(genderBar.index != 0 && genderBar.index != 1){
			alertString = alertString + L('general_gender') + '\n';
		}
		if(alertString != ''){
			alert( L('error_following_fields_are_required') + '\n\n' + alertString);
			return false;
		}
		else{
			var	callLoadingWindow = new loadingWindow();
				callLoadingWindow.open();
						
			var saveURL = "http://"+domain+"/model/mobileServices/settings.cfc?method=memberCreate";
			var saveData = {
				appid:appid,
			    emailAddress: emailField.value,
			    password:passwordField.value,
			    firstname: firstNameField.value,
			    lastname: lastNameField.value,
			    dob: DOBfield.value,
			    sendReminder: true,
			    gender:genderBar.index
			};
			
			var xhr = Ti.Network.createHTTPClient({
		    	onload: function() {
			
		    		var json = JSON.parse(this.responseText);
		    		var member = json.MEMBERINFO[0];
		    		var	memberid = member.MEMBERID;	
		    		Ti.App.Properties.setString("memberid",memberid); 
		    		
		    		if(memberid == 0){
		    			alert( L('error_already_account_registered') );
		    			callLoadingWindow.close();
		    			return false;
		    		}
		    		
		    		_db = Ti.Database.open('mobileIQ');	
															
					var now = Math.round(new Date().getTime() / 1000);

					var memberFound = _db.execute('SELECT COUNT(memberid) FROM memberloginInfo WHERE memberid = ?',memberid);
					
					_db.execute('DELETE FROM memberloginInfo');
					_db.execute('INSERT INTO memberloginInfo (memberId, email, password, keepLoggedIn, enabledAPIs, timestamp_current) VALUES (?,?,?,?,?,?)', memberid, emailField.value, passwordField.value, true, '', now);
					var memberInfo = _db.execute('SELECT email,password FROM memberloginInfo WHERE memberid = ?',memberid);
					Ti.App.Properties.setString("username",memberInfo.field(0));
					Ti.App.Properties.setString("password",memberInfo.field(1));
					
					memberInfo.close();
					memberFound.close();
					_db.close();
					callLoadingWindow.close();
					
					var registerStep1Window = require('/ui/common/registerStep1');
					var	callRegisterStep1Window = new registerStep1Window({navWin:navWin,loginWindow:loginWindow});
					
					navWin.openWindow(callRegisterStep1Window);
					
		    	},
		    	onerror: function(e) {
		    		Ti.API.info("STATUS: " + this.status);
			    	Ti.API.info("TEXT:   " + this.responseText);
			    	Ti.API.info("ERROR:  " + e.error);
			    	alert( L('error_retrieving_remote_data') );
			    	callLoadingWindow.close();
		    	},
		    	timeout:5000
		    });
		    xhr.open("GET", saveURL);
			xhr.send(saveData);
		}
	});
	
	var row = Ti.UI.createTableViewRow({
		height:88,
		width:Ti.UI.SIZE,
		borderRadius:0,
		borderColor:'#CCC',
		borderWidth:1,
		backgroundColor:'transparent',
		title:''
	});
	
	var nextView = Ti.UI.createView({
		borderRadius:4,
		borderColor:'#22746B',
		borderWidth:1,
		height:Ti.UI.SIZE,
		width:'95%',
		layout:'vertical',
		backgroundColor:'#22746B'
	});
	
	row.add(nextView);
	nextView.add(nextButton);
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:''
	});
	
	var settingsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		data:settingsTableData,
		selectionStyle:'NONE'
	});
	
	self.add(settingsTable);
	
	settingsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	var cancelButton = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.CANCEL
	});
	
	cancelButton.addEventListener('click', function() {
		navWin.close({animated:true});
	});
	
	self.setLeftNavButton(cancelButton);
	
	this.openRegister = function() {
		navWin.open({animated:true});
	};
	
	return this;
};

module.exports = registerWindow;