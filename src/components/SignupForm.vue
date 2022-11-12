// eslint-disable-next-line vue/valid-template-root
<template>
    
    <div @click="closePopup">

        <div class ="inner">
                hihi
        </div>
        <!-- <form @submit.prevent = 'handleSubmit'>
            <label>Email</label>
            <input type="email" required v-model="email"> -->
            <!-- <div v-if="passwordError"> {{passwordError}}</div> -->
            <!-- <input type="text" ref = 'name'>
            <button @click="handleClick">Click me</button>
            <br>
            <label>Password</label>
            <input type="password" required v-model="password">
    
    
            <div class="terms">
                <input type="checkbox" v-model="terms" required>
                <label> Accept terms and conditions </label>
            </div> -->
            <!-- for public private jio -->
            <!-- <label for="">Type<0/label>
            <select v-model="role">
              
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
            </select> -->
            
        <!-- </form> -->

    </div>

    <p>Email: {{ email }}</p>
    <p>Password: {{password}}</p>
    <p>Terms: {{terms}}</p>
</template>

<script>


export default {
    props:['header', 'text'],
    data(){
        return {
            email: '',
            password: '',
            username: '',
            firstname: '',
            lastname: '',
            terms: false,

        }
    },
    methods: {
        handleSubmit(){
            console.log('form submitted');
        },
        handleClick(){
            console.log(this.$refs.name);
            this.$refs.name.classList.add('active')

        },
        closePopup(){
            this.$emit('close')
        }
    }
}
</script>

<style>
</style>