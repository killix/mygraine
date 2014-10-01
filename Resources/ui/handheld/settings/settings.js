function settingsForm(_args){
	
	var settingsTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var tabbar = _args.tabbar;
	var profileImage = "";
	var currentLanguageCode = Titanium.Locale.currentLanguage;
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Settings',
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
	
	var photoView = Ti.UI.createView({
		width:104,
		height:104,
		borderRadius:52,
		top:8,
		bottom:8,
		backgroundColor:'#d7d6d5',
		borderWidth:0,
		borderColor:'transparent'
	});
	
	row.add(photoView);
	
	var editPhotoText = Ti.UI.createLabel({
		text:'Edit Profile Photo',
		font:{
			fontSize:12,
			fontFamily:'Source Sans Pro'
		},
		width:Ti.UI.FILL,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	photoView.add(editPhotoText);
	
	var profileImageView = Ti.UI.createImageView({
        width:Ti.UI.SIZE,
		height:140,
		image:''
	});
	
	//Create a dialog with options
	var dialog = Titanium.UI.createOptionDialog({
	    //title of dialog
	    title: 'Change Profile Picture',
	    //options
	    options: ['Take Photo','Choose from Library','Cancel'],
	    //index of cancel button
	    cancel:2
	});
	 
	//add event listener
	dialog.addEventListener('click', function(e) {
	    //if first option was selected
	    if(e.index == 0)
	    {
	        //then we are getting image from camera
	        Titanium.Media.showCamera({
	            //we got something
	            success:function(event)
	            {
	                //getting media
	                var image = event.media; 
	                 
	                //checking if it is photo
	                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
	                {
	                    //we may create image view with contents from image variable
	                    //or simply save path to image
	                    Ti.App.Properties.setString("image", image.nativePath);
	                    profileImage = event.media;
	                    
	                    var imageAsTaken = Ti.UI.createImageView({
							image: profileImage
						});
						profileImage = imageAsTaken.toImage();
	                    
	                    profileImageView.image = image;
	                }
	            },
	            cancel:function()
	            {
	                //do somehting if user cancels operation
	            },
	            error:function(error)
	            {
	                //error happend, create alert
	                var a = Titanium.UI.createAlertDialog({title:L('camera_camera')});
	                //set message
	                if (error.code == Titanium.Media.NO_CAMERA)
	                {
	                    a.setMessage(L('camera_device_does_not_have_camera') );
	                }
	                else
	                {
	                    a.setMessage( L('error_unexpected') + ': ' + error.code);
	                }
	 
	                // show alert
	                a.show();
	            },
	            allowImageEditing:true,
	            saveToPhotoGallery:true
	        });
	    }
	    else if(e.index == 1)
	    {
	        //obtain an image from the gallery
	        Titanium.Media.openPhotoGallery({
	            success:function(event)
	            {
	                //getting media
	                var image = event.media; 
	                // set image view
	                 
	                //checking if it is photo
	                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
	                {
	                    //we may create image view with contents from image variable
	                    //or simply save path to image
	                    Ti.App.Properties.setString("image", image.nativePath);
	                    profileImage = event.media;
	                    
	                    var imageAsTaken = Ti.UI.createImageView({
							image: profileImage
						});
						profileImage = imageAsTaken.toImage();
	                    
	                    profileImageView.image = image;
	                }   
	            },
	            cancel:function()
	            {
	                //user cancelled the action fron within
	                //the photo gallery
	            }
	        });
	    }
	    else
	    {
	        //cancel was tapped
	        //user opted not to choose a photo
	    }
	});
	
	profileImageView.addEventListener('click', function(e) {
		//show dialog
		dialog.show();
	});

	photoView.add(profileImageView);
	
	settingsTableData.push(row);
	
	var sectionView = Ti.UI.createView({
		backgroundColor:'#F5F5F5',
		height:24
	});
	
	var sectionLabel = Titanium.UI.createLabel({
	    text: 'My Info',
	    left: 15,
	    height:24,
	    font:{
	    	fontSize:fontSizeVar,
	    	fontFamily:fontFamilyVar
	    },
	    color:'#595959'
	});
	
	sectionView.add(sectionLabel);
	
	var section = Ti.UI.createTableViewSection({
		headerView:sectionView,
		hasChild:false,
		height:24
	});
	
	settingsTableData.push(section);
	
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
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Country',
	    left: 15,
	    height:54
	}));
	
	var countryField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    left: 100,
	    right: 10,
	    hintText: 'Country',
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	}));
	
	row.add(fieldLabel);
	row.add(countryField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Zip/Postal Code',
	    left: 15,
	    height:54
	}));
	
	var zipSpace = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var zipDone = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.DONE,
		width:20
	});
	
	zipDone.addEventListener('click', function() {
		zipField.blur();
	});
	
	var zipToolbar = Ti.UI.iOS.createToolbar({
		items:[zipSpace,zipDone],
		width:Ti.UI.FILL,
		height:43,
		backgroundColor:'#bbb'
	});
	
	var zipField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    left: 100,
	    right: 10,
	    hintText: 'Zip/Postal Code',
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,
	    keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	    keyboardToolbar:zipToolbar
	}));
	
	row.add(fieldLabel);
	row.add(zipField);
	
	settingsTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		hasChild:false
	});
	
	var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
	    text: 'Time Zone',
	    left: 15,
	    height:54
	}));
	
	var timezoneField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    left: 100,
	    right: 10,
	    hintText: 'Time Zone',
	    textAlign: 'right',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	}));
	
	row.add(fieldLabel);
	row.add(timezoneField);
	
	settingsTableData.push(row);
	
	var settingsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:settingsTableData,
   		top:8,
		right:8,
		left:8,
		bottom:8,
		borderWidth:1,
		borderColor:'#CCC',
		borderRadius:2,
		selectionStyle:'NONE',
		backgroundColor: '#FFF'
	});
	
	mainContainerView.add(settingsTable);
	
	function loadSettings(){
		var loadURL = "http://"+domain+"/model/mobile/services/users.cfc?method=getUser";
		var loadData = {
			userid: userid
		};
		
		var	callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();
			
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() {
	    		
				var json = JSON.parse(this.responseText);
				var settings = json.SETTINGS[0];
				var	userid = settings.USERID;	
				var emailaddress = settings.EMAILADDRESS;
				var password = settings.PASSWORD;
				var firstname = settings.FIRSTNAME;
				var lastname = settings.LASTNAME;
				var gender = settings.GENDER;
				var dateofbirth = settings.DATEOFBIRTH;
				var country = settings.COUNTRY;
				var zipcode = settings.ZIPCODE;
				var timezone = settings.TIMEZONE;
				var image = settings.IMAGE;

				emailField.value = emailaddress;
				passwordField.value = password;
				firstNameField.value = firstname;
				lastNameField.value = lastname;
				genderField.value = gender;
				dobField.value = dateofbirth;
				countryField.value = country;
				zipField.value = zipcode;
				timezoneField.value = timezone;
				var imageURL = "http://"+domain+"/images/profile/originals/";
				profileImageView.image = imageURL + image;
				
				//if(countryField.value.length == 0){
		    		saveUserLocation();
		    	//}
		    	saveUserLocalTimeZone();
		    	
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
	
	tabbar.addEventListener('focus', function(e) {
		if(e.index == 2){
			loadSettings();
		}
	});
	
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
			
		var saveURL = "http://"+domain+"/model/mobile/services/users.cfc?method=editUser";
		var saveData = {
		    userid: userid,
		    emailaddress: emailField.value,
		    password: passwordField.value,
		    firstname: firstNameField.value,
		    lastname: lastNameField.value,
		    gender:genderField.value,
		    dateofbirth: dobField.value,
			zipcode: zipField.value,
			image:profileImage
		};

		var xhr = Ti.Network.createHTTPClient({
			enableKeepAlive:false,
	    	onload: function() {
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
	    xhr.setRequestHeader("ContentType", "image/jpeg");
		xhr.setRequestHeader("enctype","multipart/form-data");
	    xhr.open("POST", saveURL);
		xhr.send(saveData);
		
	});
	
	var logoutButton = Titanium.UI.createButton({
		title:'Logout',
		color:'#FFF',
		backgroundImage: 'none',
		font:{
			fontSize:18,
			fontFamily:fontFamilyVar
		}
	});
	
	function checkTablet() {
		var platform = Ti.Platform.osname;

		switch (platform) {
			case 'ipad':
				return true;
			case 'android':
				var psc = Ti.Platform.Android.physicalSizeCategory;
				var tiAndroid = Ti.Platform.Android;
				return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
			default:
				return Math.min(Ti.Platform.displayCaps.platformHeight, Ti.Platform.displayCaps.platformWidth) >= 400;
		}
	}
	
	logoutButton.addEventListener('click', function() {
		var loginWindow = require('/ui/handheld/loginWindow');
		var loginWindowVar = new loginWindow();
			loginWindowVar.open();	
		
		tabbar.close();
		
		var isTablet = checkTablet();

		var Window;
		if (isTablet) {
			Window = require('/ui/tablet/ApplicationWindow');
		} else {
			Window = require('/ui/handheld/ApplicationWindow');
		}
		
		var loginWindow = require('/ui/handheld/loginWindow');
		var ApplicationTabGroup = require('/ui/common/ApplicationTabGroup');
		
		loginWindowVar.addEventListener('close',function(){
			//trackLogin(0);
			new ApplicationTabGroup(Window).open();
		});
		
		var _db = Ti.Database.open('migraine');
		var userid = Ti.App.Properties.getString("userid");
		_db.execute('UPDATE userLoginInfo set keepLoggedIn = 0 where userid = ?',userid);
		Ti.App.Properties.setString("userid","0");
		tabbar.setActiveTab(0);
	});
	
	self.setLeftNavButton(logoutButton);
	
	function saveUserLanguage(){
		var memberid = Ti.App.Properties.getString('memberid');
		var saveURL = "http://"+domain+"/model/mobile/services/users.cfc?method=userSetLanguage";
		var saveData = {
		    userid: userid,
		    languageCode:currentLanguageCode
		};

		var xhr = Ti.Network.createHTTPClient({
	    	onerror: function(e) {
	    		Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
		    	alert(L('error_retrieving_data'));
	    	},
	    	timeout:5000
	    });

	    xhr.open("POST", saveURL);
		xhr.send(saveData);	

	}

	function saveUserLocation(){
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
		Titanium.Geolocation.distanceFilter = 10;
		Titanium.Geolocation.purpose = L('settings_location_purpose');

		Titanium.Geolocation.getCurrentPosition(function(e){
			if (e.error)
			{
				return;
			}
			 
			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
			
			var userid = Ti.App.Properties.getString('userid');
			var saveURL = "http://"+domain+"/model/mobile/services/users.cfc?method=userSetLocation";
			var saveData = {
				userid: userid,
			    longitude:longitude,
			    latitude:latitude
			};

			var xhr = Ti.Network.createHTTPClient({
		    	onload: function() {
		    		var json = JSON.parse(this.responseText);
		    		var settings = json.SETTINGS[0];
		    		var	countryLabel = settings.COUNTRYLABEL;	
					countryField.value = countryLabel;
		    	},
		    	onerror: function(e) {
		    		Ti.API.info("STATUS: " + this.status);
			    	Ti.API.info("TEXT:   " + this.responseText);
			    	Ti.API.info("ERROR:  " + e.error);
			    	alert(L('error_retrieving_data'));
		    	},
			    timeout:5000
		   	});
	
		    xhr.open("POST", saveURL);
			xhr.send(saveData);				
		});
	
	}
	
	function getUserOffset(){
		var utcTime = new Date();
		var offset = utcTime.getTimezoneOffset();
		var hours = 0;
		var minutes = 0;
		var sign = "";
		var UTCCode = utcTime.toUTCString().split(" ").pop();

		if (offset > 0){
			sign = "-";
		}else if (offset < 0){
			sign = "+";
		}
		offset = Math.abs(offset);

		hours = Math.floor(offset/60);
		minutes = offset%60;

		if(hours > 0 && hours < 10){
			hours = "0"+hours.toString();
		}

		if (minutes > 0){
			hours = hours.toString()+":"+minutes.toString();
		}

		hours = sign+hours.toString();

		return hours;
	}
	
	function getUserTimeZone(){
		var utcTime = new Date();
		var utcCode = utcTime.toTimeString().split(" ").pop().replace("(","").replace(")","");
		
		return utcCode;
	}

	function saveUserLocalTimeZone(){
		var UTCOffset = getUserOffset();
		var UTCCode = getUserTimeZone();
		
		var memberid = Ti.App.Properties.getString('memberid');
		var saveURL = "http://"+domain+"/model/mobile/services/users.cfc?method=userSetUTCCode";
		var saveData = {
			userid: userid,
		    UTCCode:UTCCode,
		    UTCOffset:UTCOffset
		};

		var xhr = Ti.Network.createHTTPClient({
			onload: function() {
				var json = JSON.parse(this.responseText);
	    		var settings = json.USERINFO[0];
	    		var	timeZoneLabel = settings.TIMEZONE;	
	    		timezoneField.value = timeZoneLabel;
			},
	    	onerror: function(e) {
	    		Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
		    	alert(L('error_retrieving_data'));
	    	},
	    	timeout:5000
	    });

	    xhr.open("POST", saveURL);
		xhr.send(saveData);	

	}
	
	function resetLocationInfo (country){
		countryField.text = country;
	}
	
	this.resetLocationInfo = function(country) {
		resetLocationInfo(country);
	};
	
	return self;
};

module.exports = settingsForm;