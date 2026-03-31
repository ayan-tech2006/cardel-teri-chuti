@echo off
echo Starting XAMPP Apache Server...
cd /d C:\xampp
if exist apache_start.bat (
    start "" apache_start.bat
    echo Apache start command sent.
) else (
    echo Error: C:\xampp\apache_start.bat not found. Please start Apache manually from the XAMPP Control Panel.
)

echo Opening Cardel website...
start http://localhost/cardel/
exit
