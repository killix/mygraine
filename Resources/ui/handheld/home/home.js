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
	var loaded = 0;
	
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
		height:152,
		title:'',
		top:4,
		backgroundColor:'transparent'
	});
	
	var topView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:32,
		top:0,
		layout:'vertical',
		backgroundColor:'transparent'
	});
	
	var tabView = Ti.UI.createView({
		left:4,
		top:4,
		width:Ti.UI.SIZE,
		height:38,
		backgroundColor:'white',
		borderRadius:2,
		layout:'vertical',
		borderWidth:1,
		borderColor:'#FFF',
		borderRadius:2,
		clipMode:Titanium.UI.iOS.CLIP_MODE_ENABLED 
	});
	
	var nameLabel = Ti.UI.createLabel({
		text:'',
	    left:4,
	    right:4,
	    top:2,
	    font:{
	    	fontSize:22,
	    	fontFamily:fontFamilyVar
	    },
	    color:'#000',
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
		right:4,
		left:4,
		borderWidth:1,
		borderColor:'#FFF',
		borderRadius:2,
		backgroundColor:'#FFF'
	});
	
	profileRow.add(topView);
	profileRow.add(bottomView);
	
	var photoContainerView = Ti.UI.createView({
		width:104,
		height:104,
		borderRadius:52,
		left:4,
		top:4,
		bottom:4,
		right:4,
		backgroundColor:'#d7d6d5',
		borderWidth:0,
		borderColor:'transparent'
	});
	
	var editPhotoText = Ti.UI.createLabel({
		text:'Add Profile Photo\n in Settings',
		font:{
			fontSize:12,
			fontFamily:'Source Sans Pro'
		},
		width:Ti.UI.FILL,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	photoContainerView.add(editPhotoText);
	
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
		top:4,
		bottom:4,
		right:4,
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
		},30);
	}
	
	var daysSinceText = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'Days Since Last Migraine',
		color:'#000',
		font:{
			fontSize:14,
	    	fontFamily:fontFamilyVar
	   	},
	   	left:4
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
		text:'Migraines Recorded',
		color:'#000',
		font:{
			fontSize:14,
	    	fontFamily:fontFamilyVar
	   	},
	   	left:4
	});
	
	totalMigrainesNumberCircle.add(totalMigrainesNumber);
	totalMigrainesView.add(totalMigrainesNumberCircle);
	totalMigrainesView.add(totalMigrainesText);
	
	profileInfoView.add(totalMigrainesView);
	
	var averageMigrainesView = Ti.UI.createView({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		left:0,
		top:6,
		layout:'horizontal'
	});
	
	var averageMigrainesNumberCircle = Ti.UI.createView({
		width:30,
		height:30,
		borderRadius:15,
		backgroundColor:'',
		left:0
	});
	
	var averageMigrainesNumber = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'-',
		color:'#000',
		font:{
			fontSize:18,
	    	fontFamily:fontFamilyVar
	    }
	});
	
	var totalMigrainesText = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'Average Severity',
		color:'#000',
		font:{
			fontSize:14,
	    	fontFamily:fontFamilyVar
	   	},
	   	left:4
	});
	
	averageMigrainesNumberCircle.add(averageMigrainesNumber);
	averageMigrainesView.add(averageMigrainesNumberCircle);
	averageMigrainesView.add(totalMigrainesText);
	
	profileInfoView.add(averageMigrainesView);
	
	bottomView.add(profileInfoView);
	
	calendarTableData.push(profileRow);
	
	var sectionView = Ti.UI.createView({
		backgroundColor:'transparent',
		height:44
	});
	
	var sectionLabel = Titanium.UI.createLabel({
	    text: 'Recent History',
	    left: 10,
	    height:44,
	    font:{
	    	fontSize:fontSizeVar,
	    	fontFamily:fontFamilyVar
	    },
	    color:'#595959'
	});
	
	sectionView.add(sectionLabel);
	
	var viewHistoryButton = Titanium.UI.createButton({
		title:'View All',
		right:35,
		height:44,
		font:{
			fontSize:fontSizeVar,
			fontFamily:fontFamilyVar
		},
		color:'#595959'
	});
	
	var viewHistoryImage = Titanium.UI.createImageView({
		image:'/images/next.png',
		right:10,
		height:18
	});
	
	viewHistoryButton.addEventListener('click', function() {
		var historyWindow = require('/ui/handheld/home/history');
		var callHistoryWindow = new historyWindow({tabbar:tabbar,containingTab:self.containingTab,parentObject:parentObject});
		self.containingTab.open(callHistoryWindow);
	});
	
	sectionView.add(viewHistoryButton);
	sectionView.add(viewHistoryImage);
	
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
	
	function blankRow(){
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:false
		});
		
		var migraineLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text: 'You have no migraines at this time!',
		    height:54
		}));
		
		row.add(migraineLabel);
		
		return row;
	}

    var iPhoneDevice = Titanium.Platform.displayCaps.platformHeight;
	var recentHistoryTableHeight = Ti.Platform.displayCaps.platformHeight - 422;
	if(iPhoneDevice < 577){
		var howManyRowsWidth = 0.50;
	}
	else{
		var howManyRowsWidth = 0.333;
	}
	
	function populateRecentHistory(json){
		recentHistoryTableData = [];
		var migraineCount = 0;
		
		if(json.MIGRAINE.length == 0){
			recentHistoryTableData.push(blankRow());
		}
		
		for (i = 0; i < json.MIGRAINE.length; i++) {
			migraineCount = migraineCount+1;
			migraine = json.MIGRAINE[i];
			
			if(migraineCount == 1){
			
				var weekRow = Ti.UI.createTableViewRow({
					width:'100%',
					height:recentHistoryTableHeight*howManyRowsWidth,
					title:'',
					layout:'horizontal'
				});
			}
			
			if(migraineCount==1){
				var leftVar = 4;
				var rightVar = 2;
			}
			else if(migraineCount==4){
				var leftVar = 2;
				var rightVar = 4;
			}
			else{
				var leftVar = 2;
				var rightVar = 2;
			}
			
			var outerDayColumn = Ti.UI.createView({
				width:Ti.Platform.displayCaps.platformWidth*0.25,
				height:Ti.UI.FILL,
				migraineid:migraine.MIGRAINEID
			});
			
			var dayColumn = Ti.UI.createView({
				//width:Math.round(Ti.Platform.displayCaps.platformWidth*.2229),
				height:Ti.UI.FILL,
				right:rightVar,
				top:4,
				left:leftVar,
				backgroundColor:'#FFF',
				borderRadius:2,
				borderColor:'#CCC',
				migraineid:migraine.MIGRAINEID
			});
			
			outerDayColumn.add(dayColumn);
			
			var labelView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				backgroundColor:'transparent',
				layout:'vertical',
				migraineid:migraine.MIGRAINEID
			});
			
			if(migraine.SEVERITY==1){
				var circleColor1 = '#0F0';
				var circleColor2 = '#d7d6d5';
				var circleColor3 = '#d7d6d5';
				var circleColor4 = '#d7d6d5';
			}
			else if(migraine.SEVERITY==2){
				var circleColor1 = '#d7d6d5';
				var circleColor2 = '#FF0';
				var circleColor3 = '#d7d6d5';
				var circleColor4 = '#d7d6d5';
			}
			else if(migraine.SEVERITY==3){
				var circleColor1 = '#d7d6d5';
				var circleColor2 = '#d7d6d5';
				var circleColor3 = '#FF8300';
				var circleColor4 = '#d7d6d5';
			}
			else{
				var circleColor1 = '#d7d6d5';
				var circleColor2 = '#d7d6d5';
				var circleColor3 = '#d7d6d5';
				var circleColor4 = '#F00';
			}
			
			var redOverlay = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:(migraine.SEVERITY)*25+'%',
				bottom:0,
				//backgroundColor:circleColor,
				migraineid:migraine.MIGRAINEID
			});
			
			var dayString = Ti.UI.createLabel({
				text:migraine.DAYOFWEEK,
				height:Ti.UI.SIZE,
				color:'#000',
				font:{
					fontSize:12,
			    	fontFamily:fontFamilyVar
			   	},
			   	top:0,
			   	bottom:0,
			   	backgroundColor:'transparent',
			   	migraineid:migraine.MIGRAINEID
			});
			
			var dayNumber = Ti.UI.createLabel({
				text:migraine.MONTHNUMBER + '/' + migraine.DAYNUMBER,
				height:Ti.UI.SIZE,
				color:'#000',
				font:{
					fontSize:20,
			    	fontFamily:fontFamilyVar
			   	},
			   	top:0,
			   	bottom:0,
			   	backgroundColor:'transparent',
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
			
			//dayColumn.add(redOverlay);
			dayColumn.add(labelView);
			labelView.add(dayString);
			labelView.add(dayNumber);
			
			var circlesView = Ti.UI.createView({
				width:Ti.UI.SIZE,
				height:Ti.UI.FILL,
				backgroundColor:'horizontal',
				layout:'horizontal',
				migraineid:migraine.MIGRAINEID,
				top:8
			});
			
			var circleWidth = (((Ti.Platform.displayCaps.platformWidth*0.25)-4)*0.25)-4;
			
			var circleView1 = Ti.UI.createView({
				width:circleWidth,
				height:circleWidth,
				borderRadius:circleWidth/2,
				backgroundColor:circleColor1,
				migraineid:migraine.MIGRAINEID,
				left:2,
				right:1
			});
			
			var circleView2 = Ti.UI.createView({
				width:circleWidth,
				height:circleWidth,
				borderRadius:circleWidth/2,
				backgroundColor:circleColor2,
				migraineid:migraine.MIGRAINEID,
				left:1,
				right:1
			});
			
			var circleView3 = Ti.UI.createView({
				width:circleWidth,
				height:circleWidth,
				borderRadius:circleWidth/2,
				backgroundColor:circleColor3,
				migraineid:migraine.MIGRAINEID,
				left:1,
				right:1
			});
			
			var circleView4 = Ti.UI.createView({
				width:circleWidth,
				height:circleWidth,
				borderRadius:circleWidth/2,
				backgroundColor:circleColor4,
				migraineid:migraine.MIGRAINEID,
				left:1,
				right:2
			});
			
			circlesView.add(circleView1);
			circlesView.add(circleView2);
			circlesView.add(circleView3);
			circlesView.add(circleView4);
			labelView.add(circlesView);
			
			//labelView.add(dayMonth);
			
			weekRow.add(outerDayColumn);
			
			dayColumn.addEventListener('click', function(e) {
				var migraineEditWindow = require('/ui/handheld/home/edit');
				var callEditMigraineWindow = new migraineEditWindow({tabbar:tabbar,containingTab:self.containingTab,migraineid:e.source.migraineid,parentObject:parentObject,homeObject:parentObject});
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
		height:recentHistoryTableHeight,
		top:194,
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
		var callHistoryWindow = new historyWindow({containingTab:self.containingTab,parentObject:parentObject});
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
		var callAlertsWindow = new alertsWindow({containingTab:self.containingTab});
		self.containingTab.open(callAlertsWindow);
	});
	
	linksTableData.push(alertsRow);
	
	var linksTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		bottom:4,
		right:4,
		left:4,
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
				
				if(json.USERINFO.AVERAGEMIGRAINE == 1){
					averageMigrainesNumberCircle.backgroundColor = '#0F0';
				}
				else if(json.USERINFO.AVERAGEMIGRAINE == 2){
					averageMigrainesNumberCircle.backgroundColor = '#FF0';
				}
				else if(json.USERINFO.AVERAGEMIGRAINE == 3){
					averageMigrainesNumberCircle.backgroundColor = '#FF8300';
				}
				else if(json.USERINFO.AVERAGEMIGRAINE == 4){
					averageMigrainesNumberCircle.backgroundColor = '#F00';
				}
				else{
					averageMigrainesNumberCircle.backgroundColor = '#0F0';
				}
				loadNumber(json.USERINFO.AVERAGEMIGRAINE,averageMigrainesNumber);
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
		    	alert(L('error_retrieving_data'));
		    	callLoadingWindow.close();
	    	},
	    	timeout:5000
	    });
	    
	    xhr.open("POST", loadURL);
		xhr.send(loadData);
	}
	
	var updateButton = Titanium.UI.createButton({
		title:'',
		color:'#FFF',
		backgroundImage:'/images/update.png',
		font:{
			fontSize:18,
			fontFamily:fontFamilyVar
		},
		width:25,
		height:25
	});
	
	self.setRightNavButton(updateButton);
	
	updateButton.addEventListener('click', function(e) {
		loadHomeScreen();
	});
	
	self.addEventListener('open',function(e){
		loadHomeScreen();
	});
	
	this.loadHistory = function(){
		loadHomeScreen();
	};
	
	return self;
};

module.exports = homeForm;