
"use strict";
/*jslint browser: true, nomen: true*/
/*global define*/

define([], function () {
    return function (frame) {
        var player = frame.player(),
            layout = frame.layout(),
            model = function() { return frame.model(); },
            client = function(id) { return frame.model().clients.find(id); },
            node = function(id) { return frame.model().nodes.find(id); },
            cluster = function(value) { model().nodes.toArray().forEach(function(node) { node.cluster(value); }); },
            wait = function() { var self = this; model().controls.show(function() { self.stop(); }); },
            finalize = function(s, pause) { model().subtitle = s + model().controls.html(); layout.invalidate(); if (pause === undefined) { model().controls.show() }; },
            subtitle = function(s, pause) { model().subtitle = s; layout.invalidate(); if (pause === undefined) { model().controls.show() }; };

        var dumbReplication = function(newVal) {
            model().clients.x._value = newVal;
            layout.invalidate();
            model().send("X", "A", "ayy lmao",
              function() {
                model().nodes.a._value = newVal;
                layout.invalidate();

                model().send("A", "B", {type:"AEREQ"}, function() {
                  model().nodes.b._value = newVal;
                  layout.invalidate();
                });
                model().send("A", "C", {type:"AEREQ"}, function() {
                  model().nodes.c._value = newVal;
                  layout.invalidate();
                });
              });
        };

        frame.after(1, function () {
            model.subtitle = '<h1>...</h1>';
        })

        //------------------------------
        // Initialization
        //------------------------------
        .after(300, function () {
            model().nodes.a = model().nodes.create("A");
            model().nodes.a._value = "0";
            model().nodes.a._currentTerm = null;

            model().nodes.b = model().nodes.create("B");
            model().nodes.b._value = "0";
            model().nodes.b._currentTerm = null;

            model().nodes.c = model().nodes.create("C");
            model().nodes.c._value = "0";
            model().nodes.c._currentTerm = null;

            subtitle('<h2>Let\'s say we have a cluster of 3 nodes</h2>', true);
        })
        .after(2000, wait)

        .then(function () {
            model().clients.x = model().clients.create("X");
            subtitle('<h2>And a client ..</h2>', true);
        })

        .after(2000, wait)
        .then(function() {
            subtitle('<h2>.. that sends write requests for some key.</h2>', false);
        })
        .then(dumbReplication.bind("3", "3"))

        .after(2000, wait)
        .then(dumbReplication.bind("8", "8"))

        .after(2000, wait)
        .then(function() {
            subtitle('<h2>The write requests are forwarded and replicated in all nodes.</h2>', false);
        })
        .then(dumbReplication.bind("42", "42"))

        .after(2000, wait)
        .then(dumbReplication.bind("100", "100"))

        .after(2000, wait)
        .then(function() {
            subtitle('<h2>Our naive protocol is not correct, however..</h2>', false);
        })
        .then(dumbReplication.bind("3", "3"))

        .after(2000, wait)
        .then(dumbReplication.bind("7", "7"))

        .after(2000, wait)
        .then(function () {
            finalize('<h2>End</h2>', false);
            player.next();
        })

        player.play();
    };
});
