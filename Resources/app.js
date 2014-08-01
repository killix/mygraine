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
Ti.App.Properties.setString("domain","");
	
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

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup(Window).open();
})();