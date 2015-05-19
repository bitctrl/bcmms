function logAdd(str) {
	var text = document.getElementById("log");
	text.value += str;
}

function onLoadXmlFileDone(xmlHttp) {
	document.getElementById("request").value = xmlHttp.responseText;
}

function onPostXmlFileDone(xmlHttp) {
	document.getElementById("response").value		= xmlHttp.responseText;
	document.getElementById("presponse").innerHTML	= createXmlTree(xmlHttp.responseXML, 0);
}

function onError(exc) {
	var message = "Exception: " + exc.message +	", File: " + exc.fileName + ", Line: " + exc.lineNumber + ", Name: " + exc.name;
	logAdd(message + "\n");
}

////////////////////////////////////////////////////////////////////////////
function stripHtml(s) {
	return s.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;").replace(/\n/g, "<br/>");
}

function createXmlAttribute(a) {
	return " <span class='attribname'>" + a.nodeName
		+ "</span><span class='attribvalue'>=\"" + a.nodeValue + "\"</span>";
}

/*
function alertXml(src) {
	var xmlHttp = XmlHttp.create();
	xmlHttp.open("GET", src, false);
	xmlHttp.send(null);
	alert(xmlHttp.responseXML.xml);
}
*/

// this function takes an xml node and returns an html string that displays that node
// the indent argument is used to describe what depth the node is at so that
// the html code can create a nice indention
function createXmlTree(node, indent)
{
	if (node == null)	return "";

	var str = "";

	switch (node.nodeType) {
	case 1:	// Element
		str += "<div class='element'>&lt;<span class='elementname'>" + node.nodeName + "</span>";

		var attrs = node.attributes;

		for (var i = 0; i < attrs.length; i++)	str += createXmlAttribute(attrs[i]);

		if (!node.hasChildNodes())	return str + "/&gt;</div>";

		str += "&gt;<br />";

		var cs = node.childNodes;

		for (var i = 0; i < cs.length; i++) {
			str += createXmlTree(cs[i], indent + 3);
		}
			
		str += "&lt;/<span class='elementname'>" + node.nodeName + "</span>&gt;</div>";

		break;

	case 9:	// Document

		var cs = node.childNodes;

		for (var i = 0; i < cs.length; i++) {
			str += createXmlTree(cs[i], indent);
		}

		break;

	case 3:	// Text

		if (!/^\s*$/.test(node.nodeValue)) {

//			var t1 = node.nodeValue.replace(/\n/g, "<br/>");

			str += "<span class='text'>" + node.nodeValue + "</span><br/>";
		}

		break;

	case 7:	// ProcessInstruction

		str += "&lt;?" + node.nodeName;
		
		var attrs = node.attributes;

		for (var i = 0; i < attrs.length; i++) {
			str += createXmlAttribute(attrs[i]);
		}

		str += "?&gt;<br />";

		break;

	case 4:	// CDATA

		str = "<div class='cdata'>&lt;![CDATA[<span class='cdata-content'>"
			+ node.nodeValue + "</span>]" + "]></div>";

		break;

	case 8:	// Comment

		str = "<div class='comment'>&lt;!--<span class='comment-content'>"
			+ node.nodeValue + "</span>--></div>";

		break;

	case 10:
		str = "<div class='doctype'>&lt;!DOCTYPE " + node.name;

		if (node.publicId) {
			str += " PUBLIC \"" + node.publicId + "\"";

			if (node.systemId)	str += " \"" + node.systemId + "\"";

		} else if (node.systemId) {
			str += " SYSTEM \"" + node.systemId + "\"";
		}

		str += "&gt;</div>";
				
		// TODO: Handle custom DOCTYPE declarations (ELEMENT, ATTRIBUTE, ENTITY)

		break;

	default:
		//alert(node.nodeType + "\n" + node.nodeValue);
		//inspect(node);
	}

	return str;
}







