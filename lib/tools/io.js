var Schema = require('jugglingdb').Schema;
var schema = new Schema('sqlite3', {
    database: 'bot.db'
});
var promise=require('bluebird');
var getable=function(table){
	if (this[table]==undefined) {
		this[table]=schema.define(table, {
			key:     { type: Schema.Text },
			value:   { type: Schema.Text }
		});
	}
	return this[table];
}
var setables=function(tables){
	this.tables={};
	for(var i in tables){
		var model=getable.call(this.tables,tables[i]);
	}
}
module.exports = io = function(tables){
	setables.call(this,tables);
	promise.promisifyAll(this);
}
io.prototype.initDB=function(tables,next){//重构数据库,会删除定义不一致的数据表
	setables(tables);
	schema.automigrate(function(){next();});
}
io.prototype.updataTables=function(tables,next){//更新数据表，会重建定义不一致的数据表和创建不存在的数据表，不会删除定义一致的表
	setables(tables);
	schema.autoupdate(function(){next();});
}
io.prototype.set=function(table,key,value,next){//设定单个键的值
	var model=getable.call(this.tables,table);
	var i=0;
	model.all({where:{"key":key}},function(err,res){
		for(;i<res.length;i++){
			if (i==0) {res[i].updateAttribute('value', value);}
			else {res[i].destroy();}
		}
		if (i==0) {
			model.create({"key":key,"value":value},function(){
				next(err,res);
			});
		}else{
			next(err,res);
		}
	});
}
io.prototype.fill=function(table,data,next){//清空后用填充数据表 data是对象
	var model=getable.call(this.tables,table);
	var arg0=[];
	for(var i in data){
		arg0.push({key:i,value:data[i]});
	}
	model.destroyAll(function(err){
		model.create(arg0,function(err,ins){
			next(err,ins);
		});
	});
}
io.prototype.get=function(table,key,next){//获取单个键的值
	var model=getable.call(this.tables,table);
	model.all({where:{"key":key}},function(err,res){
		next(err,res);
	});
}
io.prototype.getAll=function(table,next){//获取整个表的数据
	var model=getable.call(this.tables,table);
	model.all(function(err,res){
		next(err,res);
	});
}