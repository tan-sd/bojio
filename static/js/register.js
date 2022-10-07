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
    console.log(containsSpecialChars(username));
    
    
  
    if(username.length<8 || !containsSpecialChars(username)){
      msg+='Please enter a valid username \n'
    }
    if(password!=checkpassword){
      msg+='Password and confirm password mismatch\n';
    }
    console.log(msg);
    if(msg!=''){
      var placeholder = document.getElementById('errors')
      placeholder.innerHTML=`<h5>Error</h5>`+msg;
    }
  
  }