<template>
<v-container>
  <v-row dense>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in events"
          :key="card._id"
          cols="12"
        >
          <v-card color="#2196f3" dark>
            <v-card-subtitle>
            <span class="text-left">
              <v-icon small class=" float-left align-left pr-2 ">mdi-clock-outlined</v-icon>{{card.time}} </span>
            </v-card-subtitle>
            <v-card-title class="pt-0 pb-0">
              {{card.title}}
            </v-card-title>
            <v-card-text class="text-left">{{card.description}}</v-card-text>
            <v-divider></v-divider>
            <v-card-title>Events</v-card-title>
            <v-col v-if="card.events" v-for="(event,index) in card.events">
              <v-card-title>Title: {{event.name}}</v-card-title>
              <v-card-subtitle class="text-left "> Time: {{event.time}}</v-card-subtitle>
              <div class="text-left ml-5 " v-if="event.description" v-for="(description,i) in event.description">
                <div>{{description}}</div>
              </div>
              <v-divider></v-divider>
            </v-col>
            <v-card-actions>

              <v-btn outlined @click="editTItem">Edit</v-btn>
              <v-btn outlined @click="deleteItem(card)" >Delete</v-btn>
            </v-card-actions>
                 </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</v-container>
</template>
<script>

export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
computed: {
  events() {
    return this.$store.state.events;
  }
},
  methods:{

    editTItem(event,value){
      this.$emit('clicked', value)
    },
    deleteItem(card){
      console.log(JSON.stringify(card))
      //deleteItem
      this.$store.dispatch('deleteSession',card._id)

    }
  },
  mounted() {
    this.$store.dispatch('getEvents')
  }
}


</script>
