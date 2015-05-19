

/**
 * Snippet Code for reading parameter from the MPEG Decoder.
 * 
 * @return
 */
function getSnippetReadMPEGDecoderParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Deinteralce:" + DTVLink.VideoDecoder.Deinterlace+"|"+\n';
	jscript += '"LicenceMode:" + DTVLink.VideoDecoder.LicenseMode+"|"+\n';
	jscript += '"Version:" + DTVLink.VideoDecoder.Version+"|"+\n';
	jscript += '"RendererLateness:" + DTVLink.VideoDecoder.RendererLateness\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting parameter for MPEG Decoder.
 * 
 * @return
 */
function getSnippetSetMPEGDecoderParameter() {
    jscript = '<DTV version="1.0">\n';
    jscript += '<script language="JScript">\n';
    jscript += 'try{\n';
    jscript += 'DTVLink.VideoDecoder.AlwaysDeinterlace=true;\n';
    jscript += 'DTVLink.VideoDecoder.AspectRatioX=444;\n';
    jscript += 'DTVLink.VideoDecoder.AspectRatioY=333;\n';
    jscript += 'DTVLink.VideoDecoder.FrameSkipping=true;\n';
    jscript += '}catch(e){\n';
    jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
    jscript += '}\n';
    jscript += '</script>\n';
    jscript += '</DTV>';
    return jscript;
}


/**
 * Snippet Code for setting parameter for the BDA Tuner plugin.
 * 
 * @return
 */
function getSnippetSetBDATunerParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["BDA Tuner"].Load();\n';
	jscript += 'DTVLink.Plugins["BDA Tuner"].Stop();\n';
	jscript += 'DTVLink.Plugins["BDA Tuner"].Plugin.BDATuner="Cinergy Hybrid T USB XS Digital Tuner";\n';
	jscript += 'DTVLink.Plugins["BDA Tuner"].Start();\n';
	jscript += 'DTVLink.SwitchToChannelByName("BDA Tuner","3sat");\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}


/**
 * Snippet Code for reading parameter from the BDA Tuner plugin.
 * 
 * @return
 */
function getSnippetReadBDATunerParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"BDATuner:" + DTVLink.Plugins["BDA Tuner"].Plugin.BDATuner+"|"+\n';
	jscript += '"BDADemodulator:" + DTVLink.Plugins["BDA Tuner"].Plugin.BDADemodulator+"|"+\n';
	jscript += '"BDACapture:" + DTVLink.Plugins["BDA Tuner"].Plugin.BDACapture+"|"+\n';
	jscript += '"TotalReceivedBytes:" + DTVLink.Plugins["BDA Tuner"].Plugin.TotalReceivedBytes+"|"+\n';
	jscript += '"ChannelCount:" + DTVLink.Plugins["BDA Tuner"].Plugin.Channels.Count;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}


/**
 * Snippet Code for setting parameter for the RTSP Server plugin.
 * 
 * @return
 */
function getSnippetSetRTSPServerParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["RTSP Server"].Load();\n';
	jscript += 'DTVLink.Plugins["RTSP Server"].Stop();\n';
	//jscript += 'DTVLink.Plugins["RTSP Server"].Plugin.BindAddress="any";\n';
	jscript += 'DTVLink.Plugins["RTSP Server"].Plugin.Port=41001;\n';
	jscript += 'DTVLink.Plugins["RTSP Server"].Plugin.KeepAliveTimeoutSec=20;\n';
	jscript += 'DTVLink.Plugins["RTSP Server"].Plugin.MaxKeepAliveRequests=10;\n';
	jscript += 'DTVLink.Plugins["RTSP Server"].Plugin.MaxClientsProThread=10;\n';
	jscript += 'DTVLink.Plugins["RTSP Server"].Plugin.MaxThreads=10;\n';
	jscript += 'DTVLink.Plugins["RTSP Server"].Start();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading parameter from the RTSP Server plugin.
 * 
 * @return
 */
function getSnippetReadRTSPServerParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	//jscript += '"BindAddress:" + DTVLink.Plugins["RTSP Server"].Plugin.BindAddress+"|"+\n';
	jscript += '"Port:" + DTVLink.Plugins["RTSP Server"].Plugin.Port+"|"+\n';
	jscript += '"KeepAliveTimeoutSec:" + DTVLink.Plugins["RTSP Server"].Plugin.KeepAliveTimeoutSec+"|"+\n';
	jscript += '"MaxKeepAliveRequests:" + DTVLink.Plugins["RTSP Server"].Plugin.MaxKeepAliveRequests+"|"+\n';
	jscript += '"MaxClientsProThread:" + DTVLink.Plugins["RTSP Server"].Plugin.MaxClientsProThread+"|"+\n';
	jscript += '"MaxThreads:" + DTVLink.Plugins["RTSP Server"].Plugin.MaxThreads+"|"+\n';
	jscript += '"AcceptAllowList:" + DTVLink.Plugins["RTSP Server"].Plugin.AcceptAllowList+"|"+\n';
	jscript += '"AcceptDenyList:" + DTVLink.Plugins["RTSP Server"].Plugin.AcceptDenyList;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}


/**
 * Snippet Code for setting parameter for the HTTP Server plugin.
 * 
 * @return
 */
function getSnippetSetHTTPServerParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["HTTP Server"].Load();\n';
	jscript += 'DTVLink.Plugins["HTTP Server"].Stop();\n';
	jscript += 'DTVLink.Plugins["HTTP Server"].Plugin.BindAddress="any";\n';
	jscript += 'DTVLink.Plugins["HTTP Server"].Plugin.Port=80;\n';
	jscript += 'DTVLink.Plugins["HTTP Server"].Start();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading parameter from the HTTP Server plugin.
 * 
 * @return
 */
function getSnippetReadHTTPServerParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"BindAddress:" + DTVLink.Plugins["HTTP Server"].Plugin.BindAddress+"|"+\n';
	jscript += '"Port:" + DTVLink.Plugins["HTTP Server"].Plugin.Port+"|"+\n';
	jscript += '"KeepAliveTimeoutSec:" + DTVLink.Plugins["HTTP Server"].Plugin.KeepAliveTimeoutSec+"|"+\n';
	jscript += '"MaxKeepAliveRequests:" + DTVLink.Plugins["HTTP Server"].Plugin.MaxKeepAliveRequests+"|"+\n';
	jscript += '"MaxClientsProThread:" + DTVLink.Plugins["HTTP Server"].Plugin.MaxClientsProThread+"|"+\n';
	jscript += '"MaxThreads:" + DTVLink.Plugins["HTTP Server"].Plugin.MaxThreads+"|"+\n';
	jscript += '"AcceptAllowList:" + DTVLink.Plugins["HTTP Server"].Plugin.AcceptAllowList+"|"+\n';
	jscript += '"AcceptDenyList:" + DTVLink.Plugins["HTTP Server"].Plugin.AcceptDenyList;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting parameter for the RTSP Receiver plugin.
 * @return
 */
function getSnippetSetRTSPReceiverParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["RTSP Receiver"].Load();\n';
	jscript += 'DTVLink.Plugins["RTSP Receiver"].Stop();\n';
	jscript += 'DTVLink.Plugins["RTSP Receiver"].Plugin.Address="rtsp://192.168.134.22:41001/live";\n';
	jscript += 'DTVLink.Plugins["RTSP Receiver"].Plugin.BindAddress="any";\n';
	jscript += 'DTVLink.Plugins["RTSP Receiver"].Start();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading parameter from the RTSP Receiver plugin.
 * 
 * @return
 */
function getSnippetReadRTSPReceiverParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Address:" + DTVLink.Plugins["RTSP Receiver"].Plugin.Address +"|"+\n';
	jscript += '"BindAddress:" + DTVLink.Plugins["RTSP Receiver"].Plugin.BindAddress+"|"+\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting parameter for the MulticastReceiver plugin.
 * @return
 */
function getSnippetSetMulticastReceiverParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["MulticastReceiver"].Load();\n';
	jscript += 'DTVLink.Plugins["MulticastReceiver"].Stop();\n';
	jscript += 'DTVLink.Plugins["MulticastReceiver"].Plugin.Address="239.0.0.9:13000";\n';
	jscript += 'DTVLink.Plugins["MulticastReceiver"].Plugin.BindAddress="any";\n';
	jscript += 'DTVLink.Plugins["MulticastReceiver"].Plugin.Loopback=true;\n';
	jscript += 'DTVLink.Plugins["MulticastReceiver"].Plugin.ReceiveBufferSize=131072\n';
	jscript += 'DTVLink.Plugins["MulticastReceiver"].Start();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading parameter from the MulticastReceiver plugin.
 * 
 * @return
 */
function getSnippetReadMulticastReceiverParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Address:" + DTVLink.Plugins["MulticastReceiver"].Plugin.Address +"|"+\n';
	jscript += '"BindAddress:" + DTVLink.Plugins["MulticastReceiver"].Plugin.BindAddress+"|"+\n';
	jscript += '"Loopback:" + DTVLink.Plugins["MulticastReceiver"].Plugin.Loopback+"|"+\n';
	jscript += '"ReceiveBufferSize:" + DTVLink.Plugins["MulticastReceiver"].Plugin.ReceiveBufferSize+"|"+\n';
	jscript += '"TotalReceivedBytes:" + DTVLink.Plugins["MulticastReceiver"].Plugin.TotalReceivedBytes;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for refreshing the channel list of the ReelBox plugin.
 * @return
 */
function getSnippetReelBoxRefreshChannelList() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'if(DTVLink.Plugins["ReelBox"].Started == true){\n';
	jscript += 'DTVLink.Plugins["ReelBox"].Plugin.RefreshChannelList();\n';
	jscript += '}}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting parameter for the ReelBox plugin.
 * 
 * @return
 */
function getSnippetSetReelBoxParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["ReelBox"].Load();\n';
	jscript += 'DTVLink.Plugins["ReelBox"].Stop();\n';
	jscript += 'DTVLink.Plugins["ReelBox"].Plugin.Address="192.168.2.105";\n';
	jscript += 'DTVLink.Plugins["ReelBox"].Plugin.Verbose=true;\n';
	jscript += 'DTVLink.Plugins["ReelBox"].Plugin.ChannelsRefreshInterval=1440;\n';
	jscript += 'DTVLink.Plugins["ReelBox"].Start();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading parameter from the ReelBox plugin.
 * 
 * @return
 */
function getSnippetReadReelBoxParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Address:" + DTVLink.Plugins["ReelBox"].Plugin.Address +"|"+\n';
	jscript += '"Verbose:" + DTVLink.Plugins["ReelBox"].Plugin.Verbose+"|"+\n';
	jscript += '"ChannelsRefreshInterval:" + DTVLink.Plugins["ReelBox"].Plugin.ChannelsRefreshInterval;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for refreshing the channel list of the Dreambox plugin.
 * @return
 */
function getSnippetDreamboxRefreshChannelList() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'if(DTVLink.Plugins["DreamBox"].Started == true){\n';
	jscript += 'DTVLink.Plugins["DreamBox"].Plugin.RefreshChannelList();\n';
	jscript += '}}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting parameter of the Dreambox plugin.
 * @return
 */
function getSnippetSetDreamboxParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["DreamBox"].Load();\n';
	jscript += 'DTVLink.Plugins["DreamBox"].Stop();\n';
	jscript += 'DTVLink.Plugins["DreamBox"].Plugin.Address="192.168.1.50";\n';
	jscript += 'DTVLink.Plugins["DreamBox"].Plugin.Model=5;\n';
	jscript += 'DTVLink.Plugins["DreamBox"].Plugin.StreamMethod=1;\n';
	jscript += 'DTVLink.Plugins["DreamBox"].Plugin.ChannelsRefreshInterval=1440;\n';
	jscript += 'DTVLink.Plugins["DreamBox"].Start();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading parameter from the Dreambox plugin.
 * 
 * @return
 */
function getSnippetReadDreamboxParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Address:" + DTVLink.Plugins["DreamBox"].Plugin.Address +"|"+\n';
	jscript += '"Model:" + DTVLink.Plugins["DreamBox"].Plugin.Model+"|"+\n';
	jscript += '"ModelFirmwareVersion:" + DTVLink.Plugins["DreamBox"].Plugin.ModelFirmwareVersion+"|"+\n';
	jscript += '"StreamMethod:" + DTVLink.Plugins["DreamBox"].Plugin.StreamMethod+"|"+\n';
	jscript += '"ChannelsRefreshInterval:" + DTVLink.Plugins["DreamBox"].Plugin.ChannelsRefreshInterval;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for refreshing the channel list of the DBox2 plugin.
 * @return
 */
function getSnippetDBox2RefreshChannelList() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'if(DTVLink.Plugins["DBox2"].Started == true){\n';
	jscript += 'DTVLink.Plugins["DBox2"].Plugin.RefreshChannelList();\n';
	jscript += '}}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting parameter for the DBox2 plugin.
 * 
 * @return
 */
