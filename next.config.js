module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: 'empty',
          dns: 'empty',
          net: 'empty',
          tls: 'empty',
          module: 'empty',
        }
      }
  
      return config
    }
  }