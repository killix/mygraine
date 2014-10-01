function loginWindow() {
	
	var loginTableData = [];
	var domain = Ti.App.Properties.getString("domain");
	var userid = Ti.App.Properties.getString("userid");
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var registerWindow = require('/ui/handheld/registerWindow');
	var passwordWindow = require('/ui/handheld/passwordWindow');
	var loginObject = this;
	
	var self = Ti.UI.createWindow({
		fullscreen:true,
		navBarHidden:true,
		backgroundColor:'#00BFFF'
	});

	function logMemberIn() {
		var blankfields = '';
		if(emailField.value == ''){
			blankfields = 'Email Address is a required field.\n';
		}
		if(passwordField.value == ''){
			blankfields += 'Password is a required field.';
		}
		if(blankfields != ''){
			alert(blankfields);
			return false;
		}
		//Login code will go here
		//var _db = Ti.Database.open('migraine');
		var	callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();

		var loginURL = "http://"+domain+"/model/mobile/services/users.cfc?method=userLogin";
		var loginData = {
			emailAddress: emailField.value,
		    password: passwordField.value
		};

		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() {
	    		
	    		var json = JSON.parse(this.responseText);
	    		var user = json.USERINFO[0];
	    		var	userid = user.USERID;
	    		
	    		Ti.App.Properties.setString("userid",userid); 
	    		
	    		if(userid == 0){
	    			alert('Invalid email address and/or password!');
	    			//errorLabel.visible = true;	
	    			callLoadingWindow.close();
	    			return false;
	    		}
	    		
	    		_db = Ti.Database.open('migraine');	

				var now = Math.round(new Date().getTime() / 1000);
										
				var userFound = _db.execute('SELECT COUNT(userid) FROM userLoginInfo WHERE userid = ?',userid);
		
				if(userFound.field(0) == 1) {
					userFound.close();
					_db.execute('UPDATE userLoginInfo SET email = ?, password = ?, timestamp_current = ?, keepLoggedIn = ? WHERE userid = ?',emailField.value,passwordField.value,now,true,userid);
					var memberInfo = _db.execute('SELECT email,password FROM userLoginInfo WHERE userid = ?',userid);
					Ti.App.Properties.setString("username",memberInfo.field(0));
					Ti.App.Properties.setString("password",memberInfo.field(1));
					memberInfo.close();
				}	
				else {	
					userFound.close();
					_db.execute('DELETE FROM userLoginInfo');
					_db.execute('INSERT INTO userLoginInfo (userid, email, password, timestamp_current, keepLoggedIn) VALUES (?,?,?,?,?)', userid, emailField.value, passwordField.value,now,true);
					var memberInfo = _db.execute('SELECT email,password FROM userLoginInfo WHERE userid = ?',userid);
					Ti.App.Properties.setString("username",memberInfo.field(0));
					Ti.App.Properties.setString("password",memberInfo.field(1));
					memberInfo.close();
				}
			
				_db.close();
				callLoadingWindow.close();
				self.close();
	    	},
	    	onerror: function(e) {
	    		Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
		    	callLoadingWindow.close();
		    	alert(L('error_retrieving_data'));
	    	}
	    });

	    xhr.open("POST", loginURL, true);
		xhr.send(loginData);
	}
	
	function registerNewMember(){
		var	callRegisterWindow = new registerWindow({loginWindow:self,loginObject:loginObject});
			callRegisterWindow.openRegister();
	}
	
	function showPasswordHelp(){
		var	callPasswordWindow = new passwordWindow({loginWindow:self});
			callPasswordWindow.openForgotPassword();
	}
	
	var _db = Ti.Database.open('migraine');
	
	var getuserid = _db.execute('SELECT email, password FROM userLoginInfo ORDER BY timestamp_current DESC LIMIT 1');
	
	var emailAddressVal = "";
	var passwordVal = "";
	var keepMeLoggedIn = false;
	
	if (getuserid.isValidRow()) {
		emailAddressVal = getuserid.field(0);
		passwordVal = getuserid.field(1);
	}
	
	_db.close();
	getuserid.close();
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		height:108
	});
	
	var logoImageView = Ti.UI.createImageView({
		image:'/images/logo.png',
		width:Ti.UI.FILL
	});
	
	row.add(logoImageView);
	
	loginTableData.push(row);
	
	var loginTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:loginTableData,
   		top:8,
		right:8,
		left:8,
		bottom:8,
		borderWidth:0,
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		selectionStyle:'NONE',
		backgroundColor: 'transparent',
		editable:true,
		scrollable:false
	});
	
	self.add(loginTable);
	
	var loginTableData = [];
	
	var row = Ti.UI.createTableViewRow(ef.combine($$.loginRow,{
		title:''
	}));
	
	var emailField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    hintText:'Email Address',
	    value:emailAddressVal,
	    autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	    keyboardType:Titanium.UI.KEYBOARD_EMAIL,
	    left: 15,
	    right: 10,
	    textAlign: 'left',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
	    bubbleParent: false,
	    returnKeyType:Ti.UI.RETURNKEY_DONE
	}));
	
	row.add(emailField);
	
	loginTableData.push(row);
	
	var row = Ti.UI.createTableViewRow(ef.combine($$.loginRow,{
		title:''
	}));
	
	var passwordField = Ti.UI.createTextField(ef.combine($$.settingsField,{
	    hintText:'Password',
	    value:passwordVal,
	    left: 15,
	    right: 10,
	    textAlign: 'left',
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
	    height:54,
	    autocorrect:false,
	    bubbleParent: false,
	    passwordMask:true,
		clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
		returnKeyType:Ti.UI.RETURNKEY_DONE
	}));

	row.add(passwordField);
	
	loginTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		backgroundColor:'#FFF'
	});
	
	var loginButton = Ti.UI.createButton(ef.combine($$.button,{
		title:'Login',
		backgroundColor:'#FFF',
		borderColor:'#FFF',
		width:Ti.UI.FILL,
		color:'#00BFFF'
	}));
				
	loginButton.addEventListener('click', function() {
		logMemberIn();
	});
	
	row.add(loginButton);
	
	loginTableData.push(row);
	
	var loginTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:loginTableData,
   		top:124,
		right:8,
		left:8,
		bottom:8,
		borderWidth:1,
		borderColor:'#FFF',
		borderRadius:2,
		selectionStyle:'NONE',
		backgroundColor: '#FFF',
		editable:true,
		scrollable:false
	});
	
	self.add(loginTable);
	
	var loginTableData = [];
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		backgroundColor:'transparent'
	});
	
	Ti.Facebook=Titanium.Facebook = require('facebook');
    Ti.Facebook.appid = '763148417059882';
    Ti.Facebook.permissions = ['publish_stream','email','user_about_me'];
    Ti.Facebook.forceDialogAuth = true;
    
    var facebookButton = Ti.UI.createButton(ef.combine($$.button,{
		title:'Login with Facebook',
		backgroundColor:'#3b5998',
		borderColor:'#3b5998',
		width:Ti.UI.FILL,
		color:'#FFF'
	}));
	
    facebookButton.addEventListener('click', function() {
	    Ti.Facebook.addEventListener('login', function(e) {
	        if (e.success) {
	            Ti.API.info(e.data);
	            Ti.API.info(e.uid);
	            if(e.data.gender == 'male'){
	            	var gendertempvar = 'Male';
	            }
	            else{
	            	var gendertempvar = 'Female';
	            }
	            //alert('Logged In');
	            var saveURL = "http://"+domain+"/model/mobile/services/users.cfc?method=createUser";
				var saveData = {
				    emailaddress: e.data.email,
				    password: e.uid,
				    firstname: e.data.first_name,
				    lastname: e.data.last_name,
				    gender: gendertempvar
				};
		
				var xhr = Ti.Network.createHTTPClient({
					enableKeepAlive:false,
			    	onload: function() {
			    		newLogin(e.data.email,e.uid);
			    		self.close();
						
			    	},
			    	onerror: function(e) {
			    		//alert("STATUS: " + this.status);
				    	//alert("TEXT:   " + this.responseText);
				    	//alert("ERROR:  " + e.error);
			    	},
			    	timeout:999999
			    });
			    //xhr.setRequestHeader("ContentType", "image/jpeg");
				//xhr.setRequestHeader("enctype","multipart/form-data");
			    xhr.open("GET", saveURL);
				xhr.send(saveData);
				
	        } else if (e.error) {
	            //alert(e.error);
	        } else if (e.cancelled) {
	            //alert("Canceled");
	        }
	    });
    	Ti.Facebook.authorize();
    });
	
	row.add(facebookButton);
	
	loginTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		backgroundColor:'transparent'
	});
	
	var registerButton = Ti.UI.createButton(ef.combine($$.button,{
		title:'Sign up with email',
		backgroundColor:'#22746B',
		borderColor:'#22746B',
		width:Ti.UI.FILL,
		color:'#FFF'
	}));
				
	registerButton.addEventListener('click', function() {
		registerNewMember();
	});
	
	row.add(registerButton);
	
	loginTableData.push(row);
	
	var row = Ti.UI.createTableViewRow({
		title:'',
		backgroundColor:'transparent'
	});
	
	var passwordHelpButton = Ti.UI.createButton(ef.combine($$.textbutton,{
		title:'Forgot Password',
		width:Ti.UI.FILL,
		color:'#FFF'
	}));
				
	passwordHelpButton.addEventListener('click', function() {
		showPasswordHelp();
	});
	
	row.add(passwordHelpButton);
	
	//loginTableData.push(row);
	
	var loginTable = Ti.UI.createTableView({
		width:'75%',
		height:Ti.UI.SIZE,
		data:loginTableData,
		bottom:8,
		borderWidth:0,
		borderRadius:2,
		selectionStyle:'NONE',
		backgroundColor: 'transparent',
		editable:true,
		scrollable:false,
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
	});
	
	self.add(loginTable);
	
	function newLogin(emailaddress,password){
		emailField.value = emailaddress;
		passwordField.value = password;
		logMemberIn();
	}
	
	this.newLogin = function(emailaddress,password){
		newLogin(emailaddress,password);
	};
	
	return self;
};

module.exports = loginWindow;
