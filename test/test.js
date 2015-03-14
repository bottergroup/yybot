/*
测试
*/
var Cmd=require("../lib/tools/commandPaser.js");
var cmd=new Cmd();
cmd.setgroup(function(user,room){if ((user=="abc")&&(room==undefined)) return true;return false;},{"kill":function(user,room,command,killed){console.log(user,"kill",killed)}});
cmd.parse("abc",undefined,"kill    李大目");