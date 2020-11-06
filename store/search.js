const axios = require('axios')


export const state = () => ({
  QueryTerm: '',
  SelSource: ['ALL'],
  SelIdol: [],
  SelPage: 1,
  Result: [],
  Page: 0,
  Pagination: 0,
  Idols: [],
  Sources: [],
  Domains: [],
  ResultAny: false,
  Bags: [],
  Loading: false
})

export const mutations = {
  SET_SOURCES_DATA(state, Data) {
    state.Sources.push(Data)
  },
  SET_IDOLS_DATA(state, Data) {
    state.Idols = Data
    state.Idols.push('ALL')
  },
  SET_DOMAIN_DATA(state, Data) {
    state.Domains.push(Data)
  },
  SET_QUERY_DATA(state, Data) {
    state.QueryTerm = Data
  },
  SET_SELECTED_SOURCES_DATA(state, Data) {
    state.SelSource = Data
  },
  SET_SELECTED_IDOL_DATA(state, Data) {
    state.SelIdol = Data
  },
  SET_SELECTED_PAGE_DATA(state, Data) {
    state.SelPage = Data
  },
  SET_SELECTED_BAGS_DATA(state, Data) {
    state.Bags = Data
  },
  SET_RESULT_DATA(state, post) {
    if (post.data.length > 0) {
      state.ResultAny = true
      state.Result = post.data
      state.Pagination = post.maxres
      state.Page = post.maxctr
      state.Bags = post.word_bag
    } else state.ResultAny = false
  },
  SET_RESULT_STATUS(state, Data) {
    state.Domains.push(Data)
  },
  SET_SEARCH_STATUS(state, Data) {
    state.Loading = Data
  },
  SAVE_HISTORY_DATA(state) {
    localStorage.setItem('recent_views', JSON.stringify(state.loadedPosts))
  }
}

export const actions = {
  LOAD_SOURCES_DATA(vuexContext) {
    vuexContext.commit('SET_DOMAIN_DATA',
      'ALL'
    )

    axios.get('https://app.ixil.cc/api/bloom/hina/sources')
      .then(function(response) {
        vuexContext.commit('SET_SOURCES_DATA',
          'ALL'
        )
        response.data.forEach(function(item) {
          let str = item
          if (str.includes('.')) {
            let st = str.replace(/.[a-zA-Z]*$/, '')

            if (st.includes('.')) {
              vuexContext.commit('SET_SOURCES_DATA',
                st.replace(/^[0-9a-zA-Z]*./, '').toUpperCase()
              )
            } else {
              vuexContext.commit('SET_SOURCES_DATA',
                st.toUpperCase()
              )
            }

          } else {
            vuexContext.commit('SET_SOURCES_DATA',
              str
            )
          }

          vuexContext.commit('SET_DOMAIN_DATA',
            item
          )
        })
      })

    axios.get('https://app.ixil.cc/api/bloom/hina/idols')
      .then(function(response) {
          vuexContext.commit('SET_IDOLS_DATA',
            response.data
          )
        }
      )
  },


  LOAD_SEARCH_DATA(vuexContext, data) {
    vuexContext.commit('SET_SEARCH_STATUS',
      false
    )
    vuexContext.commit('SET_QUERY_DATA',
      data.term
    )
    vuexContext.commit('SET_SELECTED_PAGE_DATA',
      data.page
    )


    if (data.term !== '') data.term = `"${data.term}"`
    if (data.source.includes('ALL') && data.idol.length === 0 && data.term !== '') {
      axios.get(`https://api.ixil.cc/bloom/hina/search?query=${data.term}&op=30&page=${data.page}`)
        .then(function(response) {
          vuexContext.commit('SET_RESULT_DATA',
            response.data
          )
        })
    } else if (!data.source.includes('ALL') && data.idol.length > 0) {
      vuexContext.commit('SET_SELECTED_SOURCES_DATA',
        data.source
      )
      vuexContext.commit('SET_SELECTED_IDOL_DATA',
        data.idol
      )
      console.log('searching All')
      axios.get(`https://api.ixil.cc/bloom/hina/search?query=${data.term}&op=30&page=${data.page}&source=${data.source.join(',')}&idol=${data.idol.join(',')}`)
        .then(function(response) {
          vuexContext.commit('SET_RESULT_DATA',
            response.data
          )
        })
    } else if (!data.source.includes('ALL')) {
      vuexContext.commit('SET_SELECTED_SOURCES_DATA',
        data.source
      )
      axios.get(`https://api.ixil.cc/bloom/hina/search?query=${data.term}&op=30&page=${data.page}&source=${data.source.join(',')}`)
        .then(function(response) {
          vuexContext.commit('SET_RESULT_DATA',
            response.data
          )
        })
    } else if (data.idol.length > 0) {
      vuexContext.commit('SET_SELECTED_IDOL_DATA',
        data.idol
      )
      axios.get(`https://api.ixil.cc/bloom/hina/search?query=${data.term}&op=30&page=${data.page}&idol=${data.idol.join(',')}`)
        .then(function(response) {
          vuexContext.commit('SET_RESULT_DATA',
            response.data
          )
        })
    } else {
      axios.get(`https://api.ixil.cc/bloom/hina?op=30&page=${data.page}`)
        .then(function(response) {
          vuexContext.commit('SET_RESULT_DATA',
            response.data
          )
        })
    }

    vuexContext.commit('SET_SEARCH_STATUS',
      true
    )
  }
}

export const getters = {
  GET_SOURCES_DATA(state) {
    return state.Sources
  },
  GET_SEARCH_STATE(state) {
    return state.Loading
  },
  GET_SEARCH_RESULT_STATE(state) {
    return state.ResultAny
  },
  GET_SEARCH_DATA(state) {
    return state.Result
  },
  GET_IDOLS_DATA(state) {
    return state.Idols
  },
  GET_DOMAINS_DATA(state) {
    return state.Domains
  },
  GET_PAGE_DATA(state) {
    return state.Pagination
  },
  GET_BAGS_DATA(state) {
    return state.Bags
  },


  GET_SELECTED_PAGE_DATA(state) {
    return state.SelPage
  },
  GET_SELECTED_IDOL_DATA(state) {
    return state.SelIdol
  },
  GET_SELECTED_SOURCE_DATA(state) {
    return state.SelSource
  },
  GET_SELECTED_TERM_DATA(state) {
    return state.QueryTerm
  }
}
