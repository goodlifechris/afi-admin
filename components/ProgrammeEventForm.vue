<template>
  <v-card  outlined class="pa-10">
    <v-toolbar
      color="deep-purple accent-4"
      cards
      dark>
      <v-card-title class="text-h6 font-weight-regular">
        Add Session
      </v-card-title>
    </v-toolbar>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="mt-10"
    >
      <v-select
        :items="days"
        v-model="day"
        label="Select day"
        outlined
      ></v-select>
        <v-menu
          v-model="menuDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Select date of the event"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="menuDate = false"
          ></v-date-picker>
        </v-menu>
      <v-row>
        <v-col
          cols="6"
          sm="6"
        >
          <v-dialog
            ref="dialog"
            v-model="modalStartTime"
            :return-value.sync="startTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startTime"
                label="Select start time"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modalStartTime"
              v-model="startTime"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="modal2 = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(startTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col
          cols="6"
          sm="6"
        >
          <v-dialog
            ref="dialog2"
            v-model="modalEndTime"
            :return-value.sync="endTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endTime"
                label="Select end time"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modalEndTime"
              v-model="endTime"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="modalEndTime = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog2.save(endTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>


      <v-text-field
        v-model="title"
        outlined
        label="Title"
        required
      ></v-text-field>


      <v-text-field
        v-model="description"
        label="Description"
        outlined
      ></v-text-field>

      <v-text-field
        v-model="color"
        label="#hex color"
        outlined
      ></v-text-field>
      <AddEvent @addEvent="addEvent"/>
<!--      <v-text-field-->
<!--        v-model="venue"-->
<!--        label="Venue"-->
<!--        required-->
<!--      ></v-text-field>-->
<!--      <template>-->
<!--        <v-select-->
<!--          v-model="value"-->
<!--          :items="speakers"-->
<!--          :loading="speakers ? false: true"-->
<!--          :item-text="'name'"-->
<!--          :item-value="'_id'"-->
<!--          chips-->
<!--          label="Speakers"-->
<!--          multiple-->
<!--        ></v-select>-->
<!--      </template>-->
      <v-btn
        color="warning"
        @click="submit"
        :loading="loading"
      >
        Add Session
      </v-btn>
    </v-form>
  </v-card>

</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      day:"",
      title:'',
      loading:false,
      description:'',
      country:'',
      startTime:null,
      speakers:[],
      value:[],
      endTime:null,
      venue:'',
      phone:'',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      color:"",
      menuDate: false,
      modalStartTime: false,
      modalEndTime: false,
      days:["1","2","3","4","5"],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      baseUrl:'https://afi-backend-wcomf.ondigitalocean.app/',
      events:[]
    }),

    mounted() {
      this.getSpeakers()
    },

    watch: {
      date(newValue, oldValue) {
        this.$store.commit('SET_DATE',newValue)
        // do something with newValue and oldValue.
      },
    },
    methods: {
      addEvent(value){
        console.log("Events onboard", value)
        this.events=value
      },

      getSpeakers(){
          var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

          fetch(this.baseUrl+'api/speaker/', requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result)
              this.speakers = JSON.parse(result).data
            })
            .catch(error => console.log('error', error));
      },
      submit(){
        console.log("test ", this.value)
        if(this.$refs.form.validate()){
          this.loading=true
          let time = this.startTime + " - " + this.endTime

          let data={
            "date":this.date,
            "day":this.day,
            "color":this.color,
            "name": this.name,
            "title": this.title,
            "description": this.description,
            "time":time,
            "startTime":this.startTime,
            "endTime":this.endTime,
            "events":this.events
          }




          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify(data);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          fetch(this.baseUrl+'api/session', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.loading = false
                this.$toast.success("Successfully saved");
                this.$store.dispatch('getEvents')

              this.reset()
              }
            )
            .catch(error => {
              this.loading=false
              console.log('error', error)
              this.$toast.error(error);
            });
        }

      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
