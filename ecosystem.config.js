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
            user: 'web',
            host: ['192.168.1.6'],
            ref: 'origin/master',
            repo: 'git@git-repo.git',
            ssh_options: ['ForwardAgent=yes'],
            path: '/var/www/warrenlee.tech',
            'post-deploy': 'yarn && yarn build && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }
}