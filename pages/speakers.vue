<template>
  <v-row>
    <v-col class="text-center">
      <v-card-title>Speakers</v-card-title>
      <template>
<!--        <v-tabs v-model="tabs">-->
<!--          <v-tab>View delegates</v-tab>-->
<!--        </v-tabs>-->
<!--        <v-tabs-items v-model="tabs">-->
<!--          <v-tab-item>-->
<!--            <DelegateForm/>-->
<!--          </v-tab-item>-->
<!--          <v-tab-item>-->
            <SpeakersTable/>
<!--          </v-tab-item>-->
<!--        </v-tabs-items>-->
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
