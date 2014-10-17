@echo off
REM Copyright(c) BitCtrl Systems GmbH, Leipzig, Germany
REM Everyone is permitted to use, edit and/or integrate the batch file
REM in a user application in any kind, if the copyright reference
REM of BitCtrl Systems is deleted. 
REM Warrenty is not granted.
REM =======================================================
REM bitcontrol(r) Digital TV Link - Beispiele
REM Broadcaster --> Streaming Server --> RTSP-Empfaenger (Player) 
REM auf dem lokalen Rechner
REM =======================================================
echo "bitcontrol(r) Digial TV Link" - ein Beispiel aus 3 Teilen
echo Broadcaster -- Streaming Server -- mehrere Empfaenger (Player) 
echo auf einem einzigen Computer mit Win7 OS und x264vfw Codec
echo.
echo.
echo Das Beispiel ist eine Technologie-Demonstration.
echo.
echo.
echo Als Media Applikationen werden benutzt:
echo - 3x bitcontrol(r) Simple Player
echo      fungiert in den Rollen als Broadcaster, Streaming Server und Player
echo - Adobe Flash Video Plugin im IE Browser
echo - VLC (Video LAN Client)
echo.
echo Die Verzoegerung der Bilddarstellung ist fuer eine bessere Anschaulichkeit
echo des Beispiels kuenstlich verlaengert.
echo.
REM Ueberpruefe auf installierter Software
REM -------------------------------------------------------
echo.
echo Die Demonstration besteht aus 6 Teilschritten. Beginn.
rem pause
REM wertet die Stellen der Versionsangabe (Konsolenbefehl: ver )4 und 5 aus 
REM 4 entspricht Version; 5 entspricht Build; .[] werden ignoriert
REM speichert 4. Stelle in Variable v; speichert 5. Stelle in Variable w 
REM v und w werden in ver abgelegt 
FOR /F "usebackq tokens=4,5 delims=.[] " %%v in (`ver`) do (
REM es soll keine Fehlermeldung ausgeworfen werden, sondern zu einer Sprungmarke gesprungen werden, außer bei winver_unknown
	2>nul goto winver_%%v_%%w
	echo Nicht unterstütze Windows Version
	exit /b
)

:winver_5_0
rem echo Windows 2000
echo.
goto winver_end

:winver_5_1
rem echo Windows XP
echo.
goto winver_end

:winver_6_0
rem echo Windows Vista
echo.
goto winver_korrekt

:winver_6_1
rem echo Windows 7
echo.
goto winver_korrekt

:winver_6_2
rem echo Windows 8
echo.
goto winver_korrekt

:winver_6_3
rem echo Windows 8.1
echo.
goto winver_korrekt

:winver_end
echo In dieser Windows Version ist das Beispiel nicht lauffaehig.
echo Sie benötigen Windows Vista, Win7 oder eine neuere Version
echo.
pause
exit /b

:winver_korrekt
if /i not exist C:\Windows\SysWOW64 goto dreizweibit
rem echo 64-bit
set PF=%ProgramFiles(x86)%
goto programpath

:dreizweibit
rem echo 32-bit wird gesetzt
set PF=%ProgramFiles%

:programpath
rem echo 32-Bit Programm Files unter: %PF%

rem check for UNC
set a=%~dpn0
if %a:~1,1%==: goto x264vfw-check
rem if %a:~1,1%==: goto ffdshow-check
echo DATA PATH ist nicht korrekt. UNC (Uniform Naming Convention) wird nicht unterstuetzt.
echo Stattdessen ist das Netzwerk-Laufwerk \\ComputerName\ShareFolder\Resource als 
echo lokales Laufwerk mit einem Buchstaben zu verbinden, z.B. H:\ 
pause
exit /b

rem :ffdshow-check
rem echo ueberpruefe ffdshow auf 64-Bit machine in %PF%
rem if not exist "%PF%\ffdshow" goto ffdshow-missing
rem echo    OK: "%PF%\ffdshow" verzeichnis existiert
rem if not exist "%PF%\ffdshow\ff_x264.dll" goto ffdshow-missing
rem echo    OK: "%PF%\ffdshow\ff_x264.dll" existiert

rem :ffdshow-ok 
rem echo 01 Starte bitcontrol(r) Simple Player als Broadcaster 
rem echo    Input:  Capture-Screencast Plugin
rem echo    Output: Net Publisher Plugin: Video Stream zum Streaming Server

:x264vfw-check
rem echo ueberpruefe x264vfw auf 64-Bit machine in %PF%
if not exist "%PF%\x264vfw" goto x264vfw-missing
rem echo    OK: "%PF%\x264vfw" verzeichnis existiert
if not exist "%PF%\x264vfw\x264vfw.dll" goto x264-missing
rem echo    OK: "%PF%\x264vfw\x264vfw.dll" existiert

pause

:x264vfw-ok 
echo 01 Starte bitcontrol(r) Simple Player als Broadcaster 
echo    Input:  Capture-Screencast Plugin
echo    Output: Net Publisher Plugin: Video Stream zum Streaming Server

