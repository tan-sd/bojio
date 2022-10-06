var count=0;
var placeholder=document.getElementById('result');
var activityTable=`<table><tr><th>No.</th><th>Activity</th><th>location</th><th>Duration</th></tr>`
function update(){
  var name=document.getElementById('activityName').value;
  var location=document.getElementById('location').value;
  var duration=document.getElementById('activityDuration').value;
  if(name=='' && location=='' && duration==''){
    alert('Please do not leave any fields empty');
  }
  if (isNaN(duration)){
    alert('Please enter a valid duration');
  }
  else{
    count+=1;
    activityTable+=`<tr><td>${count}</td><td>${name}</td><td>${location}</td><td>${duration}</td><td><button type="button">Delete</button></td></tr>`
  }
  
  placeholder.innerHTML=activityTable+`</table>`;
}

if (count==0){
    var output='<h5>You have no activity yet</h5>'
    placeholder.innerHTML=output;
}


