// import Download from './Download';
// import store from '../../store';
//
// class OpenWithApp extends Download{
//   openFile(file) {
//     store.dispatch('setIsLoading',{value:false})
//     return new Promise(((resolve, reject) => {
//       cordova.plugins.fileOpener2.open(
//         file.localURL,
//         file.type,
//         {
//           error: (e) => {
//             console.log(`Error status: ${e.status} - Error message: ${e.message}`);
//             reject({ success: false, error: e, msg: 'File could not be opened' });
//           },
//           success: () => {
//             console.log('file opened successfully');
//             resolve({ success: true, error: null, msg: 'File was opened successfully' });
//           },
//         },
//       );
//     }));
//   }
//   openAndDownload() {
//     return new Promise((resolve, reject) => {
//       this.readFile(this.fileDirPath, `${this.fileName}.pdf`).then((readFileResponse) =>{
//         if(readFileResponse.success) {
//           this.openFile(readFileResponse.file).then((openFileResponse) => {
//             return resolve(openFileResponse);
//           }).catch(reason => reject(reason));
//         }else{
//           // TODO improve this code to remove duplicacy with catch
//           this.download().then((downloadResponse) => {
//             console.log('OPen Download response', downloadResponse);
//             this.open().then((fileOpenResponse) => {
//               console.log('File open response OpenAnd Download', fileOpenResponse);
//               return resolve(fileOpenResponse);
//             });
//           }).catch((downloadErrorResponse) => {
//             console.log('Open download Error : ', downloadErrorResponse);
//             return resolve({ success: false, error: downloadErrorResponse.error, msg: 'File could neither be located nor downloaded.' });
//           });
//         }
//       }).catch((readErrorResponse) => {
//         this.download().then((downloadResponse) => {
//           console.log('OPen Download response', downloadResponse);
//           this.open().then((fileOpenResponse) => {
//             console.log('File open response OpenAnd Download', fileOpenResponse);
//             return resolve(fileOpenResponse);
//           });
//         }).catch((downloadErrorResponse) => {
//           console.log('Open download Error : ', downloadErrorResponse);
//           return resolve({ success: false, error: downloadErrorResponse.error, msg: 'File could neither be located nor downloaded.' });
//         });
//       });
//     });
//   }
//   open() {
//     return new Promise((resolve, reject) => {
//       this.readFile(this.fileDirPath, `${this.fileName}.pdf`).then((response) =>{
//         console.log("OPEN RESPONSE",response);
//         if(response.success) this.openFile(response.file).then((openFileResponse) => {
//           return resolve(openFileResponse);
//         }).catch(reason => reject(reason));
//       }).catch((readErrorResponse) => {
//         return reject({ success: false, error: readErrorResponse.error, msg: 'File could not be located.' });
//       });
//     });
//   }
// }
//
// export default OpenWithApp;
//
// // Working open function
// // open() {
// //   this.readFile(this.fileDirName, this.fileName).then((response) =>{
// //     if(response.success){
// //       console.log('About to open file -->, response :', response);
// //       this.openFile(response.file);
// //     }
// //   }).catch((response) => {
// //     console.log('Error File finding, about to download file, response:', response);
// //     this.download().then(response=>{
// //       console.log('OPen Download response',response);
// //     }).catch(response =>{
// //       console.log('Open download Error : ', response);
// //     });
// //   });
// // }
