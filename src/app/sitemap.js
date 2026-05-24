export default async function sitemap() {
    const BASE_URL = 'https://www.riccardorodio.com'
    const pagineStatiche = [
        { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
        { url: `${BASE_URL}/controlloPeso`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/ottimizza`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/sport`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/skin`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/ricette`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/scienza`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/preventivo`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.1 },
        { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.1 },
        { url: `${BASE_URL}/contatti`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ]
    return [...pagineStatiche];
}