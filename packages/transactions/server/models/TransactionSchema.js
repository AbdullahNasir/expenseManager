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
    amount: {type : Number},
    tags:[{type:Object,ref:'Tag'}],
    date:{type:Date,default:Date.now},
    description:{type:String},
    type:{type:String}

});



mongoose.model('Transaction', TransactionSchema);