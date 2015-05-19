$(function () {

	var $selectSnippet = $("#selectSnippet");

	g_RequestId = 0;

	$("#database-snippets > div").each(function () {
		var $group		= $(this);
		var groupname	= $group.data("groupName");

		var $optgroup = $("<optgroup></option>");
		$optgroup.attr("label", groupname);
		$selectSnippet.append($optgroup);

		$group.find("div").each(function () {
			var $entry = $(this);

			var name			= $entry.data("name");
			var engine			= $entry.data("engine");
			var isGlobal		= $entry.data("isGlobal");
			var isExpression	= $entry.data("isExpression");
			var type			= $entry.data("type");
			var path			= $entry.data("path");
			var code			= $entry.text();
			// $('#use-selector').is(':checked');

			var $option = $("<option>" + name + "</option>");
			$option.attr("data-engine", engine);
			$option.attr("data-is-global", isGlobal);
			$option.attr("data-is-expression", isExpression);
			$option.attr("data-type", type);
			$option.attr("data-path", path);
			$option.attr("data-code", code);

			$optgroup.append($option);
		});
	});

	$("#selectSnippet").change(function() {
		var $option = $(this).find("option:selected");

		var name			= $option.val();
		var engine			= $option.data("engine");
		var isGlobal		= $option.data("isGlobal");
		var isExpression	= $option.data("isExpression");
		var type			= $option.data("type");
		var path			= $option.data("path");
		var code			= $option.data("code");

		var text;
		if (code.length > 0) {
			var text = "<Script"
				+ " Language=\"" + engine + "\""
				+ " GlobalContext=\"" + isGlobal + "\""
				+ " Expression=\"" + isExpression + "\""
				+ " Response=\"XMLResponse\""
				+ " Id=\"RequestNum" + g_RequestId++ + "\""
				+ ">\r\n<![CDATA[" + code + "]]>\r\n<\/Script>\r\n";
		} else {
			text = "";
		}

		$("#textArea").val(text);

		$("#inputPath").val(path);

//		$('input:radio[id=optionsRadios1]').prop('checked', true);
		$("input:radio[value='" + type + "']").click();
	});

	$("input[name=optionsType]").change(function () {
		var $radio = $(this);

		if ($radio.val() === 'GET') {
			$("#textArea").prop("readonly", true);		// disabled or readonly
		} else {
			$("#textArea").removeAttr("readonly");
		}
	});

	$('#form-send-request').submit(function(event) {
		// Stop form from submitting normally
	    event.preventDefault();

		// Get some values from elements on the page:
		var $form	= $(this);
		var url		= $form.find("input[name='url']").val();
//		var url		= $form.attr("action");
		var	path	= $("#inputPath").val();
		var type	= $form.find("input[name=optionsType]:checked").val();
		var text	= $form.find("textarea[name='text']").val();

		var $btnSubmit = $form.find("#btn-send-request");
		$btnSubmit.button('sending');

		$("#alert-request-placeholder").html('');

		$.ajax({
			type: type,
			url: url + path,
			contentType: "text/xml",		// "application/xml", "application/xml; charset=utf-8"
			cache: false,
			data: text
		})
		.done(function(data, textStatus, jqXHR) {
//		    alert("Success: " + textStatus);

			var msg =
			'<div class="alert alert-dismissable alert-success fade in">' +
			'	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
			'	<span>' + textStatus + '</span>' +
			'</div>';

			$("#alert-request-placeholder").html(msg);

			$("#responseStatusCode").val(jqXHR.status);
			$("#textAreaResponse").val(jqXHR.responseText);
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
//			alert("Fail: " + textStatus + " " + errorThrown);

			var msg = 
			'<div class="alert alert-dismissable alert-danger fade in">' +
			'	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
			'	<span>' + textStatus + ': ' + errorThrown + '</span>' +
			'</div>';

			$("#alert-request-placeholder").html(msg);

			$("#responseStatusCode").val(jqXHR.status);
			$("#textAreaResponse").val(jqXHR.responseText);

//			var $alert = $("#alertRequestResult");
//			$alert.fadeIn('slow');
//			$alert.show();
		})
		.always(function() {
			$btnSubmit.button('reset')
		});

	});

	$("#btn-format").click(function() {
		$('#textAreaResponse').format({method: 'xml'});
		return false;
	});

//	var l1 = window.document.location;
//	var l2 = $.url;

//	$("#inputURL").val(window.document.location.origin + "/xmlctrl");
	$("#inputURL").val("http://" + window.document.location.host + "/xmlctrl");

//	$selectSnippet.val('');
	$selectSnippet.change();

})();
