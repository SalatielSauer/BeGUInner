iconslist = [
	"action", "arrow_bw", "arrow_fw", "captaincannon", "captaincannon_blue", "captaincannon_red", "chat", "checkbox_off", 
	"checkbox_on", "chest", "coins", "cube", "exit", "hand", "info", "inky", "inky_blue", "inky_red", "map", "menu", "mrfixit", 
	"mrfixit_blue", "mrfixit_red", "ogro", "ogro_blue", "ogro_red", "radio_off", "radio_on", "sauer", "server", "serverfull",
	"serverlock", "serverpriv", "serverunk", "snoutx10k", "snoutx10k_blue", "snoutx10k_red", "spectator", "sword"
];

function cdialogshow(value){
	if (value == 1){
		document.getElementById("dialogadd").style.display = "unset";
	} else {
		//if (cguide.style.display == "unset"){cguide.style.display = "none"};
		document.getElementById("dialogadd").style.display = "none";
	};
};

function setvarvalues(vars, values){
	var inlist = vars.split(' ');
	var valueslist = values.split('|');
	//console.log(valueslist);

	for (i = 0; i < inlist.length; i++){
		inlist[i] = window[inlist[i]];
		
		if (!inlist[i].value){
			inlist[i].value = valueslist[i];
		};
	};
};

function getIcons(state, icon){
	
	if (state == 1){
		global_icon = document.getElementById("global_icon");
		
		global_icon.value = '"' + icon + '"';
		
		return;
	};
	
	iconstable = "";
	
	for (i = 0; i < iconslist.length; i++){
		iconstable += "<img onclick='getIcons(1, \"" + iconslist[i] + "\")' class='iconpreview' src='icons/" + iconslist[i] + ".jpg'/>";  //oh god
	};
	return "<center><textarea id='global_icon' class='dialogaddTextarea' placeholder='icon' title='Select an Icon below, or 0 to disable.'></textarea></center><br>" + iconstable;
};


function refreshvalues(){
	txtarea = document.getElementById("csarea");
	document.getElementById("dialogmain").style.display = "unset";
	cdialog = document.getElementById("dialogadd");
	cdialogtitle = document.getElementById("dialogaddtitle");
	cdialogcontent = document.getElementById("dialogaddcontent");
	cguide = document.getElementById("guide");
		
};

window.onload = function() {
	refreshvalues();
	cdialogshow(0);
};

function setCaretPosition(ctrl, pos) {
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  }
};

function getcursorpos(t) {
	txtarea = document.getElementById("csarea");
	if (t == 0){return txtarea.selectionStart} else {return txtarea.selectionEnd};
};

function gettextarea() {
	txtarea = document.getElementById("csarea");
	return txtarea.value
};

function addelement(elementto, index) {
	//saveundo(1);
	oldcaretend = getcursorpos();
    document.getElementById("csarea").value = gettextarea().substr(0, index) + '' + elementto + gettextarea().substr(index);
	setCaretPosition(txtarea, oldcaretend);
	
	cdialogshow(0);
};

//Gui Commands

function addGuititle() {
	addelement('guititle "Type your title here" ;\n', getcursorpos());
};

function addGuibar(){
	addelement('guibar ;\n', getcursorpos());
};

function addGuitab(){
	addelement('guitab "Type your tab name here" ;\n', getcursorpos());
};

function addGuilist(){
	addelement('guilist [\n \t//your gui commands goes here \n\n]', getcursorpos());
};


function addNewgui(state) {
	if (state == 1){
		setvarvalues("newgui_id newgui_name", 'unnamed-gui| ');	
		addelement('newgui "' + newgui_id.value + '" [\n\tguistayopen [\n \t\t//your gui commands goes here\n\n\t]\n] ' + newgui_name.value, getcursorpos());
		return;
	};
	cdialogshow(1);
	cdialogtitle.innerHTML = '<h3><span style="color: slategray; font-family: monospace;">newgui <span style="color: cornflowerblue; font-family: monospace;">"A" [B] C</span>';
	cdialogcontent.innerHTML = "<h4 class='dialogaddsubtitle'>Creates a new menu with ID 'A' and name 'C'. All the 'gui' menuitem commands will apply to this menu ('B').</h4>\n";
	cdialogcontent.innerHTML += "<center><textarea id='newgui_id' class='dialogaddTextarea' placeholder='identifier' title='ID used to refer the menu with the show gui command.'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><textarea id='newgui_name' class='dialogaddTextarea' placeholder='gui name' title='Leave empty to use Identifier as name, or 0 to disable.'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><button onclick='addNewgui(1)'><i class='fas fa-plus-circle'></i> Create</button></center>";
};

