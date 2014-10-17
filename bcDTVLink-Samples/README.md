bitcontrol® bcSimplePlayer - batch samples
==========================================

This directory contains MS Windows batch samples.

You have to install the bitcontrol(r) Multimedia Suite v1.2.1 or higher to run
the examples. This implies that the included bitcontrol(r) Digital TV Link v3.8.0
component or a higher version is installed too.

Principles of the batch samples:
* The file name of a batch file, e.g. "abc.bat", refers to its corresponding
directory by its own name without the extension, in this case "abc".
* The program "SimplePlayer.exe" is startet in the batch file with a configuration
directory as parameter option  
	--DataDir="%~dpn0\"
* This principle does not work in UNC filesystems (Uniform Naming Convention). 
You have to link an UNC network drive \\ComputerName\ShareFolder\Resource to a
drive letter of the local Windows file system, e.g. H:\

Please feel free, to add your own batch samples here.

Read more on our website at https://www.bitcontrol.com or download the free trial at https://www.bitcontrol.com/en/download.html.
