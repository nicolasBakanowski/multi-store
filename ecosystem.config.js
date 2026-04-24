module.exports = {
  apps: [
    {
      name: 'multistore-frontend',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/srv/multistore/multi-store',
      instances: 1,
      autorestart: true,
      watch: false,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
