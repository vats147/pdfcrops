const form = document.querySelector("form"),
       fileInput = document.querySelector(".file-input"),
       progressArea = document.querySelector(".progress-area"),
       uploadedArea = document.querySelector(".uploaded-area");
var set=0;

form.addEventListener("click", () => {
       fileInput.click();
});

fileInput.onchange = ({ target }) => {
       let file = target.files[0];
       if (file) {
              let fileName = file.name;
              if (fileName.length >= 12) {
                     let splitName = fileName.split('.');
                     fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
              }


              uploadFile(fileName);
              set=1;
       }

}
function myfun(){
       if(set==0)
       {
                     var x = document.getElementById("snackbar");
       x.className = "show";
       setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
       
       }
}

// remove old file 
// clear my li tag 
function clearArea() {
       let areaChild = uploadedArea.children;
       for (let i = 0; i < areaChild.length; i++) {
              areaChild[i].classList.add("selected");
              setTimeout(() => {
                     areaChild[areaChild.length - 1].remove();
              }, 500);
       }
}



// old function 

function uploadFile(name) {


//       chnage class of upload-btn 

       progressArea.innerHTML = "";
       let uploadedHTML = `<li class="row">
              <div class="content upload">
              <i class="fas fa-file-alt"></i>
              <div class="details">
              <span class="name">${name} • Uploaded</span>
             
              </div>
              </div>
              <i class="fas fa-loading"></i>
       </li>`;
       uploadedArea.classList.remove("onprogress");
       uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
       
       let uploadBtn = document.getElementById("upload-btn");
       uploadBtn.addEventListener("click", () => {

              document.getElementById("loader").style.visibility="visible";

              uploadBtn.textContent=" ";
              uploadBtn.disabled = true;
              document.getElementById("loadbtn1").style.display = "flex";
              document.getElementById("loadbtn2").style.display = "none";

              





              let data = new FormData(form);
              console.log(data);
              const fileInput = document.querySelector('#file');
              const file = fileInput.files[0];
              
            
              let Ecommerce;
       if (document.getElementById("Flipkart").checked) {
              // Radio button is checked
              Ecommerce = 1;
       } else if (document.getElementById("Meesho").checked) {
              // Radio button is not checked
              Ecommerce = 2;

       }
       console.log(Ecommerce);
       data.append('file', file);
       data.append('Ecommerce', Ecommerce);

       fetch("https://nodeapivercelhostingyoutube-production.up.railway.app/", {
              method: 'POST',
              body: data,

       })
              .then((response) => {
                     // handle response
                     return response.blob();
              })
              .then((blob) => {
                     var url = URL.createObjectURL(blob);

                     var a = document.getElementById('download-link');
                     var title = "givemereport_" + Date.now();

                     

                     let fileLoaded = 100;
                     let fileTotal = Math.floor(blob.size / 1000);
                     let fileSize;
                     (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (blob.size / (1024 * 1024)).toFixed(2) + " MB";

                     // call clear Area
                     clearArea();
                     let progressHTML = `<li class="row">
                                   <i class="fas fa-file-alt"></i>
                                   <div class="content">
                                          <div class="details">
                                                 <span class="name">${name} • Uploading</span>
                                                 <span class="percent">${fileLoaded}%</span>
                                          </div>
                                          <div class="progress-bar">
                                                 <div class="progress" style="width: ${fileLoaded}%"></div>
                                          </div>
                                   </div>
                                                 </li>`;
                     uploadedArea.classList.add("onprogress");
                     progressArea.innerHTML = progressHTML;
                     progressArea.innerHTML = "";

                     if (blob.loaded == blob.total) {
                            progressArea.innerHTML = "";
                            let uploadedHTML = `<li class="row">
                                   <div class="content upload">
                                   <i class="fas fa-file-alt"></i>
                                   <div class="details">
                                   <span class="name">${name} • Uploaded</span>
                                   <span class="size">${fileSize}</span>
                                   </div>
                                   </div>
                                   <i class="fas fa-check"></i>
                            </li>`;
                            uploadedArea.classList.remove("onprogress");
                            uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
                     }


                     


                            // disable my file upload
                            // uploadBtn.disabled = true;
                            uploadBtn.style.display = 'none';

                            // hide button

                            console.log("Hello");

                            document.getElementById("loadbtn1").style.display = "none";











                            // let objblob = new Blob([xhr.response], { type: 'application/pdf' });



                             var urll = URL.createObjectURL(blob);

                             a = document.getElementById('download-link');

                             title = "givemereport_" + Date.now();

                            let downloadbtnn = document.getElementById("download_btn");

                            downloadbtnn.style.display = "";

                            let resetbutton = document.getElementById("reset-upload");

                            resetbutton.style.display = "";


//                             Add Event Listner on button click
                            a.addEventListener('click', function () {

                                   const a = document.createElement('a');
                                   a.style.display = 'none';
                                   a.href = urll;
                                   // set the file name and download attribute
                                   a.download = title;

                                   document.body.appendChild(a);
                                   a.click();
                                   a.remove();
                                   // remove the link from the document


                            });

              });


       }
       )
}
