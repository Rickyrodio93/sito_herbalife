export default function CalcoloPreventivo(prodotti, ruolo, usoDistributore, livelloMarketing) {

  // variabili generali
  let subtotale = 0;
  let sconto = 0;
  let iva = 0;
  let ivaSpedizione = 0;
  let prodottiIva = 0;
  let ivaProdotti = 0;
  let tasse = 0;
  let spedizione = 0;
  let puntiVolume = 0;
  let venditaCliente = 0;
  let sommaProdotti = 0;

  // spese fisse e tasse percentuali 
  const spedizionePerc = 0.035; // percentuale di spedizione del 3.5%
  const spedizioneFissa = 3.5; // spedizione fissa di 3.50€
  const ritenuta = 0.1794; // ritenuta di imposta del 17.94%
  const INPS = 0.0877; // trattenuta INPS dell'8.77%

  // se si tratta di vendita occasionale, il livello di sconto è fisso al 50%
  const livello = usoDistributore === "abituale <6410" || usoDistributore === "abituale >6410"
    ? 0.5
    : (Number(livelloMarketing) || 0) / 100;

    // funzione per arrotondare alla seconda cifra decimale
  function roundToTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

// calcoli prezzi
  prodotti.forEach((p) => {
    const q = Number(p.quantita) || 0;
    if (!q) return;

    const prezzoListino = Number(p.PrezzoListino) || 0;
    const ivaUnitaria = Number(p.iva) || 0;
    const baseSconto = Number(p.baseSconto) || 0;
    const pv = Number(p.puntiVolumeUnitario) || 0;

    const scontoUnitario = roundToTwo(baseSconto * livello);

    // subtotale e sconto
    subtotale += roundToTwo(prezzoListino * q);
    sconto += roundToTwo(scontoUnitario * q);

    // punti volume
    puntiVolume += pv * q;

    // calcolo spedizione
    if (ruolo === "cliente") {
      spedizione = 0;
    } else if (ruolo === "CP" || usoDistributore === "uso personale") {
      spedizione = puntiVolume < 100 ? spedizioneFissa : 0;
    } else if (ruolo === "DS" && usoDistributore !== "uso personale") {
      spedizione = subtotale * spedizionePerc;
    }
    // costo cliente finale
    venditaCliente += roundToTwo(prezzoListino * (1 + spedizionePerc) * (1 + ivaUnitaria) * q);
    sommaProdotti += q;

    // calcolo IVA prodotti
    if (ruolo === "CP" || (ruolo === "DS" && usoDistributore === "uso personale")) {
      prodottiIva += roundToTwo(q * ivaUnitaria);
      ivaSpedizione = roundToTwo(spedizione * (prodottiIva / sommaProdotti));
      ivaProdotti += roundToTwo((prezzoListino - scontoUnitario) * ivaUnitaria * q)
      iva = roundToTwo(ivaProdotti + ivaSpedizione)
    } else if (ruolo=== "DS" && usoDistributore !== "uso personale") {
      prodottiIva += roundToTwo(q * ivaUnitaria);
      ivaSpedizione = roundToTwo(spedizione * (prodottiIva / sommaProdotti));
      ivaProdotti += roundToTwo((prezzoListino) * ivaUnitaria * q)
      iva = roundToTwo(ivaProdotti + ivaSpedizione)
    } else {
      prodottiIva += roundToTwo(q * ivaUnitaria);
      ivaProdotti += roundToTwo(prezzoListino * ivaUnitaria * q)
      iva = roundToTwo(ivaProdotti) // di cui iva sui prezzi Cliente 
    }

    // tasse distributore
    if (ruolo === "DS" && usoDistributore === "vendita occasionale") {
      tasse += roundToTwo((scontoUnitario) * ritenuta * q);
    } else if (usoDistributore === "abituale <6410") {
      tasse += (scontoUnitario * ritenuta - scontoUnitario * 0.22) * q;
          } else if (usoDistributore === "abituale >6410") {
            tasse += (scontoUnitario * ritenuta - scontoUnitario * 0.22 + scontoUnitario * INPS) * q;

    }
  });

  const tasseIva = roundToTwo(tasse + iva);
  const totale = roundToTwo(subtotale - sconto + spedizione + tasseIva);
  const guadagnoNetto = roundToTwo(venditaCliente - totale);

  return {
    subtotale,
    sconto,
    iva,
    tasse,
    tasseIva,
    spedizione,
    totale,
    puntiVolume,
    venditaCliente,
    guadagnoNetto,
    sommaProdotti
  };
}
