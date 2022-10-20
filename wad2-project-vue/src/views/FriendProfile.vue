<template>
    hi this is friend profile
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