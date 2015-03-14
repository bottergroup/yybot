/*
指令解析器
*/
var commandPaser=function(){
	this.list={};
}
//name:		[string]命令名 如果设定时是""(空字符串)，即默认命令,使用时无需输入命令名称
//verifier:	[function]效验函数, 接收发送者以及其他信息，以确认是否执行该命令，如果有同名命令此函数将会决定最终以哪一种方式执行。
//command:	[function]执行函数。
//警告：	虽然允许一条命令有多种用途，但是容易带来混乱，尽量避免
//建议：	普通用户使用的指令尽量短，管理指令可以稍长。
//问题：	指令模式比较单一
commandPaser.prototype.set=function(name,verifier,command){
	if (typeof(name)!="string") {throw "command name error!";}
	if (typeof(command)!="function"){throw "no command function";}
	if (typeof(verifier)!="function"){throw "no verifier function";}
	if (typeof(command)=="function"){
		if (this.list[name]==undefined) {
			this.list[name]={verifiers:[],commands:[]};
		}
		this.list[name].verifiers.push(verifier);
		this.list[name].commands.push(command);
	}
}
//group [object]，键名为命令名 键值为 命令函数
//批量添加同一种身份验证类型的指令
commandPaser.prototype.setgroup=function(verifier,group){
	if (typeof(group)!="object") {throw "group is wrong value!";}
	if (typeof(verifier)!="function"){throw "no verifier function";}
	for(var i in group){
		if (typeof(group[i])!="function") {throw "wrong value!";}
		this.set(i,verifier,group[i]);
	}
}
//verinfo	[object]效验对象，为效验函数提供信息。(系统提供的状态信息，包括发送者名称，房间号，等，该对象的生成应当和效验函数最终的处理相匹配)
//msg		[string]文本消息，需要处理的用户信息。
commandPaser.prototype.parse=function(verinfo,msg){
	if (typeof(msg)!="string") {return;}
	if (typeof(verinfo)!="object") {return;}
	var tem=msg.replace(/^\s+|\s+$/g,"").split(/\s+/);
	if (tem.length>0){
		var cmd=this.list[tem[0]];
		if (cmd==undefined) {cmd=this.list[""];}
		if (typeof(cmd)=="object") {
			var verifiers=cmd.verifiers;
			for(var i in verifiers){
				if (verifiers[i](verinfo)) {
					return cmd.commands[i].apply(this,[verinfo].concat(tem));
				}
			}
		}
	}
}
module.exports = commandPaser;