
var placeholder=document.getElementById('result');
var activityArr=[];
var totalDuration=0;

    
if (activityArr.length==0){
  var output='<h5>You have no activities yet</h5>'
  placeholder.innerHTML=output;
} 




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
    var activity = {
      name : name,
      location     : location,
      duration  : duration
    }
    totalDuration +=parseInt(duration);
    activityArr.push(activity);
    console.log(activityArr);
    activityTable=`<table><tr><th>Number</th><th>Name</th><th>Location</th><th>Duration</th><th></th></tr>`
    for(i=0;i<activityArr.length;i++){
      activityTable+=`<tr><td>${i+1}</td><td>${activityArr[i].name}</td><td>${activityArr[i].location}</td><td>${activityArr[i].duration}</td><td><button type="button" value="${activityArr[i].name}" onclick="removeActivity(this)">Delete</button></td></tr>`
    }
    placeholder.innerHTML=activityTable+`</table><br><p>Event's total duration: ${totalDuration} mins</p>`;
    

}}


function removeActivity(item){
    var ref=item.value;
    for (act of activityArr){
      if(act.name==ref){
        var timeRemoved=parseInt(act.duration);
        totalDuration-=timeRemoved
        var ind=activityArr.indexOf(act);
        activityArr.splice(ind,1);
        break
      }
    }

    if (activityArr.length==0){
      var output='<h5>You have no activities yet</h5>'
      placeholder.innerHTML=output;
    } 

    else{
      activityTable=`<table><tr><th>Number</th><th>Name</th><th>Location</th><th>Duration</th><th></th></tr>`
      for(i=0;i<activityArr.length;i++){
        activityTable+=`<tr><td>${i+1}</td><td>${activityArr[i].name}</td><td>${activityArr[i].location}</td><td>${activityArr[i].duration}</td><td><button type="button" value="${activityArr[i].name}" onclick="removeActivity(this)">Delete</button></td></tr>`
      }
      placeholder.innerHTML=activityTable+`</table><br><br><p>Event's total duration: ${totalDuration} mins</p>`;

    }
}





