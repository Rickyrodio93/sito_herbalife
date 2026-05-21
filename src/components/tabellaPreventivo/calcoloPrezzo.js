export default function calcoloPrezzo(ruolo, prodotto, usoDistributore, livelloMarketing) {
    const prezzoListino = Number(prodotto?.PrezzoListino) || 0;
    const baseSconto = Number(prodotto?.BaseSconto) || 0;
    const iva = Number(prodotto?.Iva) || 0;
    const livello = (Number(livelloMarketing) || 0) / 100;

    let prezzo = 0;
    const spedizione = 0.035;
    const ritenutaDiImposta = 0.1794;
    const INPS = 0.0877;

    function roundToTwo(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }

    const PrezzoPubblico = roundToTwo(prezzoListino * (1 + spedizione) * (1 + iva));

    if (ruolo === "cliente") {
        prezzo = PrezzoPubblico;
    } else if (ruolo === "CP" || (ruolo === "DS" && usoDistributore === "uso personale")) {
        prezzo = (prezzoListino - baseSconto * livello) * (1 + iva);
    } else if (ruolo === "DS") {
        if (usoDistributore === "vendita occasionale") {
            prezzo = PrezzoPubblico - baseSconto * livello + baseSconto * livello * ritenutaDiImposta;
        } else if (usoDistributore === "abituale <6410") {
            prezzo = PrezzoPubblico - baseSconto * 0.5 + baseSconto * 0.5 * ritenutaDiImposta - baseSconto * 0.5 * 0.22;
        } else if (usoDistributore === "abituale >6410") {
            prezzo = PrezzoPubblico - baseSconto * 0.5 + baseSconto * 0.5 * ritenutaDiImposta - baseSconto * 0.5 * 0.22 + baseSconto * 0.5 * INPS;
        } else {
            // fallback: prendi prezzo scontato base
            prezzo = (prezzoListino - baseSconto * livello) * (1 + iva);
        }
    } else {
        prezzo = PrezzoPubblico;
    }

    return roundToTwo(Number(prezzo) || 0); // restituisce numero
}
