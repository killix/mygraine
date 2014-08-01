function ApplicationTabGroup(Window) {
	
	//Ti.include('/ui/common/overrideTabs.js');
	
	//create module instance
	var self = Ti.UI.createTabGroup({
		backgroundColor:'#FFF',
		translucent:false,
		tintColor:'#00BFFF'
	});
	
	var homeWindow = require('/ui/handheld/home/home');
	var addWindow = require('/ui/handheld/add/add');
	var settingsWindow = require('/ui/handheld/settings/settings');
					
	//create app tabs
	var win1 = new homeWindow(),
		win2 = new addWindow({tabbar:self}),
		win3 = new settingsWindow();

	var tab1 = Ti.UI.createTab({
		title: L('home'),
		window: win1,
		icon:'/images/tabs/icn_home.png'
	});
	win1.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title: L('add'),
		window: win2,
		icon:'/images/tabs/icn_add.png'
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('settings'),
		window: win3,
		icon:'/images/tabs/icn_settings.png'
	});
	win3.containingTab = tab3;

	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	
	/*
	overrideTabs(
	    self, // The tab group
	    { 
	    	backgroundColor: '#FFF',
	    	font:{
				fontFamily:'Helvetica Neue'
			}
	   	}, 
	   	// View parameters for the background
	    { 
	    	backgroundColor: '#00BFFF', 
	    	//color: '#FFFFFF', 
	    	style: 0,
	    	font:{
				fontFamily:'Helvetica Neue'
			}
	    }, 
	    // View parameters for selected tabs 
	    { 
	    	backgroundColor: 'transparent', 
	    	//color: '#FFF', 
	    	style: 0,
	    	font:{
				fontFamily:'Helvetica Neue'
			}
	    }
	    // View parameters for deselected tabs
	);
	*/
	
	return self;
};

module.exports = ApplicationTabGroup;