function addGuibutton(state) {
	if (state == 1) {
		setvarvalues("guibutton_name guibutton_action", 'unnamed-button|//your button action goes here| ');		
		addelement('guibutton "' + guibutton_name.value + '" [\n\t' + guibutton_action.value + '\n\n] ' + global_icon.value, getcursorpos());
		return;
	};
	cdialogshow(1);
	cdialogtitle.innerHTML = '<h3><span style="color: slategray; font-family: monospace;">guibutton <span style="color: cornflowerblue; font-family: monospace;">"A" [B] C</span>';
	cdialogcontent.innerHTML = "<h4 class='dialogaddsubtitle'>Creates a menu button with the name 'A' and icon 'C', which will execute 'B' when selected.</h4>";
	cdialogcontent.innerHTML += "<center><textarea id='guibutton_name' class='dialogaddTextarea' placeholder='name' title='Button name, describing the action.'></textarea></center><br>"
	cdialogcontent.innerHTML += "<center><textarea style='width: 90%; height: 100px;' id='guibutton_action' class='dialogaddTextarea' placeholder='action' title='Action executed when user clicks the button.'></textarea></center><br>";
	cdialogcontent.innerHTML += getIcons();
	cdialogcontent.innerHTML += "<center><button onclick='addGuibutton(1)'><i class='fas fa-plus-circle'></i> Create</button></center>";
};

function addGuitext(state) {
	if (state == 1){
		setvarvalues("guitext_text global_icon", 'Type your text here| ');
		addelement('guitext "' + guitext_text.value + '" ' + global_icon.value + ';', getcursorpos());
		return;
	};
	cdialogshow(1);
	cdialogtitle.innerHTML = '<h3><span style="color: slategray; font-family: monospace;">guitext <span style="color: cornflowerblue; font-family: monospace;">"A" B</span>';
	cdialogcontent.innerHTML = "<h4 class='dialogaddsubtitle'>Creates a menu item consisting of the text line 'A' and an icon 'B'.</h4>";
	cdialogcontent.innerHTML += "<center><textarea style='width: 75%;' id='guitext_text' class='dialogaddTextarea' placeholder='text' title=''></textarea></center><br>";
	cdialogcontent.innerHTML += getIcons();
	cdialogcontent.innerHTML += "<center><button onclick='addGuitext(1)'><i class='fas fa-plus-circle'></i> Create</button></center>";
};

function addGuifield(state) {
	if (state == 1){
		setvarvalues("guifield_var guifield_chars guifield_action", 'unnamed-variable|-15| ');
		addelement('guifield ' + guifield_var.value + ' ' + guifield_chars.value + ' [' + guifield_action.value + '];', getcursorpos());
		return;
	};
	cdialogshow(1);
	cdialogtitle.innerHTML = '<h3><span style="color: slategray; font-family: monospace;">guifield <span style="color: cornflowerblue; font-family: monospace;">A B [C]</span>';
	cdialogcontent.innerHTML = "<h4 class='dialogaddsubtitle'>Creates a field which accepts editable input, the value is taken from and saved to the variable 'A', with a limit of 'B' characters. 'C' is executed when the user presses enter or moves the mouse out.</h4>";
	cdialogcontent.innerHTML += "<center><textarea id='guifield_var' class='dialogaddTextarea' placeholder='variable' title='Variable used to store the field value, use $variable to refer to this variable in an action.'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><input onkeydown='return event.keyCode !== 69' style='padding-bottom: 3%; width: 28%' type='number' id='guifield_chars' class='dialogaddTextarea' placeholder='characters' title='Limit characters, use negative values to allow infinite characters.' ></input></center><br>";
	cdialogcontent.innerHTML += "<center><textarea style='width: 90%; height: 100px;' id='guifield_action' class='dialogaddTextarea' placeholder='action' title='Action executed when user moves the mouse out or press enter. (Optional)'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><button onclick='addGuifield(1)'><i class='fas fa-plus-circle'></i> Create</button></center>";
};

