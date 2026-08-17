module.exports = {
  apps: [
    {
      name: 'loanpilot-crm',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_APP_URL: 'https://empireitxpert.in',
      },
    },
  ],
};
