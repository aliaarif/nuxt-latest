module.exports = {
    apps: [
        {
            name: 'my-nuxt-app',
            script: 'npm',
            args: 'start',
            cwd: '/var/www/nuxt-latest',
            instances: 'max',
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};