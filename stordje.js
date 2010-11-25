/**
 *  StorDJE - Storage layer add-on utility for the Dojo Toolkit event system
 *
 *  Copyright (c) 2010 Marat Nepomnyashy    maratbn@gmail
 *  All rights reserved.
 *
 *  Module:         stordje.js
 *
 *  Description:    Background:
 *
 *                  The Dojo Toolkit, upon which this utility is based,
 *                  features a versatile topic-based event publishing and
 *                  subscription framework, that allows widgets throughout the
 *                  application to receive notifications of various events and
 *                  associated data.
 *
 *                  However, as of version 1.5.0, the Dojo Toolkit lacks a
 *                  utility to also allow retrieval of previously published
 *                  event data, preventing the event system from being used to
 *                  store data for the application model.
 *
 *                  Such a capability is important for UI components that are
 *                  created by their parent components upon notification of
 *                  (and obviously after) a particular event, but that still
 *                  periodically require the latest data from that particular
 *                  event topic throughout their lifecycle.
 *
 *                  Overview and purpose:
 *
 *                  This is a storage layer add-on utility for the Dojo
 *                  Toolkit event system.  It loads on top of Dojo, and
 *                  provides additional API for retrieval of previously-
 *                  published topic-based event data, making it possible for
 *                  application components to access event data that could not
 *                  be received, or was not needed, at the time it was
 *                  originally published.
 *
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *      * Redistributions of source code must retain the above copyright
 *        notice, this list of conditions and the following disclaimer.
 *      * Redistributions in binary form must reproduce the above copyright
 *        notice, this list of conditions and the following disclaimer in the
 *        documentation and/or other materials provided with the distribution.
 *      * Neither the name of the <organization> nor the
 *        names of its contributors may be used to endorse or promote products
 *        derived from this software without specific prior written permission.
 * 
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 *  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

if (!dojo.stordje) {
    // Save a reference to the original 'dojo.publish(...)' function:
    var funOriginalDojoPublish = dojo.publish;

    dojo.stordje = {
            publish: function(/*String*/ topic, /*Array*/ args) {
                    //      summary:
                    //              Publishes a new event via the Dojo event
                    //              system.  Caches the data associated with
                    //              the event for later retrieval via the 
                    //              'recall(...)' and 'recallFirst(...)'
                    //              functions, and then calls the original
                    //              'dojo.publish(...)' function.
                    //
                    //              See the documentation for the original
                    //              'dojo.publish(...)' function.
                    //
                    //      topic:
                    //              The name of the topic under which to
                    //              publish the new event.
                    //
                    //      args:
                    //              Array of data passed to the parameters of
                    //              the subscribing event listener functions.
                    //
                    if (!dojo.stordje._topics) dojo.stordje._topics = {};
                    dojo.stordje._topics[topic] = args;

                    // Call the original 'dojo.publish(...)' function:
                    funOriginalDojoPublish(topic, args);
                },

            recall: function(/*String*/ topic) {
                    //      summary:
                    //              Recalls the data array associated with the
                    //              latest past event already published under
                    //              the topic specified.  Returns that data
                    //              array or null.
                    //
                    //      topic:
                    //              The name of the topic of the event for
                    //              which the data is being recalled.
                    //
                    //      example:
                    //      |       dojo.publish('test_topic', [1, 2, 3, 4]);
                    //      |       var arrayOf4 = dojo.stordje.recall(
                    //      |                                   'test_topic')
                    //
                    return dojo.stordje._topics &&
                            dojo.stordje._topics[topic] || null;
                },

            recallFirst: function(/*String*/ topic) {
                    //      summary:
                    //              Returns just the first element of the data
                    //              array associated with the latest past
                    //              event already published under the topic
                    //              specified, or otherwise returns null.
                    //
                    //      topic:
                    //              The name of the topic of the event for
                    //              which the data is being recalled.
                    //
                    //      example:
                    //      |       dojo.publish('test_topic', [1, 2, 3, 4]);
                    //      |       var digit1 = dojo.stordje.recallFirst(
                    //      |                                   'test_topic')
                    //
                    var args = dojo.stordje.recall(topic);
                    return args && args.length > 0 && args[0] || null;
                }
        }

    // Make the StorDJE utility 'dojo.stordje.publish(...)' be the new
    // 'dojo.publish(...)':
    dojo.publish = dojo.stordje.publish;

    // For convenience, make the 'recall(...)' and 'recallFirst(...)'
    // functions part of the 'dojo' namespace as well, but first check that
    // there isn't anything else there already with the same name:
    if (!dojo.recall) dojo.recall = dojo.stordje.recall;
    if (!dojo.recallFirst) dojo.recallFirst = dojo.stordje.recallFirst;
}

