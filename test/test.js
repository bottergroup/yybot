/*
测试
*/
var Cmd=require("../lib/tools/commandPaser.js");
var cmd=new Cmd();
cmd.setgroup(function(user,room){if ((user=="abc")&&(room==undefined)) return true;return false;},{"kill":function(user,room,command,killed){return user+" kill "+killed;}});
if ((cmd.parse("abc",undefined,"kill             李大目"))=="abc kill 李大目") {console.log("commandPaser ok")} else console.log("commandPaser wrong!");