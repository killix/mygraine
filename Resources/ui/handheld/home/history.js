function historyWindow(){
	
	var calendarTableData = [];
	var migraineDetailsWindow = require('/ui/handheld/home/migraineDetails');
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	
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
	for (var i=0; i<20; i++) {
		var weekRow = Ti.UI.createTableViewRow({
			width:Ti.UI.FILL,
			height:93,
			title:'',
			top:0,
			layout:'horizontal'
		});
		
		var dayColumn = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:85,
			top:0,
			backgroundColor:'#00BFFF',
			borderRadius:2,
			borderWidth:1,
			borderColor:'#00BFFF'
		});
		
		weekRow.add(dayColumn);
		
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
		
		var colorOverlay = Ti.UI.createView({
			width:(j+1)*25+'%',
			height:20,
			bottom:0,
			left:0,
			backgroundColor:circleColor
		});
		
		var severityString = Ti.UI.createLabel({
			text:j+1,
			width:Ti.UI.SIZE,
			color:'#595959',
			font:{
				fontSize:fontSizeVar,
		    	fontFamily:fontFamilyVar
		  	}
		});
		
		colorOverlay.add(severityString);
		
		if(j > 2){
			j = 0;
		}
		else{
			j++;
		}
		
		dayColumn.add(colorOverlay);
		
		var datesColumn = Ti.UI.createView({
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE,
			top:0,
			left:0,
			layout:'vertical'
		});
		
		var dayString = Ti.UI.createLabel({
			text:'Jun 10, 2014 4:10pm',
			color:'#FFF',
			font:{
				fontSize:fontSizeVar,
		    	fontFamily:fontFamilyVar
		   },
		   top:8,
		   left:8
		});
		
		var durationString = Ti.UI.createLabel({
			text:'2hrs 20min',
			color:'#FFF',
			font:{
				fontSize:fontSizeVar,
		    	fontFamily:fontFamilyVar
		   },
		   top:8,
		   left:8
		});
		
		datesColumn.add(dayString);
		datesColumn.add(durationString);
		
		dayColumn.add(datesColumn);
		
		dayColumn.addEventListener('click', function() {
			var callMigraineDetailsWindow = new migraineDetailsWindow();
			callMigraineDetailsWindow.open({modal:true});
		});
		
		calendarTableData.push(weekRow);
	}
	
	var calendarTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		top:8,
		bottom:0,
		top:8,
		right:8,
		left:8,
		data:calendarTableData,
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
	
	return self;
	
};

module.exports = historyWindow;
	