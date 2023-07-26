<template>
  <v-timeline
    align-top
    dense

  >
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card
        :color="item.color"
        dark
      >
        <v-card-title class="text-h6">
          {{item.description}}
        </v-card-title>
        <v-card-text class="white text--primary">
          <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>

        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          color: 'red lighten-2',
          icon: 'mdi-star',
          description: 'Opening Session',
        },
        {
          color: 'purple darken-1',
          icon: 'mdi-book-variant',
          description: 'Global and Regional Perspectives',
        },
        {
          color: 'green lighten-1',
          icon: 'mdi-airballoon',
          description: 'Capacity Building',
        },
        {
          color: 'indigo',
          icon: 'mdi-buffer',
          description: 'Aviation Safety',
        },
      ],
    }),
  }
</script>
