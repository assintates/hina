<template>
  <div style="height: 100vh;" class="Album-Parent">
    <div v-if="!Check43Ratio()" class="bottom disable-scrollbars"
         style="background-size: cover; -webkit-transition: background-image 3s ease-in-out; transition: 3s;  background-blend-mode: darken;"
         :style="`background-image: url(https://proxy.ixil.cc/prox?image=${BgImage});`">

      <!-- Medium Meta -->
      <div class="meta" v-if="$vuetify.breakpoint.mdAndUp">
        <v-col style="padding-top: 2rem">
          <v-row style="padding-left: 4rem;">
            <v-img width="264px"
                   height="318px"
                   max-height="318px"
                   max-width="264px"
                   style="border-radius: 5px; box-shadow:  0 0.9px 2.2px rgba(0, 0, 0, 0.051),  0 2.1px 5.3px rgba(0, 0, 0, 0.073),  0 3.9px 10px rgba(0, 0, 0, 0.09),  0 6.9px 17.9px rgba(0, 0, 0, 0.107),  0 13px 33.4px rgba(0, 0, 0, 0.129),  0 31px 80px rgba(0, 0, 0, 0.18);"
                   :src="`https://proxy.ixil.cc/prox?image=`+info.thumb" />
            <v-col style="margin-left: 4rem;">
              <h1 class="unselectable" v-if="$vuetify.breakpoint.mdAndUp"
                  style="width: 40rem;  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-shadow: 0 0 3px #000000;">
                {{ info.name }}</h1>
              <h2 class="unselectable" v-if="$vuetify.breakpoint.smAndDown"
                  style="width: 20rem;  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-shadow: 0 0 3px #000000;">
                {{ info.name }}</h2>
              <v-row justify="start" class="pl-3">
                <v-icon>mdi-account-circle</v-icon>
                <h4
                  style="padding-left: 0.5rem; width: 10rem;  overflow: hidden; text-overflow: ellipsis; text-shadow: 0 0 3px #000000;">
                  {{ info.idol }}</h4>
              </v-row>
              <div>
                <v-badge
                  color="green"
                  content="168+"
                  icon="mdi-thumb-up"
                  overlap
                  offset-y="29px"
                  offset-x="23px"
                >
                  <v-col>
                    <v-avatar class="paper"
                              :size=" $vuetify.breakpoint.smAndDown? `2.0rem`: `2.7rem`"
                              v-for="(item, i) in 5"
                              :key="i"
                              :style=" i > 0  ? 'margin-left: -9px; transform: rotateY(11deg)' : 'margin-left: 0;' "
                              style="box-shadow: -2px 1px 4px -3px #000000, -5px 2px 6px -2px rgba(0,0,0,0.74);">
                      <v-img size="2.2rem"
                             src="https://cdn.discordapp.com/attachments/488810702190936075/761234831304556554/unknown.png" />
                    </v-avatar>
                  </v-col>
                </v-badge>

                <v-rating
                  empty-icon="mdi-star-outline"
                  full-icon="mdi-star"
                  half-icon="mdi-star-half-full"
                  hover
                  v-model="marks"
                  :length="5"
                  size="24"
                  :value="0"
                  @input="AddFav"
                />
              </div>


              <!-- Download Dialog  -->
              <div style="align-self: center; padding-bottom: 2rem; padding-top: 1rem;">
                <v-dialog
                  v-model="DownloadDialog"
                  persistent
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      depressed
                      color="rgba(255, 242, 0, 0.79)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      DOWNLOAD
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="headline blue lighten-2">
                      <v-row justify="space-between">
                        <h3>
                          Download
                        </h3>
                        <v-btn flat depressed color="rgba(0,0,0,0)" @click="DownloadDialog = !DownloadDialog">
                          <v-icon size="1.5rem">mdi-close-circle</v-icon>
                        </v-btn>
                      </v-row>
                    </v-card-title>

                    <v-container fluid>
                      <v-row style="width: 100%" justify-content="end" align-content="end">
                        <v-col>
                          <v-switch
                            v-if="!DownloadState"
                            style="align-self: end; justify-self: end;"
                            v-model="DownloadMeta"
                            label="Download Petal Only"
                            :disabled="DownloadState"
                          ></v-switch>
                          <h2 v-if="DownloadState" style="font-family: 'Michroma', sans-serif;">
                            {{ Math.round((DownloadProgress / DownloadTotal) * 100) }} <a
                            style="font-family: 'Aldrich', sans-serif;">%</a></h2>
                        </v-col>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              dark
                              size="3rem"
                              v-bind="attrs"
                              v-on="on"
                            >
                              mdi-vpn
                            </v-icon>
                          </template>
                          <span>Bloom Secure Proxy</span>
                        </v-tooltip>
                      </v-row>
                      <v-select
                        v-if="!DownloadState"
                        v-model="selvalues"
                        :items="elvalues"
                        label="Select Images"
                        multiple
                      >
                        <template v-slot:prepend-item>
                          <v-list-item
                            ripple
                            @click="DownloadChange"
                          >
                            <v-list-item-action>
                              <v-icon :color="selvalues.length > 0 ? 'indigo darken-4' : ''">
                                {{ icon }}
                              </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                Select All
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>

                        <template v-slot:selection="{ item, index }">
                          <v-chip v-if="index === 0">
                            <span>{{ item }}</span>
                          </v-chip>
                          <span
                            v-if="index === 1"
                            class="grey--text caption"
                          >
          (+{{ selvalues.length - 1 }} other pictures.)
        </span>
                        </template>
                      </v-select>

                      <v-progress-linear
                        v-if="DownloadState"
                        :buffer-value="DownloadProgress+1"
                        color="success"
                        stream
                        :value="(DownloadProgress / DownloadTotal) * 100"
                      />
                    </v-container>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="DownloadState"
                        :loading="DownloadState"
                        color="primary"
                        text
                        @click="Download"
                      >
                        Download
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-col>
          </v-row>
          <div v-if="$vuetify.breakpoint.mdAndUp"
               style="padding-left: 47%; padding-top: 5rem; width: fit-content; height: fit-content">
            <div style=" width: 2rem; margin-top: 4rem; height: 0.1em;" class="mouse_wave"
                 @mouseenter="ScrollToImages()">
              <span class="scroll_arrows one"></span>
              <span class="scroll_arrows two"></span>
              <span class="scroll_arrows three"></span>
            </div>
          </div>
        </v-col>
      </div>


      <!-- Mobile Meta -->
      <v-col v-if="$vuetify.breakpoint.smAndDown"
             style="margin-top: 3.8rem; margin-left: 1rem; position: fixed; z-index: 0; ">
        <v-img width="164px"
               height="218px"
               max-height="218px"
               max-width="194px"
               style="border-radius: 5px; box-shadow:  0 0.9px 2.2px rgba(0, 0, 0, 0.051),  0 2.1px 5.3px rgba(0, 0, 0, 0.073),  0 3.9px 10px rgba(0, 0, 0, 0.09),  0 6.9px 17.9px rgba(0, 0, 0, 0.107),  0 13px 33.4px rgba(0, 0, 0, 0.129),  0 31px 80px rgba(0, 0, 0, 0.18);"
               :src="`https://proxy.ixil.cc/prox?image=`+info.thumb" />
        <div style="padding-top: 1rem;">
          <h2
            style="width: 18rem;  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-shadow: 0 0 3px #000000;">
            {{ info.name }}</h2>
          <v-row justify="start" class="pl-3">
            <v-icon>mdi-account-circle</v-icon>
            <h4
              style="padding-left: 0.5rem; width: 16rem;  overflow: hidden; text-overflow: ellipsis; text-shadow: 0 0 3px #000000;">
              {{ info.idol }}</h4>
          </v-row>
        </div>

        <div>
          <v-badge
            color="green"
            content="168+"
            icon="mdi-thumb-up"
            overlap
            offset-y="29px"
            offset-x="23px"
          >
            <v-col>
              <v-avatar class="paper"
                        :size=" $vuetify.breakpoint.smAndDown? `2.0rem`: `2.7rem`"
                        v-for="(item, i) in 5"
                        :key="i"
                        :style=" i > 0  ? 'margin-left: -9px; transform: rotateY(11deg)' : 'margin-left: 0;' "
                        style="box-shadow: -2px 1px 4px -3px #000000, -5px 2px 6px -2px rgba(0,0,0,0.74);">
                <v-img size="2.2rem"
                       src="https://cdn.discordapp.com/attachments/488810702190936075/761234831304556554/unknown.png" />
              </v-avatar>
            </v-col>
          </v-badge>

          <v-rating
            empty-icon="mdi-star-outline"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            hover
            v-model="marks"
            :length="5"
            size="24"
            :value="0"
            @input="AddFav"
          />
        </div>

        <!-- Download Dialog  -->
        <div style="align-self: center; padding-bottom: 2rem; padding-top: 1rem;">
          <v-dialog
            v-model="DownloadDialog"
            persistent
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                depressed
                color="rgba(255, 242, 0, 0.79)"
                v-bind="attrs"
                v-on="on"
              >
                DOWNLOAD
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline blue lighten-2">
                <v-row justify="space-between">
                  <h3>
                    Download
                  </h3>
                  <v-btn flat depressed color="rgba(0,0,0,0)" @click="DownloadDialog = !DownloadDialog">
                    <v-icon size="1.5rem">mdi-close-circle</v-icon>
                  </v-btn>
                </v-row>
              </v-card-title>

              <v-container fluid>
                <v-row style="width: 100%" justify-content="end" align-content="end">
                  <v-col>
                    <v-switch
                      v-if="!DownloadState"
                      style="align-self: end; justify-self: end;"
                      v-model="DownloadMeta"
                      label="Download Petal Only"
                      :disabled="DownloadState"
                    ></v-switch>
                    <h2 v-if="DownloadState" style="font-family: 'Michroma', sans-serif;">
                      {{ Math.round((DownloadProgress / DownloadTotal) * 100) }} <a
                      style="font-family: 'Aldrich', sans-serif;">%</a></h2>
                  </v-col>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        dark
                        size="3rem"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-vpn
                      </v-icon>
                    </template>
                    <span>Bloom Secure Proxy</span>
                  </v-tooltip>
                </v-row>
                <v-select
                  v-if="!DownloadState"
                  v-model="selvalues"
                  :items="elvalues"
                  label="Select Images"
                  multiple
                >
                  <template v-slot:prepend-item>
                    <v-list-item
                      ripple
                      @click="DownloadChange"
                    >
                      <v-list-item-action>
                        <v-icon :color="selvalues.length > 0 ? 'indigo darken-4' : ''">
                          {{ icon }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          Select All
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>

                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span
                      v-if="index === 1"
                      class="grey--text caption"
                    >
          (+{{ selvalues.length - 1 }} other pictures.)
        </span>
                  </template>
                </v-select>

                <v-progress-linear
                  v-if="DownloadState"
                  :buffer-value="DownloadProgress+1"
                  color="success"
                  stream
                  :value="(DownloadProgress / DownloadTotal) * 100"
                />
              </v-container>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="DownloadState"
                  :loading="DownloadState"
                  color="primary"
                  text
                  @click="Download"
                >
                  Download
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div
          style="transform: rotateZ(180deg) translateY(-.5rem) translateX(-10rem); width: fit-content; height: fit-content">
          <div style=" width: 2rem; margin-top: 4rem; height: 0.1em;" class="mouse_wave">
            <span class="scroll_arrows one"></span>
            <span class="scroll_arrows two"></span>
            <span class="scroll_arrows three"></span>
          </div>
        </div>
      </v-col>
    </div>

    <!-- Body for PC/Mobile  16:9 -->
    <div v-if="!Check43Ratio()" id="overlay" ref="overlay" class="overlay fade">
      <v-container style="width: 100vw;">
        <v-banner
          single-line
          v-if="info.pollen && PollenNotify"
        >
          <v-icon
            slot="icon"
            color="warning"
            size="36"
          >
            mdi-image-filter-vintage
          </v-icon>
          {{ $vuetify.breakpoint.smAndDown ? '' : 'Pollen - A.I 4X Images Available' }}

          <template v-slot:actions>
            <v-btn
              color="blue darken-4"
              text
              style="font-size: 1rem; font-weight: 500;"
              @click="GetPollen"
            >
              Access Pollen Service
            </v-btn>
          </template>
        </v-banner>

        <v-banner
          single-line
          v-if="!info.pollen && PollenNotify"
        >
          <v-icon
            slot="icon"
            color="error"
            size="36"
          >
            mdi-exclamation-thick
          </v-icon>
          {{ $vuetify.breakpoint.smAndDown ? '' : 'Pollen - No AI 4X Images Available' }}

          <template v-slot:actions>
            <v-btn
              color="blue darken-4"
              text
              style="font-size: 1rem; font-weight: 500;"
              @click="RequestPollen"
            >
              Request
            </v-btn>
          </template>
        </v-banner>
      </v-container>
      <div class="scrollbox-fm" />
      <div class="disable-scrollbars"
           style="margin-top: 14rem; padding-top: 1rem; overflow: scroll; height: inherit;">
        <v-container style="padding-bottom: 19rem; width: 100vw;">
          <masonry
            :cols="{default: 4, 1000: 3, 700: 2, 400: 2}"
            :gutter="{default: '30px', 700: '15px'}"
          >
            <v-img v-if="$vuetify.breakpoint.mdAndUp && !dist" v-for="(item, index) in items" :key="index"
                   @click="show(index)" width="17rem" max-height="20rem;"
                   style="border-radius: 5px; margin-left: 1rem; margin-right: 1rem; margin-bottom: 2rem;"
                   lazy-src="https://cdn.discordapp.com/attachments/488810702190936075/768945580038160394/unknown.png"
                   :src="`https://proxy.ixil.cc/ren?method=cover&width=200&height=300&image=`+item.data"
                   @error="dist = true">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="red"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>


            <v-img v-if="$vuetify.breakpoint.smAndDown && !dist" v-for="(item, index) in items" :key="index"
                   @click="show(index)" width="10rem" max-height="20rem;"
                   style="border-radius: 5px; margin-left: 1rem; margin-right: 1rem; margin-bottom: 2rem;"
                   lazy-src="https://cdn.discordapp.com/attachments/488810702190936075/768945580038160394/unknown.png"
                   :src="`https://proxy.ixil.cc/ren?method=cover&width=200&height=300&image=`+item.data"
                   @error="dist = true">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="red"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>


            <v-img v-if="$vuetify.breakpoint.mdAndUp && dist" v-for="(item, index) in items" :key="index"
                   @click="show(index)" width="17rem" max-height="20rem;"
                   style="border-radius: 5px; margin-left: 1rem; margin-right: 1rem; margin-bottom: 2rem;"
                   lazy-src="https://cdn.discordapp.com/attachments/488810702190936075/768945580038160394/unknown.png"
                   :src="`https://proxy.ixil.cc/ren?method=cover&width=200&height=300&image=`+item.data">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="red"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>


            <v-img v-if="$vuetify.breakpoint.smAndDown && dist" v-for="(item, index) in items" :key="index"
                   @click="show(index)" width="10rem" max-height="20rem;"
                   style="border-radius: 5px; margin-left: 1rem; margin-right: 1rem; margin-bottom: 2rem;"
                   lazy-src="https://cdn.discordapp.com/attachments/488810702190936075/768945580038160394/unknown.png"
                   :src="`https://proxy.ixil.cc/ren?method=cover&width=200&height=300&image=`+item.data">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="red"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </masonry>
        </v-container>
      </div>
    </div>
    <!-- END 16:9 Page -->


    <!-- 4:3 Page -->
    <div v-if="Check43Ratio()" class="bottom disable-scrollbars"
         style="background-size: cover; background-position: center center; -webkit-transition: background-image 3s ease-in-out; transition: 3s;  background-blend-mode: darken;"
         :style="`background-image: url(https://proxy.ixil.cc/prox?image=${BgImage});`">

      <v-row class="bottom" justify="space-around"
             style=" padding-left: 6rem; padding-top: 20rem; z-index: -1; width: 100vw; overflow: hidden">
        <v-col style="padding-right: 0; margin-right: 0;">
          <v-row justify="space-between" style="width: 40rem;" no-gutters>
            <v-img width="264px"
                   height="318px"
                   max-height="318px"
                   max-width="264px"
                   style="border-radius: 5px; box-shadow:  0 0.9px 2.2px rgba(0, 0, 0, 0.051),  0 2.1px 5.3px rgba(0, 0, 0, 0.073),  0 3.9px 10px rgba(0, 0, 0, 0.09),  0 6.9px 17.9px rgba(0, 0, 0, 0.107),  0 13px 33.4px rgba(0, 0, 0, 0.129),  0 31px 80px rgba(0, 0, 0, 0.18);"
                   :src="`https://proxy.ixil.cc/prox?image=`+info.thumb" />
            <div>
              <v-col>
                <h2
                  style="width: 18rem;  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-shadow: 0 0 3px #000000;">
                  {{ info.name }}</h2>
                <v-row justify="start" class="pl-3">
                  <v-icon>mdi-account-circle</v-icon>
                  <h4
                    style="padding-left: 0.5rem; width: 16rem;  overflow: hidden; text-overflow: ellipsis; text-shadow: 0 0 3px #000000;">
                    {{ info.idol }}</h4>
                </v-row>
                <div
                  style="transform:  rotateZ(90deg) translateY(-36rem); padding-top: 25rem; width: fit-content; height: fit-content">
                  <div style=" width: 2rem; margin-top: 4rem; height: 0.1em;" class="mouse_wave">
                    <span class="scroll_arrows one"></span>
                    <span class="scroll_arrows two"></span>
                    <span class="scroll_arrows three"></span>
                  </div>
                </div>
              </v-col>
            </div>
          </v-row>
          <div style="transform: translateY(-10rem)">
            <v-rating
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              hover
              v-model="marks"
              :length="5"
              size="24"
              :value="0"
              @input="AddFav"
            />
            <v-badge
              class="pt-5 pb-5"
              color="green"
              content="168+"
              icon="mdi-thumb-up"
              overlap
              offset-y="47px"
              offset-x="29px"
            >
              <v-col>
                <v-avatar class="paper"
                          :size=" $vuetify.breakpoint.smAndDown? `2.0rem`: `2.7rem`"
                          v-for="(item, i) in 5"
                          :key="i"
                          :style=" i > 0  ? 'margin-left: -9px; transform: rotateY(11deg)' : 'margin-left: 0;' "
                          style="box-shadow: -2px 1px 4px -3px #000000, -5px 2px 6px -2px rgba(0,0,0,0.74);">
                  <v-img size="2.2rem"
                         src="https://cdn.discordapp.com/attachments/488810702190936075/761234831304556554/unknown.png" />
                </v-avatar>
              </v-col>
            </v-badge>

            <div style="align-self: center; padding-bottom: 2rem; padding-top: 1rem;">
              <v-dialog
                v-model="DownloadDialog"
                persistent
                width="500"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    dark
                    depressed
                    color="rgba(255, 242, 0, 0.79)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    DOWNLOAD
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline blue lighten-2">
                    <v-row justify="space-between">
                      <h3>
                        Download
                      </h3>
                      <v-btn flat depressed color="rgba(0,0,0,0)" @click="DownloadDialog = !DownloadDialog">
                        <v-icon size="1.5rem">mdi-close-circle</v-icon>
                      </v-btn>
                    </v-row>
                  </v-card-title>

                  <v-container fluid>
                    <v-row style="width: 100%" justify-content="end" align-content="end">
                      <v-col>
                        <v-switch
                          v-if="!DownloadState"
                          style="align-self: end; justify-self: end;"
                          v-model="DownloadMeta"
                          label="Download Petal Only"
                          :disabled="DownloadState"
                        ></v-switch>
                        <h2 v-if="DownloadState" style="font-family: 'Michroma', sans-serif;">
                          {{ Math.round((DownloadProgress / DownloadTotal) * 100) }} <a
                          style="font-family: 'Aldrich', sans-serif;">%</a></h2>
                      </v-col>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            dark
                            size="3rem"
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-vpn
                          </v-icon>
                        </template>
                        <span>Bloom Secure Proxy</span>
                      </v-tooltip>
                    </v-row>
                    <v-select
                      v-if="!DownloadState"
                      v-model="selvalues"
                      :items="elvalues"
                      label="Select Images"
                      multiple
                    >
                      <template v-slot:prepend-item>
                        <v-list-item
                          ripple
                          @click="DownloadChange"
                        >
                          <v-list-item-action>
                            <v-icon :color="selvalues.length > 0 ? 'indigo darken-4' : ''">
                              {{ icon }}
                            </v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>
                              Select All
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
                      </template>

                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index === 0">
                          <span>{{ item }}</span>
                        </v-chip>
                        <span
                          v-if="index === 1"
                          class="grey--text caption"
                        >
          (+{{ selvalues.length - 1 }} other pictures.)
        </span>
                      </template>
                    </v-select>

                    <v-progress-linear
                      v-if="DownloadState"
                      :buffer-value="DownloadProgress+1"
                      color="success"
                      stream
                      :value="(DownloadProgress / DownloadTotal) * 100"
                    />
                  </v-container>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="DownloadState"
                      :loading="DownloadState"
                      color="primary"
                      text
                      @click="Download"
                    >
                      Download
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-col>
      </v-row>


      <!-- 4:3 Body -->
      <div class="overlay-daig fade-diag" style="">
        <div style="padding-left: 12rem; padding-right: 2rem; padding-top: 5rem; height: fit-content;">
          <v-col style="height: fit-content;">
            <masonry
              :cols="{default: 2}"
              :gutter="{default: '30px', 700: '15px'}"
            >
              <v-img v-if="$vuetify.breakpoint.mdAndUp && !dist" v-for="(item, index) in items" :key="index"
                     @click="show(index)"
                     width="30rem" max-height="18rem;"
                     style="border-radius: 5px; margin-left: 1rem; margin-right: 1rem; margin-bottom: 2rem;"
                     lazy-src="https://cdn.discordapp.com/attachments/488810702190936075/768945580038160394/unknown.png"
                     :src="`https://proxy.ixil.cc/ren?method=cover&width=500&height=400&image=`+item.data"
                     @error="dist = true">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="red"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>


              <v-img v-if="$vuetify.breakpoint.smAndDown && !dist" v-for="(item, index) in items" :key="index"
                     @click="show(index)" width="10rem" max-height="16rem;"
                     style="border-radius: 5px; margin-left: 1rem; margin-right: 1rem; margin-bottom: 2rem;"
                     lazy-src="https://cdn.discordapp.com/attachments/488810702190936075/768945580038160394/unknown.png"
                     :src="`https://proxy.ixil.cc/ren?method=cover&width=300&height=200&image=`+item.data"
                     @error="dist = true">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="red"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>


              <v-img v-if="$vuetify.breakpoint.mdAndUp && !dist" v-for="(item, index) in items" :key="index"
                     @click="show(index)"
                     width="30rem" max-height="18rem;"
                     style="border-radius: 5px; margin-left: 1rem; margin-right: 1rem; margin-bottom: 2rem;"
                     lazy-src="https://cdn.discordapp.com/attachments/488810702190936075/768945580038160394/unknown.png"
                     :src="`https://proxy.ixil.cc/ren?method=cover&width=500&height=400&image=`+item.data">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="red"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>


              <v-img v-if="$vuetify.breakpoint.smAndDown && !dist" v-for="(item, index) in items" :key="index"
                     @click="show(index)" width="10rem" max-height="16rem;"
                     style="border-radius: 5px; margin-left: 1rem; margin-right: 1rem; margin-bottom: 2rem;"
                     lazy-src="https://cdn.discordapp.com/attachments/488810702190936075/768945580038160394/unknown.png"
                     :src="`https://proxy.ixil.cc/ren?method=cover&width=300&height=200&image=`+item.data">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="red"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </masonry>
          </v-col>
        </div>
      </div>
    </div>

    <!-- Image viewer -->
    <img-viewer ref="viewer" />

    <!-- Preload Background image -->
    <div style="width: 0; height: 0;"
         :style="`background-image: url(https://proxy.ixil.cc/prox?image=${NBGImage});`"></div>
  </div>
</template>

<script>
//import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import axios from 'axios'
import ImgViewer from '../../components/images/ImgViewer'
import { mapGetters, mapMutations, mapState } from 'vuex'

let ERROR_ALLOWED = 0.05
let STANDARD_ASPECT_RATIOS = [
  [1, '1:1'],
  [4 / 3, '4:3'],
  [5 / 4, '5:4'],
  [3 / 2, '3:2'],
  [16 / 10, '16:10'],
  [16 / 9, '16:9'],
  [21 / 9, '21:9'],
  [32 / 9, '32:9']
]
let RATIOS = STANDARD_ASPECT_RATIOS.map(function(tpl) {
  return tpl[0]
}).sort()
let LOOKUP = Object()


export default {
  name: 'album',
  components: { ImgViewer },
  data() {
    return {
      BgImage: '',
      NBGImage: '',
      items: [],
      PollenNotify: true,
      DownloadDialog: false,
      DSnackbar: false,
      marks: 0,
      Alerttext: '',
      elvalues: [],
      selvalues: [],
      DownloadMeta: false,
      dist: false,
      el: null
    }
  },

  asyncData({ params }) {
    return axios.get(`https://api.ixil.cc/bloom/hina/payload?id=${params.id}`)
      .then((res) => {
        return { info: res.data }
      })
  },

  computed: {
    ...mapGetters({
      DownloadState: 'download/GET_DOWNLOAD_STATE',
      DownloadProgress: 'download/GET_DOWNLOAD_PROGRESS',
      DownloadTotal: 'download/GET_DOWNLOAD_TOTAL',
      Fav: 'history/GET_FAV_DATA'
    }),

    ...mapMutations({
      setSnack: 'snackbar/SET_SNACK_STATE'
    }),

    SelectedAll() {
      return this.selvalues.length === this.elvalues.length
    },
    SelectedFew() {
      return this.selvalues.length > 0 && !this.likesAllFruit
    },
    icon() {
      if (this.SelectedAll) return 'mdi-close-box'
      if (this.SelectedFew) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },

  timers: {
    ChangeBg: { time: 17000, autostart: true, repeat: true }
  },

  watch: {
    Fav(newval, old) {
      this.marks = newval
    }
  },

  beforeMount() {
    this.BgImage = this.info.gliphs[1]
  },
  mounted() {
    this.$store.dispatch('history/ADD_HISTORY', { id: this.info.id })
    this.items = Array.from({ length: this.info.gliphs.length }, (_, index) => ({
      data: this.info.gliphs[index],
      id: index
    }))
    this.elvalues = Array.from({ length: this.info.gliphs.length }, (_, index) => (index + 1))
    this.selvalues = this.elvalues

    for (let i = 0; i < STANDARD_ASPECT_RATIOS.length; i++) {
      LOOKUP[STANDARD_ASPECT_RATIOS[i][0]] = STANDARD_ASPECT_RATIOS[i][1]
    }

    this.el = this.$el.getElementsByClassName('overlay')[0]

    //preload next BG
    this.NBGImage = this.info.gliphs[Math.floor((Math.random() * this.info.gliphs.length) + 1)]
  },

  methods: {
    ChangeBg() {
      //Set Preloaded Image
      this.BgImage = this.NBGImage
      //Preload Image
      this.NBGImage = this.info.gliphs[Math.floor((Math.random() * this.info.gliphs.length) + 1)]
    },

    AddFav() {
      if (this.marks > 0) this.$store.dispatch('history/ADD_FAV', { id: this.info.id, marks: this.marks })
    },

    RequestPollen() {
      axios
        .get('https://api.ixil.cc/bloom/hina/pollen/request?id=' + this.info.id)
        .then(response => {
          this.$store.dispatch('snackbar/POP_SNACKBAR', 'Requested A.I 4X Image processing, Come back in 24 Hours.')
        }).catch(function(error) {
        this.$store.dispatch('snackbar/POP_SNACKBAR', 'Failed to Request A.I 4X Images, try later.')
      })
    },
    GetPollen() {
      if (this.$auth.loggedIn) {
        axios
          .get('https://api.ixil.cc/bloom/hina/pollen?id=' + this.info.id, {
            headers: {
              Authorization: this.$auth.getToken('auth0') //the token is a variable which holds the token
            }
          })
          .then(response => {
            this.items = Array.from({ length: response.data.DMZs.length }, (_, index) => ({
              data: response.data.DMZs[index],
              id: index
            }))
            this.info.gliphs = response.data.DMZs
            this.$store.dispatch('snackbar/POP_SNACKBAR', 'Welcome To Bloom Pollen, A.I 4X Image Service')
          })
          .catch(function(error) {
            this.$store.dispatch('snackbar/POP_SNACKBAR', 'Failed To Access Bloom Pollen Image Service')
            this.PollenNotify = false
          })
          .finally(() => {
            this.PollenNotify = false
          })
      } else this.$store.dispatch('snackbar/POP_SNACKBAR', 'Login to access Bloom Pollen Image Service')
    },
    Download() {
      if (this.DownloadMeta) {
        this.$store.dispatch('download/DOWNLOAD_META', { en: this.info, indexes: this.selvalues })
        this.DownloadDialog = false
        this.$store.dispatch('snackbar/POP_SNACKBAR', 'Downloading Meta File.')
      } else {
        this.$store.dispatch('download/DOWNLOAD', { en: this.info, indexes: this.selvalues })
        this.DownloadDialog = false
        this.$store.dispatch('snackbar/POP_SNACKBAR', 'Downloading Zip.')
      }
    },

    DownloadChange() {
      this.$nextTick(() => {
        if (this.SelectedAll) {
          this.selvalues = []
        } else {
          this.selvalues = this.elvalues.slice()
        }
      })
    },

    snackTime: function(snack) {
      this.setSnack(snack)
    },

    ScrollToImages() {
      if (this.el) {
        this.el.scrollIntoView({
          behavior: 'smooth'
        })
      }
    },

    show(index) {
      this.$refs.viewer.show(
        this.items,
        index
      )
    },

    cellSizeAndPositionGetter(item, index) {
      // compute size and position
      return {
        width: 250,
        height: 150,
        x: (index % 2) * 350,
        y: parseInt(index / 2) * 190
      }
    },

    Check43Ratio() {
      let ratio = this.estimateAspectRatio(this.$vuetify.breakpoint.width, this.$vuetify.breakpoint.height)
      return ratio === '4:3' || ratio === '4:3:1'
    },

    /*
       Find the closest value in a sorted array
    */
    findClosest(arrSorted, value) {
      let closest = arrSorted[0]
      let closestDiff = Math.abs(arrSorted[0] - value)
      for (let i = 1; i < arrSorted.length; i++) {
        let diff = Math.abs(arrSorted[i] - value)
        if (diff < closestDiff) {
          closestDiff = diff
          closest = arrSorted[i]
        } else {
          return closest
        }
      }
      return arrSorted[arrSorted.length - 1]
    },

    /*
    Estimate the aspect ratio based on width x height (order doesn't matter)
    */
    estimateAspectRatio(dim1, dim2) {
      let ratio = Math.max(dim1, dim2) / Math.min(dim1, dim2)
      if (ratio in LOOKUP) {
        return LOOKUP[ratio]
      }

      // Look by approximation
      let closest = this.findClosest(RATIOS, ratio)
      if (Math.abs(closest - ratio) <= ERROR_ALLOWED) {
        return LOOKUP[closest]
      }

      return Math.round(ratio * 100) / 100 + ':1'
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600&family=Aldrich&family=Michroma&display=swap');

.fade {
  background: -webkit-linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 80%, rgba(18, 18, 18, 1) 90%, rgba(18, 18, 18, 0.9) 94%, rgba(18, 18, 18, 0.8) 95%, rgba(18, 18, 18, 0.7449930313922444) 96%, rgba(18, 18, 18, 0.001) 100%);
  background-image: -o-linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 80%, rgba(18, 18, 18, 1) 90%, rgba(18, 18, 18, 0.9) 94%, rgba(18, 18, 18, 0.8) 95%, rgba(18, 18, 18, 0.7449930313922444) 96%, rgba(18, 18, 18, 0.001) 100%);
  background-image: linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 80%, rgba(18, 18, 18, 1) 90%, rgba(18, 18, 18, 0.9) 94%, rgba(18, 18, 18, 0.8) 95%, rgba(18, 18, 18, 0.7449930313922444) 96%, rgba(18, 18, 18, 0.001) 100%);
  background-image: -moz-linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 80%, rgba(18, 18, 18, 1) 90%, rgba(18, 18, 18, 0.9) 94%, rgba(18, 18, 18, 0.8) 95%, rgba(18, 18, 18, 0.7449930313922444) 96%, rgba(18, 18, 18, 0.001) 100%);
}

.fade-diag {
  background: -webkit-linear-gradient(270deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 80%, rgba(18, 18, 18, 0.9475140397956058) 90%, rgba(18, 18, 18, 0.8858893899356618) 94%, rgba(18, 18, 18, 0.8038445720084909) 95%, rgba(18, 18, 18, 0.0449930313922444) 98%, rgba(18, 18, 18, 0.001) 100%);
  background-image: -o-linear-gradient(270deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 80%, rgba(18, 18, 18, 0.9475140397956058) 90%, rgba(18, 18, 18, 0.8858893899356618) 94%, rgba(18, 18, 18, 0.8038445720084909) 95%, rgba(18, 18, 18, 0.0449930313922444) 98%, rgba(18, 18, 18, 0.001) 100%);
  background-image: linear-gradient(270deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 80%, rgba(18, 18, 18, 0.9475140397956058) 90%, rgba(18, 18, 18, 0.8858893899356618) 94%, rgba(18, 18, 18, 0.8038445720084909) 95%, rgba(18, 18, 18, 0.0449930313922444) 98%, rgba(18, 18, 18, 0.001) 100%);
  background-image: -moz-linear-gradient(270deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 80%, rgba(18, 18, 18, 0.9475140397956058) 90%, rgba(18, 18, 18, 0.8858893899356618) 94%, rgba(18, 18, 18, 0.8038445720084909) 95%, rgba(18, 18, 18, 0.0449930313922444) 98%, rgba(18, 18, 18, 0.001) 100%);
}

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.disable-scrollbars::-webkit-scrollbar {
  width: 0;
  background: transparent; /* Chrome/Safari/Webkit */
}

.disable-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.Album-Parent {
  overflow: paged-y-controls;
  height: 100vh;
}

.bottom {
  position: fixed;
  overflow: auto;
  overscroll-behavior: auto;
  overflow-scrolling: touch;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
}

.meta {
  margin-top: 4rem;
  margin-left: 0rem;
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.overlay {
  position: relative;
  top: 37rem;
//transform: translateY(40rem); margin-bottom: 0; width: fit-content; //padding: 0px; bottom: 0; height: 120rem; overflow: hidden;
  min-height: 80vh;
}

.overlay-daig {
  margin-left: 84vw;
  margin-bottom: 0;
  width: 99%;
  height: fit-content;
  min-height: 100vh;
}


.mouse_wave {
  display: block;
  margin: 0 auto;
  width: 24px;
  height: 100px;
//background: blue; margin-top: 125px;
}

.scroll_arrows {
  display: block;
  width: 5px;
  height: 5px;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);

  border-right: 2px solid white;
  border-bottom: 2px solid white;
  margin: 0 0 3px 4px;

  width: 16px;
  height: 16px;
}

.one {
  margin-top: 1px;
}

.one, .two, .three {
  -webkit-animation: mouse-wave 1s infinite;
  -moz-animation: mouse-wave 1s infinite;
}

.one {
  -webkit-animation-delay: .1s;
  -moz-animation-delay: .1s;
  -webkit-animation-direction: alternate;
}

.two {
  -webkit-animation-delay: .2s;
  -moz-animation-delay: .2s;
  -webkit-animation-direction: alternate;
  margin-top: -6px;
}

.three {
  -webkit-animation-delay: .3s;
  -moz-animation-delay: .3s;
  -webkit-animation-direction: alternate;
  margin-top: -6px;
}


@-webkit-keyframes mouse-wave {

  0% {
    opacity: 0;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes mouse-wave {

  0% {
    opacity: 0;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes mouse-wave {

  0% {
    opacity: 0;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes mouse-wave {

  0% {
    opacity: 0;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}

.scrollbox-fm {
  position: relative;
  z-index: 1;
  width: 100vw;
  height: 2rem;
  top: 15rem;
  filter: opacity(1) blur(0.4%);
  background: linear-gradient(180deg, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 1) 45%, rgba(18, 18, 18, 0.9475140397956058) 71%, rgba(18, 18, 18, 0.8858893899356618) 86%, rgba(18, 18, 18, 0.7738445720084909) 93%, rgba(18, 18, 18, 0.6449930313922444) 98%, rgba(18, 18, 18, 0.1065743172) 100%);
}
</style>
