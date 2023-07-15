module.exports = {
    apps: [
        {
            name: 'nuxtjs',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start'
        }
    ],
    deploy: {
        // "production" is the environment name
        production: {
            user: 'root',
            host: ['172.105.61.7'],
            ref: 'origin/main',
            repo: 'git@github.com:aliaarif/nuxt-latest.git',
            ssh_options: ['ForwardAgent=yes'],
            path: '/var/nuxt-latest',
            'post-deploy': 'yarn && yarn build && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }
}