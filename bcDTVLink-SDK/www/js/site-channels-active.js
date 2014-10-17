$(function () {

	var urlXMLControl = "/xmlctrl";

	var g_TimerId = 0;

	function RefreshChannels() {
		$.ajax({
			type: "GET",
			url: urlXMLControl + "/GetActiveChannels?EPG=true&Substreams=false",
			cache: false,
			contentType: "text/xml",	// "application/xml", "application/xml; charset=utf-8"
		})
		.done(function(xml, textStatus, jqXHR) {
			$('#table-channels tbody').empty();

			$(xml).find("Channel").each(function() {
				var $channel = $(this);

				var SourceId			= $channel.attr("SourceId");			// parseInt()
				var StreamId			= $channel.attr("StreamId");			// parseInt()
				var UpTimeSec			= $channel.attr("UpTimeSec");			// parseFloat()
				var OnAir				= $channel.attr("OnAir") == 'true';
				var Record				= parseInt($channel.attr("Record"));	// == 'true';
				var Publish				= parseInt($channel.attr("Publish"));	// == 'true';
				var SourceName			= $channel.find("SourceName").text();
				var StreamName			= $channel.find("StreamName").text();
				var Provider			= $channel.find("Provider").text();
				var EPGName				= $channel.find("EPGName").text();
				var EPGDescriptionExt	= $channel.find("EPGDescriptionExt").text();

//				var btn = '<div id="button-show-epg" class="btn btn-primary btn-xs btn-epg-info"><span class="glyphicon glyphicon-info-sign"></span></div>';

				var html = '<tr'
					+ ' data-source-id="' + SourceId + '"'
					+ ' data-stream-id="' + StreamId + '"'
					+ ' data-onair="' + OnAir + '"'
					+ ' data-record="' + Record + '"'
					+ ' data-publish="' + Publish + '"'
					+ '>'
//					+ '<td>' + StreamId + '</td>'
					+ '<td class="cell-source">' /*+ SourceName*/ + '</td>'
					+ '<td class="cell-stream">' /*+ StreamName*/ + '</td>'
					+ '<td class="cell-onair"><div class="btn btn-xs center-block"></div></td>'
					+ '<td class="cell-record"><div class="btn btn-xs center-block"></div></td>'
					+ '<td class="cell-publish"><div class="btn btn-xs center-block"></div></td>'
					+ '<td class="cell-provider">' /*+ Provider*/ + '</td>'
					+ '<td class="cell-epg btn-epg-info">' /*+ EPGName + (EPGDescriptionExt.length > 0 ? '&nbsp;<i class="glyphicon glyphicon-paperclip"></i>' : '')*/ + '</td>'
					+ '</tr>'
				;

				var $html = $(html);

				$html.find(".cell-source").text(SourceName);
				$html.find(".cell-stream").text(StreamName);
				$html.find(".cell-provider").text(Provider);
				$html.find(".cell-epg").text(EPGName);

				var	$btnOnAir	= $html.find(".cell-onair .btn");
				var	$btnRecord	= $html.find(".cell-record .btn");
				var	$btnPublish	= $html.find(".cell-publish .btn");

				if (OnAir)	$btnOnAir.addClass("btn-success").text("On");
				else		$btnOnAir.addClass("btn-default").text("Off");

				switch (Record) {
				case 0:		$btnRecord.addClass("btn-default")	.text("Off");	break;		// No
				case 1:		$btnRecord.addClass("btn-warning")	.text("On");	break;		// Activating
				case 2:		$btnRecord.addClass("btn-success")	.text("On");	break;		// Active
				default:	$btnRecord.addClass("btn-danger")	.text(Record);	break;		// Unknown state
				}

				switch (Publish) {
				case 0:		$btnPublish.addClass("btn-default")	.text("Off");	break;		// No
				case 1:		$btnPublish.addClass("btn-warning")	.text("On");	break;		// Activating
				case 2:		$btnPublish.addClass("btn-success")	.text("On");	break;		// Active
				default:	$btnPublish.addClass("btn-danger")	.text(Publish);	break;		// Unknown state
				}

				if (EPGDescriptionExt.length > 0) {
					$html.find('.btn-epg-info').popover({
						trigger: "hover",
						placement: "auto",
						title: EPGName,
						content: EPGDescriptionExt,
//						content: "<p>" + EPGDescriptionExt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\r?\n/g, '<br>') + "</p>",
//						content: "<pre>" + EPGDescriptionExt + "</pre>",
//						content: function () { return "<img src='" + $(this).data('imageUrl') + "'>"; }
//						html: true
					});
				}

				$btnOnAir.click(function()		{ SetStreamFlag($(this), "/SetActiveChannelOnAir", "onair"); });
				$btnRecord.click(function()		{ SetStreamFlag($(this), "/SetActiveChannelRecord", "record"); });
				$btnPublish.click(function()	{ SetStreamFlag($(this), "/SetActiveChannelPublish", "publish"); });

				$('#table-channels tbody').append($html);
			});
		});
	};

	function SetStreamFlag($btn, url, attr) {
		var $tr			= $btn.parent().parent();
		var	SourceId	= $tr.data("sourceId");
		var	StreamId	= $tr.data("streamId");
		var flag		= $tr.data(attr);

		flag = (flag === false) || (flag === 0);

		$btn.removeClass("btn-success btn-default btn-danger").addClass("btn-warning");

		$.ajax({
			type: "GET",
			url: urlXMLControl + url + "?SourceId=" + SourceId + "&StreamId=" + StreamId + "&value=" + flag,
			cache: false,
			contentType: "text/xml",	// "application/xml", "application/xml; charset=utf-8"
		})
		.done(function(xml, textStatus, jqXHR) {
			if ($(xml).find("Result").text().toLowerCase() == "ok") {
				$btn.removeClass("btn-success btn-default btn-warning btn-danger");

				if (flag) {
					$btn.addClass("btn-success");
					$btn.text("On");
				} else {
					$btn.addClass("btn-default");
					$btn.text("Off");
				}

				var $tr = $btn.parent().parent();
				$tr.data(attr, flag);
				$tr.attr("data-" + attr, flag);

			} else {
				$btn.removeClass("btn-success btn-default btn-warning").addClass("btn-danger");
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			$btn.removeClass("btn-success btn-default btn-warning").addClass("btn-danger");
		});
	};

	$("#btnRefresh").click(function() {
		RefreshChannels();
	});

	$("#menuRefresh li a").click(function(e) {
		var $this		= $(this);
		var interval	= $this.data("interval");

		$this.parent().parent().find("li").each(function() {
			$(this).removeClass("active");
		});

		$this.parent().addClass("active");

		clearInterval(g_TimerId);

		if (interval > 0) {
			g_TimerId = setInterval(RefreshChannels, interval);
		}

//		return false;
	});

	RefreshChannels();

})();
