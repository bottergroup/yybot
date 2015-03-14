/*
测试
*/
var Cmd=require("../lib/tools/commandPaser.js");
var cmd=new Cmd();
cmd.setgroup(function(verinfo){if ((verinfo.user=="狗熊")&&(verinfo.room=="游戏1")) return true;return false;},{"杀死":function(verinfo,command,killed){return "to"+verinfo.room+":"+verinfo.user+" kill "+killed;}});
if (cmd.parse({user:"狗熊",room:"游戏1"},"杀死             李大目")=="to游戏1:狗熊 kill 李大目") {console.log("commandPaser ok")} else console.log("commandPaser wrong!");