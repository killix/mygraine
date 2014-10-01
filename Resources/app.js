/*
* A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.
* A starting point for tab-based application with multiple top-level windows.
* Requires Titanium Mobile SDK 1.8.0+.
*
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/

//bootstrap and check dependencies
if (Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

var ef = {};

Ti.App.Properties.setString("userid","0");
Ti.App.Properties.setString("domain","www.sportsuniformsunlimited.com/Mygraine");
// This is a single context application with mutliple windows in a stack
(function() {

	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	var empty = {};
	function mixin(/*Object*/target, /*Object*/source) {
		var name, s, i;
		for (name in source) {
			s = source[name];
			if (!( name in target) || (target[name] !== s && (!( name in empty) || empty[name] !== s))) {
				target[name] = s;
			}
		}
		return target;
		// Object
	};

	ef.combine = function(/*Object*/obj, /*Object...*/props) {
		var newObj = {};
		for (var i = 0, l = arguments.length; i < l; i++) {
			mixin(newObj, arguments[i]);
		}
		return newObj;
	};

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
	
	Ti.include('/styles/app.js');

	var isTablet = checkTablet();

	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	} else {
		Window = require('ui/handheld/ApplicationWindow');
	}
	
	var loginWindow = require('ui/handheld/loginWindow');
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	
	function checkSession(){

		var _db = Ti.Database.open('migraine');
		var userid = Ti.App.Properties.getString("userid");
		
		_db.execute('CREATE TABLE IF NOT EXISTS userLoginInfo (' +
					'userid INTEGER NOT NULL, ' +
					'email STRING NOT NULL, ' +
					'password STRING NOT NULL, ' +
					'keepLoggedIn BIT NOT NULL, ' +
					'timestamp_current INTEGER NOT NULL);');
																
		var now = Math.round(new Date().getTime() / 1000);

		var getuserid = _db.execute('SELECT userid FROM userLoginInfo WHERE keepLoggedIn = 1 ORDER BY timestamp_current DESC LIMIT 1');
		if (getuserid.isValidRow()) {
			userid = getuserid.field(0);	
			Ti.App.Properties.setString("userid",userid);
		}

		getuserid.close();
		
		var userFound = _db.execute('SELECT COUNT(userid) FROM userLoginInfo WHERE userid = ?',userid);

		if(userFound.field(0) == 1) {							
			_db.execute('UPDATE userLoginInfo set timestamp_current = ? where userid = ?',now,userid);
			userFound.close();
			var userInfo = _db.execute('SELECT email,password FROM userLoginInfo WHERE userid = ?',userid);
			
			Ti.App.Properties.setString("username",userInfo.field(0));
			Ti.App.Properties.setString("password",userInfo.field(1));
			
			userInfo.close();
			_db.close();
			return false;
		}	
		else {
			userFound.close();
			_db.close();
			return true;
		}
    };
    
    function trackLogin(bypassLogin){
    	var domain = Ti.App.Properties.getString('domain');
		var userid = Ti.App.Properties.getString('userid');
		var badgeCount = Ti.UI.iPhone.getAppBadge();
		var loginURL = "http://"+domain+"/model/mobile/services/users.cfc?method=logUserLogin";
		
		var loginData = {
		    userid: userid,
		    bypasslogin:bypassLogin,
		    badgeCount:badgeCount
		};
		
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() { 
	    		
	    		var json = JSON.parse(this.responseText);
	    		var user = json.USERINFO[0];

	    		if(user.USERID > 0){
		    		new ApplicationTabGroup(Window).open();
	    		}
	    		else{
	    			var loginWindowVar = new loginWindow();
					loginWindowVar.open();
					loginWindowVar.addEventListener('close',function(){
						trackLogin(0);
						new ApplicationTabGroup(Window).open();
					});
	    		}
	    	},
	    	onerror: function(e) {
	    		
	    	},
	    	timeout:5000
	    });
	    
	    xhr.open("POST", loginURL);
		xhr.send(loginData);
    };
    
    function checkConnection(){
    	if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){ 
    		// that's no network connectivity.
    		alert('No Internet Connection!');
    		var loginWindowVar = new loginWindow();
			loginWindowVar.open();
			loginWindowVar.addEventListener('close',function(){
				trackLogin(0);
				new ApplicationTabGroup(Window).open();
			});
    		return false;
    	}
    }
    
	function manageLogin(){
	    if(checkSession()){
	    	checkConnection();
			var loginWindowVar = new loginWindow();
			loginWindowVar.open();
			loginWindowVar.addEventListener('close',function(){
				//trackLogin(0);
				new ApplicationTabGroup(Window).open();
			});
	    }
	    else{
	    	checkConnection();
	    	trackLogin(1);
	    }   
	};
	
	manageLogin();
	
})();
