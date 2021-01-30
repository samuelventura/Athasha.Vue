module.exports = {
  pages: {
    index: {
      entry: 'src/pages/index/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Home - Athasha Automation',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    auth: {
      entry: 'src/pages/auth/index.js',
      template: 'public/index.html',
      filename: 'auth.html',
      title: 'Authetication - Athasha Automation',
      chunks: ['chunk-vendors', 'chunk-common', 'auth']
    },
    drive: {
      entry: 'src/pages/drive/index.js',
      template: 'public/index.html',
      filename: 'drive.html',
      title: 'My Projects - Athasha Drive',
      chunks: ['chunk-vendors', 'chunk-common', 'drive']
    },
    project: {
      entry: 'src/pages/project/index.js',
      template: 'public/index.html',
      filename: 'project.html',
      title: '<Project Name> - Athasha Project',
      chunks: ['chunk-vendors', 'chunk-common', 'project']
    },
    policy: {
      entry: 'src/pages/policy/index.js',
      template: 'public/index.html',
      filename: 'policy.html',
      title: 'Policy - Athasha Automation',
      chunks: ['chunk-vendors', 'chunk-common', 'policy']
    },
    tryout: {
      entry: 'src/pages/tryout/index.js',
      template: 'public/index.html',
      filename: 'tryout.html',
      title: 'Tryout - Athasha Automation',
      chunks: ['chunk-vendors', 'chunk-common', 'tryout']
    },
  }
}
