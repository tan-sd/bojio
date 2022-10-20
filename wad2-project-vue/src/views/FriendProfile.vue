<template>
    hi this is friend profile
    <br>
    user id: {{friendid}}
</template>

<script>

export default{ 
    computed:{
        friendid(){
            return this.$route.params.idx
        }
    }
}

</script>