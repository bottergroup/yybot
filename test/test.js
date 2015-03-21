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
	var Io=require("../lib/tools/io.js");
	var io=new Io(["user"]);;
	it("full",function(done){
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
	it("initDB",function(done){
		io.initDBAsync([],function(){
			done();
		});
	});
	it("updataTables",function(done){
		io.updataTablesAsync(["user"]).then(function(){
			done();
		});
	});
	it("set",function(done){
		io.setAsync("user","me","b").then(function(){
			done();
		});
	});
	it("get",function(done){
		io.getAsync("user","me").then(function(res){
			assert.equal(res[0].key,"me");
			assert.equal(res[0].value,"b");
			done();
		}).catch(function(err){if (err!=undefined) {console.log(err);}done();});
	});
	it("fill",function(done){
		io.fillAsync("user",{"good":"李大目","bad":"八爪鱼"}).then(function(err,ins){
			done();
		}).catch(function(err){if (err!=undefined) {console.log(err);}done();});
	});
	it("getAll",function(done){
		io.getAllAsync("user").then(function(res){
			assert.equal(res[0].key,"good");
			assert.equal(res[0].value,"李大目");
			assert.equal(res[1].key,"bad");
			assert.equal(res[1].value,"八爪鱼");
			done();
		}).catch(function(err){if (err!=undefined) {console.log(err);}done();});
	});
});