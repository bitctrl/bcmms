@echo off
REM bitcontrol(r) Digital TV Link - Beispiele
REM Streaming Server Beispiel auf lokale Maschine
REM Quelle: Ein anderer SimplePlayer.exe mit Screencast
REM Vorraussetzung: installierter ffdshow x264 codec - ff_x264.dll
REM =======================================================
echo Streaming Server - ein Beispiel auf der lokale Maschine
rem echo Quelle: Ein anderer SimplePlayer.exe mit Screencast über Net Publisher

REM Überprüfe auf installierte Software
REM -------------------------------------------------------
REM Leerzeile
echo.

REM wertet die Stellen der Versionsangabe (Konsolenbefehl: ver )4 und 5 aus 
REM 4 entspricht Version; 5 entspricht Build; .[] werden ignoriert
REM speichert 4. Stelle in Variable v; speichert 5. Stelle in Variable w 
REM v und w werden in ver abgelegt 
FOR /F "usebackq tokens=4,5 delims=.[] " %%v in (`ver`) do (
REM es soll keine Fehlermeldung ausgeworfen werden, sondern zu einer Sprungmarke gesprungen werden, außer bei winver_unknown
	2>nul goto winver_%%v_%%w
	echo Nicht unterstütze Windows Version
	exit /b

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
echo Sie benötigen Windows Vista oder eine neuere Version
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
rem ping -n 1 12.0.0.1 >nul & REM waitpause

rem check for UNC
set a=%~dpn0
if %a:~1,1%==: goto UNC-check-OK
echo DATA PATH ist nicht korrekt. UNC (Uniform Naming Convention) wird nicht unterstuetzt.
echo Stattdessen ist das Netzwerk-Laufwerk \\ComputerName\ShareFolder\Resource als 
echo lokales Laufwerk mit einem Buchstaben zu verbinden, z.B. H:\ 
pause
exit /b

:UNC-check-OK
REM echo Starte Simpleplayer /w Multistream Server Plug-in. 
echo Verwende bitte Internet Explorer, um auf verfügbare Streams zu überprüfen
echo.
pause
start "" "%PF%\bitcontrol\Digital TV Link\SimplePlayer.exe" --DataDir="%CD%\%~n0\"
ping -n 1 127.0.0.1 >nul & REM wait
start "" "%ProgramFiles%\Internet Explorer\iexplore.exe" "localhost"

rem ping -n 1 12.0.0.1 >nul & REM wait
exit /b

:bcDTVLink-missing
echo ...Error: 
echo ...Die Programme "bitcontrol(s) Multimedia Suite" or "Digital TV Link" sind
echo ...nicht installiert.
echo ...Exit ...
echo Bye
pause
exit /b




