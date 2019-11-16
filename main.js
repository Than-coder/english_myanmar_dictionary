const electron  = require('electron');
const path = require('path');
const Database = require('./db/index');

// db
let db = new Database(path.join(__dirname,'/db/dictionary.db'));



const { app,BrowserWindow,ipcMain } = electron;

let mainWindow;


function init(){
    mainWindow = new BrowserWindow({
        title:'English Myanmar Dictionary',
        icon:path.join(__dirname,'/icon/electron_4.png'),
        minWidth:600,
        minHeight:400,
        width:600,
        height:400,
        webPreferences:{
            nodeIntegration:true
        }
    });
    //load html
    mainWindow.loadFile(path.join(__dirname,'index.html'));
    //on search-text
    ipcMain.on('search-word',(e,word)=>{
      db
        .search('dictionary',{name:'word',value:word})
        .then(rows =>{
            //send client
            mainWindow.webContents.send('found-word',rows)
        })
        .catch(err => console.log(err))
    })
    
};

//db



app.on('ready',init);