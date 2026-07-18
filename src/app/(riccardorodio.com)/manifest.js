export default function manifest() {
    return {
        name: 'Riccardo Rodio - sito Herbalife',
        short_name: 'RR - Herbalife',
        description: 'sito web dove è possibile ricevere tutte le informazioni sui prodotti Herbalife, il business, e generare un preventivo dei prodotti',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: "#266431",
        icons: [
            {
                src: '/immagini/images.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/immagini/images.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src:'/immagini/images.png',
                sizes: '40x40',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
    }
}