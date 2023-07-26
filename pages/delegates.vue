<template>
  <v-row>
    <v-col class="text-center">
      <v-card-title>Delegates</v-card-title>
      <template>
<!--        <v-tabs v-model="tabs">-->
<!--          <v-tab>View delegates</v-tab>-->
<!--        </v-tabs>-->
<!--        <v-tabs-items v-model="tabs">-->
<!--          <v-tab-item>-->
<!--            <DelegateForm/>-->
<!--          </v-tab-item>-->
<!--          <v-tab-item>-->
            <DelegateTable/>
<!--          </v-tab-item>-->
<!--        </v-tabs-items>-->
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'delegates',
  data () {
    return {
      tabs:null
    }
  }
}
</script>
