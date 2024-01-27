
//buttons
const archiveBtn = document.getElementById("archiveBtn");
const completeBtn = document.getElementById("completeBtn");  
const addBtn = document.getElementById("addBtn");
 
//boxes lists & titles
const taskBox = document.getElementById("full-tasks");
let pureTasks = document.getElementById("pure-tasks");
const editBox = 
document.getElementById("edit-box");
const archiveBox = document.getElementById("archive");
const archivedLists = document.getElementById("archived-lists");
const newObj = document.getElementById("new-obj");
const dateBox =document.getElementById("date-input");
const date= document.getElementById("date");
const dateTitle = document.getElementById("date-title");

//plus & x's & confirms
const listAdd = document.getElementById("obj-list-add");
const editX = document.getElementById("edit-box-x");
const archiveX = document.getElementById("archive-box-x");
const searchBtn = document.getElementById("search-btn");
const confirmDate= document.getElementById("confirm-date");






//add item,  store and delete lists program 
let pureListStorage = [];
let pureListId=0;

searchBtn.addEventListener("click",function(){
  let eleName = newObj.value;

  if (eleName.length >0 && validDate && dateBox.value.length >0){ 
  pureListId++;   
  pureListStorage.push({
    id:eleName.toLowerCase().split(" ").join("-")+"-"+pureListId,
    name:eleName
  })
  newObj.value= "";
  }
  
  if (eleName.length >0 && validDate &&dateBox.value.length >0&&date.textContent.length>8){
  pureTasks.innerHTML += 
    `
    <div  class="task" id="${eleName.toLowerCase().split(" ").join("-")+"-"+pureListId}">
    <input type="checkbox" style="padding-right:10%"/>
    <p><strong>${eleName}</strong></p>
    
        <span><i onclick="deleteTask(this)" class="fa-solid fa-circle-xmark"></i></span>
      </div>
    `
  }

})


 

const deleteTask = (button) =>{
  const indexDelete = () =>{
    for (let i=0;i<pureListStorage.length;i++){
      if (pureListStorage[i].id===button.parentElement.parentElement.id){
        return i;
      }
    }
  }
  button.parentElement.parentElement.remove();
  pureListStorage.splice(indexDelete(),1);
}


//change, store and add date
let currentDate = "";
let editedDate = "";
let validDate;


editBox.addEventListener("click",function(){ 
  currentDate = dateBox.value;
  editedDate = currentDate[5]+currentDate[6]+"/"+currentDate[8]+currentDate[9]+"/"+currentDate[2]+currentDate[3];
  if (editedDate.includes(NaN)||editedDate.includes(undefined)){
    
  }
  else{
    validDate = true;
    date.textContent = "Objectives of " +editedDate;
    dateTitle.textContent = "Change Date";
  } 
})


//archive list and display
let fullListStore = JSON.parse(localStorage.getItem("info")) ||[]; 
let archiveCount = 0;
let listDayLength = 0;

completeBtn.addEventListener("click",function(){
  

  
  fullListStore.push([{date:editedDate+"-"+`${archiveCount}`},pureListStorage]);
  localStorage.setItem("info",JSON.stringify(fullListStore));
  pureListStorage = [];
 
  if (fullListStore[archiveCount][0].date.split("").splice(0,8).join("").includes(NaN)||fullListStore[archiveCount][0].date.split("").splice(0,8).join("").includes("-")||dateBox.value.length ===0){
    fullListStore.splice(archiveCount,1); 
    localStorage.setItem("info",JSON.stringify(fullListStore));
  }
  else{
  displayEach()
  date.textContent = "Objectives";
  date.value = "";
  pureTasks.innerHTML = ""; 
  dateBox.value = ""; 
  dateTitle.textContent = "Add Date";
  archiveCount++
  }
     
})


//function to display all past tasks in archived

const displayEach = () =>{
   archivedLists.innerHTML = "";
  for (let i=fullListStore.length-1;i>=0;i--){
    archivedLists.innerHTML += 
    `
    <div class="archivelist">
        <h1 class="archive-title">Objectives of 
        ${
          fullListStore[i][0].date.split("").splice(0,8).join("")}
          </h1>
      </div> 
    `
     fullListStore[i][1].forEach(({name})=>{
  (archivedLists.innerHTML +=
    `
    <div class="task">
            <p><strong>${name}</strong></p>
          </div>
    `
  )
  })

  }
}
   
if (fullListStore.length){
  displayEach();
}
//open and close boxes and elements

const togglePlusMinus = (plus, x) =>{
  plus.classList.toggle("hide");
  x.classList.toggle("hide");
}

listAdd.addEventListener("click",function(){
  togglePlusMinus(listAdd,editBox);
})
editX.addEventListener("click",function(){
  togglePlusMinus(listAdd,editBox);
  newObj.value = "";
})
archiveX.addEventListener("click",function(){
  archive.classList.toggle("hide");
})
archiveBtn.addEventListener("click",function(){
  archive.classList.toggle("hide");
}
)

addBtn.addEventListener("click",function(){
  togglePlusMinus(listAdd,editBox);
})
