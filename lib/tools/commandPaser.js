/*
指令解析器
*/
var commandPaser=function(){
	this.list={};
}
commandPaser.prototype.add=function(name,verifier,command){
	if (typeof(name)!="string") {throw "command name error!";}
	if (typeof(command)!="function"){throw "no command function";}
	if (typeof(verifier)!="function"){throw "no verifier function";}
	if (&&(name.length>3)&&(typeof(command)=="function")){
		var newcmd={};
		newcmd.command=command;
		newcmd.verifier=verifier;
		this.list[name]=newcmd;
	}
}
commandPaser.prototype.parse=function(sender,msg){
	if (typeof(msg)!="string") {return;}
	if (typeof(sender)!="string") {return;}
	var tem=msg.replace(/^\s+|\s+$/g,"").split(/\s/);
	if ((tem.length>0)&&(tem[0].length>3)){
		var cmd=this.list[tem.shift()];
		if (cmd.verifier(sender)){
			cmd.command.apply(this,tem);
		}
	}
}
module.exports = commandPaser;