function getSnippetSetDBox2Parameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["DBox2"].Load();\n';
	jscript += 'DTVLink.Plugins["DBox2"].Stop();\n';
	jscript += 'DTVLink.Plugins["DBox2"].Plugin.Address="192.168.2.108";\n';
	jscript += 'DTVLink.Plugins["DBox2"].Plugin.Verbose=true;\n';
	jscript += 'DTVLink.Plugins["DBox2"].Plugin.ChannelsRefreshInterval=1440;\n';
	jscript += 'DTVLink.Plugins["DBox2"].Start();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading parameter from the Retransmitter plugin.
 * 
 * @return
 */
function getSnippetReadDBox2Parameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Address:" + DTVLink.Plugins["DBox2"].Plugin.Address +"|"+\n';
	jscript += '"Verbose:" + DTVLink.Plugins["DBox2"].Plugin.Verbose+"|"+\n';
	jscript += '"ChannelsRefreshInterval:" + DTVLink.Plugins["DBox2"].Plugin.ChannelsRefreshInterval;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting parameter for the Retransmitter plugin.
 * @return
 */
function getSnippetSetRetransmitterParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["MulticastRetransmitter"].Load();\n';
	jscript += 'DTVLink.Plugins["MulticastRetransmitter"].Stop();\n';
	jscript += 'DTVLink.Plugins["MulticastRetransmitter"].Plugin.Address="239.0.0.9:13000";\n';
	jscript += 'DTVLink.Plugins["MulticastRetransmitter"].Plugin.BindAddress="any";\n';
	jscript += 'DTVLink.Plugins["MulticastRetransmitter"].Plugin.TTL=1;\n';
	jscript += 'DTVLink.Plugins["MulticastRetransmitter"].Plugin.MTU=0;\n';
	jscript += 'DTVLink.Plugins["MulticastRetransmitter"].Plugin.SendBufferSize = 1024;\n';
	jscript += 'DTVLink.Plugins["MulticastRetransmitter"].Start();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading parameter from the Retransmitter plugin.
 * 
 * @return
 */
function getSnippetReadRetransmitterParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Address:" + DTVLink.Plugins["MulticastRetransmitter"].Plugin.Address +"|"+\n';
	jscript += '"BindAddress:" + DTVLink.Plugins["MulticastRetransmitter"].Plugin.BindAddress+"|"+\n';
	jscript += '"TTL:" + DTVLink.Plugins["MulticastRetransmitter"].Plugin.TTL+"|"+\n';
	jscript += '"MTU:" + DTVLink.Plugins["MulticastRetransmitter"].Plugin.MTU +"|"+\n';
	jscript += '"SendBufferSize:" + DTVLink.Plugins["MulticastRetransmitter"].Plugin.SendBufferSize +"|"+\n';
	jscript += '"TotalSentBytes:" + DTVLink.Plugins["MulticastRetransmitter"].Plugin.TotalSentBytes;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for halt recording with the recorder plugin.
 * 
 * @return
 */
function getSnippetStopRecorder() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["Recorder"].Plugin.Recording=false;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for start recording with the recorder plugin.
 * @return
 */
function getSnippetStartRecorder() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["Recorder"].Plugin.Recording=true;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting parameter for the Recorder plugin.
 * @return
 */
function getSnippetSetRecorderParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["Recorder"].Plugin.Filename="$MYVIDEO$\\\\RecordedFile(%d%b%Y,%Hh%Mm%Ss).mpg";\n';
	jscript += 'DTVLink.Plugins["Recorder"].Plugin.LimitVolume=20;\n';
	jscript += 'DTVLink.Plugins["Recorder"].Plugin.LimitDuration=15;\n';
	jscript += 'DTVLink.Plugins["Recorder"].Plugin.AutoDelete = true;\n';
	jscript += 'DTVLink.Plugins["Recorder"].Plugin.AutoDeleteTime = 1440;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading parameter from the Recorder plugin.
 * @return
 */
function getSnippetReadRecorderParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Filename:" + DTVLink.Plugins["Recorder"].Plugin.Filename +"|"+\n';
	jscript += '"IsRecording:" + DTVLink.Plugins["Recorder"].Plugin.Recording+"|"+\n';
	jscript += '"LimitVolume:" + DTVLink.Plugins["Recorder"].Plugin.LimitVolume+"|"+\n';
	jscript += '"LimitDuration:" + DTVLink.Plugins["Recorder"].Plugin.LimitDuration +"|"+\n';
	jscript += '"AutoDelete:" + DTVLink.Plugins["Recorder"].Plugin.AutoDelete +"|"+\n';
	jscript += '"AutoDeleteTime:" + DTVLink.Plugins["Recorder"].Plugin.AutoDeleteTime;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting the Visible parameter for the Console plugin.
 * 
 * @return
 */
