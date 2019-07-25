# pdf-viewer
A PDF viewer supplied by node.js server.
This reader is based on web-browser, and you can read documents on the server.

## Licence
  
Apache license 2.0  
+ modified PDF-js(web/, build/)  

MIT license  
+ jsTree (libs/jstree.min.js, libs/style.min.js, libs/32px.png, libs/throbber.gif)  

MIT license  
+ Othre files that I wrote  


## Installation

```
git clone https://github.com/MikiyaShibuya/pdf-viewer.git
cd pdf-viewer
npm install
```

## Place documents
Please place documents in arbital pathed under `pdf-viewer/`.  
Recommend

## Run server
```
node app.js
```

## Accsess to the webpage
Access to `localhost:8000` on your browser.  
Then, placed pdf documents under pdf-viewer is displayed in the tree stracture.  
The bold item is a directory that can be drop-down, and other items are files.  
Pdf documents will be opened when the file item is clicked.  
