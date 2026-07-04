function calcoloPrezzoHerbalife(ruolo, prodotto, usoDistributore, livelloMarketing, PrezzoPubblico, baseSconto, livello, iva) {
    const ritenutaDiImposta = 0.1794;
    const INPS = 0.0877;
    const prezzoListino = Number(prodotto?.PrezzoListino) || 0;

    if (ruolo === "cliente") return PrezzoPubblico;

    if (ruolo === "CP" || (ruolo === "DS" && usoDistributore === "uso personale")) {
        return (prezzoListino - baseSconto * livello) * (1 + iva)
    }

    if (ruolo === "DS") {
        if (usoDistributore === "vendita occasionale") {
            return PrezzoPubblico - baseSconto * livello + baseSconto * livello * ritenutaDiImposta;
        }
        if (usoDistributore === "abituale <6410") {
            return PrezzoPubblico - baseSconto * 0.5 + baseSconto * 0.5 * ritenutaDiImposta - baseSconto * 0.5 * 0.22;
        }
        if (usoDistributore === "abituale >6410") {
            return PrezzoPubblico - baseSconto * 0.5 + baseSconto * 0.5 * ritenutaDiImposta - baseSconto * 0.5 * 0.22 + baseSconto * 0.5 * INPS;
        }
        return (prezzoListino - baseSconto * livello) * (1 + iva); // fallback DS
    }

    return PrezzoPubblico;
}

// funzione per il calcolo del prezzo prodotti bioniq
function calcoloPrezzoBioniq(ruolo, prodotto, usoDistributore, livelloMarketing, isAbbonato, baseSconto, livello, iva) {
    const prezzoListino = Number(prodotto?.PrezzoListino) || 0;
    const isBioniqPrincipale = prodotto?.ID === "628K";
    const spedizioneBioniq = 7.50;
    const sconto = 0.05 // sconto del 5%

    let prezzoBioniq = 0;
    if (isBioniqPrincipale) {
        if (ruolo === "cliente" && isAbbonato) {
            return prezzoBioniq = (prezzoListino * (1 + iva)) * (1 - sconto)
        }else if (ruolo === "cliente" && !isAbbonato) {
            return prezzoBioniq = (prezzoListino * (1 + iva)) + (spedizioneBioniq * (1 + iva))
        }
    } else {
        prezzoBioniq = prezzoListino * (1 + iva)
    }

    if (isBioniqPrincipale && ruolo !== "cliente") {
        if (isAbbonato) {
            return prezzoBioniq = (prezzoListino - (baseSconto * livello)) * (1 + iva)
        } else {
            return prezzoBioniq = (prezzoListino - (baseSconto * livello)) * (1 + iva) + (spedizioneBioniq * (1 + iva))
        }
    }

    return prezzoBioniq
}

// funzione principale
export default function calcoloPrezzo(ruolo, prodotto, usoDistributore, livelloMarketing, isAbbonato = false) {
    const prezzoListino = Number(prodotto?.PrezzoListino) || 0;
    const baseSconto = Number(prodotto?.BaseSconto) || 0;
    const iva = Number(prodotto?.Iva) || 0;
    const livello = (Number(livelloMarketing) || 0) / 100;

    function roundToTwo(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }

    const isBioniqFamiglia = prodotto?.categoria === "formulazioni personalizzate" || prodotto?.ID === "628K";

    let prezzoFinale = 0;

    if (isBioniqFamiglia) {
        prezzoFinale = calcoloPrezzoBioniq(ruolo, prodotto, usoDistributore, livelloMarketing, isAbbonato, baseSconto, livello, iva)
    } else {
        const spedizioneStard = 0.035;
        const PrezzoPubblicoHL = prezzoListino * (1 + spedizioneStard) * (1 + iva);

        prezzoFinale = calcoloPrezzoHerbalife(ruolo, prodotto, usoDistributore, livelloMarketing, PrezzoPubblicoHL, baseSconto, livello, iva);
    }

    return roundToTwo(Number(prezzoFinale) || 0)
}