function addGuiimage(state) {
	if (state == 1){
		setvarvalues("guiimage_path guiimage_action guiimage_scale", 'packages/mitaman/mm-auggiedog.jpg| |1');	
		addelement('guiimage "' + guiimage_path.value + '" [' + guiimage_action.value + '] ' + guiimage_scale.value + ';', getcursorpos());
		return;
	};
	cdialogshow(1);
	cdialogtitle.innerHTML = '<h3><span style="color: slategray; font-family: monospace;">guiimage <span style="color: cornflowerblue; font-family: monospace;">\"A\" [B] C</h3></span>';
	cdialogcontent.innerHTML = "<h4 class='dialogaddsubtitle'>Creates a menu image from the path 'A', which will execute 'B' when selected. Uses 'C' as image scale.</h4><br>";
	cdialogcontent.innerHTML += "<center><textarea style='width: 90%;' id='guiimage_path' class='dialogaddTextarea' placeholder='path' title='Image path and extension. (for example: packages/mitaman/mm-auggiedog.jpg)'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><textarea style='width: 90%; height: 100px;' id='guiimage_action' class='dialogaddTextarea' placeholder='action' title='Action executed when user clicks the image. (Optional)'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><input onkeydown='return event.keyCode !== 69' style='padding-bottom: 3%; width: 28%' type='number' id='guiimage_scale' class='dialogaddTextarea' placeholder='scale' title='Image size' ></input></center><br>";
	cdialogcontent.innerHTML += "<center><button onclick='addGuiimage(1)'><i class='fas fa-plus-circle'></i> Create</button></center>";

};

function addGuislider(state) {
	if (state == 1){
		setvarvalues("guislider_var guislider_min guislider_max guislider_action", 'unnamed-variable|0|10| ');
		addelement('guislider ' + guislider_var.value + ' ' + guislider_min.value + ' ' + guislider_max.value + ' [' + guislider_action.value + '];', getcursorpos());
		return;
	};
	cdialogshow(1);
	cdialogtitle.innerHTML = '<h3><span style="color: slategray; font-family: monospace;">guislider <span style="color: cornflowerblue; font-family: monospace;">A B C [D]</h3></span>';
	cdialogcontent.innerHTML = "<h4 class='dialogaddsubtitle'>Creates a menu slider that is bound to a variable 'A', using 'B' as Min and 'C' as Max. 'D' is an action.</h4><br>";
	cdialogcontent.innerHTML += "<center><textarea id='guislider_var' class='dialogaddTextarea' placeholder='variable' title='Variable used to store the slider value, use $variable to refer to this variable in an action.'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><input onkeydown='return event.keyCode !== 69' style='padding-bottom: 3%; width: 24%' type='number' id='guislider_min' class='dialogaddTextarea' placeholder='min' title='Minimum slider value.' ></input> <input onkeydown='return event.keyCode !== 69' style='padding-bottom: 3%; width: 24%' type='number' id='guislider_max' class='dialogaddTextarea' placeholder='max' title='Maximum slider value.' ></input> </center><br>";
	cdialogcontent.innerHTML += "<center><textarea style='width: 90%; height: 100px;' id='guislider_action' class='dialogaddTextarea' placeholder='action' title='Action executed when user moves slider. (Optional)'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><button onclick='addGuislider(1)'><i class='fas fa-plus-circle'></i> Create</button></center>";

};

function addGuicheckbox(state) {
	if (state == 1){
		setvarvalues("guicheckbox_name guicheckbox_var guicheckbox_false guicheckbox_true guicheckbox_action", 'unnamed-checkbox|unnamed-variable|0|1| ');
		addelement('guicheckbox ' + guicheckbox_name.value + ' ' + guicheckbox_var.value + ' ' + guicheckbox_false.value + ' ' + guicheckbox_true.value + ' [' + guicheckbox_action.value + ']; ', getcursorpos());
		return;
	};
	cdialogshow(1);
	cdialogtitle.innerHTML = '<h3><span style="color: slategray; font-family: monospace;">guicheckbox <span style="color: cornflowerblue; font-family: monospace;">A B C D [E]</h3></span>';
	cdialogcontent.innerHTML = "<h4 class='dialogaddsubtitle'>Creates a menu checkbox with a name 'A' that is bound to a variable 'B'. The default value are 0 and 1 unless supplied by 'C' and 'D'. An action 'E' will be executed on every checkbox change.</h4><br>";
	cdialogcontent.innerHTML += "<center><textarea id='guicheckbox_name' class='dialogaddTextarea' placeholder='name' title='Checkbox name.'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><textarea id='guicheckbox_var' class='dialogaddTextarea' placeholder='variable' title='Variable used to store the checkbox value, use $variable to refer to this variable in an action.'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><textarea id='guicheckbox_false' class='dialogaddTextarea' placeholder='false' title='False checkbox value.' style='width: 24%'></textarea> <textarea id='guicheckbox_true' class='dialogaddTextarea' placeholder='true' title='True checkbox value.' style='width: 24%'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><textarea style='width: 90%; height: 100px;' id='guicheckbox_action' class='dialogaddTextarea' placeholder='action' title='Action executed when user changes checkbox. (Optional)'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><button onclick='addGuicheckbox(1)'><i class='fas fa-plus-circle'></i> Create</button></center>";
};

