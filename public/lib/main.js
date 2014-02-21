(function() {
	"use strict";

	function badgifyTopics() {
		$('.category-item .topic-title').each(function() {
			var el = $(this), match;

			if (match = el.html().match(/\[.+\]/)) {
				el.html(match[0]
					.replace('[', '<div class="badge topic-badge pull-right">')
					.replace(']', '</div>') + el.html().replace(match[0], ''));
			}
		});
	}

	jQuery('document').ready(function() {
		$(window).on('action:ajaxify.end', function(ev, data) {
			if (data.url.match(/^category/)) {
				badgifyTopics();
			}
		});

		$(window).on('action:categories.loaded', function() {
			badgifyTopics();
		});
	});
}());