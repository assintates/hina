const axios = require('axios')


export const state = () => ({
  loadedPosts: []
})

export const mutations = {
  SET_HISTORY_DATA(state, posts) {
    state.loadedPosts = posts
  },
  ADD_HISTORY_DATA(state, post) {
    state.loadedPosts.push(post)
  },

  SAVE_HISTORY_DATA(state) {
    localStorage.setItem('recent_views', JSON.stringify(state.loadedPosts))
  }
}

export const actions = {

  LOAD_HISTORY(vuexContext) {
    if (localStorage.getItem('recent_views')) {
      vuexContext.commit('SET_HISTORY_DATA', JSON.parse(localStorage.getItem('recent_views')))
    } else {
      axios.get('https://api.ixil.cc/bloom/hina?op=50&page=1&source=www.jkforum.net')
        .then(function(response) {
          response.data.data.forEach(function(item) {
            axios.get('https://api.ixil.cc/bloom/strat/color?image=' + item.thumb)
              .then(function(res) {
                vuexContext.commit('ADD_HISTORY_DATA', {
                  id: item.id,
                  name: item.name,
                  idol: item.idol,
                  thumb: item.thumb,
                  source: item.source,
                  color: res.data
                })
              })
          })
        })
      vuexContext.commit('SAVE_HISTORY_DATA')
    }
  },

  ADD_HISTORY(vuexContext, post) {
    axios.get('https://api.ixil.cc/bloom/strat/color?image=' + post.thumb)
      .then(function(response) {
        vuexContext.commit('ADD_HISTORY_DATA', {
          id: post.id,
          name: post.name,
          idol: post.idol,
          thumb: post.thumb,
          source: post.source,
          color: response.data
        })
      })
    vuexContext.commit('SAVE_HISTORY_DATA')
  }
}

export const getters = {
  GET_HISTORY_DATA(state) {
    return state.loadedPosts
  }
}
