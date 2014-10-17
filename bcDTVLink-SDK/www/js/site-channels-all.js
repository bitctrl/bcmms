$(function () {

	var urlXMLControl = "/xmlctrl";

	function RefreshChannels() {

		$("#tabSources").empty();
		$("#tabContent").empty();

		$("#btnRefresh").button('loading');

		$.ajax({
			type: "GET",
			url: urlXMLControl + "/GetChannels",
			cache: false,
			contentType: "text/xml",	// "application/xml", "application/xml; charset=utf-8"
		})
		.done(function(xml, textStatus, jqXHR) {
			var tabSources	= $("#tabSources");
			var tabTemplate	= $("#tabTemplate .tab-pane");
			var	tabContent	= $("#tabContent");

			var	sourceIndex	= 1;

			$(xml).find("Source").each(function() {
				var $xmlSource		= $(this);
				var SourceId		= $xmlSource.attr("Id");
				var SourceName		= $xmlSource.find("Name:first").text();

				var	$li = $('<li class=""><a href="#source-' + sourceIndex + '" data-toggle="' + 'tab' /*+ 'pill'*/ + '"></a></li>');
				$li.find("a").text(SourceName);
				tabSources.append($li);

				var tabChannels = tabTemplate.clone();

				tabChannels.attr("id", "source-" + sourceIndex);
//				tabChannels.attr("data-source-name", SourceName);
				tabChannels.find("table").attr({
					'data-source-id': SourceId,
					'data-source-name': SourceName
				});

				var	$trTemplate = $('<tr><td data-field-id="Active"></td></tr>');

				// Create Table header
				$xmlSource.find("Field").each(function() {
					var	$xmlField	= $(this);
					var FileidId	= $xmlField.attr("Id");
					var FileidName	= $xmlField.text();

					var	$th = $('<th></th>');
					$th.text(FileidName);
					$th.attr("data-field-id", FileidId);
					$th.addClass('cell-' + FileidId.toLowerCase());
					tabChannels.find("thead tr").append($th);

					var	$td = $('<td></td>');
					$td.attr("data-field-id", FileidId);
					$trTemplate.append($td);
				});

				// Fill channel table
				$xmlSource.find("Channel").each(function() {
					var	$xmlChannel		= $(this);
					var ChannelEnable	= $xmlChannel.attr("Enable") == 'true';
					var ChannelActive	= $xmlChannel.attr("Active") == 'true';

					var $tr = $trTemplate.clone();

					$tr.attr({
						'data-active': ChannelActive,
						'data-enabled': ChannelEnable
					});

					$xmlChannel.children().each(function() {
						var	tagName		= this.tagName;
						var	tagValue	= $(this).text();

						var	$td			= $tr.find('[data-field-id="' + tagName + '"]');
						$td.text(tagValue);
					});

					var $btnActive;
					if (ChannelActive)	$btnActive = $('<div class="btn btn-xs center-block btn-success">Yes</div>');
					else				$btnActive = $('<div class="btn btn-xs center-block btn-default">No</div>');
					if (!ChannelEnable)	$btnActive.addClass('disabled');

					$btnActive.click(function () {
						var $btn		= $(this);
						var $tdActive	= $btn.parent();
						var $tr			= $tdActive.parent();
						var $table		= $tr.parent().parent();
						var bActive		= $tr.data('active');

						bActive = (bActive === false) || (bActive === 0);

						var SourceId	= $table.attr('data-source-id');
						var SourceName	= $table.attr('data-source-name');
						var ChannelId	= $tr.find('td[data-field-id="Id"]').text();

						$btn.removeClass("btn-success btn-default btn-danger").addClass("btn-warning");

						$tr.removeClass('channel-active');

						$.ajax({
							type: "GET",
							url: urlXMLControl + "/ActivateChannel" + "?Source=" + SourceName + "&ChannelId=" + ChannelId + "&value=" + bActive,
							cache: false,
							contentType: "text/xml",	// "application/xml", "application/xml; charset=utf-8"
						})
						.done(function(xml, textStatus, jqXHR) {
							if ($(xml).find("Result").text().toLowerCase() == "ok") {
								$btn.removeClass("btn-success btn-default btn-warning btn-danger");

								if (bActive) {
									$btn.addClass("btn-success");
									$btn.text("Yes");
									$tr.addClass('channel-active');
								} else {
									$btn.addClass("btn-default");
									$btn.text("No");
								}

								$tr.data('active', bActive);
								$tr.attr('data-active' + attr, bActive);

							} else {
								$btn.removeClass("btn-success btn-default btn-warning").addClass("btn-danger");
							}
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							$btn.removeClass("btn-success btn-default btn-warning").addClass("btn-danger");
						});

					});

					$tr.find('td[data-field-id="Active"]').append($btnActive);

					if (!ChannelEnable)			$tr.addClass('channel-disabled');
					else if (ChannelActive)		$tr.addClass('channel-active');
					else if ($tr.find('td[data-field-id="Encrypted"]').text().toLowerCase() == 'yes')	$tr.addClass('channel-encrypted');
					else if ($tr.find('td[data-field-id="Type"]').text().toLowerCase() == 'radio')		$tr.addClass('channel-radio');

					tabChannels.find("tbody").append($tr);
				});

				tabContent.append(tabChannels);

				++sourceIndex;

			});

			$('#tabSources a:first').tab('show');
		})
		.always(function () {
			$("#btnRefresh").button('reset');
		});
	};

	$("#btnRefresh").click(function() {
		RefreshChannels();
	});

	RefreshChannels();

})();
