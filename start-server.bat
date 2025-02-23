@echo off
echo "Setting execution policy - press enter to continue"
pause
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
echo "I hope it worked"
echo "Starting server - press enter to continue"
pause
npm run start
echo "I hope that worked too"
pause