function getSnippetSetVisibleForConsole() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["Console"].Plugin.Visible=true;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading the Visible parameter of the Console plugin.
 * @return
 */
function getSnippetReadVisibleOfConsole() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Visible:" + DTVLink.Plugins["Console"].Plugin.Visible;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting some common plugin parameter.
 * @return
 */
function getSnippetSettingCommonPluginParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.Plugins["Console"].Name = "MyConsole";\n'
	jscript += 'DTVLink.Plugins["Console"].Persistent = false;\n'
	jscript += 'DTVLink.Plugins["Console"].StartupType = 2;\n'
	jscript += 'DTVLink.Plugins["Console"].Priority = 57;\n'
	jscript += 'DTVLink.Plugins["Console"].Hidden = false;\n'
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading some common plugin parameter.
 * @return
 */
function getSnippetReadCommonPluginParameter() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += 'try{\n';
	jscript += '"Loaded:" + DTVLink.Plugins["Console"].Loaded+"|"+\n';
	jscript += '"Started:" + DTVLink.Plugins["Console"].Started+"|"+\n';
	jscript += '"Name:"+DTVLink.Plugins["Console"].Name+"|"+\n'
	jscript += '"ClassId:"+DTVLink.Plugins["Console"].ClassId+"|"+\n'
	jscript += '"Persistent:"+DTVLink.Plugins["Console"].Persistent+"|"+\n'
	jscript += '"StartupType:"+DTVLink.Plugins["Console"].StartupType+"|"+\n'
	jscript += '"Priority:"+DTVLink.Plugins["Console"].Priority+"|"+\n'
	jscript += '"Hidden:"+DTVLink.Plugins["Console"].Hidden+"|"+\n'
	jscript += '"InfoURL:"+DTVLink.Plugins["Console"].InfoURL\n'
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for starting the "Console" Plugin.
 * 
 * @return
 */
function getSnippetStartPlugin() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'if(DTVLink.Plugins["Console"].Started == true){\n';
	jscript += 'DTVLink.Plugins["Console"].Stop();\n';
	jscript += '}\n';
	jscript += 'DTVLink.Plugins["Console"].Start();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for loading the "Console" Plugin.
 * 
 * @return
 */
function getSnippetLoadPlugin() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'try{\n';
	jscript += 'if(DTVLink.Plugins["Console"].Loaded == true){\n';
	jscript += 'DTVLink.Plugins["Console"].Unload();\n';
	jscript += '}\n';
	jscript += 'DTVLink.Plugins["Console"].Load();\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading one Log entry.
 **/
function getSnippetReadingALogEntry() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += '"Message: " + DTVLink.Logs[3];\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading the Digital TV Link Video and Audio Pin.
 **/
function getSnippetReadingVideoAndAudioPin() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += '"VideoPin:" + DTVLink.EnabledVideoOutPin+ "|" +\n';
	jscript += '"AudioPin:" + DTVLink.EnabledAudioOutPin  \n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for setting the Digital TV Link Video and Audio Pin.
 **/
function getSnippetSettingVideoAndAudioPin() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += 'try{\n';
	jscript += 'DTVLink.EnabledVideoOutPin=true;\n';
	jscript += 'DTVLink.EnabledAudioOutPin=true;\n';
	jscript += '}catch(e){\n';
	jscript += 'DTVLink.Log(3,"JScript","Error "+ e.message);';
	jscript += '}\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for writing some message into the log.
 **/
function getSnippetHallofromscript() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'DTVLink.Log(1,"JScript","Hallo from script!");\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading licence infos.
 **/
function getSnippetLicenceInfo() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += '"LicenseRegnum:" + DTVLink.LicenseRegnum + "|" +\n';
	jscript += '"LicenseName:" + DTVLink.LicenseName  + "|" +\n';
	jscript += '"Version:" + DTVLink.Version + "|"\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for reading the size of the log.
 **/
function getSnippetLogCount() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript" expression="1">\n';
	jscript += '<![CDATA[\n';
	jscript += '"Count = " + DTVLink.Logs.Count;\n';
	jscript += ']]>\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}

/**
 * Snippet Code for switching channels.
 **/
function getSnippetSwitchToBDAChannel() {
	jscript = '<DTV version="1.0">\n';
	jscript += '<script language="JScript">\n';
	jscript += 'DTVLink.SwitchToChannelByName("BDA Tuner","3sat");\n';
	jscript += '</script>\n';
	jscript += '</DTV>';
	return jscript;
}