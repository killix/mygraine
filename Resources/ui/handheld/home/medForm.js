function medicationWindow(_args){
	
	Ti.include('calendarFunctions.js');
	
	var medsTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var json;
	var containingTab = _args.containingTab;
	var calendarField;
	var daysField;
	var timeField;
	var medNameField;
	var unitField;
	var dosageField;
	var loadingWindow = require('/ui/handheld/loadingWindow');
	var userid = Ti.App.Properties.getString('userid');
	var domain = Ti.App.Properties.getString('domain');
	var parentObject = _args.parentObject;
	var medid = _args.medid;
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Medication',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		backgroundColor:'#d7d6d5'
	}));
	
	var saveButton = Titanium.UI.createButton({
		title:'Save'
	});
	
	self.setRightNavButton(saveButton);
	
	var medsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:medsTableData,
   		top:8,
		right:8,
		left:8,
		bottom:8,
		borderWidth:1,
		borderColor:'#CCC',
		borderRadius:2,
		selectionStyle:'NONE',
		backgroundColor: '#FFF'
	});
	
	medsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(medsTable);
	
	function loadMedication(){
		json = '';
		medsTableData = [];
		
		var loadURL = "http://"+domain+"/model/mobile/services/meds.cfc?method=getMeds";
		var loadData = {
			userid: userid,
			medid: medid,
			listAll: 0
		};
		
		var	callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();
			
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() {
	    		var json = JSON.parse(this.responseText);
	    		
				medsTableData.push(medTable(json));

				medsTable.setData(medsTableData);
				
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
	
	function medTable(json){
		
		med = json.MEDS[0];
		if(json.MEDS.length == 0){
			var medvar = '';
			var dosevar = '';
			var unitvar = '';
			var daysvar = '';
			var timevar = '';
			var calendarvar = false;
		}
		else{
			var medvar = med.MEDICATION;
			var dosevar = med.DOSENUMBER;
			var unitvar = med.DOSEUNIT;
			var daysvar = med.DAYS;
			var timevar = med.TIME;
			var calendarvar = med.ADDTOCALENDAR;
		}
		
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:false
		});
		
		var medLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text:'Medication',
		    left:15,
		    height:54
		}));
		
		row.add(medLabel);
		
		medNameField = Titanium.UI.createTextField(ef.combine($$.settingsField,{
		    value:medvar,
		    right:10,
		    height:54,
		    hintText: 'Medication',
		    returnKeyType:Titanium.UI.RETURNKEY_DONE,
		    textAlign: 'right',
		    autocorrect:false,
		    autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
		}));
		
		row.add(medNameField);
		
		medsTableData.push(row);
		
		var space = Ti.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		var done = Ti.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.DONE,
			width:20
		});
		
		var dosageToolbar = Ti.UI.iOS.createToolbar({
			items:[space,done],
			width:Ti.UI.FILL,
			height:43,
			backgroundColor:'#bbb'
		});
		
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:false
		});
		
		var medLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text:'Dosage',
		    left:15,
		    height:54
		}));
		
		row.add(medLabel);
		
		dosageField = Titanium.UI.createTextField(ef.combine($$.settingsField,{
		    value:dosevar,
		    right:10,
		    height:54,
		    hintText: 'Dosage',
		    keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
		    keyboardToolbar:dosageToolbar,
		    textAlign: 'right',
		    autocorrect:false
		}));
		
		done.addEventListener('click', function() {
			dosageField.blur();
		});
		
		row.add(dosageField);
		
		medsTableData.push(row);
		
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:false
		});
		
		var medLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text:'Unit',
		    left:15,
		    height:54
		}));
		
		row.add(medLabel);
		
		unitField = Titanium.UI.createTextField(ef.combine($$.settingsField,{
		    value:unitvar,
		    right:10,
		    height:54,
		    hintText:'Unit',
		    returnKeyType:Titanium.UI.RETURNKEY_DONE,
		    textAlign: 'right',
		    autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
		}));
		
		row.add(unitField);
		
		medsTableData.push(row);
		
		var daysRow = Ti.UI.createTableViewRow({
			title:'',
			hasChild:true
		});
		
		var medLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text:'Days',
		    left:15,
		    height:54
		}));
		
		daysRow.add(medLabel);
		
		daysField = Ti.UI.createTextField({
			value:daysvar
		});
		
		var daysString = '';
		var savedArray = daysvar;
		var savedTemp = '' ;

		if(daysvar.toString().length > 1){
			savedArray = savedArray.split(",");
		}
		else{
			savedArray = daysvar.toString();
		}

		for(i = 0; i < savedArray.length; i++){
			savedTemp = savedArray[i]*1;
			
			if(savedTemp == 1){
				daysString += ' '+ 'Sun';
			}
			if(savedTemp == 2){
				daysString += ' '+ 'Mon';
			}
			if(savedTemp == 3){
				daysString += ' '+ 'Tues';
			}
			if(savedTemp == 4){
				daysString += ' '+ 'Wed';
			}
			if(savedTemp == 5){
				daysString += ' '+ 'Thurs';
			}
			if(savedTemp == 6){
				daysString += ' '+ 'Fri';
			}
			if(savedTemp == 7){
				daysString += ' '+ 'Sat';
			}

		}
		
		var daysLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
			text:daysString,
			right:10,
			width:200,
			font:{
		    	fontSize:12
			},
			textAlign: 'right',
			color:'#000'
		}));
		
		daysRow.add(daysLabel);
		
		medsTableData.push(daysRow);
		
		daysRow.addEventListener('click', function() {
		
			var daysWindow = Ti.UI.createWindow(ef.combine($$.tabWindow,{
				titleControl:Ti.UI.createLabel({
					text:'Days',
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
			
			var daysTable = Ti.UI.createTableView({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
		   		top:8,
				right:8,
				left:8,
				bottom:8,
				borderWidth:1,
				borderColor:'#CCC',
				borderRadius:2,
				selectionStyle:'NONE',
				backgroundColor: '#FFF'
			});
			
			daysTable.footerView = Ti.UI.createView({
		    	height: 1,
		   		backgroundColor: 'transparent'
			});
			
			daysWindow.add(daysTable);
			
			containingTab.open(daysWindow);
			
			var days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			var daysAbbr = [ 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
			var dayValues = [ "1","2","3","4","5","6","7" ];
			var daysTableData = [];
			var selectedDays = [];
			var selectedDayValues = [];
			var currentDayValues = daysField.value.toString();

			for(i = 0; i < days.length; i++){
	
				var isSelected = -1;
				if(currentDayValues)//check if defined
					isSelected = currentDayValues.indexOf(dayValues[i]);
	
				if(isSelected < 0){
					isSelected = false;
				}
				else{
					isSelected = true;
					selectedDays.push(daysAbbr[i].toString());
					selectedDayValues.push(dayValues[i]);
				}
			  	var row = Ti.UI.createTableViewRow(ef.combine($$.settingsLabel,{
					title:days[i].toString(),
					abbr:daysAbbr[i].toString(),
					value:dayValues[i],
					hasChild:false,
					backgroundColor:'transparent',
					hasCheck:isSelected
				}));
				
				row.addEventListener('click', function(e) {
					if(e.rowData.hasCheck == false){
						e.rowData.hasCheck = true;
						selectedDays.push( e.rowData.abbr );
						selectedDayValues.push( e.rowData.value );
					}
					else{
						e.rowData.hasCheck = false;
						selectedDays.splice(selectedDays.indexOf(e.rowData.abbr),1);
						selectedDayValues.splice(selectedDayValues.indexOf(e.rowData.value),1);
					}
					//Ti.API.info(selectedDays);
					//Ti.API.info(selectedDayValues);
				});
			  	daysTableData.push(row);
			}
			daysTable.setData(daysTableData);
			
			daysWindow.addEventListener('close', function() {
				var daysList = '';
				selectedDayValues.sort();
				for(i = 0; i < selectedDayValues.length; i++){
					daysList = daysList + ' ' + daysAbbr[ selectedDayValues[i]-1 ].toString();//zero-indexed array
				}
				daysLabel.text = daysList;
				daysField.value = selectedDayValues.join(",");
			});
		});
		
		var row = Ti.UI.createTableViewRow({
			title:''
		});
		
		var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text: 'Time',
		    left:15,
		    height:54
		}));
		
		timeField = Ti.UI.createTextField(ef.combine($$.settingsField,{
		    right:10,
		    width:100,
		    height:54,
		    hintText:'Time',
		    textAlign: 'right',
		    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		    value:timevar
		}));
		
		row.add(fieldLabel);
		row.add(timeField);
		
		var timePickerView = Titanium.UI.createView({
			height:251,
			bottom:-251,
			zIndex:10,
			layout:'vertical'
		});
		
		self.add(timePickerView);
	
		var timeDone =  Titanium.UI.createButton({
			title:'Done',
			style:Titanium.UI.iPhone.SystemButtonStyle.DONE
		});
		var timeSpacer =  Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var timeToolbar =  Ti.UI.iOS.createToolbar({
			top:0,
			items:[timeSpacer,timeDone]
		});
		
		var slide_in =  Titanium.UI.createAnimation({bottom:0});
		var slide_out =  Titanium.UI.createAnimation({bottom:-251});
		
		var hour;
		var min;
		
		timeDone.addEventListener('click', function() {
			var amPM = '';
			var d = new Date(timePicker.value);
	      		hour = d.getHours();
	 			min = d.getMinutes();
	     	if(hour<12){
	        	amPM = 'AM';
			}
			else{
	    		amPM = 'PM';
			}
			// By default simulator display 24 hrs format but you can convert it 12 hrs format 
	        if (hour == 0){
	        	hour = 12;
	        }
	 
	        if (hour > 12){
	        	hour = hour - 12;
	        }
	        
	        if(min < 10){
	        	min = '0' + min;
	        }
	        
	        timeField.value = hour + ':' +  min + ' '  + amPM;
			timePickerView.animate(slide_out);
		});
		
		timePicker = Ti.UI.createPicker({
			type:Ti.UI.PICKER_TYPE_TIME,
			selectionIndicator:true
		});
	
		timePicker.addEventListener('change', function(e) {
			var amPM = '';
			var d = new Date(e.value);
	      		hour = d.getHours();
	 			min = d.getMinutes();
	     	if(hour<12){
	        	amPM = 'AM';
			}
			else{
	    		amPM = 'PM';
			}
			// By default simulator display 24 hrs format but you can convert it 12 hrs format 
	        if (hour == 0){
	        	hour = 12;
	        }
	 
	        if (hour > 12){
	        	hour = hour - 12;
	        }
	        
	        if(min < 10){
	        	min = '0' + min;
	        }
	        
	        timeField.value = hour + ':' +  min + ' '  + amPM;
		});
		
		timeField.addEventListener('focus', function() {
			timeField.blur();
			var amPM = '';
			var d = new Date(timePicker.value);
	      		hour = d.getHours();
	 			min = d.getMinutes();
	     	if(hour<12){
	        	amPM = 'AM';
			}
			else{
	    		amPM = 'PM';
			}
			// By default simulator display 24 hrs format but you can convert it 12 hrs format 
	        if (hour == 0){
	        	hour = 12;
	        }
	 
	        if (hour > 12){
	        	hour = hour - 12;
	        }
	        
	        if(min < 10){
	        	min = '0' + min;
	        }
	        
	        timeField.value = hour + ':' +  min + ' '  + amPM;
			timePickerView.animate(slide_in);
		});
		
		timePickerView.add(timeToolbar);
		timePickerView.add(timePicker);
		
		medsTableData.push(row);
		
		var row = Ti.UI.createTableViewRow({
			title:''
		});
		
		var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text: 'Add to Calendar',
		    left:15,
		    height:54
		}));
		
		calendarField = Ti.UI.createSwitch(ef.combine($$.settingsField,{
			right: 10,
			height:54,
			value:calendarvar // mandatory property for iOS 
		}));
		
		row.add(fieldLabel);
		row.add(calendarField);
		
		medsTableData.push(row);
	}
	
	saveButton.addEventListener('click',function(e){
		var callLoadingWindow = new loadingWindow();
			callLoadingWindow.open();
			
		var saveURL = "http://"+domain+"/model/mobile/services/meds.cfc?method=addMed";
		var saveData = {
			userid: userid,
			medid:medid,
		    medName: medNameField.value,
		    dosage: dosageField.value,
		    unit: unitField.value,
		    days: daysField.value,
		    time: timeField.value,
		    addtoCalendar: calendarField.value
		};
	
		var xhr = Ti.Network.createHTTPClient({
	    	onload: function() {

	    		var json = JSON.parse(this.responseText);
				var medication = json.MEDINFO[0];
				var	medicationid = medication.ID;
				
				if(calendarField.value==true && (daysField.value.length)) {
		    		var title = 'Take Medication' + ' - '+medNameField.value;
		
					var reminder_time = timeField.value;
					var meridiem = reminder_time.substr(reminder_time.length-2,2);
					var theTime = reminder_time.substr(0,reminder_time.length-3).split(':');
					
					if(meridiem == 'PM')
						theTime[0] = theTime[0]*1+12;
		
					var recurrence_days_of_week_array = daysField.value.split(',');
					
					if(recurrence_days_of_week_array.length > 0){
						var zeroedDayOfWeek = recurrence_days_of_week_array[0]-1;//Sunday==0
					}
					else{
						var d = new Date();//default to tomorrow
						d.setDate(d.getDate() +1); 
						var zeroedDayOfWeek = d.getDay();
					}
		
					var start_date = getNextDateForWeekday(zeroedDayOfWeek);
		
					start_date.setHours(theTime[0],theTime[1],0,0);
		
					var recurrence_days_of_week = '[{';
					for(var i = 0; i < recurrence_days_of_week_array.length; i++)
					{
						// Add additional code here, such as:
						recurrence_days_of_week += 'dayOfWeek:'+recurrence_days_of_week_array[i];
						if(i < (recurrence_days_of_week_array.length-1))
							recurrence_days_of_week += '},{';
					}
					recurrence_days_of_week += '}]';
		
					if (Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
						setCalendar(medicationid,title,start_date,recurrence_days_of_week);
					} 
					else {
						Ti.Calendar.requestEventsAuthorization(function(e){
							if (e.success) {
								setCalendar(medicationid,title,start_date,recurrence_days_of_week);
							} 
							else {
								alert('Access to calendar is not allowed.');
							}
						});
					}
					
				}//if(daysField.value.length)
				else{
					if (Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
						removeCalendarEventsByMemberMedicationId(medicationid);
					}
				}
				self.close();
				parentObject.loadMeds();
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
	    
	    xhr.open("POST", saveURL);
		xhr.send(saveData);
	});
	
	self.addEventListener('open',function(e){
		loadMedication();
	});
	
	return self;
	
};

module.exports = medicationWindow;	
