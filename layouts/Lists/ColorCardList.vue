<template>
  <vue-horizontal-list style=" width: 99%"  :items="items" :options="options">
    <template v-slot:default="{item}">
      <color-card :album="item"  style="display: inline-block"/>
    </template>
  </vue-horizontal-list>
</template>

<script>
  import ColorCard from '../Cards/ColorCard'
  import VueHorizontalList from 'vue-horizontal-list';

  export default {
    name: "ColorCardList",
    components: { ColorCard, VueHorizontalList },

    data() {
      return {
        options: {
          responsive: [
            {end: 546, size: 2},
            {start: 530, end: 673, size: 2},
            {start: 673, end: 817, size: 2},
            {start: 817, end: 823, size: 2},
            {start: 823, end: 1452, size: 2},
            {start: 1452, size: 3}
          ],
          list: {
            // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
            windowed: 1200,

            // Because: #app {padding: 80px 24px;}
            padding: 0.1
          },
          item: {
            // css class to inject into each individual item
            class: 'ccardl',
            // padding between each item
            padding: 1
          },
          navigation: {
            // when to show navigation
            start: 768,
            color: '#000'
          }
        },

        items: [{
          "id": "vMwxOLp7",
          "name": "曉美媽 – 惡墮★快感之牢 [33P]",
          "idol": "Unknown",
          "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
          "source": "www.jkforum.net",
          "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
        },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://i.imgur.com/43Etwuz.jpg",
            "source": "www.jkforum.net",
            "color": ["#b3c425","#efb598","#426608","#ac835b","#d0aa9c","#6d5e56"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://i.imgur.com/BztWida.jpeg",
            "source": "www.jkforum.net",
            "color": ["#33a0be","#dcab92","#3f8c9a","#a17b69","#d8bea9","#343332"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          },
          {
            "id": "vMwxOLp7",
            "name": "曉美媽 – 惡墮★快感之牢 [33P]",
            "idol": "Unknown",
            "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
            "source": "www.jkforum.net",
            "color": ["#fc1c64", "#f87a75", "#760624", "#974c4c", "#bc796e", "#5c3c34"]
          }]
      }

    }
  }
</script>

<style scoped>
  .cc-list {
    overflow-x: scroll;
    white-space: nowrap;
  }
</style>
