export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',          // Blocca l'indicizzazione delle tue rotte API interne
                    '/_next/',        // Blocca le cartelle di build interne di Next.js
                    '/admin/',        // (Opzionale) Blocca eventuali future aree di amministrazione
                    '/login/',        // (Opzionale) Blocca la pagina di login se farai l'area riservata
                    '/faq',
                    '/privacy'
                ],
            }
        ],
        sitemap: 'https://www.riccardorodio.com/sitemap.xml'
    }
}