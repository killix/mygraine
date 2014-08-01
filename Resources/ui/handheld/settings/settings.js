function settingsForm(){
	
	var settingsTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	
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
		backgroundColor:'#F5F5F5'
	}));
	
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
		width:62,
		height:82,
		borderColor:'#CCC',
		borderWidth:1,
		borderRadius:2,
		left:8,
		top:8,
		bottom:8,
		right:8,
		backgroundColor:'#d7d6d5'
	});
	
	row.add(photoView);
	
	var profileImageView = Ti.UI.createImageView({
        width:62,
		height:82,
		image:'/images/photo.JPG'
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
   		top:0,
		right:0,
		left:0,
		bottom:0,
		selectionStyle:'NONE',
		backgroundColor: '#FFF'
	});
	
	self.add(settingsTable);

	return self;
};

module.exports = settingsForm;