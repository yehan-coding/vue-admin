const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  info: state => state.user.info,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  avatar: state => state.user.avatar,
  messageCount: state => state.user.messageCount
}
export default getters
