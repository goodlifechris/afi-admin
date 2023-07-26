<template>
  <v-row>
    <v-col class="text-center">
      <v-card-title>Programme</v-card-title>
      <template>
        <v-tabs v-model="tabs">
          <v-tab>Day 1</v-tab>
          <v-tab>Day 2</v-tab>
          <v-tab>Day 3</v-tab>
          <v-tab>Day 4</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-row>

            <v-col cols="4">
              <ProgrammeEventForm/>
            </v-col>
    <v-col cols="8">
             <TimelineProgramme/>

    </v-col>

            </v-row>
          </v-tab-item>
          <v-tab-item>
         <p>Day 2</p>
          </v-tab-item>
          <v-tab-item>
         <p>Day 3</p>
          </v-tab-item>
          <v-tab-item>
         <p>Day 4</p>
          </v-tab-item>

        </v-tabs-items>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  data () {
    return {
      tabs:null
    }
  }
}
</script>
