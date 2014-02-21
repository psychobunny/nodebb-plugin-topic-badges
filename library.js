(function(module) {
	"use strict";

	var TopicBadges = {}

	TopicBadges.addScripts = function(scripts, callback) {
		scripts.push('plugins/nodebb-plugin-topic-badges/lib/main.js');
		return scripts;
	};

	module.exports = TopicBadges;
}(module));