$(function () {

	var urlXMLControl = "/xmlctrl";

	$.ajax({
		type: "GET",
		url: urlXMLControl + "/GetVersion",
		cache: false,
		contentType: "text/xml",	// "application/xml", "application/xml; charset=utf-8"
	})
	.done(function(xml, textStatus, jqXHR) {
		$("#textVersion").text("Version: " + $(xml).find("Version").text());
	});
})();
