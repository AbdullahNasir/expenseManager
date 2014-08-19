/**
 * Created by Abdullah on 8/9/2014.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TagSchema = new Schema({
    name:{type:String}
});



mongoose.model('Transaction', TransactionSchema);