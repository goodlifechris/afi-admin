<template>
  <v-card width="500" outlined class="pa-10">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <h2>Add event</h2>
      ,<v-row class="mx-1">
      <v-col
        cols="12"
        sm="12"
        md="12"
      >
        <v-menu
          v-model="menuDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Select date of the event"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="menuDate = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        sm="12"
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
              prepend-icon="mdi-clock-time-four-outline"
              readonly
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
        cols="12"
        sm="12"
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
              prepend-icon="mdi-clock-time-four-outline"
              readonly
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
        label="Title"
        required
      ></v-text-field>


      <v-text-field
        v-model="description"
        label="Description"
        required
      ></v-text-field>
      <v-text-field
        v-model="venue"
        label="Venue"
        required
      ></v-text-field>
      <template>
        <v-select
          v-model="value"
          :items="speakers"
          :loading="speakers ? false: true"
          :item-text="'name'"
          :item-value="'_id'"
          chips
          label="Speakers"
          multiple
        ></v-select>
      </template>
      <v-btn
        color="warning"
        @click="submit"
        :loading="loading"
      >
        Add event
      </v-btn>
    </v-form>
  </v-card>

</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
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
      menuDate: false,
      modalStartTime: false,
      modalEndTime: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      baseUrl:'https://afi-backend-wcomf.ondigitalocean.app/'
    }),

    mounted() {
      this.getSpeakers()
    },
    methods: {
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


          let data={
            "name": this.name,
            "title": this.title,
            "description": this.description,
            "venue":this.venue,
            "speakers":this.value,
            "image":this .image,
            "startTime":this.startTime,
            "endTime":this.endTime
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

          fetch(process.env.BASE_URL+'/api/event', requestOptions)
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
