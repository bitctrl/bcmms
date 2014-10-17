@echo off
REM bitcontrol(r) Digital TV Link - Examples
REM Screencast Beispiel auf der lokalen Maschine
REM Vorrausetzung: Installierter ffdshow x264 codec - ff_x264.dll
REM =======================================================
 
REM ueberpruefe auf installierte Software
REM -------------------------------------------------------
echo Screencast Beispiel auf der lokalen Maschine unter Windows 7
echo. 
rem echo ueberpruefe auf bitcontrol(r) Digital TV Link
if not exist "%ALLUSERSPROFILE%\BitCtrl" goto bcDTVLink-missing
rem echo ...OK: bcDTVLink config dir existiert
REM -------------------------------------------------------
REM echo ueberpruefe auf ffdshow x264 codec
REM echo Program Files (x86) = %ProgramFiles(x86)%
REM pause

REM wertet die Stellen der Versionsangabe (Konsolenbefehl: ver )4 und 5 aus 
REM 4 entspricht Version; 5 entspricht Build; .[] werden ignoriert
REM speichert 4. Stelle in Variable v; speichert 5. Stelle in Variable w 
REM v und w werden in ver abgelegt 
FOR /F "usebackq tokens=4,5 delims=.[] " %%v in (`ver`) do (
REM es soll keine Fehlermeldung ausgeworfen werden, sondern zu einer Sprungmarke gesprungen werden, außer bei winver_unknown
	2>nul goto winver_%%v_%%w
	echo Nicht unterstuetze Windows Version
	exit /b
)

:winver_5_0
echo Windows 2000
goto winver_end

:winver_5_1
echo Windows XP
goto winver_end

:winver_6_0
echo Windows Vista
goto winver_korrekt

:winver_6_1
echo Windows 7
goto winver_korrekt

:winver_6_2
echo Windows 8
goto winver_korrekt

:winver_6_3
echo Windows 8.1
echo.
goto winver_korrekt

:winver_end
echo Falsche Version installiert
echo Sie benoetigen Windows Vista oder eine neuere Version
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
rem echo 32-Bit Program Files unter: %PF%
rem ping -n 1 127.0.0.1 >nul & REM waitpause

rem check for UNC
set a=%~dpn0
if %a:~1,1%==: goto ffdshow-check
echo DATA PATH ist nicht korrekt. UNC (Uniform Naming Convention) wird nicht unterstuetzt.
echo Stattdessen ist das Netzwerk-Laufwerk \\ComputerName\ShareFolder\Resource als 
echo lokales Laufwerk mit einem Buchstaben zu verbinden, z.B. H:\ 
pause
exit /b

:ffdshow-check
rem echo ueberpruefe ffdshow auf 64-Bit maschine in %PF%
if not exist "%PF%\ffdshow" goto ffdshow-missing
rem echo ...OK: "%PF%\ffdshow" verzeichnis existiert
if not exist "%PF%\ffdshow\ff_x264.dll" goto ffdshow-missing
rem echo ...OK: "%PF%\ffdshow\ff_x264.dll" existiert

:ffdshow-ok 
REM echo Starte Simpleplayer /w Capture-Screencast Plug-in. 
rem echo Coordinate: 0:0 Size: 352x288
start "" "%PF%\bitcontrol\Digital TV Link\SimplePlayer.exe" --DataDir="%~dpn0\"
rem ping -n 2 127.0.0.1 >nul & REM wait
exit /b

:bcDTVLink-missing
echo ...Error: 
echo ...Die Programme "bitcontrol(s) Multimedia Suite" or "Digital TV Link" sind
echo ...nicht installiert.
echo ...Exit ...
echo Bye
pause
exit /b

:ffdshow-missing
echo ...ffdshow oder ff_x264.dll fehlt, das Beispiel kann nicht starten. 
echo ...Moechten Sie die erforderliche aeltere Version von ffdshow herunterladen:
echo ..."ffdshow tryouts revision 3631 Nov 15 2010"
set /p DOWNLOAD=Download Y/N: 
if %DOWNLOAD%==y set DOWNLOAD=Y
if not %DOWNLOAD%==Y goto :skip_ffdshow_download
"%PF%\Internet Explorer\iexplore.exe" "www.sourceforge.net/projects/ffdshow-tryout/files/SVN builds by clsid/generic builds (old)/ffdshow_rev3631_20101115_clsid.exe/download"
echo ...Bitte warten. Es dauert ein wenig.
echo ...Jetzt ist ggf. eine neuere Version von ffdshow zu de-installieren und
echo ...die aeltere Version "ffdshow_rev3631_20101115_clsid.exe" zu installieren.
echo ...Anschliessend starten Sie das Beispiel neu.
echo ...Bitte lesen Sie die Hinweise auf www.bitcontrol.com
echo Bye
pause
"%PF%\Internet Explorer\iexplore.exe" "www.bitcontrol.com/en/products/third-party-integration.html"
exit /b

:skip_ffdshow_download
echo Bye
pause
rem ping -n 2 127.0.0.1 >nul & REM wait


