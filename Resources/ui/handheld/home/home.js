function homeForm(_args){
	
	var calendarTableData = [];
	var recentHistoryTableData = [];
	var linksTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var notificationsWindow = require('/ui/handheld/home/notificationsWindow');
	var tabbar = _args.tabbar;
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	var medicationsCountLabel;
	var parentObject = this;
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Mygraine',
			color:'#FFF',
			font:{
				fontFamily:'Snippet',
				fontSize:28
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		tintColor:'#FFF',
		backgroundColor:'#d7d6d5'
	}));
	
	function getDateFormatted(days){
		
		var dateToday = new Date();
		var minusDays = days;
		dateToday.setDate(dateToday.getDate() - minusDays); 
		var dd = dateToday.getDate();
		var mm = dateToday.getMonth() + 1;
		var y = dateToday.getFullYear();
		
		//var formattedDate = mm + '/'+ dd + '/'+ y;
		var formattedDate = dd;
		
		return formattedDate;
	
	}
	
	var weekday = new Array(7);
		weekday[0]=  "Sun";
		weekday[1] = "Mon";
		weekday[2] = "Tues";
		weekday[3] = "Wed";
		weekday[4] = "Thur";
		weekday[5] = "Fri";
		weekday[6] = "Sat";
	
	var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";

	function getDateString(days){
		
		var dateToday = new Date();
		var minusDays = days;
		dateToday.setDate(dateToday.getDate() - minusDays); 
		
		var formattedString = weekday[dateToday.getDay()];
		
		return formattedString;
	
	}
	
	function getMonthString(days){
		
		var dateToday = new Date();
		var minusDays = days;
		dateToday.setDate(dateToday.getDate() - minusDays); 
		
		var formattedString = month[dateToday.getMonth()];
		
		return formattedString;
	
	}
	
	var profileRow = Ti.UI.createTableViewRow({
		width:Ti.UI.FILL,
		height:160,
		title:'',
		top:8,
		backgroundColor:'transparent'
	});
	
	var topView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:40,
		top:0,
		layout:'vertical',
		backgroundColor:'transparent'
	});
	
	var tabView = Ti.UI.createView({
		left:16,
		top:8,
		width:Ti.UI.SIZE,
		height:50,
		backgroundColor:'white',
		borderRadius:2,
		layout:'vertical',
		borderWidth:1,
		borderColor:'#CCC',
		borderRadius:2
	});
	
	var nameLabel = Ti.UI.createLabel({
		text: '-',
	    left:8,
	    right:8,
	    top:2,
	    font:{
	    	fontSize:22,
	    	fontFamily:fontFamilyVar
	    },
	    color:'#595959',
	    width:Ti.UI.SIZE,
	    height:Ti.UI.SIZE
	});
	
	tabView.add(nameLabel);
	
	topView.add(tabView);
	
	var bottomView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout:'horizontal',
		top:39,
		right:8,
		left:8,
		borderWidth:1,
		borderColor:'#CCC',
		borderRadius:2,
		backgroundColor:'#FFF'
	});
	
	profileRow.add(bottomView);
	profileRow.add(topView);
	
	var photoContainerView = Ti.UI.createView({
		width:104,
		height:104,
		borderRadius:52,
		left:8,
		top:8,
		bottom:8,
		right:8,
		backgroundColor:'transparent',
		borderWidth:1,
		borderColor:'#CCC'
	});
	
	var photoImageView = Ti.UI.createImageView({
		width:Ti.UI.SIZE,
		height:140,
		backgroundColor:'transparent',
		image:''
	});
	
	photoContainerView.add(photoImageView);
	
	bottomView.add(photoContainerView);

	var profileInfoView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:160,
		top:8,
		bottom:8,
		right:8,
		left:-10,
		layout:'vertical'
	});
	
	var daysSinceView = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		left:0,
		layout:'horizontal'
	});
	
	var daysSinceNumberCircle = Ti.UI.createView({
		width:30,
		height:30,
		borderRadius:15,
		backgroundColor:'#00BFFF',
		left:0
	});
	
	var daysSinceNumber = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'-',
		color:'#FFF',
		font:{
			fontSize:18,
	    	fontFamily:fontFamilyVar
	    }
	});
	
	function loadNumber(number,field){
		var startnumber = 0;
		var timer = setInterval(function(){
			field.text = startnumber;
			if(startnumber == number){
				clearInterval(timer);
			}
			startnumber = startnumber+1;
		},50);
	}
	
	var daysSinceText = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'days since last migraine',
		color:'#595959',
		font:{
			fontSize:12,
	    	fontFamily:fontFamilyVar
	   	},
	   	left:8
	});
	
	daysSinceNumberCircle.add(daysSinceNumber);
	daysSinceView.add(daysSinceNumberCircle);
	daysSinceView.add(daysSinceText);
	
	profileInfoView.add(daysSinceView);
	
	var totalMigrainesView = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		left:10,
		top:6,
		layout:'horizontal'
	});
	
	var totalMigrainesNumberCircle = Ti.UI.createView({
		width:30,
		height:30,
		borderRadius:15,
		backgroundColor:'#00BFFF',
		left:0
	});
	
	var totalMigrainesNumber = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'-',
		color:'#FFF',
		font:{
			fontSize:18,
	    	fontFamily:fontFamilyVar
	    }
	});
	
	var totalMigrainesText = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'migraines recorded',
		color:'#595959',
		font:{
			fontSize:12,
	    	fontFamily:fontFamilyVar
	   	},
	   	left:8
	});
	
	totalMigrainesNumberCircle.add(totalMigrainesNumber);
	totalMigrainesView.add(totalMigrainesNumberCircle);
	totalMigrainesView.add(totalMigrainesText);
	
	profileInfoView.add(totalMigrainesView);
	
	var totalMigrainesView = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		left:0,
		top:6,
		layout:'horizontal'
	});
	
	var totalMigrainesNumberCircle = Ti.UI.createView({
		width:30,
		height:30,
		borderRadius:15,
		backgroundColor:'#00BFFF',
		left:0
	});
	
	var otherMigrainesNumber = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'6',
		color:'#FFF',
		font:{
			fontSize:18,
	    	fontFamily:fontFamilyVar
	    }
	});
	
	loadNumber(6,otherMigrainesNumber);
	
	var totalMigrainesText = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'blah blah',
		color:'#595959',
		font:{
			fontSize:12,
	    	fontFamily:fontFamilyVar
	   	},
	   	left:8
	});
	
	totalMigrainesNumberCircle.add(otherMigrainesNumber);
	totalMigrainesView.add(totalMigrainesNumberCircle);
	totalMigrainesView.add(totalMigrainesText);
	
	profileInfoView.add(totalMigrainesView);
	
	bottomView.add(profileInfoView);
	
	calendarTableData.push(profileRow);
	
	var sectionView = Ti.UI.createView({
		backgroundColor:'transparent',
		height:54
	});
	
	var sectionLabel = Titanium.UI.createLabel({
	    text: 'Recent History',
	    left: 10,
	    height:54,
	    font:{
	    	fontSize:fontSizeVar,
	    	fontFamily:fontFamilyVar
	    },
	    color:'#595959'
	});
	
	sectionView.add(sectionLabel);
	
	var viewHistoryButton = Titanium.UI.createButton({
		title:'View All',
		right:10,
		height:54,
		font:{
			fontSize:fontSizeVar,
			fontFamily:fontFamilyVar
		},
		color:'#595959'
	});
	
	viewHistoryButton.addEventListener('click', function() {
		var historyWindow = require('/ui/handheld/home/history');
		var callHistoryWindow = new historyWindow({tabbar:tabbar,containingTab:self.containingTab});
		self.containingTab.open(callHistoryWindow);
	});
	
	sectionView.add(viewHistoryButton);
	
	var section = Ti.UI.createTableViewSection({
		headerView:sectionView,
		hasChild:true,
		height:44
	});
	
	calendarTableData.push(section);
	
	var calendarTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		top:0,
		data:calendarTableData,
		selectionStyle:'NONE',
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
    	separatorColor: '#FFF',
		backgroundColor: 'transparent',
		scrollable:false
	});
	
	calendarTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(calendarTable);
	
	function populateRecentHistory(json){
		recentHistoryTableData = [];
		var migraineCount = 0;
		for (i = 0; i < json.MIGRAINE.length; i++) {
			migraineCount = migraineCount+1;
			migraine = json.MIGRAINE[i];
			
			if(migraineCount == 1){
			
				var weekRow = Ti.UI.createTableViewRow({
					width:'100%',
					height:62,
					title:'',
					top:8,
					layout:'horizontal'
				});
			}
			
			if(migraineCount==1){
				var leftVar = 8;
				var rightVar = 4;
			}
			else if(migraineCount==4){
				var leftVar = 4;
				var rightVar = 8;
			}
			else{
				var leftVar = 4;
				var rightVar = 4;
			}
			var dayColumn = Ti.UI.createView({
				width:70,
				height:54,
				right:rightVar,
				top:0,
				left:leftVar,
				backgroundColor:'#FFF',
				borderRadius:2,
				borderColor:'#CCC',
				migraineid:migraine.MIGRAINEID
			});
			
			var labelView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				backgroundColor:'transparent',
				layout:'vertical',
				migraineid:migraine.MIGRAINEID
			});
			
			if(migraine.SEVERITY==1){
				var circleColor = '#0F0';
			}
			else if(migraine.SEVERITY==2){
				var circleColor = '#FF0';
			}
			else if(migraine.SEVERITY==3){
				var circleColor = '#FF8300';
			}
			else{
				var circleColor = '#F00';
			}
			
			var redOverlay = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:(migraine.SEVERITY)*25+'%',
				bottom:0,
				backgroundColor:circleColor,
				migraineid:migraine.MIGRAINEID
			});
			
			var dayString = Ti.UI.createLabel({
				text:migraine.DAYOFWEEK,
				height:Ti.UI.SIZE,
				color:'#595959',
				font:{
					fontSize:14,
			    	fontFamily:fontFamilyVar
			   	},
			   	top:4,
			   	bottom:0,
			   	backgroundColor:'',
			   	migraineid:migraine.MIGRAINEID
			});
			
			var dayNumber = Ti.UI.createLabel({
				text:migraine.DAYNUMBER,
				height:Ti.UI.SIZE,
				color:'#595959',
				font:{
					fontSize:22,
			    	fontFamily:fontFamilyVar
			   	},
			   	top:0,
			   	backgroundColor:'',
			   	migraineid:migraine.MIGRAINEID
			});
			
			var dayMonth = Ti.UI.createLabel({
				text:'',
				height:Ti.UI.SIZE,
				color:'#595959',
				font:{
					fontSize:fontSizeVar,
			    	fontFamily:fontFamilyVar
			   	},
			   	migraineid:migraine.MIGRAINEID
			});
			
			dayColumn.add(redOverlay);
			dayColumn.add(labelView);
			labelView.add(dayString);
			labelView.add(dayNumber);
			//labelView.add(dayMonth);
			
			weekRow.add(dayColumn);
			
			dayColumn.addEventListener('click', function(e) {
				var migraineEditWindow = require('/ui/handheld/home/edit');
				var callEditMigraineWindow = new migraineEditWindow({tabbar:tabbar,containingTab:self.containingTab,migraineid:e.source.migraineid,parentObject:parentObject});
				self.containingTab.open(callEditMigraineWindow);
			});
			
			if(migraineCount == 4 || migraineCount == json.MIGRAINE.length){
				recentHistoryTableData.push(weekRow);
				migraineCount = 0;
			}
		}
		recentHistoryTable.setData(recentHistoryTableData);
	}
	
	var recentHistoryTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		top:215,
		data:recentHistoryTableData,
		selectionStyle:'NONE',
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
    	separatorColor: '#FFF',
		backgroundColor: 'transparent',
		scrollable:false
	});
	
	recentHistoryTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(recentHistoryTable);
	
	var linkRow = Ti.UI.createTableViewRow({
		width:Ti.UI.FILL,
		height:54,
		title:'',
		top:0,
		left:0,
		hasChild:true,
		backgroundColor:'#FFF',
		leftImage:'/images/pill.png'
	});
	
	var linkLabel = Ti.UI.createLabel({
		width:Ti.UI.FILL,
		height:54,
		left:50,
		text:'Medications',
		color:'#000',
		font:{
			fontSize:fontSizeVar,
	    	fontFamily:fontFamilyVar
	    }
	});
	
	linkRow.add(linkLabel);
	
	medicationsCountLabel = Ti.UI.createLabel(ef.combine($$.settingsLabel,{
		text:'',
		right:10
	}));
	
	linkRow.add(medicationsCountLabel);
	
	linkRow.addEventListener('click', function() {
		var historyWindow = require('/ui/handheld/home/medications');
		var callHistoryWindow = new historyWindow({containingTab:self.containingTab});
		self.containingTab.open(callHistoryWindow);
	});
	
	linksTableData.push(linkRow);
	
	var alertsRow = Ti.UI.createTableViewRow({
		width:Ti.UI.FILL,
		height:54,
		title:'',
		top:0,
		left:0,
		hasChild:true,
		backgroundColor:'#FFF',
		leftImage:'/images/answers.png'
	});
	
	var linkLabel = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:54,
		left:50,
		text:'Alerts',
		color:'#000',
		font:{
			fontSize:fontSizeVar,
	    	fontFamily:fontFamilyVar
	    }
	});
	
	alertsRow.add(linkLabel);
	
	var alertsNumberCircle = Ti.UI.createView({
		width:30,
		height:30,
		borderRadius:15,
		backgroundColor:'red',
		right:0
	});
	
	var alertsNumber = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'',
		color:'#FFF',
		font:{
			fontSize:18,
	    	fontFamily:fontFamilyVar
	    }
	});
	
	alertsNumberCircle.add(alertsNumber);
	
	alertsRow.addEventListener('click', function() {
		var alertsWindow = require('/ui/handheld/home/alerts');
		var callAlertsWindow = new alertsWindow();
		self.containingTab.open(callAlertsWindow);
	});
	
	linksTableData.push(alertsRow);
	
	var linksTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		bottom:8,
		right:8,
		left:8,
		borderWidth:1,
		borderColor:'#CCC',
		borderRadius:2,
		data:linksTableData,
	    backgroundColor: 'transparent',
	    scrollable:false
	});
	
	linksTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(linksTable);
	
	function loadHomeScreen(){
		var loadURL = "http://"+domain+"/model/mobile/services/migraines.cfc?method=getHomeMigraines";
		var loadData = {
			userid: userid
		};
		
		var	callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();
			
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() {
	    		var json = JSON.parse(this.responseText);
	    		
				populateRecentHistory(json);
				medicationsCountLabel.text = json.MEDICATIONS.COUNT;
				nameLabel.text = json.USERINFO.NAME;
				var imageURL = "http://"+domain+"/images/profile/originals/";
				photoImageView.image = imageURL + json.USERINFO.IMAGE;
				daysSinceNumber.text = json.USERINFO.LASTMIGRAINEDAYS;
				loadNumber(json.USERINFO.LASTMIGRAINEDAYS,daysSinceNumber);
				totalMigrainesNumber.text = json.USERINFO.TOTALMIGRAINES;
				loadNumber(json.USERINFO.TOTALMIGRAINES,totalMigrainesNumber);
				alertsNumber.text = json.USERINFO.ALERTSCOUNT;
				if(json.USERINFO.ALERTSCOUNT > 0){
					alertsRow.add(alertsNumberCircle);
				}
				
				callLoadingWindow.close();
			},
	    	onerror: function(e) {
	    		Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
		    	callLoadingWindow.close();
	    	},
	    	timeout:5000
	    });
	    
	    xhr.open("GET", loadURL);
		xhr.send(loadData);
	}
	
	self.addEventListener('open',function(e){
		loadHomeScreen();
	});
	
	this.loadHistory = function(){
		loadHomeScreen();
	};
	
	return self;
};

module.exports = homeForm;