rem echo Screencast coordinate: 0:0 size: 352x288
start "" "%PF%\bitcontrol\Digital TV Link\SimplePlayer.exe" --DataDir="%CD%\0501-broadcaster-screencast-netpublisher-localhost-de\"
echo    Bitte auf den Broadcaster warten bis zum 1-2-3
echo. | set /p =   1-
ping -n 1 127.0.0.1 >nul & REM wait
echo. | set /p =2-
ping -n 1 127.0.0.1 >nul & REM wait
echo. | set /p =3
echo.

echo.
echo    Schauen Sie sich im bitcontrol(r) Simple Player unter "Tools" -- "Options"
echo    bitte die eingestellte Konfiguration fuer den Broadcaster an
echo.
pause

echo.
echo 02 Starte den bitcontrol(r) Simple Player als Streaming Server. 
echo    Input:  Strom vom 01 Broadcaster
echo    Output: RTSP bereitgestellt fuer 03 Player (im Pull Mode)
echo.
echo    Achtung: Der Streaming Server erfordert den Zugriff ueber IP Protokoll,
echo    deshalb ist ggf. in der lokalen Firewall der Video Stream freizuschalten.
echo.
pause
start "" "%PF%\bitcontrol\Digital TV Link\SimplePlayer.exe" --DataDir="%CD%\0502-streamserver-HTTPrec-bcMSS-de\"
echo    Bitte auf den Streaming Server warten bis zum 1-2-3
echo. | set /p =   1-
ping -n 1 127.0.0.1 >nul & REM wait
echo. | set /p =2-
ping -n 1 127.0.0.1 >nul & REM wait
echo. | set /p =3
echo.
echo.
echo    Schieben Sie das obere Player Fenster etwas beiseite
echo    Schauen Sie sich im bitcontrol(r) Simple Player unter "Tools" -- "Options"
echo    die eingestellte Konfiguration fuer den Streaming Server an
echo.
pause

echo.
echo 03 Starte bitcontrol(r) Simple Player als RTSP-Empfaenger. 
echo    Input:  vom 02 Streaming Server den Video Strom holen (Pull Mode)
echo    Output: zum 03 RTSP Empfaenger zur Anzeige uebertragen
start "" "%PF%\bitcontrol\Digital TV Link\SimplePlayer.exe" --DataDir="%CD%\0503-player-RTSP-receiver-de\"
echo    Bitte auf den RTSP-Empfaenger (Player) warten bis zum 1-2-3
echo. | set /p =   1-
ping -n 1 127.0.0.1 >nul & REM wait
echo. | set /p =2-
ping -n 1 127.0.0.1 >nul & REM wait
echo. | set /p =3
echo.
echo.
echo    Schieben Sie das obere Player Fenster wieder etwas beiseite 
echo    Schauen Sie sich im bitcontrol(r) Simple Player unter "Tools" -- "Options"
echo    bitte die eingestellte Konfiguration fuer den RTSP Empfaenger an
echo.
pause

echo.
echo 04 Starte den IE - Internet Explorer mit http://localhost, der vom
echo    SimplePlayer.exe mit der Media Session: HTTP Server versorgt wird.
echo.
echo    Bitte auf das Browser Refresh Symbol klicken !!!
echo.
echo    Die WEB Seite enthaelt ein Flash Video Plugin, dass als Flash Player
echo    den RTMP Video Strom anzeigen kann. Bitte auf "Play" Button druecken.
start "" "%PF%\Internet Explorer\iexplore.exe" "localhost"
echo.
pause
echo.
echo 05 Starte jetzt den VLC (Video LAN Client), welcher den Videostrom
echo    im RTSP Format empfaengt: vlc.exe "rtsp://localhost/live"

rem Prüfe ob VLC installiert ist
rem echo PF: %PF%
if /i not exist "%PF%\VideoLAN\VLC" goto VLCnotfound
if /i not exist "%PF%\VideoLAN\VLC\vlc.exe" goto VLCnotfound

start "" "%PF%\VideoLAN\VLC\vlc.exe" "rtsp://localhost/live"
echo. 
echo    Bewegen Sie jetzt die Maus in die Screencast-Region und beobachten
echo    Sie die Darstellung in den Playern.
goto VLCOK

:VLCnotfound
echo.
echo    Konnte VLC nicht finden. Nicht installiert. 

