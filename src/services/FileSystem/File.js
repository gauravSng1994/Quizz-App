class FileClass {
  saveFile(fileDirPath, fileName, fileData) {
    const self = this;
    return new Promise(((resolve, reject) => {
      // console.log('Save File',fileDirPath,fileName,fileData);
      window.resolveLocalFileSystemURL(window.cordova.file.externalDataDirectory, (externalRootDir) => {
        // console.log('External root dir',externalRootDir);
        fileDirPath.split('/').reduce( async (parent, child) => {
          // console.log('Split','parent',await parent,'child',await child);
          return this.createDirectory(await parent, child);
        }, Promise.resolve(externalRootDir)).then((fileDir) => {
          this.createFile(fileDir, fileName, fileData).then(response => resolve(response)).catch(response => {
            console.log('Error',response);
            return reject(response)
          });
        });
      }, self.onError);
    }));
  }
  readFile(fileDirPath, fileName) {
    return new Promise(((resolve) => {
      window.resolveLocalFileSystemURL(`${window.cordova.file.externalDataDirectory}${fileDirPath}/`, (externalRootDir) => {
        // TODO this file extension to be mad dynamic
        // console.log('ExternalRootDir',externalRootDir);
        externalRootDir.getFile(`${fileName}`, { create: false },
          (fileEntry) => {
            console.log('FileEntry',fileEntry);
            fileEntry.file((file) => {
              return resolve({ success: true, file, fileEntry, error: null });
            });
          }, e => resolve({ success: false, file: null, fileEntry: null, error: e }),
        );
      }, (e)=> resolve({ success: false, file: null, fileEntry: null, error: e }));
    }));
  }
  createDirectory(parentDir, dirName) {
    return new Promise((resolve, reject) => {
      parentDir.getDirectory(dirName, { create: true, exclusive: false }, (subDirEntry) => {
        return resolve(subDirEntry);
      }, e => reject(e));
    });
  }
  createFile(fileDirEntry, fileName, fileData) {
    /** Creates a new file or returns the file if it already exists.*/
    return new Promise(((resolve, reject) => {
      fileDirEntry.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
        this.writeFile(fileEntry, fileData)
          .then(response => resolve({ ...response, fileEntry, msg: `Create file success. --> ${response.msg}` }))
          .catch(e => reject(e));
      }, this.onError);
    }));
  }
  writeFile = (fileEntry, dataObj) => {
    /** this function takes the fileReference on the device and data to write the data in the file*/
    return new Promise(((resolve, reject) => {
      try {
        fileEntry.createWriter((fileWriter) => {
          fileWriter.write(dataObj);
          return resolve({ success: true, msg: 'Success file write', error: null });
        });
      } catch (e) {
        return reject({ success: true, msg: 'File Write failed', error: e });
      }
    }));
  }
  onError = (e,msg) => {
    console.log('Error: ', msg, e);
  }
  onSuccess = (result) => {
    console.log('Success', result);
  }
}

export default FileClass;
