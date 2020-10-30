export const state = () => ({
  snack: ''
})

export const mutations = {
  SET_SNACK_STATE(state, snack) {
    state.snack = snack
  }
}

export const actions = {
  POP_SNACKBAR(vuexContext, data) {
    vuexContext.commit('SET_SNACK_STATE', data)
  }
}

export const getters = {
  GET_SNACK_STATE(state) {
    return state.snack
  }
}
