import axios from 'axios';
import File from './File';

class Download extends File {
  constructor(baseUrl, url) {
  // constructor(fileDirPath, fileName, axiosConfig) {
    super();
    this.url = url || '';
    // this.herokuUrl = 'https://cors-anywhere.herokuapp.com/';
    this.baseUrl = baseUrl || '';
    // this.data = (axiosConfig || {}).data;
    this.nativeUrl = '';
    // this.fileName = fileName;
    // this.fileDirPath = fileDirPath;
  }

  /** call this method to download and share file */
  async download(fileDirPath, fileName) {
    fileName = fileName || this.fileName;
    // fileDirPath = fileDirPath;
    const response = await axios({
      baseURL: this.baseUrl,
      url: this.url,
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        // Accept: 'application/pdf',
        // Accept: '*/*',
      },
    });
    console.log('Response', response);
    try {
      // const blob = new Blob([response.data], { type: 'application/pdf' });
      const blob = new Blob([response.data]);
      return await this.saveFile(fileDirPath, `${fileName}`, blob);
      // return await this.saveFile(fileDirPath, `${fileName}.${fileType}`, blob);
    } catch (e) {
      return { success: false, error: e, msg: ''};
    }
  }
}

export default Download;
