<template>
  <div class="app" style="">
    <v-img style=""
           gradient="143deg, rgba(0,0,0,0.9307073171065301) 0%, rgba(0,0,0,0.5525560566023284) 35%, rgba(3,13,36,0.4853291658460259) 49%, rgba(0,0,0,0.33406866164434523) 64%, rgba(0,0,0,1) 100%"
           width="100vw" height="92vh" :src="bg_img">
      <vue-tinder ref="tinder" key-name="id" :queue.sync="queue" :allowSuper="true" :allowDown="false" :offset-y="10"
                  :max="4" @submit="onSubmit">
        <template slot-scope="scope">
          <div
            class="pic"
            :style="{
            'background-image': `url(${scope.data.image})`
          }"
          >
            <div
              style="left: -7px; border-radius: 1.5rem; width: 2.8rem; height: 2.9rem; top:-10px; margin: 0; position: absolute; background: white; color: black; mix-blend-mode: screen; user-select: none;">
              <h1 style="mix-blend-mode: difference; color: white;margin-left: 10px; margin-top: 17px;">M</h1>
            </div>
          </div>
        </template>
      </vue-tinder>
      <div class="btns">
        <img src="https://cdn.discordapp.com/attachments/488810702190936075/774952953797804052/BBOG-rewind.png"
             @click="decide('rewind')" />
      </div>
    </v-img>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline primary lighten-2">
          <v-col>
            <v-row>
              <v-icon>mdi-instagram</v-icon>
              <p style="padding-top: 15px">{{ gsid }}</p>
            </v-row>
            <h3>Open Using</h3>
          </v-col>
        </v-card-title>

        <v-card-text>
          <v-container style="">
            <v-row justify="space-between">
              <v-btn
                color="secondary"
                text
                :href="`https://www.instagram.com/${gsid}/`"
                target="_blank"
                rel="noopener noreferrer"
                @click="dialog = false"
              >
                <v-row>
                  <div style="padding-top: 3px">
                    <h3>Instagram</h3>
                  </div>
                  <v-icon>mdi-instagram</v-icon>
                </v-row>
              </v-btn>
              <v-btn
                color="primary"
                text
                :to="`/i/${ssid}`"
                @click="dialog = false"
              >
                <v-row>
                  <v-icon>mdi-leaf</v-icon>
                  <div style="padding-top: 3px">
                    <h3>Misha</h3>
                  </div>
                </v-row>
              </v-btn>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import axios from 'axios'
import { v4 as uuid } from 'uuid'

export default {
  name: 'lazy',
  components: {},
  data: () => ({
    queue: [],
    offset: 0,
    history: [],
    source: [
      'https://cdn.discordapp.com/attachments/773136270867824640/774289206406807592/shlyukha.webp',
      'https://cdn.discordapp.com/attachments/773136270867824640/774289489933238292/shlyukha.webp',
      'https://cdn.discordapp.com/attachments/773136270867824640/774289196150947881/shlyukha.webp',
      'https://cdn.discordapp.com/attachments/773136270867824640/774289174781755402/shlyukha.webp',
      'https://cdn.discordapp.com/attachments/773136270867824640/774289183279808562/shlyukha.webp',
      'https://cdn.discordapp.com/attachments/773136270867824640/774289167781462066/shlyukha.webp',
      'https://cdn.discordapp.com/attachments/773136270867824640/774289478223265802/shlyukha.webp',
      'https://cdn.discordapp.com/attachments/773136270867824640/774289215068176444/shlyukha.webp',
      'https://cdn.discordapp.com/attachments/773136270867824640/774289222898155540/shlyukha.webp'
    ],
    user_images: null,
    cool_down: [],
    dialog: false,
    gsid: '',
    ssid: '',
    bg_img: 'https://cdn.discordapp.com/attachments/773136270867824640/774289206406807592/shlyukha.webp'
  }),
  created() {
    axios.get(`https://app.ixil.cc/api/bloom/strat/lazy/random`)
      .then((res) => {
        this.source = res.data
      }).finally(() => {
      this.mock()
    })

  },
  mounted() {

  },
  methods: {
    mock(user_ima = false, append = true) {
      const list = []
      if (user_ima) {
        for (let i = 0; i < this.user_images.thumb.length; i++) {
          list.push({
            image: this.user_images.thumb[i],
            iid: this.user_images.id,
            gid: this.user_images.name,
            id: uuid()
          })
          this.offset++
        }
      } else {
        for (let i = 0; i < this.source.length; i++) {
          for (let j = 0; j < this.source[i].thumb.length; j++) {
            list.push({ image: this.source[i].thumb[j], iid: this.source[i].id, gid: this.source[i].name, id: uuid() })
          }
          this.offset++
        }
      }
      if (append) {
        this.queue = this.queue.concat(list)
      } else {
        this.queue.unshift(...list)
      }
    },
    onSubmit({ item, type }) {
      if (type === 'super') {
        this.gsid = item.gid
        this.ssid = item.iid
        this.dialog = true
      } else if (type === 'like') {
        if (!this.cool_down.includes(item.iid)) {
          this.cool_down.push(item.iid)
          console.log('Accessing Profile Data')
          axios.get(`https://app.ixil.cc/api/bloom/strat/lazy/payload?id=${item.iid}`)
            .then((res) => {
              this.user_images = res.data
            }).finally(() => {
            this.mock(true)
          })
        }
      }
      if (this.queue.length < 15) {
        console.log('Fetching New Data')
        axios.get(`https://app.ixil.cc/api/bloom/strat/lazy/random?dmz=` + Math.floor(Math.random() * Math.floor(Math.random() * Date.now())))
          .then((res) => {
            this.source = res.data
          }).finally(() => {
          this.mock()
        })
      }
      this.bg_img = item.image
      this.history.push(item)
    },
    async decide(choice) {
      if (choice === 'rewind') {
        if (this.history.length) {
          this.$refs.tinder.rewind([this.history.pop()])
        }
      } else {
        this.$refs.tinder.decide(choice)
      }
    }
  }
}
</script>

<style>

html,
body {
  height: 100%;
}

body {
  margin: 0;
  overflow: hidden;
}

#app .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 10px;
  margin: auto;
  width: 95%;
  height: 80%;
  min-width: 300px;
  max-width: 455px;
}


.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  width: 64px;
  height: 64px;
}

.rewind-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 10px;
  width: 112px;
  height: 78px;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.pic-innr {
  width: inherit;
  height: inherit;

}

.btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}

.btns img {
  margin-right: 12px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.btns img:nth-child(2n + 1) {
  width: 53px;
}

.btns img:nth-child(2n) {
  width: 65px;
}

.btns img:nth-last-child(1) {
  margin-right: 0;
}
</style>
