/*
测试
*/
var Cmd=require("../lib/tools/commandPaser.js");
var cmd=new Cmd();
cmd.setgroup(function(user){if (user=="abc") return true;return false;},{"kill":function(user,command,killed){console.log(user,"kill",killed)}});
cmd.parse("abc","kill    李大目");