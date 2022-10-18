<template>
        
        <div class="container">
            <h1>Find a Friend Page</h1>
            
            <input type="text" name="searchfriend" v-model="searchedperson" placeholder="Search username">
            {{searchedperson}}

            <button>Search</button>
        </div>
</template> 

<script>

export default{ 

    title: 'BOJIO – Friend List',
    name: 'friendpage',

    data(){
        return{
            searchedperson:''
        }
    }
}

</script>