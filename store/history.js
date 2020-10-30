const axios = require('axios')


export const state = () => ({
  loadedPosts: [],
  marks: 0
})

export const mutations = {
  SET_HISTORY_DATA(state, posts) {
    state.loadedPosts = posts
  },

  SET_FAV_DATA(state, data) {
    state.marks = data
  },

  ADD_HISTORY_DATA(state, post) {
    state.loadedPosts = [post].concat(state.loadedPosts)
    if (state.loadedPosts.length > 50) {
      state.loadedPosts = state.loadedPosts.splice(state.loadedPosts.length - 1, 1)
    }
  },

  SAVE_HISTORY_DATA(state) {
    localStorage.setItem('recent_views', JSON.stringify(state.loadedPosts))
  }
}

export const actions = {

  LOAD_HISTORY(vuexContext) {
    if (this.$auth.loggedIn) {
      axios.get('https://api.ixil.cc/bloom/strat/user/get/history?email=' + this.$auth.user.email.trim(), {
        headers: {
          Authorization: this.$auth.getToken('auth0') //the token is a variable which holds the token
        }

      })
        .then(response => {
          vuexContext.commit('SET_HISTORY_DATA', response.data)
        }).catch(function(error) {
        console.log(error)
      })
    }
  },

  ADD_HISTORY(vuexContext, post) {
    if (this.$auth.loggedIn) {
      axios.get(`https://api.ixil.cc/bloom/strat/user/get/fav?id=${post.id}&email=${this.$auth.user.email.trim()}`, {
        headers: {
          Authorization: this.$auth.getToken('auth0') //the token is a variable which holds the token
        }
      })
        .then(function(response) {
          console.log(response.data)
          vuexContext.commit('SET_FAV_DATA', response.data.rating)
        })

      axios.get(`https://api.ixil.cc/bloom/strat/user/add?id=${post.id}&history=true&email=${this.$auth.user.email.trim()}`, {
        headers: {
          Authorization: this.$auth.getToken('auth0') //the token is a variable which holds the token
        }

      })
        .then(function(response) {
          vuexContext.dispatch('LOAD_HISTORY')
        })
    }
  },

  GET_FAV(vuexContext, post) {
    console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')

  },

  ADD_FAV(vuexContext, post) {
    console.log('CALLED ADD FAv')
    if (this.$auth.loggedIn) {
      axios.get(`https://api.ixil.cc/bloom/strat/user/add?id=${post.id}&marks=${post.marks}&picture=${this.$auth.user.picture}&email=${this.$auth.user.email.trim()}`, {
        headers: {
          Authorization: this.$auth.getToken('auth0') //the token is a variable which holds the token
        }

      })
        .then(function(response) {
        })
    }
  }
}

export const getters = {
  GET_HISTORY_DATA(state) {
    return state.loadedPosts
  },

  GET_FAV_DATA(state) {
    return state.marks
  }
}
