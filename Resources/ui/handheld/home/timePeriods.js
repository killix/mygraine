function timePeriodWindow(_args){
	
	var timePeriodTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var selectedValues = '';
	var parentObject = _args.parentObject;
	var preSelectedValues = _args.preSelectedValues;
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Time Period',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		layout:'vertical',
		backgroundColor:'#FFF'
	}));
	
	var timePeriodArray = new Array();
	timePeriodArray.push('1 Week');
	timePeriodArray.push('2 Weeks');
	timePeriodArray.push('1 Month');
	timePeriodArray.push('3 Months');
	timePeriodArray.push('6 Months');
	timePeriodArray.push('1 Year');
	timePeriodArray.push('3 Years');
	
	for(i=0;i<timePeriodArray.length;i++){
		
		if(preSelectedValues == timePeriodArray[i]){
			var checkedVar = true;
			selectedValues = timePeriodArray[i];
		}
		else{
			var checkedVar = false;
		}
		
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:false,
			hasCheck:checkedVar,
			val:timePeriodArray[i]
		});
		
		row.addEventListener('click', function(e) {
			var checked = e.rowData.hasCheck;
			if(checked){
				e.rowData.hasCheck = false;
				//selectedValues.pop(e.rowData.val);
			}
			else{
				e.rowData.hasCheck = true;
				selectedValues = e.rowData.val;
				self.close();
			}
		});
		
		var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text:timePeriodArray[i],
		    left:15,
		    height:54
		}));
		
		row.add(fieldLabel);
		
		timePeriodTableData.push(row);
	}
	
	var timePeriodTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		data:timePeriodTableData,
   		rowheight:54,
		selectionStyle:'NONE',
		backgroundColor: 'transparent'
	});
	
	timePeriodTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(timePeriodTable);
	
	self.addEventListener('close', function(e) {
		parentObject.populateTimePeriod(selectedValues);
	});
	
	return self;
	
};

module.exports = timePeriodWindow;
	