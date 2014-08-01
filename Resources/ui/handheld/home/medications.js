function medicationWindow(){
	
	var medsTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	var json;
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Medications',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		layout:'vertical'
	}));
	
	var addButton = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.ADD
	});
	
	addButton.addEventListener('click',function(e){
		
	});
	
	self.setRightNavButton(addButton);
	
	var medsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		data:medsTableData,
   		top:0,
		right:0,
		left:0,
		bottom:0,
		selectionStyle:'NONE',
		backgroundColor: '#FFF'
	});
	
	medsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(medsTable);
	
	function loadMeds(){
		json = '';
		medsTableData = [];
		
		for(i=0;i<6;i++){
			medsTableData.push(medRow(json));
		}	
		
		medsTable.setData(medsTableData);
	}
	
	function medRow(json){
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:true
		});
		
		var medLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text: 'Excedrin',
		    left: 15,
		    height:54
		}));
		
		row.add(medLabel);
		
		return row;
	}
	
	self.addEventListener('focus',function(e){
		loadMeds();
	});
	
	return self;
	
};

module.exports = medicationWindow;
	