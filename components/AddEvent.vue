<template>
  <v-card
    class="mx-auto"
    style="max-width: 500px;"
    outlined
  >
    <v-toolbar
      color="deep-purple accent-4"
      cards
      dark
      flat
    >
      <v-card-title class="text-h6 font-weight-regular">
       Add event
      </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
    <v-row v-if="events.length>0">
      <v-list-item v-for="(event,i) in events">
        <v-btn
          fab
          dark
          small
          color="primary"
          @click="deleteEventLocally(event,i)"
        >
          <v-icon dark>
            mdi-minus
          </v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="primary"
          @click="editEvent(event,i)"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-list-item-content>
          <v-list-item-title v-html="event.name"></v-list-item-title>
          <v-list-item-subtitle v-html="event.time"></v-list-item-subtitle>
          <v-list-item-subtitle v-html="event.description"></v-list-item-subtitle>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
    </v-row>
      <v-card-subtitle v-else > Events will appear here</v-card-subtitle>
    </v-card>

    <v-form
      ref="form"
      v-model="form"
      class="pa-4 pt-6"
    >
      <v-row>
        <v-col>
          <v-text-field
            v-model="start_time"
            filled
            outlined
            color="deep-purple"
            label="Start time"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="end_time"
            filled
            outlined
            color="deep-purple"
            label="End time"
          ></v-text-field>
        </v-col>



      </v-row>
        <v-text-field
          v-model="title"
          filled
          outlined
          color="deep-purple"
          label="Title"
        ></v-text-field>

      <v-textarea
        auto-grow
        filled
        v-model="description"
        clearable
        clear-icon="mdi-close-circle"
        outlined
        color="deep-purple"
        label="Use comma separator"
        rows="4"
        row-height="30"
      ></v-textarea>

    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        text
        outlined
        @click="$refs.form.reset()"
      >
        Reset
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="addEvent"
      >
        Add event
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      agreement: false,
      form: false,
      isLoading: false,
      start_time:'',
      end_time:'',
      description:"",
      title:"",
      events:[],
      date_start:"",
      date_end:"",
      formattedStartTime:"",
      formattedEndTime:"",
      time:""
    }),
    computed: {
      date() {
        return this.$store.state.date;
      }
    },
    methods:{

      deleteEventLocally(val,index){
        this.events.splice(index, 1)
        this.$refs.form.reset()
        this.$emit('addEvent', this.events)


      },
      editEvent(val,index){
        // let val=JSON.stringify(item)
        // console.log("edit value", val)

        //prefill the textfields
          this.date_start= val.formattedStartTime,
          this.date_end=val.formattedEndTime,
          this.time=val.time,
          this.title=val.name,
          this.description=val.description
          this.start_time=val.time.split(" ")[0]
        this.end_time=val.time.split(" ")[1]
      },
      addEvent() {
        //check for date
        if (this.date) {
          this.formattedStartTime = this.$moment(this.date + ' ' + this.start_time).toISOString()
          this.formattedEndTime = this.$moment(this.date + ' ' + this.end_time).toISOString()
          // console.log("end",formattedEndTime.format("dddd, Do MMM YYYY, h:mm:ss A"));

          //todo
          let IsoString = "2023-08-24T08:30:00.000Z"
          let IsoDate = this.$moment(IsoString).format("dddd, Do MMM YYYY, h:mm:ss A")
          console.log("date is", IsoDate)

          let descriptions = this.description.split(",")
          this.time = this.start_time + " - " + this.end_time

          //todo first get the event add it to events
          let event = {
            date_start: this.formattedStartTime,
            date_end: this.formattedEndTime,
            time: this.time,
            name: this.title,
            description: descriptions
          }
          //GET THE DATE AND CREATE the new date
          this.events.push(event)
          this.$refs.form.reset()
          this.$emit('addEvent', this.events)

        } else{
          this.$toast.error("please select date of event");

        }

      }
    }
  }
</script>
