(function() {
	"use strict";

	function badgifyTopics() {
		$('.category-item .topic-title').each(function() {
			var el = $(this), match;

			if (match = el.html().match(/^\[.+\]/)) {
				el.html(match[0]
					.replace('[', '<div class="badge topic-badge pull-right">')
					.replace(']', '</div>') + el.html().replace(match[0], ''));
			}
		});
	}

	jQuery('document').ready(function() {
		$(window).on('action:ajaxify.end', function(ev, data) {
			if (data.url.match(/^category/) || data.url.match(/^unread/) || data.url.match(/^recent/) || data.url.match(/^popular/)) {
				badgifyTopics();
			}
		});

		$(window).on('action:categories.loaded', badgifyTopics);
		$(window).on('action:categories.new_topic.loaded', badgifyTopics);
	});
}());