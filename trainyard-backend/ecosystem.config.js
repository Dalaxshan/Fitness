module.exports = {
  apps: [
    {
      name: 'ty-be',
      script: 'main.js',
      env: {
        NODE_ENV: 'development',
      },
      watch: true,
      env_file: '.env.development',
    },
    {
      name: 'ty-be-prod',
      script: 'main.js',
      env: {
        NODE_ENV: 'production',
      },
      watch: true,
      env_file: '.env.production',
    },
  ],
};
