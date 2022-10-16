<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign in With Google</button></p>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    // import firebase from 'firebase'
    import { useRouter } from 'vue-router' // import router
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
    // import { useRouter } from 'vue-router'
    const email = ref('')
    const password = ref('')
    const router = useRouter() // get a reference to our vue router
    const register = () => {
      
        createUserWithEmailAndPassword(getAuth(), email.value, password.value) // need .value because ref()
        .then(() => {
          console.log('Successfully registered!');
          router.push('/aboutpage') // redirect to the feed
        })
        .catch(error => {
          console.log(error.code)
          alert(error.message);
        });
    }


    const signInWithGoogle = () =>{ 
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => { 
            console.log(result.user);
            router.push('/ahoutpage')
        })
        .catch((error) => { 
          
        })
    }
  </script>
  