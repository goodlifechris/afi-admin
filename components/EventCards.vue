<template>
<v-container>
  <v-row dense>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in events"
          :key="card.name"
          cols="12"
        >
          <v-card color="#2196f3" dark>
            <v-card-subtitle>
            <span class="text-left">
              <v-icon small class=" float-left align-left pr-2 " >mdi-clock-outlined</v-icon><div>{{card.startTime}} - {{card.endTime}} </div></span>
            </v-card-subtitle>
            <v-card-title class="pt-0 pb-0">
              {{card.title}}
            </v-card-title>
            <v-card-text class="text-left">{{card.description}}</v-card-text>
            <v-card-actions>
              <v-avatar
                size="60"
                v-for="speaker in card.speakers"
                class="mr-3"
                :key="speaker._id">
              <v-img
                sizes="70"
                :src=speaker.image
                alt="John"
              ></v-img>
            </v-avatar>
              <v-spacer></v-spacer>
              <v-btn outlined @click="editTItem">Edit</v-btn>
              <v-btn outlined @click="deleteItem" >Delete</v-btn>
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
    }
  },
  mounted() {
    this.$store.dispatch('getEvents')
  }
}


</script>
