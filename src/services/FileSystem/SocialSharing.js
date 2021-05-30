// import Download from './Download';
// import store from '../../store/index';
//
// class SocialSharing extends Download {
//   downloadAndShare(shareOptions) {
//     return new Promise((resolve, reject) => {
//       this.readFile(this.fileDirName, `${this.fileName}.pdf`).then((readFileResponse) => {
//         this.shareFile(shareOptions, ((readFileResponse || {}).fileEntry).nativeURL).then((openFileResponse) => {
//           return resolve(openFileResponse);
//         }).catch(reason => reject(reason));
//       }).catch((readErrorResponse) => {
//         this.download().then((downloadResponse) => {
//           this.share(shareOptions).then((openFileResponse) => {
//             return resolve(openFileResponse);
//           }).catch( reason => reject(reason));
//         }).catch((downloadErrorResponse) => {
//           return resolve({ success: false, error: downloadErrorResponse.error, msg: 'File could neither be located nor downloaded.' });
//         });
//       });
//     });
//   }
//   downloadAndShareMulti(shareConfigurations) {
//     // xyz = [{fileDirPath, fileName, data}]
//     return new Promise((resolve, reject) => {
//       if (!Array.isArray(shareConfigurations)) reject({ success: false,
//         error: new Error('File could neither be located nor downloaded.'),
//         msg: 'File could neither be located nor downloaded.' });
//       Promise.all(shareConfigurations.map(async (el) => {
//         console.log('About to download and share multi', el);
//         const readFileResponse = await this.readFile(el.fileDirPath, `${el.fileName}.pdf`);
//         console.log('readFileResponse', readFileResponse);
//         if (readFileResponse.success) return ((readFileResponse || {}).fileEntry).nativeURL;
//         const downloadResponse = await this.download(el.fileDirPath, el.fileName, el.data);
//         console.log('downloadResponse',downloadResponse);
//         if (downloadResponse.success) return ((downloadResponse || {}).fileEntry).nativeURL;
//
//
//         // this.readFile(el.fileDirPath, `${el.fileName}.pdf`).then((readFileResponse) => {
//         //   return ((readFileResponse || {}).fileEntry).nativeURL;
//         // }).catch((readErrorResponse) => {
//         //   this.download().then((downloadResponse) => {
//         //     this.share(shareOptions).then((openFileResponse) => {
//         //       return resolve(openFileResponse);
//         //     }).catch( reason => reject(reason));
//         //   }).catch((downloadErrorResponse) => {
//         //     return resolve({ success: false, error: downloadErrorResponse.error, msg: 'File could neither be located nor downloaded.' });
//         //   });
//         // });
//       }).filter(async (el) => {
//         const nativeURL = await el;
//         return nativeURL;
//       })).then((fileUrls) => {
//         console.log('File URLs', fileUrls);
//         if(!fileUrls.length) return resolve({ success: false, error: new Error('File could neither be located nor downloaded.'), msg: 'File could neither be located nor downloaded.' });
//         this.shareFile(null, fileUrls).then((openFileResponse) => {
//           return resolve(openFileResponse);
//         }).catch(reason => reject(reason));
//       }).catch( e =>{
//         return reject({ success: false, error: e, msg: 'File could neither be located nor downloaded.' });
//       });
//     });
//   }
//   share(shareOptions) {
//     return new Promise((resolve, reject) => {
//       this.readFile(this.fileDirPath, `${this.fileName}.pdf`).then((readFileResponse) => {
//         try {
//           if (readFileResponse.success) this.shareFile(shareOptions, readFileResponse.fileEntry.nativeURL).then((shareFileResponse) => {
//             return resolve(shareFileResponse);
//           });
//         } catch (e) {
//           return reject({ success: false, error: e, msg: 'Error occurred while sharing file' });
//         }
//       }).catch((readErrorResponse) => {
//         return reject({ success: false, error: readErrorResponse.error, msg: 'File could not be located.' });
//       });
//     });
//   }
//   shareFile(shareOptions, fileURLs) {
//     store.dispatch('setIsLoading',{value:false})
//     const options = {
//       message: (shareOptions || {}).message, // not supported on some apps (Facebook, Instagram)
//       subject: (shareOptions || {}).subject, // fi. for email
//       files: [...fileURLs], // an array of filenames either locally or remotely
//     };
//     return new Promise(((resolve, reject) => {
//       window.plugins.socialsharing.shareWithOptions(options, () => {
//         resolve({ error: null, success: true, msg: 'File share successful' });
//       }, (e) => {
//         reject({ error: e, success: false, msg: 'File share failed' });
//       });
//     }));
//   }
// }
//
// export default SocialSharing;
