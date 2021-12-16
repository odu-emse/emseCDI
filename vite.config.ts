import reactRefresh from '@vitejs/plugin-react-refresh'
import { UserConfig, ConfigEnv } from 'vite'
import { join } from 'path'

const srcRoot = join(__dirname, 'src')
const outRoot = join(__dirname, 'public')

export default ({ command }: ConfigEnv): UserConfig => {
    // DEV
    if (command === 'serve') {
        return {
            base: '/',
            plugins: [reactRefresh()],
            alias: {
                '/@': srcRoot,
            },
            build: {
                outDir: outRoot,
                emptyOutDir: true,
                rollupOptions: {},
            },
            server: {
                port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
            },
            optimizeDeps: {
                exclude: ['path'],
            },
        }
    }
    // PROD

    return {
        base: './',
        plugins: [reactRefresh()],
        alias: {
            '/@': srcRoot,
        },
        build: {
            outDir: outRoot,
            emptyOutDir: true,
            rollupOptions: {},
        },
        server: {
            port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
        },
        optimizeDeps: {
            exclude: ['path'],
        },
    }
}
