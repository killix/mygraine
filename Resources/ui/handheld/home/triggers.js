function triggersWindow(_args){
	
	var triggersTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var selectedValues = [];
	var parentObject = _args.parentObject;
	var preSelectedValues = _args.preSelectedValues;
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Triggers',
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
	
	var triggerArray = new Array();
	triggerArray.push('Wine');
	triggerArray.push('Cheese');
	
	for(i=0;i<triggerArray.length;i++){
		
		if(preSelectedValues.indexOf(triggerArray[i]) != -1){
			var checkedVar = true;
			selectedValues.push(triggerArray[i]);
		}
		else{
			var checkedVar = false;
		}
		
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:false,
			hasCheck:checkedVar,
			val:triggerArray[i]
		});
		
		row.addEventListener('click', function(e) {
			var checked = e.rowData.hasCheck;
			if(checked){
				e.rowData.hasCheck = false;
				selectedValues.pop(e.rowData.val);
			}
			else{
				e.rowData.hasCheck = true;
				selectedValues.push(e.rowData.val);
			}
		});
		
		var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text:triggerArray[i],
		    left:15,
		    height:54
		}));
		
		row.add(fieldLabel);
		
		triggersTableData.push(row);
	}
	
	var triggersTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		data:triggersTableData,
   		rowheight:54,
		selectionStyle:'NONE',
		backgroundColor: 'transparent'
	});
	
	triggersTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(triggersTable);
	
	self.addEventListener('close', function(e) {
		parentObject.populateTriggers(selectedValues);
	});
	
	return self;
	
};

module.exports = triggersWindow;
	