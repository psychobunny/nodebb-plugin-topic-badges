(function(module) {
	"use strict";

	var TopicBadges = {};

	var SocketAdmin = module.parent.require('./socket.io/admin'),
		Sockets = module.parent.require('./socket.io/index'),
		Topics = module.parent.require('./topics.js');

	TopicBadges.init = function(params, callback) {
		SocketAdmin.topics = SocketAdmin.topics || {};
		SocketAdmin.topics.renameTopic = function(socket, data, callback) {
			if (!data.tid || !data.title) {
				return callback(false);
			}

			Topics.setTopicField(data.tid, 'title', data.title, callback);
		};

		callback();
	};

	TopicBadges.addScripts = function(scripts, callback) {
		scripts.push('plugins/nodebb-plugin-topic-badges/lib/main.js');
		callback(null, scripts);
	};

	TopicBadges.addThreadTools = function(threadTools, callback) {
		threadTools.push({
			"title": "Mark <strong>Solved</strong>",
			"class": "mark-solved",
			"icon": "fa-check"
		});

		callback(null, threadTools);
	};

	module.exports = TopicBadges;
}(module));
