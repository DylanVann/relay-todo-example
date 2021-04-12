module.exports = {
  plugins: [['relay', { eagerESModules: true }]],
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
}