////////////////////////////////////////////////////////////////////////////
function loadXmlFile(sUri, bAsync) {
	var done = function () {
		try {
			onLoadXmlFileDone(xmlHttp);
//			document.getElementById("out2").innerHTML = stripHtml(xmlHttp.responseXML.xml);
//			document.getElementById("out2").innerHTML = createXmlTree(xmlHttp.responseXML, 0);
//			document.getElementById("posttext").value = xmlHttp.responseXML.xml;
		} catch (exc) {
			onError(exc);
		}
	}

	try {
		var xmlHttp = XmlHttp.create();
	} catch (e){
		logAdd("XmlHttp.create() failed: " + e.message + "\n");
		return;
	}


	try {
		xmlHttp.open("GET", sUri, bAsync);
	} catch (e) {
		logAdd("xmlHttp.open(GET) failed: " + e.message + ", sUri: " + sUri + "\n");
		return;
	}

	if (bAsync) {
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4) done();
		}
	}

/*	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	} catch (e) {
		logAdd("netscape.security.PrivilegeManager.enablePrivilege() failed: " + e.message + "\n");
	}*/

	try {
		xmlHttp.send(null);
	} catch (e) {
		logAdd("xmlHttp.send() failed: " + e.message + "\n");
		return;
	}

	if (!bAsync) {
		done();
	}
}

////////////////////////////////////////////////////////////////////////////
function postXmlFile(sUri, bAsync, request) {
	var done = function () {
		try {
			onPostXmlFileDone(xmlHttp);
		} catch (exc) {
			onError(exc);
		}
	}

	document.getElementById("response").value = "";

	try {
		var xmlHttp = XmlHttp.create();
	} catch (e){
		logAdd("XmlHttp.create() failed: " + e.message + "\n");
		return;
	}

//	logAdd("typeof(netscape) = " + typeof(netscape) + "\n");

	if (typeof(netscape) != "undefined") {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
		} catch (e) {
			logAdd("netscape.security.PrivilegeManager.enablePrivilege() failed: " + e.message + "\n");
		}
	}

	try {
		xmlHttp.open("POST", sUri, bAsync);
//		xmlHttp.open("GET", sUri, bAsync);
	} catch (e) {
		logAdd("xmlHttp.open(POST) failed: " + e.message + "\n");
//		logAdd("xmlHttp.open(GET) failed: " + e.message + "\n");
		return;
	}

	if (bAsync) {
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4) done();
		}
	}

	try {
		xmlHttp.send(request);
	} catch (e) {
		logAdd("xmlHttp.send(request) failed: " + e.message + "\n");
		return;
	}

	if (!bAsync) {
		done();
	}
}

/////////////////////////////////////////////////////////////////////////////
/*function getNavigatorName() {
	return document.write("You are using " + navigator.appName + " " + navigator.appVersion + "<br>");
}*/

function inspect(obj) {
	var str = "";
	for (var k in obj)
		str += "obj." + k + " = " + obj[k] + "\n";
	window.alert(str);
}

function doLoad() {
	var	server	= document.getElementById("server").value;
	var uri		= server + "/index.jsp";
	var bAsync	= document.getElementById("form").async[1].checked;

	logAdd("loading file " + uri + ", async=" + bAsync + "...\n");
	loadXmlFile(uri, bAsync);
}

function doPost() {
	var	server	= document.getElementById("server").value;
	var uri		= server + "/index.jsp";
	var bAsync	= document.getElementById("form").async[1].checked;
	var	request	= document.getElementById("request").value;

	logAdd("posting file " + uri + ", async=" + bAsync + "...\n");
	postXmlFile(uri, bAsync, request);
}

function logClear() {
	document.getElementById("log").value = "";
}

