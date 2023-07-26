<template>
  <v-data-table
    :headers="headers"
    :items="speakers"
    sort-by="name"
    class="elevation-1"
    :search="search"

  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
             Add speaker
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.country"
                      label="Country"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-card
                    class="mx-auto"
                    max-width="434"
                    tile
                  >
<!--                    <v-btn :loading="loadingPhoto" fab :color="noProfile? 'red':'#1AE58E'"   class="mr-2" @click.prevent="openFile">-->
                      <div v-if="editedItem.image" >
                        <v-img   max-height="150"
                                 max-width="250"  :src="editedItem.image" >
                        </v-img>
                      </div>
                      <v-icon v-else class="white--text">
                        mdi-image
                      </v-icon>
<!--                    </v-btn>-->
                    <v-btn outlined block :loading="loadingPhoto"  :color="noProfile? 'red':'#1AE58E'"   class="mr-2" @click.prevent="openFile">
                      upload avatar
                    </v-btn>
                  </v-card>
                  <v-file-input
                    id="file"
                    style="display: none"
                    accept="image/*"
                    @change="previewfile"
                  />

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
<!--    <template v-slot:no-data>-->
<!--      <v-btn-->
<!--        color="primary"-->
<!--        @click="initialize"-->
<!--      >-->
<!--        Reset-->
<!--      </v-btn>-->
<!--    </template>-->
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      noProfile: false,
      image:'',
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      loadingPhoto: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Title', value: 'title' },
        { text: 'Country', value: 'country' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      search: '',
      images:'',
      speakers:[],
      editedIndex: -1,
      editedItem: {
        id:'',
        name: '',
        email: '',
        country: '',
        description:'',
        title:'',
        image:''

      },
      defaultItem: {
        id:'',
        name: '',
        email: '',
        country: '',
        description:'',
        title:'',
        image:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add speaker' : 'Edit Speaker'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getData()
    },

    methods: {
      openFile () {
        const fileUpload = document.getElementById('file')
        if (fileUpload != null) {
          fileUpload.click()
        }
      },
      previewfile (file) {
        const val = { name: 'photo', file }
        this.uploadFile(val)
      },
      uploadFile(val){
        if(val.file) {

          const formdata = new FormData()
          formdata.append('photo', val.file)

          var requestOptions = {
            method: 'PATCH',
            body: formdata,
            redirect: 'follow'
          };

          this.loadingPhoto = true

          fetch("http://localhost:3000/api/speaker/updateMe", requestOptions)
            .then(response => response.text())
            .then(result => {
              this.image = JSON.parse(result).data.Location
              this.editedItem.image = JSON.parse(result).data.Location
              this.loadingPhoto = false

            })
            .catch(error => {
              console.log('error', error)
              this.loadingPhoto = false

            });
        }
      },
      editItem (item) {
        this.editedIndex = this.speakers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.speakers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        console.log("final item ", this.editedItem)
        let id=this.editedItem._id
        this.deleteSpeaker(id)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      getData(){
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch("http://localhost:3000/api/speaker/", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            this.speakers = JSON.parse(result).data
          })
          .catch(error => console.log('error', error));
      },
      updateSpeaker(data,id){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:3000/api/speaker/"+id, requestOptions)
          .then(response => response.text())
          .then(result => this.succcessUpdate(result))
          .catch(error => this.errorUpdate(error));
      },
      deleteSpeaker(id){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          headers: myHeaders,
          method: 'DELETE',
          redirect: 'follow'
        };

        fetch("http://localhost:3000/api/speaker/"+id, requestOptions)
          .then(response => response.text())
          .then(result => {
              this.$toast.success("Successfully deleted")
            this.getData()
              this.closeDelete()
            }
             )
          .catch(error =>
            this.$toast.error("Check internet connection")
          );
      },
      succcessUpdate(result){
        //todo show toast
        this.$toast.success("Successfully saved");
        this.getData()

      },
      errorUpdate(error){
        //todo show error
        this.$toast.error("Check internet connection");

      },
      save () {
        if (this.editedIndex > -1) {
          //update record find the item Id
          console.log("get record id", this.speakers[this.editedIndex]._id)
          let id= this.speakers[this.editedIndex]._id
          console.log("data is", this.editedItem )
          this.updateSpeaker(this.editedItem,id)
        } else {

          this.saveSpeaker(this.editedItem)
        }
        this.close()
      },
      saveSpeaker(){
          let data={
            "email": this.editedItem.email,
            "name":  this.editedItem.name,
            "title":  this.editedItem.title,
            "description":  this.editedItem.description,
            "country":  this.editedItem.country,
            "phone":  this.editedItem.phone,
            "image":this.editedItem.image
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

          fetch('http://localhost:3000/api/speaker', requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)

              let response=JSON.parse(result)
              if( response.error){
                this.$toast.error(response.error);
                this.getData()
              }else{
                this.$toast.success("Successfully saved");
                this.getData()
              }

              }
            )
            .catch(error => {
              console.log('error', error)
              this.$toast.error(error);
            });
        }
    },
  }
</script>
