/**
* Appcelerator Titanium Platform
* Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
* Licensed under the terms of the Apache Public License
* Please see the LICENSE included with this distribution for details.
**/

(function() {	

	ef.ui = {};
	//Globally available theme object to hold theme colors/constants
	ef.ui.theme = {
		textColor:'#000000',
		grayTextColor:'#888888',
		headerColor:'#fff',
		fontFamily: 'Helvetica Neue'
	};
	
	//All shared property sets are declared here.
	ef.ui.properties = {
		//grab platform dimensions only once to save a trip over the bridge
		platformWidth: Ti.Platform.displayCaps.platformWidth,
		platformHeight: Ti.Platform.displayCaps.platformHeight,
		tabWindow: {
			backgroundColor:'#FFF',
			barColor:'#00BFFF',
			font:{
				fontSize:16,
				fontFamily:'Source Sans Pro'
			},
			navTintColor:'#FFF'
		},
		settingsLabel: {
			color:'#000',
			font:{
				fontSize:16,
				fontFamily:'Source Sans Pro'
			}
		},
		weatherLabel: {
			color:'#595959',
			font:{
				fontSize:16,
				fontFamily:'Source Sans Pro'
			}
		},
		settingsField: {
			color:'#000',
			font:{
				fontSize:16,
				fontFamily:'Source Sans Pro'
			}
		},
		button: {
			borderRadius:4,
			borderWidth:1,
			height:54,
			layout:'vertical',
			font:{
				fontSize:16,
				fontFamily:'Source Sans Pro'
			},
			top:8
		},
		textbutton: {
			height:54,
			layout:'vertical',
			font:{
				fontSize:14,
				fontFamily:'Source Sans Pro'
			},
			top:8
		}
	};
})();

//global shortcut for UI properties, since these get used A LOT. polluting the global
//namespace, but for a good cause (saving keystrokes)
var $$ = ef.ui.properties;