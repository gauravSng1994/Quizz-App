#npm i
npm run build
echo npm run build
rm -rf cordova/www
echo www removed
cp -r dist cordova/www
echo dist moved to travApp and renamed as www
cd cordova
cordova build
cp ./platforms/android/app/build/outputs/apk/debug/app-debug.apk /home/codalien/Desktop/quizApp/quizApp.apk
echo apk copied to desktop
cd ..
