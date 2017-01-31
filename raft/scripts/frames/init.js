
"use strict";
/*jslint browser: true, nomen: true*/
/*global define*/

define(["./title", "./intro", "./overview", "./election", "./replication", "./conclusion", "./naiverep"],
    function (title, intro, overview, election, replication, conclusion, naiverep) {
        return function (player) {
            // player.frame("playground", "Playground", playground);
            player.frame("home", "Home", title);
            player.frame("intro", "What is Distributed Consensus?", intro);
            player.frame("overview", "Protocol Overview", overview);
            player.frame("election", "Leader Election", election);
            player.frame("replication", "Log Replication", replication);
            player.frame("conclusion", "Other Resources", conclusion);
            player.frame("naiverep", "Naive Replication 1", naiverep);
        };
    });
