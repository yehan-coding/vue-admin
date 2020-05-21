import { login, logout, getInfo, messageCount } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  roles: [],
  name: '',
  avatar: '',
  info: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  messageCount: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INFO: (state, info) => {
    state.info = info
    localStorage.setItem('user', JSON.stringify(info))
  },
  SET_MESSAGE_COUNT: (state, count) => {
    state.messageCount = count
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password.trim() }).then(res => {
        const { data } = res
        if (data.state === 'fail') {
          resolve(data.errorMsg)
        } else {
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('请重新登录！')
        }
        const { realname, avatar, roles } = data
        commit('SET_NAME', realname)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLE', roles)
        commit('SET_INFO', data)
        dispatch('getMessageCount')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getMessageCount({ commit }) {
    messageCount().then(res => {
      commit('SET_MESSAGE_COUNT', res.data)
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

