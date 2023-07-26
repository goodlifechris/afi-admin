<template>
  <v-card width="500" outlined class="pa-10">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <h2>Add event</h2>
      ,<v-row class="mx-1">
      <v-col cols="6">
        <v-text-field
          v-model="startTime"
          label="Start time"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="endTime"
          class="ml-4"
          label="End time"
          required
        ></v-text-field>
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
      startTime:'',
      endTime:'',
      venue:'',
      phone:'',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),

    methods: {
      submit(){
        if(this.$refs.form.validate()){
          this.loading=true
          let data={
            "email": this.email,
            "name": this.name,
            "title": this.title,
            "description": this.description,
            "phone": this.phone
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

          fetch(process.env.BASE_URL+'/api/delegate', requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.loading = false
                this.$toast.success("Successfully saved");
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
