<template>
  <v-data-table
    :headers="headers"
    :items="delegates"
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
             Add delegate
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
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
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
      baseUrl:"https://afi-backend-wcomf.ondigitalocean.app/",
      delegates:[],
      editedIndex: -1,
      editedItem: {
        id:'',
        name: '',
        email: '',
        country: '',
        description:'',
        title:''

      },
      defaultItem: {
        id:'',
        name: '',
        email: '',
        country: '',
        description:'',
        title:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add delegate' : 'Edit Delegate'
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
      initialize () {

      },

      editItem (item) {
        this.editedIndex = this.delegates.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.delegates.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        console.log("final item ", this.editedItem)
        let id=this.editedItem._id
        this.deleteDelegate(id)
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

        fetch(this.baseUrl+'api/delegate/', requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            this.delegates = JSON.parse(result).data
            console.log("this.delegates", this.delegates)
          })
          .catch(error => console.log('error', error));
      },
      updateDelegate(data,id){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(process.env.BASE_URL+"/api/delegate/"+id, requestOptions)
          .then(response => response.text())
          .then(result => this.succcessUpdate(result))
          .catch(error => this.errorUpdate(error));
      },
      deleteDelegate(id){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          headers: myHeaders,
          method: 'DELETE',
          redirect: 'follow'
        };

        fetch(this.baseUrl+'api/delegate/'+id, requestOptions)
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
          console.log("get record id", this.delegates[this.editedIndex]._id)
          let id= this.delegates[this.editedIndex]._id
          console.log("data is", this.editedItem )
          this.updateDelegate(this.editedItem,id)
        } else {

          this.saveDelegate(this.editedItem)
        }
        this.close()
      },
      saveDelegate(){
          let data={
            "email": this.editedItem.email,
            "name":  this.editedItem.name,
            "title":  this.editedItem.title,
            "description":  this.editedItem.description,
            "country":  this.editedItem.country,
            "phone":  this.editedItem.phone
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

          fetch(this.baseUrl+'api/delegate', requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.$toast.success("Successfully saved");
                this.getData()
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
