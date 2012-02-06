// ==UserScript==
// @name           Bulk hide from Facebook Timeline
// @namespace      https://github.com/darylharrison
// @include        https://www.facebook.com/profile.php?id=*sk=allactivity
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

(function() {

var log;
try {
	//log = unsafeWindow.console.log;
	setTimeout(main, 2000);
} catch (exception) {
	//log(exception);
	alert("Something went wrong :( " + exception);
}

function main() {
	$(".fbTimelineSection").prepend('<a class="hideAllBtn" style="font-size:16px" href"#">Hide all activity from this section</a>');
	$(".hideAllBtn").click(function() {
		hideAll($(this).parent());
	});
}

function hideAll(section) {
	$(section).find('a[data-tooltip="Allowed on Timeline"]').each(function(i) {
		var dropdownBtn = this;
		setTimeout(function() {
			$('html, body').animate({
				scrollTop: $(dropdownBtn).offset().top-200,
			}, 100);
			clickLink(dropdownBtn); // click the dropdown button
			setTimeout(function() {
				$(dropdownBtn).parent().find('li[data-label="Hidden from Timeline"] > a').each(function() {
					clickLink(this); // then click the "Hide from Timeline" button
				});
			}, 1000);
		}, i*2000);
	});
}

function clickLink(elem) {
	var clickEvent = document.createEvent("HTMLEvents");
	clickEvent.initEvent("click", true, true);
	elem.dispatchEvent(clickEvent);
}

})();