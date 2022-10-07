

// registration form validation

function securityCheck(){
  msg='';
  var username=document.getElementById('name').value;
  var password=document.getElementById('password').value;
  var checkpassword=document.getElementById('checkpassword').value;

  console.log(username)
  console.log(password)
  console.log(checkpassword)

  function containsSpecialChars(str) {
  const specialChars =
    '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
  return specialChars
    .split('')
    .some((specialChar) => str.includes(specialChar));
  }
  
  

  if(username.length<8 || containsSpecialChars(username)){
    msg+='Please enter a valid username \n'
  }
  if(password!=checkpassword){
    msg+='Password and confirm password mismatch\n';
  }
  console.log(msg);
  if(msg!=''){
    alert(msg);
  }

}

// adding event
var count=0;
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
    activityTable+=`<tr><td>${count}</td><td>${name}</td><td>${location}</td><td>${duration}</td></tr>`
  }
  var placeholder=document.getElementById('result');
  placeholder.innerHTML=activityTable+`</table>`;
}