/**
 * Called when selecting one snippet and writes the snippet code into the request box.
**/ 
function loadSnippet(name){
  jscript = "";
  if(name == "Hallofromscript"){
   jscript = getSnippetHallofromscript();
  }else if(name == "LicenceInfo"){
   jscript = getSnippetLicenceInfo();
  }else if(name == "LogCount"){
  jscript = getSnippetLogCount();
  }else if(name == "SettingVideoAndAudioPin"){
   jscript = getSnippetSettingVideoAndAudioPin();
  }else if(name == "ReadingVideoAndAudioPin"){
    jscript = getSnippetReadingVideoAndAudioPin();
  }else if(name == "ReadingALogEntry"){
    jscript = getSnippetReadingALogEntry();
  }else if(name == "SwitchBDAChannel"){
	  jscript = getSnippetSwitchToBDAChannel();
  }else if(name == "LoadPlugin"){
	  jscript = getSnippetLoadPlugin();
  }else if(name == "StartPlugin"){
	  jscript = getSnippetStartPlugin();
  }else if(name == "ReadCommonPluginParameter"){
	  jscript = getSnippetReadCommonPluginParameter();
  }else if(name == "SettingCommonPluginParameter"){
	  jscript = getSnippetSettingCommonPluginParameter();
  }else if(name == "ReadVisibleOfConsole"){
	  jscript = getSnippetReadVisibleOfConsole();
  }else if(name == "SettingVisibleForConsole"){
	  jscript = getSnippetSetVisibleForConsole();
  }else if(name == "ReadRecorderParameter"){
	  jscript = getSnippetReadRecorderParameter();
  }else if(name == "SetRecorderParameter"){
	  jscript = getSnippetSetRecorderParameter();
  }else if(name == "SnippetStopRecorder"){
	  jscript = getSnippetStopRecorder();
  }else if(name == "SnippetStartRecorder"){
	  jscript = getSnippetStartRecorder();
  }else if(name == "ReadRetransmitterParameter"){
	  jscript = getSnippetReadRetransmitterParameter();
  }else if(name == "SetRetransmitterParameter"){
	  jscript = getSnippetSetRetransmitterParameter();
  }else if(name == "ReadDBox2Parameter"){
	  jscript = getSnippetReadDBox2Parameter();
  }else if(name == "SetDBox2Parameter"){
	  jscript = getSnippetSetDBox2Parameter();
  }else if(name == "DBox2RefreshChannelList"){
	  jscript = getSnippetDBox2RefreshChannelList();
  }else if(name == "ReadDreamboxParameter"){
	  jscript = getSnippetReadDreamboxParameter();
  }else if(name == "SetDreamboxParameter"){
	  jscript = getSnippetSetDreamboxParameter();
  }else if(name == "DreamboxRefreshChannelList"){
	  jscript = getSnippetDreamboxRefreshChannelList();
  }else if(name == "ReadReelBoxParameter"){
	  jscript = getSnippetReadReelBoxParameter();
  }else if(name == "SetReelBoxParameter"){
	  jscript = getSnippetSetReelBoxParameter();
  }else if(name == "ReelBoxRefreshChannelList"){
	  jscript = getSnippetReelBoxRefreshChannelList();
  }else if(name == "ReadMulticastReceiverParameter"){
	  jscript = getSnippetReadMulticastReceiverParameter();
  }else if(name == "SetMulticastReceiverParameter"){
	  jscript = getSnippetSetMulticastReceiverParameter();
  }else if(name == "ReadRTSPReceiverParameter"){
	  jscript = getSnippetReadRTSPReceiverParameter();
  }else if(name == "SetRTSPReceiverParameter"){
	  jscript = getSnippetSetRTSPReceiverParameter();
  }else if(name == "ReadHTTPServerParameter"){
	  jscript = getSnippetReadHTTPServerParameter();
  }else if(name == "SetHTTPServerParameter"){
	  jscript = getSnippetSetHTTPServerParameter();
  }else if(name == "ReadRTSPServerParameter"){
	  jscript = getSnippetReadRTSPServerParameter();
  }else if(name == "SetRTSPServerParameter"){
	  jscript = getSnippetSetRTSPServerParameter();
  }else if(name == "ReadBDATunerParameter"){
	  jscript = getSnippetReadBDATunerParameter();
  }else if(name == "SetBDATunerParameter"){
	  jscript = getSnippetSetBDATunerParameter();
  }else if(name == "SetMPEGDecoderParameter"){
      jscript = getSnippetSetMPEGDecoderParameter();
  }else if(name == "ReadMPEGDecoderParameter"){
      jscript = getSnippetReadMPEGDecoderParameter();
  }
  
  
  document.getElementById("request").value = jscript;
}




function test1() {
	logAdd("Hallo...!\n");
}

