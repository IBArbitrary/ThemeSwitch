module.exports = {
  sourceDir: './',
  artifactsDir: './web-ext-artifacts',
  
  ignoreFiles: [
    '*.md',
    '*.sh',
    '.sign-credentials',
    '.amo-upload-uuid',
    '.gitignore',
    '.git',
    '.web-ext-config.js',
    'node_modules'
  ],
  
  build: {
    overwriteDest: true
  }
};
