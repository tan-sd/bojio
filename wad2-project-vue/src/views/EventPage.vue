<template>
    <div>
      <section class="wrapper">
        <!-- IMAGE -->
        <img :src=this.events[this.$route.params.idx].image.url>

        <hr>

        <!-- EVENT NAME -->
        <div>{{ this.events[this.$route.params.idx].name }}</div>

        <hr>

        <!-- EVENT VENUE -->
        <div>{{ this.events[this.$route.params.idx].primary_venue.name}}</div>

        <hr>

        <!-- EVENT ORGANIZER -->
        <div>{{ this.events[this.$route.params.idx].primary_organizer.name}}</div>

        <hr>

        <!-- EVENT DESCRIPTION -->
        <div>{{ this.events[this.$route.params.idx].full_description}}</div>

        <hr>

      </section>
    </div>
  </template>

<script>

import sourceData from'../data.json';

export default {
        name: 'EventsButton',
        data(){
            return {
            events: sourceData.events, 
        }
    }
}

</script>