module.exports = {
  getEmbedFooter (user) {
    return {
      text: `${user.username}${user.discriminator === '0' ? '' : `#${user.discriminator}`}`,
      icon_url: user.dynamicAvatarURL(null, 64)
    }
  },
  getAuthorField (user) {
    return {
      name: `${user.username}${user.discriminator === '0' ? '' : `#${user.discriminator}`}`,
      icon_url: user.avatarURL
    }
  }
}
