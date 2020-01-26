module.exports = {
  plugins: ['@babel/proposal-class-properties'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/typescript',
  ],
};
