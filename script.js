document.addEventListener('DOMContentLoaded',()=>{
let inputtext=document.getElementById('todo-input');
let addbtn=document.getElementById('add-task-btn');
let taskList= document.getElementById('todo-list');
let taskArray=JSON.parse(localStorage.getItem('task'))||[];

 taskArray.forEach((task)=>renderTask(task)
 );

const themeBtn = document.getElementById('Theme');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    themeBtn.textContent = 'DarkTheme';
  } else {
    themeBtn.textContent = 'LightTheme';
  }
});

addbtn.addEventListener('click',()=>{
  let tasktext=inputtext.value.trim();
  if (tasktext==='') return;
  let newTask={
    id:Date.now(),
    task :tasktext,
    completed: false
  }
  taskArray.push(newTask);
  renderTask(newTask); 
  inputtext.Value=''
  // console.log(taskArray);
  Save(taskArray);
})

function renderTask(task){
 console.log(task.task);
 const li = document.createElement('li');
 li.setAttribute('data-id',task.id)
 if (task.completed){
  li.classList.add('completed');
 }
 
 li.innerHTML=`
 <span>${task.task}</span>
 <button>delete</button>`
 taskList.appendChild(li);
 
 li.addEventListener('click',(e)=>{
  if (e.target.tagName==='BUTTON') return;
  task.completed=!task.completed;
  li.classList.toggle('completed');
  Save(taskArray);
 })

 li.querySelector('BUTTON').addEventListener('click',(e)=>{
   e.stopPropagation(); //to prevent triggering listener on parrents.
  taskArray=taskArray.filter((t)=>t.id!=task.id);
  console.log(taskArray);
   li.remove();
   Save(taskArray);
 })
}
function Save(tasks){ 
  localStorage.setItem('task',JSON.stringify(tasks));
}

});
