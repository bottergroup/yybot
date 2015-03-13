/*
指令解析器
*/
var commandPaser=function(){
	this.list={};
}
//name:		命令名 如果设定时是""(空字符串)，即默认命令,使用时无需输入命令名称
//verifier:	确认身份的函数 命令以认证函数分组
//command:	具体的命令
//警告：	虽然允许一条命令有多种身份使用，但是容易带来混乱，尽量避免
//建议：	普通用户使用的指令尽量短，管理指令可以稍长。
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
//group 为对象，键名为命令名 键值为 命令函数
//批量添加同一种身份验证类型的指令
commandPaser.prototype.setgroup=function(verifier,group){
	if (typeof(group)!="object") {throw "group is wrong value!";}
	if (typeof(verifier)!="function"){throw "no verifier function";}
	for(var i in group){
		if (typeof(group[i])!="function") {throw "wrong value!";}
		this.set(i,verifier,group[i]);
	}
}
commandPaser.prototype.parse=function(sender,msg){
	if (typeof(msg)!="string") {return;}
	if (typeof(sender)!="string") {return;}
	var tem=msg.replace(/^\s+|\s+$/g,"").split(/\s/);
	if (tem.length>0){
		var cmd=this.list[tem[0]];
		if (cmd==undefined) {cmd=this.list[""];}
		if (typeof(cmd)=="object") {
			var verifiers=cmd.verifiers;
			for(var i in verifiers){
				if (verifiers[i](sender)) {
					cmd.commands[i].apply(this,[sender].push(tem));
					return;
				}
			}
		}
	}
}
module.exports = commandPaser;