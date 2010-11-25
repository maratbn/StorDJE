// StorDJE utility version 0.1
// Copyright (C) 2010 Marat Nepomnyashy All Rights Reserved.
// Licensed under BSD, see: https://github.com/maratbn/StorDJE/raw/master/LICENSE
// This file is optimized for deployment, for source see https://github.com/maratbn/StorDJE/

if(!dojo.stordje){var funOriginalDojoPublish=dojo.publish;dojo.stordje={publish:function(topic,args){if(!dojo.stordje._topics)dojo.stordje._topics={};dojo.stordje._topics[topic]=args;funOriginalDojoPublish(topic,args);},recall:function(topic){return dojo.stordje._topics&&dojo.stordje._topics[topic]||null;},recallFirst:function(topic){var args=dojo.stordje.recall(topic);return args&&args.length>0&&args[0]||null;}}
dojo.publish=dojo.stordje.publish;if(!dojo.recall)dojo.recall=dojo.stordje.recall;if(!dojo.recallFirst)dojo.recallFirst=dojo.stordje.recallFirst;}
