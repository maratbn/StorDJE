/*
StorDJE - Storage layer add-on module for the Dojo Toolkit event system
Version 0.3
Copyright (C) 2010 Marat Nepomnyashy All Rights Reserved.
Licensed under BSD, see: https://github.com/maratbn/StorDJE/raw/master/LICENSE
This file is optimized for deployment, for source see: https://github.com/maratbn/StorDJE/
*/

dojo.provide('stordje');(function(){stordje.publish=function(topic,args){if(!stordje._topics)stordje._topics={};stordje._topics[topic]=args;dojo.publish.apply(this,arguments);};stordje.recall=function(topic){return stordje._topics&&stordje._topics[topic]||null;};stordje.recallFirst=function(topic){var args=stordje.recall(topic);return args&&args.length>0&&args[0]||null;};})()