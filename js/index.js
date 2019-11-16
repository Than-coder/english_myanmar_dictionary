const electron = require('electron');
const ipc = electron.ipcRenderer;


// dom
function _(data){
  return document.querySelector(data);
}

// search form submit
_('#form').addEventListener('submit',(e)=>{
  e.preventDefault();

  let text = _('#search-word').value;
  if(text === '') return false;

  //send main.js
  ipc.send('search-word',text);
  
})


//found word
ipc.on('found-word',(e,rows)=>{
  //reclear
   _('.found-word').innerHTML = '';
  //init
  let li = '';
  //loop
  rows.forEach(row =>{
    li += `
      <li>
				<strong>English:</strong>
				${row.word}
				<br />
				<strong>Myanmar:</strong>
				${row.definition}
				<br />
      </li>
    `;
  })
  //set html
  _('.found-word').innerHTML = li;
})