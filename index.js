/*!
 * gulp-file-ready v0.0.1
 * Copyright 2017-, M.Katsube <katsubemakito@gmail.com>. MIT Lisence.
 */
var through = require("through2");
var PluginError = require("gulp-util").PluginError;
var fs = require('fs');
var sleep = require('sleep-async')();
var PLUGIN_NAME = "gulp-file-ready";

module.exports = function(opt = null) {
    /**
     * @this {Transform}
     */
    var transform = function(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        var wait = (opt === null) ? 1000 : opt; //default:1000ms (1s)

        //---------------------------------
        // not support streams
        //---------------------------------
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, "Sorry, Streams not supported."));
        }

        //---------------------------------
        // Do
        //---------------------------------
        if (file.isBuffer()) {
            function waiter(path, msec) {
                let stat = fs.statSync(path);
                let mtime = new Date(stat.mtime).getTime();
                let now = new Date().getTime();

                sleep.sleep(msec, function() {
                    if (mtime + msec > now) {
                        waiter(path, msec);
                    }
                });
            }

            waiter(file.path, wait);
            return callback(null, file);
        }

        this.push(file);
        callback();
    };

    return through.obj(transform);
};