function homeForm(){
	
	var calendarTableData = [];
	var linksTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var migraineDetailsWindow = require('/ui/handheld/home/migraineDetails');
	var notificationsWindow = require('/ui/handheld/home/notificationsWindow');
	
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
		layout:'vertical',
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
		height:98,
		title:'',
		top:8,
		layout:'horizontal',
		backgroundColor:'#FFF'
	});
	
	var photoImageView = Ti.UI.createImageView({
		width:62,
		height:82,
		borderRadius:2,
		left:8,
		top:8,
		bottom:8,
		right:8,
		backgroundColor:'#d7d6d5',
		image:'/images/photo.JPG'
	});
	
	profileRow.add(photoImageView);
	
	var profileInfoView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:98,
		top:4,
		bottom:8,
		right:8,
		layout:'vertical'
	});
	
	var nameLabel = Ti.UI.createLabel({
		text: 'Jim Villa',
	    left: 0,
	    font:{
	    	fontSize:fontSizeVar,
	    	fontFamily:fontFamilyVar
	    },
	    color:'#595959'
	});
	
	profileInfoView.add(nameLabel);
	
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
		text:'8',
		color:'#FFF',
		font:{
			fontSize:18,
	    	fontFamily:fontFamilyVar
	    }
	});
	
	var daysSinceText = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'days since last migraine',
		color:'#595959',
		font:{
			fontSize:16,
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
		left:0,
		top:4,
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
		text:'32',
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
			fontSize:16,
	    	fontFamily:fontFamilyVar
	   	},
	   	left:8
	});
	
	totalMigrainesNumberCircle.add(totalMigrainesNumber);
	totalMigrainesView.add(totalMigrainesNumberCircle);
	totalMigrainesView.add(totalMigrainesText);
	
	profileInfoView.add(totalMigrainesView);
	
	profileRow.add(profileInfoView);
	
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
		var callHistoryWindow = new historyWindow();
		self.containingTab.open(callHistoryWindow);
	});
	
	sectionView.add(viewHistoryButton);
	
	var section = Ti.UI.createTableViewSection({
		headerView:sectionView,
		hasChild:true,
		height:44
	});
	
	calendarTableData.push(section);
	
	var daysToSubtract = 11;
	
	for (var i=0; i<3; i++) {
		var weekRow = Ti.UI.createTableViewRow({
			width:'100%',
			height:62,
			title:'',
			top:8,
			layout:'horizontal'
		});
		for (var j=0; j<4; j++) {
			if(j==0){
				var leftVar = 8;
				var rightVar = 4;
			}
			else if(j==3){
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
				backgroundColor:'#00BFFF',
				borderRadius:2
			});
			
			var labelView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				backgroundColor:'transparent',
				layout:'vertical'
			});
			
			if(j==0){
				var circleColor = '#0F0';
			}
			else if(j==1){
				var circleColor = '#FF0';
			}
			else if(j==2){
				var circleColor = '#FF8300';
			}
			else{
				var circleColor = '#F00';
			}
			
			var redOverlay = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:(j+1)*25+'%',
				bottom:0,
				backgroundColor:circleColor
			});
			
			var dayString = Ti.UI.createLabel({
				text:getDateString(daysToSubtract),
				color:'#595959',
				font:{
					fontSize:fontSizeVar,
			    	fontFamily:fontFamilyVar
			   },
			   top:0
			});
			
			var dayNumber = Ti.UI.createLabel({
				text:getMonthString(daysToSubtract) + ' ' + getDateFormatted(daysToSubtract),
				color:'#595959',
				font:{
					fontSize:fontSizeVar,
			    	fontFamily:fontFamilyVar
			    }
			});
			
			daysToSubtract = daysToSubtract-1;
			
			dayColumn.add(redOverlay);
			dayColumn.add(labelView);
			labelView.add(dayString);
			labelView.add(dayNumber);
			
			weekRow.add(dayColumn);
			
			dayColumn.addEventListener('click', function() {
				var callMigraineDetailsWindow = new migraineDetailsWindow();
				callMigraineDetailsWindow.open({modal:true});
			});
		}
		calendarTableData.push(weekRow);
	}
	
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
	
	var linkRow = Ti.UI.createTableViewRow({
		width:Ti.UI.FILL,
		height:54,
		title:'',
		top:0,
		left:0,
		hasChild:true,
		backgroundColor:'#FFF',
		layout:'vertical',
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
	
	linkRow.addEventListener('click', function() {
		var historyWindow = require('/ui/handheld/home/medications');
		var callHistoryWindow = new historyWindow();
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
		layout:'horizontal',
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
		left:4
	});
	
	var alertsNumber = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:'4',
		color:'#FFF',
		font:{
			fontSize:18,
	    	fontFamily:fontFamilyVar
	    }
	});
	
	alertsNumberCircle.add(alertsNumber);
	
	alertsRow.add(alertsNumberCircle);
	
	alertsRow.addEventListener('click', function() {
		var alertsWindow = require('/ui/handheld/home/alerts');
		var callAlertsWindow = new alertsWindow();
		self.containingTab.open(callAlertsWindow);
	});
	
	linksTableData.push(alertsRow);
	
	var linksTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		top:0,
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
	
	return self;
};

module.exports = homeForm;