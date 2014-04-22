(function() {
	"use strict";

	function badgifyTopics() {
		$('.category-item .topic-title').each(function() {
			var el = $(this), match;

			if (el.html().match(/^\[.+\].+/)) {
				match = el.html().match(/^\[.+\]/);
				el.html(match[0]
					.replace('[', '<div class="badge topic-badge pull-right">')
					.replace(']', '</div>') + el.html().replace(match[0], ''));
			}
		});
	}

	function badgifyTitle(title, badge) {
		if (title.match(/^\[.+\]/)) {
			title = title.replace(/^\[.+\]/, '[' + badge + ']');
		} else {
			title = '[' + badge + '] ' + title;
		}

		return title;
	}

	jQuery('document').ready(function() {
		$(window).on('action:ajaxify.end', function(ev, data) {
			if (data.url.match(/^category/) || data.url.match(/^unread/) || data.url.match(/^recent/) || data.url.match(/^popular/)) {
				badgifyTopics();
			}

			if (data.url.match(/^topic/)) {
				$('.thread-tools .mark-solved').on('click', function(ev) {
					var title = badgifyTitle(ajaxify.variables.get('topic_name'), 'Solved');
					socket.emit('admin.topics.renameTopic', {
						tid: ajaxify.variables.get('topic_id'),
						title: title
					}, function(err) {
						if (!err) {
							$('.topic-title').html(title);
						}
					});

					ev.preventDefault();
					return false;
				});
			}
		});

		$(window).on('action:categories.loaded', badgifyTopics);
		$(window).on('action:categories.new_topic.loaded', badgifyTopics);
	});
}());