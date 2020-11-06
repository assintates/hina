import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const axios = require('axios')


export const state = () => ({
  TaskState: false,
  total: 0,
  progressd: 0
})

export const mutations = {
  SET_DOWNLOAD_PROGRESS(state, data) {
    state.progressd = data
  },
  SET_DOWNLOAD_TOTAL(state, data) {
    state.total = data
  },
  SET_DOWNLOAD_STATE(state, data) {
    state.TaskState = data
  }
}

export const actions = {

  async DOWNLOAD(vuexContext, data) {
    if (data.raw) {
      if (data.data.length > 0) {
        let errors = []
        vuexContext.commit('SET_DOWNLOAD_STATE', true)
        vuexContext.commit('SET_DOWNLOAD_TOTAL', data.data.length)
        let zip = new JSZip()
        zip.file('bloom.petal', JSON.stringify({ data: data, errors: errors }, null, '\t'))
        let img = zip.folder('Petals')
        let i = 0
        for (i; i < data.data.length; i++) {
          let downloadurl = data.data[i]
          await axios
            .get('https://proxy.ixil.cc/prox?dd=true&image=' + downloadurl, {  // uses proxy
              responseType: 'arraybuffer'
            })
            .then(response => {
              img.file(`petal-${i}.jpg`, response.data, { arraybuffer: true })
            }).catch(function(error) {
              errors.push({ image: downloadurl, exception: { message: error.message, type: name } })
              zip.file('bloom.petal', JSON.stringify({ data: data, errors: errors }, null, '\t'))
            }).finally(() => {
              vuexContext.commit('SET_DOWNLOAD_PROGRESS', i)
            })
        }

        while (i < data.data.length) {
        }
        zip.generateAsync({
          type: 'blob', comment: `Downloaded from Bloom  [https://app.ixil.cc/i/${data.en.id}]`, compression: 'DEFLATE',
          compressionOptions: {
            level: 1  // compression level - store
          }
        })
          .then(function(content) {
            saveAs(content, `petals-${data.en.id}.zip`)
          }).finally(function() {
          vuexContext.commit('SET_DOWNLOAD_STATE', false)
        })
      }
    } else {
      if (data.en.gliphs.length > 0) {
        let errors = []
        vuexContext.commit('SET_DOWNLOAD_STATE', true)
        vuexContext.commit('SET_DOWNLOAD_TOTAL', data.indexes.length)
        let zip = new JSZip()
        zip.file('bloom.petal', JSON.stringify({ data: data, errors: errors }, null, '\t'))
        let img = zip.folder('Petals')
        let i = 0
        for (i; i < data.indexes.length; i++) {
          let downloadurl = data.en.gliphs[data.indexes[i] - 1]
          await axios
            .get('https://proxy.ixil.cc/prox?dd=true&image=' + downloadurl, {  // uses proxy
              responseType: 'arraybuffer'
            })
            .then(response => {
              img.file(`petal-${i}.jpg`, response.data, { arraybuffer: true })
            }).catch(function(error) {
              errors.push({ image: downloadurl, exception: { message: error.message, type: name } })
              zip.file('bloom.petal', JSON.stringify({ data: data, errors: errors }, null, '\t'))
            }).finally(() => {
              vuexContext.commit('SET_DOWNLOAD_PROGRESS', i)
            })
        }

        while (i < data.indexes.length) {
        }
        zip.generateAsync({
          type: 'blob', comment: `Downloaded from Bloom  [https://app.ixil.cc/a/${data.en.id}]`, compression: 'DEFLATE',
          compressionOptions: {
            level: 1  // compression level - store
          }
        })
          .then(function(content) {
            saveAs(content, `petals-${data.en.id}.zip`)
          }).finally(function() {
          vuexContext.commit('SET_DOWNLOAD_STATE', false)
        })
      }
    }
  },

  async DOWNLOAD_META(vuexContext, data) {
    vuexContext.commit('SET_DOWNLOAD_STATE', true)
    let petal = new Blob([JSON.stringify({ data: data }, null, '\t')], { type: 'petal/bloom;charset=utf-8' })
    saveAs(petal, `bloom-${data.en.id}.hina.petal`)
    vuexContext.commit('SET_DOWNLOAD_STATE', false)
  }
}

export const getters = {
  GET_DOWNLOAD_STATE(state) {
    return state.TaskState
  },
  GET_DOWNLOAD_TOTAL(state) {
    return state.total
  },
  GET_DOWNLOAD_PROGRESS(state) {
    return state.progressd
  }
}
