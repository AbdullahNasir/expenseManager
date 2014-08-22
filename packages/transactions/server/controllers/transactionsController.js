'use strict';
/**
 * Created by Abdullah on 8/21/14.
 */

var mongoose = require('mongoose'),
    Transactions = mongoose.model('Transaction'),
    Q=require('q');


/*new transaction
    Input Params,
         {
         amount: {type : Number},
         tags:[{type:Object,ref:'Tag'}],
         date:{type:Date,default:Date.now},
         description:{type:String},
         type:{type:String}

         }
 */
var newTransaction = function(data){
    var deferred = Q.defer();
     var transaction = new Transactions();

    transaction.user = data.user;
     transaction.date = data.date;
     transaction.type = data.type;
     transaction.amount = data.amount;
     transaction.description = data.description;
     transaction.tags = data.tags;

    transaction.save(function(err){
        if(!err){
            deferred.resolve({success:true});
        }else{
            deferred.reject({success:false,err:err});
        }
    });

    return deferred.promise;
};



exports.Transaction = function(req,res){

    var data= {};
    data.user = req.user.id;
    data.date = req.body.date;
    data.type = req.body.type; // this could either be 'income' or 'expense'
    data.amount = req.body.amount;
    data.description = req.body.description;
    data.tags = req.body.tags;

    newTransaction(data).then(function(response){
        res.json(response);
    }).fail(function(err){
        res.json(err);
    });
};


/*edit transaction
*  Input Params,
 {
 user:logged in user,
 transactionId:{id of the object}
 amount: {type : Number},
 tags:[{type:Object,ref:'Tag'}],
 date:{type:Date,default:Date.now},
 description:{type:String},
 type:{type:String}

 }
* */
var editTransaction = function(data){
    var deferred = Q.defer();

    Transactions.findById(data.transactionId).exec(function(err,transaction){
        if(!transaction){
            deferred.reject({success:false,err:'transaction does not exist'});
        }else{

            //check if this transaction is actually belongs to logged in user
            if(transaction.user !== data.user){
                deferred.reject({success:false,err:'Unauthorized'});
            }
            transaction.date = data.date;
            transaction.type = data.type;
            transaction.amount = data.amount;
            transaction.description = data.description;
            transaction.tags = data.tags;

            transaction.update(function(err,object){
                if(!err){
                    deferred.resolve({success:true,obj:object});
                }else{
                    deferred.reject({success:false,err:err});
                }
            });
        }
    });

    return deferred.promise;
};

exports.Update = function(req,res){

    var data= {};
    data.transactionId = req.params.transactionId;
    data.user = req.user.id;
    data.date = req.body.date;
    data.type = req.body.type; // this could either be 'income' or 'expense'
    data.amount = req.body.amount;
    data.description = req.body.description;
    data.tags = req.body.tags;

    editTransaction(data).then(function(response){
        res.json(response);
    }).fail(function(err){
            res.json(err);
        });
};

//Get transactions
var getTransactions = function(params){

    var deferred = Q.defer();

    Transactions.find({}).exec(function(err,transactions){
            if(!err){
                deferred.resolve(transactions);
            }else{
                console.log(err);
                deferred.reject({err:'some error occurred'});
            }
    });

    return deferred.promise;
};

exports.transactions = function(req,res){

        getTransactions({}).then(function(response){
            res.json(response);
        }).fail(function(err){
                res.json(err);
            });
};

