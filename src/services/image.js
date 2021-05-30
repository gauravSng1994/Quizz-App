

// async function downloadImage(imageSrc) {
//   // const image = await fetch(imageSrc)
//   // const imageBlog = await image.blob()
//   // const imageURL = URL.createObjectURL(imageBlog)
//
//   const link = document.createElement('a')
//   link.href = imageSrc
//   link.download = 'image file name here'
//   document.getElementById("imgDownload").appendChild(link)
//   // link.click()
//   document.getElementById("imgDownload").removeChild(link)
//   let blob = new Blob([xhr.response], {type: "image/png"});
//
//   // onload needed since Google Chrome doesn't support addEventListener for FileReader
//   fileReader.onload = function (evt) {
//     // Read out file contents as a Data URL
//     const result = evt.target.result;
//     // Set image src to Data URL
//     // rhino.setAttribute("src", result);
//     // Store Data URL in localStorage
//
//     // Store Data URL in localStorage
//     try {
//       localStorage.setItem("rhino", result);
//     }
//     catch (e) {
//       console.log("Storage failed: " + e);
//     }
//   };
//   // Load blob as Data URL
//   fileReader.readAsDataURL(blob);
// }
export function downloadImage(imageSrc) {
    return new Promise(((resolve, reject) => {
        // console.log(imageSrc.split('.'));
        if(!imageSrc) return reject(new Error('Invalid image source'));
        try {
            let imageType = imageSrc.split('.').pop();
            const xhr = new XMLHttpRequest();
            const fileReader = new FileReader();
            xhr.open("GET", imageSrc, true);
            xhr.responseType = "arraybuffer";
            xhr.addEventListener("load", function () {
                if (xhr.status === 200) {
                    // console.log(xhr.response);
                    let blob = new Blob([xhr.response], {type: "image/"+imageType});
                    fileReader.onload = function (evt) {
                        const result = evt.target.result;
                        try {
                            // console.log('downloadImage Result',result);
                            return resolve(result);
                            // localStorage.setItem("rhino", result);
                        }
                        catch (e) {
                            console.log("Storage failed: " + e);
                            return reject(e);
                        }
                    };
                    fileReader.readAsDataURL(blob);
                }
            }, false);
            xhr.send();
        }catch (e) {
            reject(e);
        }
    }));
}
