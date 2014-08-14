var addedRemindersText = 'The reminders have been added to your calendar.';
var removedRemindersText = 'The reminders have been removed from your calendar.';

function getNextDateForWeekday(x){
	var now = new Date();    
	now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
	return now;
}//getNextDateForWeekday

function addCalendarEventsByMemberMedicationId(memberMedicationId){
	var appid = Ti.App.Properties.getString("appid");
	var memberid = Ti.App.Properties.getString("memberid");
	var domain = Ti.App.Properties.getString("domain");

	var loadURL = "http://"+domain+"/model/mobileServices/medications.cfc?method=getMemberMedications";
	var loadData = {
		appid:appid,
	    memberid:memberid,
	    memberMedicationID:memberMedicationId
	};
	
	var xhr = Ti.Network.createHTTPClient({
		onload: function() { 
    		var json = JSON.parse(this.responseText);

    		if ( JSON.stringify(json) != '' ) {
	    		var med = json.MEDICATION[0];

	    		var name = med.MEDICATIONNAME;
	    		var dosage = med.DOSAGE;
	    		var dosageMeasurement = med.DOSAGEMEASUREMENT;
	    		var frequency = med.FREQUENCY;
	    		var days = med.DAYS;
	    		var time = med.TIME;
	    		
	    		var title = 'Take Medication - '+name;
	    		var recurrence_interval = 1;
				eval('var recurrence_frequency = Ti.Calendar.RECURRENCEFREQUENCY_'+frequency.toUpperCase());//DAILY,WEEKLY,MONTHLY
				
				var meridiem = time.substr(time.length-2,2);
				var theTime = time.substr(0,time.length-3).split(':');
				
				if(meridiem == 'PM')
					theTime[0] = theTime[0]*1+12;

				var recurrence_days_of_week_array = days.split(',');

				var recurrence_days_of_week = '[{';
				for(var i = 0; i < recurrence_days_of_week_array.length; i++)
				{
					// Add additional code here, such as:
					recurrence_days_of_week += 'dayOfWeek:'+recurrence_days_of_week_array[i];
					if(i < (recurrence_days_of_week_array.length-1))
						recurrence_days_of_week += '},{';
				}
				recurrence_days_of_week += '}]';

				var zeroedDayOfWeek = recurrence_days_of_week_array[0]-1;//Sunday==0
				var start_date = getNextDateForWeekday(zeroedDayOfWeek);

				start_date.setHours(theTime[0],theTime[1],0,0);

	    		setCalendar(memberMedicationId,title,start_date,recurrence_frequency,recurrence_interval,recurrence_days_of_week);
			}
    	},
    	onerror: function(e) {
    		Ti.API.info("STATUS: " + this.status);
	    	Ti.API.info("TEXT:   " + this.responseText);
	    	Ti.API.info("ERROR:  " + e.error);
	    	alert('There was an error retrieving the remote data. Try again.');
    	},
    	timeout:5000
    });
    xhr.open("GET", loadURL);
	xhr.send(loadData);
}

function setCalendar(memberMedicationId,title,start_date,recurrence_days_of_week){
	var defCalendar = Ti.Calendar.defaultCalendar;

	if( !(Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) ) {
		Ti.Calendar.requestEventsAuthorization(function(e){
			if ( ! e.success) {
				alert('Access to calendar is not allowed.');
				return false;
			}
		});
	}

	removeCalendarEventsByMemberMedicationId(memberMedicationId);

	var event1 = defCalendar.createEvent({
		title: title,
		begin: start_date,
		end: start_date,
		availability: Ti.Calendar.AVAILABILITY_FREE,
		allDay: false
	});
	
	var simultaneousAlert = event1.createAlert({ relativeOffset:0});
	var allAlerts = new Array(simultaneousAlert);
	event1.alerts = allAlerts;
	
	eval('var daysOfTheWeek = '+recurrence_days_of_week);
	var newRule = event1.createRecurenceRule({
		daysOfTheWeek: daysOfTheWeek, 
		frequency: Titanium.Calendar.RECURRENCEFREQUENCY_WEEKLY,
		interval: 1
	});

	event1.recurrenceRules = [newRule];
	event1.save(Ti.Calendar.SPAN_THISEVENT);

	saveMemberMedicationIdAndEventId( memberMedicationId, event1.id );

	alert(addedRemindersText);
	
}//setCalendar

function removeCalendarEventsByMemberMedicationId(memberMedicationId){
	var eventId = getEventIdByMemberMedicationId(memberMedicationId);
	
	if(eventId.length > 0){
		removeCalendarEventsByEventId(eventId);
	}
	
	return true;
}//removeCalendarEventsByMemberMedicationId

function removeCalendarEventsByEventId(eventId){
	var defCalendar = Ti.Calendar.getDefaultCalendar();

	var thisEvent = defCalendar.getEventById(eventId);
	
	if(typeof thisEvent != 'undefined')
		thisEvent.remove(Titanium.Calendar.SPAN_FUTUREEVENTS);
	
	var _db = Ti.Database.open('mobileIQ');
	_db.execute('DELETE FROM medicationReminders WHERE eventId = ?',eventId);
	_db.close();
	
	alert(removedRemindersText);

	return true;
}//removeCalendarEventByEventId

function saveMemberMedicationIdAndEventId( memberMedicationId, eventId ){
	var _db = Ti.Database.open('mobileIQ');
	
	//_db.execute('DROP TABLE IF EXISTS medicationReminders');
	_db.execute('CREATE TABLE IF NOT EXISTS medicationReminders (' +
				'memberMedicationId INTEGER NOT NULL, ' +
				'eventId STRING NOT NULL);');
				
	_db.execute('INSERT INTO medicationReminders (memberMedicationId,eventId) VALUES (?, ?)', memberMedicationId, eventId);
	_db.close();

	return true;
}//saveMemberMedicationIdAndEventId

function getEventIdByMemberMedicationId(memberMedicationId){
	var _db = Ti.Database.open('mobileIQ');
		
	_db.execute('CREATE TABLE IF NOT EXISTS medicationReminders (' +
				'memberMedicationId INTEGER NOT NULL, ' +
				'eventId STRING NOT NULL);');

	var eventId = '';
	var getEventId = _db.execute('SELECT eventId FROM medicationReminders WHERE memberMedicationId = ?',memberMedicationId);

	if (getEventId.isValidRow()) {
		eventId = getEventId.field(0);	
	}

	_db.close();

	return eventId;
}//getEventIdByMemberMedicationId
