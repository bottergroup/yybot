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
var r;
describe("io",function(){
	var Io;
	it("io load",function(){
		Io=require("../lib/tools/io.js");
	});
	it("io run",function(done){
		var io=new Io(["user"]);
		io.updataTablesAsync(["user"]).then(function(){
			io.setAsync("user","me","b").then(function(){
				io.getAsync("user","me").then(function(res){
					assert.equal(res[0].key,"me");
					assert.equal(res[0].value,"b");
					done();
				}).catch(function(err){if (err!=undefined) {console.log(err);}done();});
			});
		});
	});
});