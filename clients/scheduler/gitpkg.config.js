module.exports = () => ({
  // registry: 'https://github.com/modern-age/canvas-embed.git',
  registry: 'git@github.com:modern-age/canvas-embed.git',
  getTagName: pkg => {
    return `${pkg.name}-v${pkg.version}-gitpkg-josh-for-the-win`}
})