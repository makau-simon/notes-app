//'https://meme-api.com/gimme'

let dt = new Date()
//getting the time 
let h = dt.getHours()
let m = dt.getMinutes()
//getting date
let d = dt.getDate()
let mn = dt.getMonth()
let y = dt.getFullYear()
let dy = dt.getDay()

//The html for a single note
let markup = `
      <h4 contenteditable="true" class='title'>TITLE</h4>
      <hr>
      <p contenteditable="true" class='text'>write text here....</p>
      <div class="dt">
      <img src="/images/delete.png" alt="delete.png" class="btnD">
      <p class="time">${getDay(dy)} ${d}/${mn}/${y} ${h}:${m<10?"0"+m:m}${h>10?"PM":"AM"}</p>
`

//selecting DOM elements
let notes = document.querySelector('.notes')
let btn = document.querySelector('.addBtn');
let text = document.querySelector('.status-text')

btn.addEventListener('click', addNote);

loadData()
//addNote function
function addNote() {

  //creates a div element 
  let note = document.createElement('div')
  note.setAttribute('class', 'note')
  note.innerHTML = markup
  notes.appendChild(note)

  //deleting note function
  let btnD = notes.querySelectorAll('.btnD')
  btnD.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      //confirmation if the user wants to delete the note
      if (confirm("Are you sure you want to delete this note?")) {
        e.target.parentElement.parentElement.remove()
        saveData();
      }
    })
  })

  //if user edits the title the changes are saved
  notes.querySelectorAll('.title').forEach((t) => {
    t.addEventListener('input', saveData)
  })
  //if user edits the text the changes are saved
  notes.querySelectorAll('.text').forEach((x) => {
    x.addEventListener('input', saveData)
  })

  //saving the new note
  saveData()
  text.style.display = 'none'
}

//saveData function 
function saveData() {
  localStorage.setItem('NOTES', notes.innerHTML);
  if (localStorage.getItem('NOTES') == '') {
    text.style.display = 'block'
  }
}
//loading data function
function loadData() {
  //loads saved data from local storage and assigns it to notes element
  notes.innerHTML = localStorage.getItem('NOTES');

  //adds a new note when loadData is called
  addNote()
}


//get day function
function getDay(num) {
  switch (num) {
    case 0:
      return "Sun"
      break
    case 1:
      return "Mon"
      break
    case 2:
      return "Tue"
      break
    case 3:
      return "Wed"
      break
    case 4:
      return "Thur"
      break
    case 5:
      return "Fri"
      break
    case 6:
      return "Sat"
      break
  }
}

//registering service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {}).catch(error => {
    alert('Installation of this App is unsupported in your browser!')
  })
}

if (localStorage.getItem('NOTES') == '') {
  text.style.display = 'block'
}
/*---written by simon Makau---*/