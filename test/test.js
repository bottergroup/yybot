/*
测试
*/
"use strict";
var assert=require("assert");

describe("commandPaser",function(){
	var Cmd;
	it("commandPaser load",function(){
		Cmd=require("../lib/tools/commandPaser.js");
	});
	it("commandPaser run",function(){
		var cmd=new Cmd();
		cmd.setgroup(function(verinfo){
			if ((verinfo.user=="狗熊")&&(verinfo.room=="游戏1")) return true;return false;
		},
		{
			"杀死":
			function(verinfo,command,killed){
				return "to "+verinfo.room+":"+verinfo.user+" kill "+killed;
			}
		});
		assert.equal(cmd.parse({user:"狗熊",room:"游戏1"},"杀死             李大目"),"to 游戏1:狗熊 kill 李大目");
	});
});
describe("io",function(){
	var Io;
	it("io load",function(){
		Io=require("../lib/tools/io.js");
	});
	it("io run",function(){
		var io=new Io(["user"]);
		var outerr=function(err){console.log(err);done();};
		io.updataTablesAsync(["user"]).then(function(){
			io.setAsync("user","me","b").then(function(){
				io.getAsync("user","me").then(function(res){
					console.log(res[0]);
				}).catch(outerr);
			});
		});
	});
});