:VLCOK
echo.
pause
echo.
echo 06 Empfang des Stroms auf einem Smartphone oder Tablet. Geeignete Player:
echo    iPhone / iPAD / Safari
echo    http://ip_adresse_des_streaming_servers/live/playlist.m3u8
echo.
echo    iPhone - Live Media Player (Luong Hoang)
echo    rtsp://ip_adresse_des_streaming_servers/live
echo.
echo    Android 4.x - MX Player (J2 Interactive)
echo    http://ip_adresse_des_streaming_servers/live/playlist.m3u8
echo.
echo    Android 4.x - Daroon Player (Daroonsoft Inc)
echo    rtsp://ip_adresse_des_streaming_servers/live
echo.
echo    Android 4.x - Live Media Player (MDC)
echo    rtmp://ip_adresse_des_streaming_servers/live
echo.
echo    Blackberry BB10 Z30 - Live Media Player (MDC)
echo    rtmp://ip_adresse_des_streaming_servers/live
echo.
echo    Weitere Player koennen funktionieren wurden aber nicht getestet
echo.
pause
echo    Die notwendige "IPv4 Adresse" des koennen Sie mit dem Kommando 
echo    "ipconfig" ermitteln. Jetzt ermitteln?
echo.
set /p IP_config=ipconfig Y/N: 
if %IP_config%==y set IP_config=Y
if not %IP_config%==Y goto :skip_IP_config
"C:\Windows\System32\ipconfig.exe"
echo.
pause

:skip_IP_config
echo.
echo Modifikation des Beispiels
echo --------------------------
echo.
echo Sie koennen dieses Beispiel mit 3 verschiedenen Rechnern wiederholen, einer
echo als Broadcaster, einer als Streaming Server und einer als Receiver (Player).
echo.
echo Installieren Sie dafuer die Software auf den 3 Rechnern, kopieren Sie die
echo die Batch-Files und Konfigurations-Verzeichnisse und stellen Sie die IP-Adresse
echo des Streaming Servers in den Plugins "Net Publisher" und "RTSP-Receiver"
echo entsprechend ein.
echo.
echo Bei entsprechender Lizenz funktioniert das auch ueber das Internet.
echo.
echo Viel Glueck
echo Ihr bitcontrol Team.
echo.
pause
exit /b

:bcDTVLink-missing
echo    Fehler: 
echo    Die Programme "bitcontrol(s) Multimedia Suite" or "Digital TV Link" sind
echo    nicht installiert.
echo    Exit    
echo Bye
echo.
pause
exit /b

:ffdshow-missing
echo    ffdshow oder ff_x264.dll sind nicht installiert. Das Beispiel benoetigt
echo    diese Software Komponente. 
echo    Moechten Sie die erforderliche Version von ffdshow herunterladen:
echo    "ffdshow tryouts revision 3631 Nov 15 2010"
set /p DOWNLOAD=Download Y/N: 
if %DOWNLOAD%==y set DOWNLOAD=Y
if not %DOWNLOAD%==Y goto :skip_ffdshow_download
start "" "%PF%\Internet Explorer\iexplore.exe" "www.sourceforge.net/projects/ffdshow-tryout/files/SVN builds by clsid/generic builds (old)/ffdshow_rev3631_20101115_clsid.exe/download"
echo.
echo    Bitte warten Sie, es dauert ein wenig.
echo    Ggf. ist eine neuere Version von ffdshow zu deinstallieren und dann
echo    die Version 3631 "ffdshow_rev3631_20101115_clsid.exe" zu installieren.
echo.
echo    Danach sollte dieses Beispiel lauffaehig sein.
echo    Bitte lesen Sie die Hinweise zur Konfiguration von ffdshow unter 
echo    http://www.bitcontrol.com/de/loesungen/loesungsmuster.html
echo Bye
echo.
pause
start "" "%PF%\Internet Explorer\iexplore.exe" "www.bitcontrol.com/de/loesungen/loesungsmuster.html"
exit /b

:x264vfw-missing
echo    x264vfw Verzeichnis oder x264vfw.dll sind nicht installiert. Das Beispiel 
echo    benoetigt diese Software Komponente. 
echo    Moechten Sie die erforderliche Version von "x264vfw" herunterladen:
echo.
set /p DOWNLOAD=Download Y/N: 
if %DOWNLOAD%==y set DOWNLOAD=Y

echo.
echo    Nach der Installation bitte die "x264vfw configuration" starten und
echo    folgende Parameter neu setzen:
echo      Basic -- Preset:          Veryfast
echo      Rate control:             Single pass - bitrate-based (ABR)
echo      Decoder AVI Muxer:        Disable Decoder YES
echo      Output - Output mode:     VFW
echo      Output - VFW FourCC:      H264
echo      Extra Command line:       --no-8x8dct --bframes 0 --no-cabac  
echo                                --cqm flat --weightp 0 --aud --keyint 25
echo.

echo    Bitte lesen Sie die Hinweise zur Konfiguration von x264vfw unter 
echo    http://www.bitcontrol.com/de/produkte/third-party-integration.html
echo.
pause
if not %DOWNLOAD%==Y goto skip_x264vfw_download
start "" "%PF%\Internet Explorer\iexplore.exe" "www.sourceforge.net/projects/x264vfw"
echo.

echo Bye
echo.
pause
rem start "" "%PF%\Internet Explorer\iexplore.exe" "www.bitcontrol.com/de/produkte/third-party-integration.html"
exit /b

:skip_x264vfw_download
:skip_ffdshow_download
echo Bye
echo.
pause
exit /b



