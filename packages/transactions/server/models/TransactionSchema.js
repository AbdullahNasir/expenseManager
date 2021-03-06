/**
 * Created by Abdullah on 8/9/2014.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TransactionSchema = new Schema({
    user:{type:Schema.ObjectId,ref:'User'},
    amount: {type : Number},
    tags:[{type:String}],
    date:{type:Date,default:Date.now},
    description:{type:String},
    type:{type:String}

});



mongoose.model('Transaction', TransactionSchema);