function addGuiitemmove(state) {
	if (state == 1){
		setvarvalues("guiitemmove_align guiitemmove_x guiitemmove_y guiitemmove_action", '0|0|0|//your gui items goes here');
		addelement('guialign ' + guiitemmove_align.value + ' [\n\tguistrut ' + guiitemmove_x.value + ' \n\tguilist [\n\t\tguistrut ' + guiitemmove_y.value + '\n\t\t' + guiitemmove_action.value + '\n\t]\n];', getcursorpos());
		return;
	};
	cdialogshow(1);
	cdialogtitle.innerHTML = '<h3><span style="color: slategray; font-family: monospace;">guiitemmove <span style="color: cornflowerblue; font-family: monospace;">A B C [D]</h3></span>';
	cdialogcontent.innerHTML = "<h4 class='dialogaddsubtitle'>Moves all content of 'D' to 'B' and 'C' positions, aligning with 'A'.</h4><br>";
	cdialogcontent.innerHTML += "<center><textarea id='guiitemmove_align' class='dialogaddTextarea' placeholder='align' title='-1 left, 0 center, 1 right'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><input onkeydown='return event.keyCode !== 69' style='padding-bottom: 3%; width: 24%' type='number' id='guiitemmove_x' class='dialogaddTextarea' placeholder='X' title='Horizontal position' ></input> <input onkeydown='return event.keyCode !== 69' style='padding-bottom: 3%; width: 24%' type='number' id='guiitemmove_y' class='dialogaddTextarea' placeholder='Y' title='Vertical position' ></input> </center><br>";
	cdialogcontent.innerHTML += "<center><textarea style='width: 90%; height: 100px;' id='guiitemmove_action' class='dialogaddTextarea' placeholder='content' title='All content that will be positioned (Optional)'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><button onclick='addGuiitemmove(1)'><i class='fas fa-plus-circle'></i> Create</button></center>";
};

function addLoop(state) {
	if (state == 1){
		setvarvalues("loop_var loop_times loop_action", 'unnamed-variable|5|say $unnamed-variable');
		addelement('loop ' + loop_var.value + ' ' + loop_times.value + ' [' + loop_action.value + '];', getcursorpos());
		return;
	};
	cdialogshow(1);
	cdialogtitle.innerHTML = '<h3><span style="color: slategray; font-family: monospace;">loop <span style="color: cornflowerblue; font-family: monospace;">A B [C]</h3></span>';
	cdialogcontent.innerHTML = "<h4 class='dialogaddsubtitle'>Executes 'C' 'B' times, and adds +1 to the variable 'A' in every iteration.</h4>";
	cdialogcontent.innerHTML += "<center><textarea id='loop_var' class='dialogaddTextarea' placeholder='variable' title='Variable used to store the loop value, use $variable to refer to this variable in an action.'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><textarea id='loop_times' class='dialogaddTextarea' placeholder='amount' title='Amout of loops.' style='width: 24%'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><textarea style='width: 90%; height: 100px;' id='loop_action' class='dialogaddTextarea' placeholder='action' title='Action executed in every interation. (Optional)'></textarea></center><br>";
	cdialogcontent.innerHTML += "<center><button onclick='addLoop(1)'><i class='fas fa-plus-circle'></i> Create</button></center>";
};


// by sumtips.com
function insertTab(o, e)
{		
	var kC = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
	if (kC == 9 && !e.shiftKey && !e.ctrlKey && !e.altKey)
	{
		var oS = o.scrollTop;
		if (o.setSelectionRange)
		{
			var sS = o.selectionStart;	
			var sE = o.selectionEnd;
			o.value = o.value.substring(0, sS) + "\t" + o.value.substr(sE);
			o.setSelectionRange(sS + 1, sS + 1);
			o.focus();
		}
		else if (o.createTextRange)
		{
			document.selection.createRange().text = "\t";
			e.returnValue = false;
		}
		o.scrollTop = oS;
		if (e.preventDefault)
		{
			e.preventDefault();
		}
		return false;
	}
	return true;
};