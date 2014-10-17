$(function () {

	var urlXMLControl = "/xmlctrl";

	function RefreshSidebar(hash) {

		if (!hash) {
			$("#sidebar-playlist>a").addClass("active");
		} else {
			$("#sidebar-playlist>a").removeClass("active");
		}

		var $listChannels = $("#sidebar-channels");

		$listChannels.empty();

		$.ajax({
			type: "GET",
			url: urlXMLControl + "/GetLiveChannels",
			cache: false,
			contentType: "text/xml",	// "application/xml", "application/xml; charset=utf-8"
		})
		.done(function(xml, textStatus, jqXHR) {

			$(xml).find("LiveChannel").each(function() {

				var $xmlElement		= $(this);
				var Id				= $xmlElement.attr("Id");
				var SourceName		= $xmlElement.find("SourceName:first").text();
				var ChannelName		= $xmlElement.find("ChannelName:first").text();

				var	$li = $('<a class="list-group-item"'
					+ ' href="#' + Id + '"'
//					+ ' data-id="' + Id + '"'
					+ '>' + '</a>');

				if (hash == Id) {
					$li.addClass("active");
				}

//				$li.find("a").text(ChannelName);
				$li.text(ChannelName);
				$listChannels.append($li);
			});
		})
		.always(function () {
			RefreshMainFrame(hash);
		});
	};

	function UpdateSidebarActiveState(hash) {
		$('#sidebar-playlist>a').removeClass("active");
		$('#sidebar-channels>a').removeClass("active");

		if (hash) {
			$('#sidebar-channels>a[href="#' + hash + '"]').addClass("active");
		} else {
			$('#sidebar-playlist>a').addClass("active");
		}
	}

	function RefreshMainFrame(hash) {
		if (hash) {
			RefreshMainFrameChannel(hash);
		} else {
			RefreshMainFramePlaylist();
		}
	}

	function RefreshMainFramePlaylist() {
		$("#main-frame").empty();

		//...
	}

	function RefreshMainFrameChannel(LiveChannelId) {

		$("#main-frame").empty();

		$.ajax({
			type: "GET",
			url: urlXMLControl + "/GetLiveChannels?EPG=true&SubstreamInfo=true&MediaSessions=true&Id=" + LiveChannelId,
			cache: false,
			contentType: "text/xml",	// "application/xml", "application/xml; charset=utf-8"
		})
		.done(function(xml, textStatus, jqXHR) {

//			alert(jqXHR.responseText);

			$xmlLiveChannel = $(xml).find("LiveChannel").first();

			var Id					= $xmlLiveChannel.attr("Id");
			var Index				= $xmlLiveChannel.attr("Index");
			var SourceIndex			= $xmlLiveChannel.attr("SourceIndex");
			var StreamIndex			= $xmlLiveChannel.attr("StreamIndex");
			var Alias				= $xmlLiveChannel.attr("Alias");
			var SourceId			= $xmlLiveChannel.attr("SourceId");
			var StreamId			= $xmlLiveChannel.attr("StreamId");
			var SubstreamCount		= $xmlLiveChannel.attr("SubstreamCount");
			var VideoSubstreamCount	= $xmlLiveChannel.attr("VideoSubstreamCount");
			var AudioSubstreamCount	= $xmlLiveChannel.attr("AudioSubstreamCount");

			var SourceName			= $xmlLiveChannel.find("SourceName:first").text();
			var ChannelName			= $xmlLiveChannel.find("ChannelName:first").text();
			var Provider			= $xmlLiveChannel.find("Provider:first").text();

			var EPGName				= $xmlLiveChannel.find("EPGName:first").text();
			var EPGDescription		= $xmlLiveChannel.find("EPGDescription:first").text();
			var EPGDescriptionExt	= $xmlLiveChannel.find("EPGDescriptionExt:first").text();

			{
				var $html = $('<h3></h3>');
				$html.text(ChannelName);
				$("#main-frame").append($html);
			}

			// EPG

			if ((EPGName.length > 0) || (EPGDescription.length > 0) || (EPGDescriptionExt.length > 0)) {
				var $html = $(
					'<div class="panel panel-primary">' +
					'	<div class="panel-heading">' +
					'		<h3 class="panel-title"></h3>' +
					'	</div>' +
					'	<div class="panel-body">' +
					'	</div>' +
					'</div>');

				if (EPGName.length > 0) {
					$html.find('h3').text(EPGName);
				}

				if (EPGDescription.length > 0) {
					var $p = $('<p></p>');
					$p.text(EPGDescription);
					$html.find('.panel-body').append($p);
				}

				if (EPGDescriptionExt.length > 0) {
					var $p = $('<p></p>');
					$p.text(EPGDescriptionExt);
					$html.find('.panel-body').append($p);
				}

				$("#main-frame").append($html);
			}

			$("#main-frame").append($('<hr>'));

			// Channel Info

			{
				var $html = $(
//					'<h4>Channel Info</h4>' +
					'<div class="panel panel-default">' +
					'	<div class="panel-body">' +
					'		<dl class="dl-horizontal">' +
					'		</dl>' +
					'	</div>' +
					'</div>');

				var $v = $html.find('dl');

				$v.append($('<dt>Live Channel Id</dt>')).append($('<dd>' + Id + '</dd>'));

				$v.append($('<dt>Live Channel Index</dt>')).append($('<dd>' + Index + '</dd>'));
				
				if (Provider.length > 0) {
					$v.append($('<dt>Provider</dt>')).append($('<dd></dd>').text(Provider));
				}

				$v.append($('<dt>Source Name</dt>')).append($('<dd></dd>').text(SourceName));

				$v.append($('<dt>Source Id</dt>')).append($('<dd>' + SourceId + '</dd>'));

				$v.append($('<dt>Stream Id</dt>')).append($('<dd>' + StreamId + '</dd>'));

				$v.append($('<dt>Source Index</dt>')).append($('<dd>' + SourceIndex + '</dd>'));

				$v.append($('<dt>Stream Index</dt>')).append($('<dd>' + StreamIndex + '</dd>'));

				$v.append($('<dt>Alias</dt>')).append($('<dd>' + Alias + '</dd>'));

				$v.append($('<dt>Total Substreams</dt>')).append($('<dd>' + SubstreamCount + '</dd>'));

				$v.append($('<dt>Video Substreams</dt>')).append($('<dd>' + VideoSubstreamCount + '</dd>'));

				$v.append($('<dt>Audio Substreams</dt>')).append($('<dd>' + AudioSubstreamCount + '</dd>'));

				$("#main-frame").append($html);
			}

			$("#main-frame").append($('<hr>'));

			// Substreams

			{
				var $html = $(
					'<div class="table-responsive">' +
					'	<h4>Substreams</h4>' +
					'	<table class="table table-bordered table-hover_ table-condensed" id="table-substreams">' +
					'		<thead>' +
					'			<tr>' +
					'				<th>Id</th>' +
					'				<th>Type</th>' +
					'				<th>Codec</th>' +
					'				<th>Lang</th>' +
					'				<th>Profile</th>' +
					'				<th>Level</th>' +
					'				<th>Description</th>' +
					'			</tr>' +
					'		</thead>' +
					'		<tbody>' +
					'		</tbody>' +
					'	</table>' +
					'</div>');

				var $tbody = $html.find("tbody");

				$($xmlLiveChannel).find("SubstreamInfo").each(function() {
					var $xmlElement		= $(this);
					var Id				= $xmlElement.attr("Id");
					var Type			= $xmlElement.attr("Type");
					var Fcc				= $xmlElement.attr("FCC");
					var Lang			= $xmlElement.attr("Lang");
					var Profile			= $xmlElement.attr("Profile");
					var Level			= $xmlElement.attr("Level");
					var Description		= $xmlElement.attr("Description");
					var Jitter			= $xmlElement.attr("Jitter");

					var	$tr = $('<tr>' +
						'<td>' + Id + '</td>' +
						'<td>' + Type + '</td>' +
						'<td>' + Fcc + '</td>' +
						'<td>' + (Lang ? Lang : "") + '</td>' +
						'<td>' + (Profile ? Profile : "") + '</td>' +
						'<td>' + (Level ? Level : "") + '</td>' +
						'<td>' + (Description ? Description : "") + '</td>' +
						'</tr>');
						
					$tbody.append($tr);
				});

				$("#main-frame").append($html);
			}

			$("#main-frame").append($('<hr>'));

			// MediaSessions
			$("#main-frame").append($('<h4>Media Sessions</h4>'));

			{
				$($xmlLiveChannel).find("MediaSession").each(function() {
					var $xmlElement		= $(this);
					var Type			= $xmlElement.attr("Type");
					var Protocol		= $xmlElement.attr("Protocol");
					var URL				= $xmlElement.attr("URL");
					var Name			= $xmlElement.attr("Name");
					var Alias			= $xmlElement.attr("Alias");

					var $html = $(
						'<div class="panel panel-primary">' +
						'	<div class="panel-heading">' +
						'		<h3 class="panel-title"></h3>' +
						'	</div>' +
						'	<div class="panel-body">' +
						'	</div>' +
						'</div>');

					$html.find('h3').text('' + Alias + ': ' + Name);

					var $panel	= $html.find('.panel-body');

					$panel.data({
						'live-channel-id': Id,
						'live-channel-index': Index,
						'source-index': SourceIndex,
						'source-id': SourceId,
						'stream-index': StreamIndex,
						'stream-id': StreamId,
						'source-name': SourceName,
						'stream-name': ChannelName,
						'type': Type,
						'protocol': Protocol,
						'url': URL,
						'port': window.document.location.port ? window.document.location.port : 80,
						'ref': 1
					});
/*					$panel.attr({
						'data-type': Type,
						'data-protocol': Protocol,
						'data-url': URL,
						'data-port': port,
						'data-ref': 1,
					});*/

					var $form = $("#templateMediaSessionForm").clone();
					$form.removeAttr('id');

					$form.removeClass('hidden');

					$panel.append($form);

					BuildPlayLink($panel);


					$panel.find('#dropdownRefType > ul > li > a').click(function(e) {
						var $this		= $(this);
						var refIndex	= $this.data("index");

						$panel.find('#dropdownRefType > button .ui-button-text').text($this.text());

						$this.parent().parent().find("li").each(function() {
							$(this).removeClass("active");
						});

						$this.parent().addClass("active");

						$panel.data('ref', refIndex);

						BuildPlayLink($panel);

						e.preventDefault();

//						return false;
					});

					$panel.find('#dropdownPort > ul > li > a').click(function(e) {
						var $this	= $(this);
						var port	= $this.data("port");

						$panel.find('#dropdownPort > button .ui-button-text').text($this.text());

						$this.parent().parent().find("li").each(function() {
							$(this).removeClass("active");
						});

						$this.parent().addClass("active");

						$panel.data('port', port);

						BuildPlayLink($panel);

						e.preventDefault();

//						return false;
					});

					if (Type == 'RTMP Live') {
						$panel.find('#groupDropdownProtocol').removeClass('hidden');

						var $ul = $panel.find('#dropdownProtocol > ul');
						$ul.append($('<li class="active"><a href="#" data-protocol="rtmp">RTMP</a></li>'));
						$ul.append($('<li><a href="#" data-protocol="rtmpt">RTMPT</a></li>'));

						$panel.find('#dropdownProtocol > button .ui-button-text').text('RTMP');

						$panel.find('#dropdownProtocol > ul > li > a').click(function(e) {
							var $this		= $(this);
							var protocol	= $this.data("protocol");

							$panel.find('#dropdownProtocol > button .ui-button-text').text($this.text());

							$this.parent().parent().find("li").each(function() {
								$(this).removeClass("active");
							});

							$this.parent().addClass("active");

							$panel.data('protocol', protocol);

							BuildPlayLink($panel);

							e.preventDefault();
						});
					}

					$form.find('.ui-btn-play-vlc').click(function() {

						var $modal = $('#modalVLC');

						$modal.find('#VLCPlayer').remove();

						var url = $form.find('.ui-input-link').val();

						$modal.find('.modal-title').text(ChannelName);

						EmbedVLC($modal.find('.ui-modal-player'), url, 'VLCPlayer', '100%', '100%');

/*						$modal.on('shown.bs.modal', function() {
							$modal.find('#VLCPlayer').css({
//								width: 'auto',
//								width: '720px',
//								height: 'auto',
//								height: '576px',
//								height: '65vh'
//								'max-height': '100%'
							});
						});*/

						$modal.on('hidden.bs.modal', function () {
							$modal.find('#VLCPlayer').remove();
						});

						$modal.find('#btnVLCPlayerPlayStop').click(function() {
							var $this = $(this);

							var vlc = $('#VLCPlayer')[0];		// document.getElementById("VLCPlayer");

							var bPlay = $this.data('state');

							if (!bPlay) {
								vlc.playlist.stop();
								$this.data('state', true);
								$this.find('.glyphicon').removeClass('glyphicon-stop').addClass('glyphicon-play');
							} else {
								vlc.playlist.play();
								$this.data('state', false);
								$this.find('.glyphicon').removeClass('glyphicon-play').addClass('glyphicon-stop');
							}
						});

						$modal.find('#btnVLCPlayerMute').click(function() {
							var $this = $(this);

							var vlc = $('#VLCPlayer')[0];		// document.getElementById("VLCPlayer");
							vlc.audio.toggleMute();

							if (vlc.audio.mute) {
								$this.find('.glyphicon').removeClass('glyphicon-volume-up').addClass('glyphicon-volume-off');
							} else {
								$this.find('.glyphicon').removeClass('glyphicon-volume-off').addClass('glyphicon-volume-up');
							}
						});

						$modal.find('#btnVLCPlayerFullscreen').click(function() {
							var vlc = $('#VLCPlayer')[0];		// document.getElementById("VLCPlayer");
//							alert('fullscreen=' + vlc.video.fullscreen);
							vlc.video.toggleFullscreen();
//							vlc.video.fullscreen = true;
						});

						$modal.modal('show');
					});

					if (Type != 'RTMP Live') {
						$form.find('.ui-btn-play-flash').remove();
					} else {
						$form.find('.ui-btn-play-flash').click(function() {

							var $modal = $('#modalFlash');

							$modal.find('#FlashPlayer').remove();

							var url = $form.find('.ui-input-link').val();

							$modal.find('.modal-title').text(ChannelName);

							EmbedFlash($modal.find('.ui-modal-player'), url, 'FlashPlayer', '100%', '100%');

							$modal.on('hidden.bs.modal', function () {
								swfobject.removeSWF('FlashPlayer');
								$modal.find('#FlashPlayer').remove();
							});

							$modal.modal('show');
						});
					}

					if (Type != 'HTTP Live') {
						$form.find('.ui-btn-play-html').remove();
					} else {
						$form.find('.ui-btn-play-html').click(function() {

							var $modal = $('#modalHTML5');

							$modal.find('#HTML5Player').remove();

							var url = $form.find('.ui-input-link').val();

							$modal.find('.modal-title').text(ChannelName);

							EmbedHTML5($modal.find('.ui-modal-player'), url, 'HTML5Player', '100%', '100%');

							$modal.on('hidden.bs.modal', function () {
								$modal.find('#HTML5Player').remove();
							});

							$modal.modal('show');
						});
					}



/*					$panel.append($('<div>' + link + '</div>'));

					$panel.append($('<a href="#"><code>' + Protocol + ':</code>' + URL + '</a>'));
					$panel.append($('<p><code>' + Protocol + ':</code>' + URL + '</p>'));
//					$panel.append($('<p>' + URL      + '</p>'));
					$panel.append($('<a href="#"><abbr title="Protocol" class="initialism_"><code>' + Protocol + ':</code></abbr>' + URL + '</a>'));
					$panel.append($('<br>'));
					$panel.append($('<a href="#"><abbr title="protocol">' + Protocol + ':</abbr>' + URL + '</a>'));
					$panel.append($('<br>'));
*/
//					$panel.append($('<button type="button" class="btn btn-primary" id="btnPlay">Play&nbsp;<span class="glyphicon glyphicon-facetime-video"></span></button>'));
//					$panel.append($('<button type="button" class="btn btn-primary" id="btnPlay"><span class="glyphicon glyphicon-facetime-video"></span>&nbsp;VLC</button>'));
//					$panel.append($('<button type="button" class="btn btn-primary" id="btnPlay"><span class="glyphicon glyphicon-facetime-video"></span>&nbsp;Flash</button>'));
//					$panel.append($('<button type="button" class="btn btn-primary" id="btnPlay"><span class="glyphicon glyphicon-facetime-video"></span>&nbsp;HTML5</button>'));
//					$panel.append($('<span class="glyphicon glyphicon-facetime-video"></span>'));
//					$panel.append($('<span class="glyphicon glyphicon-play"></span>'));
//					$panel.append($('<button type="button" class="btn btn-primary" id="btnPlay">View&nbsp;<img src="http://www.videolan.org/favicon.ico"></img></button>'));
//					$panel.append($('<button type="button" class="btn btn-primary" id="btnPlay">Play with VLC&nbsp;<img src="http://icons.iconarchive.com/icons/wallpaperfx/3d-softwarefx/16/Vlc-icon.png"></img></button>'));
//					$panel.append($('<button type="button" class="btn btn-primary" id="btnPlay">Play with VLC&nbsp;<img src="http://icons.iconarchive.com/icons/wallpaperfx/3d-softwarefx/32/Vlc-icon.png"></img></button>'));
//					$panel.append($('<img src="http://www.videolan.org/favicon.ico"></img>'));



					$("#main-frame").append($html);
				});

//				$("#main-frame").append($html);
			}

//			$("#main-frame").append($('<hr>'));

			//...
		})
		.always(function () {
		});
	}

	function BuildPlayLink(panel) {
		var type		= panel.data('type');
		var protocol	= panel.data('protocol');
		var url			= panel.data('url');
		var port		= panel.data('port');
		var refType		= panel.data('ref');

		var host	= window.document.location.hostname;

		var link	= protocol.toLowerCase() + '://' + host;

		if (port) {
			link += ':' + port;
		}

		link += url;

		switch(refType) {
		default:
		case 1:		link += '~' + panel.data('live-channel-id');								break;
		case 2:		link += panel.data('live-channel-index');									break;
		case 3:		link += panel.data('source-index') + '/' + panel.data('stream-index');		break;
		case 4:		link += panel.data('source-index') + '/~' + panel.data('stream-id');		break;
		case 5:		link += panel.data('source-index') + '/' + panel.data('stream-name');		break;
		case 6:		link += '~' + panel.data('source-id') + '/' + panel.data('stream-index');	break;
		case 7:		link += '~' + panel.data('source-id') + '/~' + panel.data('stream-id');		break;
		case 8:		link += '~' + panel.data('source-id') + '/' + panel.data('stream-name');	break;
		case 9:		link += panel.data('source-name') + '/' + panel.data('stream-index');		break;
		case 10:	link += panel.data('source-name') + '/~' + panel.data('stream-id');			break;
		case 11:	link += panel.data('source-name') + '/' + panel.data('stream-name');		break;
		case 12:	link += panel.data('stream-name');											break;
		}

		if (type == 'HTTP Live') {
			link += '/playlist.m3u8';
		}

		panel.find('.ui-input-link').val(link);
	}


	function EmbedVLC(target, url, playerId, width, height) {
		var userAgent	= navigator.userAgent.toLowerCase();
		var msie		= /msie/.test(userAgent) || /trident/.test(userAgent);

		var $html;

		if (msie) {
			$html = $(
				'<object' +
				'	id="' + playerId + '"' +
				'	classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"' +
				'	codebase="http://download.videolan.org/pub/videolan/vlc/last/win32/axvlc.cab"' +
				'	width="' + width + '"' +
				'	height="' + height + '"' +
				'	type="application/x-vlc-plugin"' +
//				'	version="VideoLAN.VLCPlugin.2"' +
//				'	events="true"' +
				'>' +
				'	<param name="autoplay" value="true" />' +
				'	<param name="autoloop" value="false" />' +
				'	<param name="controls" value="false" />' +
				'	<param name="showdisplay" value="false" />' +
				'	<param name="windowless" value="true" />' +
				'	<param name="src" value="' + url + '" />' +
				'</object>'
			);
		} else {
			$html = $(
				'<embed' +
				'	id="' + playerId + '"' +
				'	type="application/x-vlc-plugin"' +
				'	pluginspage="http://www.videolan.org"' +
				'	version="VideoLAN.VLCPlugin.2"' +
				'	width="' + width + '"' +
				'	height="' + height + '"' +
				'	autoplay="true"' +
				'	controls="false"' +
				'	loop="no"' +
				'	allowfullscreen="true"' +
				'	windowless="true"' +
				'	target="' + url + '"' +
				'/>'
			);
		}

		target.append($html);

//		var opt = new Array(":aspect-ratio=16:10", "--rtsp-tcp", ":no-video-title-show", ":network-caching=100");
//		var id = vlc.playlist.add(addr, 'video', opt);
//		vlc.playlist.playItem(id);
	}

	function EmbedHTML5(target, url, playerId, width, height) {

		var $html = $(
			'<video' +
			'	id="' + playerId + '"' +
			'	width="' + width + '"' +
			'	height="' + height + '"' +
			'	autoplay' +
			'>' +
			'	<source src="' + url + '" type="application/vnd.apple.mpegURL"/>' +
			'</video>'
		);

//		<source src="http://.../playlist.m3u8" type="application/vnd.apple.mpegURL">
//		<source src="http://.../playlist.m3u8" type="application/x-mpegURL">
//		<source src="http://.../playlist.m3u" type="audio/mpegURL">
//		<source src="http://.../playlist.mp4" type="video/mp4">

		target.append($html);
	}

	function EmbedFlash(target, url, playerId, width, height) {
		var $html = $(
			'<div id="' + playerId + '">' +
			'	<a href="http://www.adobe.com/go/getflashplayer">' +
			'		<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />' +
			'	</a>' +
			'</div>'
		);

		target.append($html);

		var playerVersion	= swfobject.getFlashPlayerVersion(); 
		var majorVersion	= playerVersion.major;

		var flashvars = {
			VideoURL: url
		};
		var params = {
			play:				"true",
			quality:			"best",
			allowfullscreen:	"true",
			allowscriptaccess:	"sameDomain",
//			loop:				"true",
//			bgcolor:			"#ffffff",
			wmode:				"direct",
//			wmode:				"window",
//			wmode:				"transparent",
//			scale:				"showall",
//			menu:				"true",
//			devicefont:			"false",
//			salign:				"",
		};
		var attributes = {
//			id:			"VideoPlayer",
//			name:		"VideoPlayer",
//			align:		"middle",
		};

		swfobject.embedSWF("FlashVideoPlayer.swf", playerId, width, height, "10.0.0", "expressInstall.swf", flashvars, params, attributes);
	}



	$(window).bind('hashchange', function () {
		var hash = window.location.hash.slice(1);
		UpdateSidebarActiveState(hash);
		RefreshMainFrame(hash);
	});

	if (window.location.hash) {					// window.document.location.hash
		var hash = window.location.hash.substring(1)
		RefreshSidebar(hash);
	} else {
		RefreshSidebar();
	}

})();
