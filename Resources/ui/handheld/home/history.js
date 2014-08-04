function historyWindow(){
	
	var migrainesTableData = [];
	var migraineDetailsWindow = require('/ui/handheld/home/migraineDetails');
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var migraine;
	var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	var loadingWindow = require('/ui/handheld/loadingWindow');
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'History',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		layout:'vertical',
		backgroundColor:'#d7d6d5'
	}));
	
	var buttonView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:62,
		backgroundColor:'#d7d6d5',
		layout:'horizontal'
	});
	
	var listButton = Titanium.UI.createButton({
		title:'List',
		width:148,
		height:54,
		top:8,
		bottom:0,
		left:8,
		right:4,
		font:{
			fontSize:18,
			fontFamily:fontFamilyVar
		},
		backgroundColor:'#FFF'
	});
	
	var graphButton = Titanium.UI.createButton({
		title:'Graph',
		width:148,
		height:54,
		top:8,
		bottom:0,
		left:4,
		right:8,
		font:{
			fontSize:18,
			fontFamily:fontFamilyVar
		},
		backgroundColor:'#FFF'
	});
	
	buttonView.add(listButton);
	buttonView.add(graphButton);
	
	self.add(buttonView);
	
	var shareButton = Titanium.UI.createButton({
		title:'Share',
		color:'#FFF',
		backgroundImage: 'none',
		font:{
			fontSize:18,
			fontFamily:fontFamilyVar
		}
	});
	
	self.setRightNavButton(shareButton);
	
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
	
	function getDateString(days){
		
		var dateToday = new Date();
		var minusDays = days;
		dateToday.setDate(dateToday.getDate() - minusDays); 
		
		var formattedString = weekday[dateToday.getDay()];
		
		return formattedString;
	
	}

	var daysToSubtract = 280;
	var j = 0;
	
	function createRow(json,i){
		
		migraine = json.MIGRAINE[i];
		
		var row = Ti.UI.createTableViewRow({
			width:Ti.UI.FILL,
			height:93,
			title:'',
			top:0,
			layout:'horizontal'
		});
		
		var calendarView = Ti.UI.createView({
			width:69,
			height:69,
			backgroundColor:'#FFF',
			borderRadius:2,
			left:8,
			right:8
		});
		
		var dayString = Ti.UI.createLabel({
			text:migraine.DAYOFWEEK,
			width:Ti.UI.SIZE,
			color:'red',
			font:{
				fontSize:14,
		    	fontFamily:fontFamilyVar
		  	},
		  	top:4
		});
		
		var dayNumber = Ti.UI.createLabel({
			text:migraine.DAYNUMBER,
			width:Ti.UI.SIZE,
			color:'#595959',
			font:{
				fontSize:46,
		    	fontFamily:fontFamilyVar
		  	},
		  	top:10
		});
		
		calendarView.add(dayString);
		calendarView.add(dayNumber);
		
		var dayColumn = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:85,
			top:0,
			backgroundColor:'#00BFFF',
			borderRadius:2,
			borderWidth:1,
			borderColor:'#00BFFF'
		});
		
		row.add(dayColumn);
		
		dayColumn.add(calendarView);
		
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
		
		var colorOverlay = Ti.UI.createView({
			width:(migraine.SEVERITY)*25+'%',
			height:20,
			top:5,
			bottom:0,
			right:0,
			left:0,
			backgroundColor:circleColor
		});
		
		var severityString = Ti.UI.createLabel({
			text:migraine.SEVERITY+' / 4',
			width:Ti.UI.SIZE,
			color:'#595959',
			font:{
				fontSize:fontSizeVar,
		    	fontFamily:fontFamilyVar
		  	}
		});
		
		colorOverlay.add(severityString);
		
		//dayColumn.add(colorOverlay);
		
		var datesColumn = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			top:0,
			left:85,
			right:8,
			layout:'vertical'
		});
		
		var dayString = Ti.UI.createLabel({
			text:migraine.STARTDATETIME,
			color:'#595959',
			font:{
				fontSize:fontSizeVar,
		    	fontFamily:fontFamilyVar
		   },
		   top:4,
		   left:0
		});
		
		var durationString = Ti.UI.createLabel({
			text:migraine.DURATION,
			color:'#595959',
			font:{
				fontSize:fontSizeVar,
		    	fontFamily:fontFamilyVar
		   },
		   top:4,
		   left:0
		});
		
		datesColumn.add(dayString);
		datesColumn.add(durationString);
		datesColumn.add(colorOverlay);
		dayColumn.add(datesColumn);
		
		dayColumn.addEventListener('click', function() {
			var callMigraineDetailsWindow = new migraineDetailsWindow();
			callMigraineDetailsWindow.open({modal:true});
		});
		
		return row;
	}
	
	var calendarTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		top:8,
		bottom:0,
		top:8,
		right:8,
		left:8,
		data:migrainesTableData,
		selectionStyle:'NONE',
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
    	separatorColor: '#FFF',
		scrollable:true,
		backgroundColor:'transparent'
	});
	
	calendarTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(calendarTable);
	
	function loadMigraines(){
		var loadURL = "http://"+domain+"/model/mobile/services/migraines.cfc?method=getMigraines";
		var loadData = {
			userid: userid
		};
		
		var	callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();
			
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() {
	    		
	    		var migrainesTableData = [];
	    		var json = JSON.parse(this.responseText);
	    		
	    		for (i = 0; i < json.MIGRAINE.length; i++) {
		    		migrainesTableData.push(createRow(json,i));    
		    	}

				calendarTable.setData(migrainesTableData);
				
				callLoadingWindow.close();
	    	},
	    	onerror: function(e) {
	    		Ti.API.info("STATUS: " + this.status);
		    	Ti.API.info("TEXT:   " + this.responseText);
		    	Ti.API.info("ERROR:  " + e.error);
				callLoadingWindow.close();
		    	alert('error');
	    	},
	    	timeout:5000
	    });
	    xhr.open("GET", loadURL);
		xhr.send(loadData);	
	}	
	
	self.addEventListener('open', function(e) {
		loadMigraines();
	});
	
	return self;
	
};

module.exports = historyWindow;
	