export const getScontoUnitario = (baseSconto, livelloMarketing, usoDistributore) => {
  const livello = (usoDistributore === "abituale <6410" || usoDistributore === "abituale >6410")
    ? 0.5
    : (Number(livelloMarketing) || 0) / 100

  return Math.round((Number(baseSconto) * livello + Number.EPSILON) * 100) / 100;
}

function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// Costanti condivise
const INPS = 0.0877;
const ritenuta = 0.1794;
const spedizionePercHL = 0.035; // spedizione del 3.5%
const scontoBioniq = 0.05; // sconto del 5%
const spedizioneBioniq = 7.50; // spedizione fissa di 7.50€

/**
 * Calcola tutti i dettagli (sconto, spedizione, iva sulla merce, iva sulla
 * spedizione, tasse, vendita cliente) per UNA singola riga di prodotto.
 * L'iva sulla merce e l'iva sulla spedizione sono tenute separate perche'
 * nel riepilogo la spedizione va mostrata come riga a se' stante, con la
 * propria quota di iva, e non mescolata dentro l'iva di ogni prodotto.
 *
 * @param {object} p - prodotto con quantita' (PrezzoListino, Iva, BaseSconto, categoria, ID, quantita'...)
 * @param {object} ctx - { ruolo, usoDistributore, livelloMarketing, isAbbonato, puntiVolumeTotali, sommaProdottiTotali }
 */
export function getDettaglioRiga(p, ctx) {
  const {
    ruolo,
    usoDistributore,
    livelloMarketing,
    isAbbonato,
    puntiVolumeTotali = 0,
    sommaProdottiTotali = 0,
  } = ctx || {};

  const q = Number(p.quantita) || 0;
  const prezzoListino = Number(p.PrezzoListino || p.prezzoListino) || 0;
  const ivaUnitaria = Number(p.Iva) || Number(p.iva) || 0;
  const baseSconto = Number(p.BaseSconto) || Number(p.baseSconto) || 0;

  const isBioniqFamiglia = p.categoria === "formulazioni personalizzate" || p.ID === "628K" || p.id === "628K";
  const isBioniqPrincipale = p.ID === "628K" || p.id === "628K";

  const scontoUnitario = getScontoUnitario(baseSconto, livelloMarketing, usoDistributore);

  const dettaglio = {
    q,
    prezzoListino,
    ivaUnitaria,
    scontoUnitario,
    isBioniqFamiglia,
    isBioniqPrincipale,
    subtotaleRiga: 0,
    scontoRiga: 0,
    spedizioneRiga: 0,      // importo netto spedizione di competenza di questa riga
    ivaRiga: 0,             // iva sulla sola merce di questa riga
    ivaSpedizioneRiga: 0,   // iva sulla quota di spedizione di questa riga
    tasseRiga: 0,
    venditaClienteRiga: 0,
  };

  if (!q) return dettaglio;

  dettaglio.subtotaleRiga = roundToTwo(prezzoListino * q);
  dettaglio.scontoRiga = roundToTwo(scontoUnitario * q);

  // ==========================================
  // BINARIO A: PRODOTTI DELLA LINEA BIONIQ
  // ==========================================
  if (isBioniqFamiglia) {
    let quotaSpedizioneRiga = 0;
    if (isBioniqPrincipale && !isAbbonato) {
      quotaSpedizioneRiga = 7.50 * q;
    }

    if (isBioniqPrincipale) {
      if (ruolo === "cliente" && isAbbonato) {
        dettaglio.venditaClienteRiga = prezzoListino * (1 + ivaUnitaria) * (1 - scontoBioniq) * q;
      } else if (ruolo === "cliente" && !isAbbonato) {
        dettaglio.venditaClienteRiga = (prezzoListino * (1 + ivaUnitaria) + spedizioneBioniq * (1 + ivaUnitaria)) * q;
      }
    } else {
      dettaglio.venditaClienteRiga = prezzoListino * (1 + ivaUnitaria) * q;
    }

    // Spedizione (Incaricati/CP: netta; Cliente: netta anch'essa, l'iva va nel campo dedicato)
    dettaglio.spedizioneRiga = quotaSpedizioneRiga;
    dettaglio.ivaSpedizioneRiga = roundToTwo(quotaSpedizioneRiga * ivaUnitaria);

    // IVA sulla sola merce
    if (ruolo === "cliente") {
      dettaglio.ivaRiga = roundToTwo(prezzoListino * ivaUnitaria * q);
    } else if (ruolo === "CP" || (ruolo === "DS" && usoDistributore === "uso personale")) {
      dettaglio.ivaRiga = roundToTwo((prezzoListino - scontoUnitario) * ivaUnitaria * q);
    } else if (ruolo === "DS" && usoDistributore !== "uso personale") {
      dettaglio.ivaRiga = roundToTwo(prezzoListino * ivaUnitaria * q);
    }
    // ==========================================
    // BINARIO B: PRODOTTI DELLA LINEA HERBALIFE
    // ==========================================
  } else {
    // Vendita Cliente (Usa la spedizione standard percentuale del 3.5%)
    dettaglio.venditaClienteRiga = roundToTwo(prezzoListino * (1 + spedizionePercHL) * (1 + ivaUnitaria) * q);

    // Spedizione Incaricati
    let spedizioneRigaHL = 0;
    if (ruolo === "CP" || usoDistributore === "uso personale") {
      // Regola HL: Sotto i 100 PV totali nel carrello si pagano 3.50€ fissi (ripartiti pro-quota)
      spedizioneRigaHL = puntiVolumeTotali < 100
        ? (3.50 * (sommaProdottiTotali ? q / sommaProdottiTotali : 0))
        : 0;
    } else if (ruolo === "DS" && usoDistributore !== "uso personale") {
      // Uso commerciale: 3.5% fisso sul valore di listino della merce HL
      spedizioneRigaHL = prezzoListino * spedizionePercHL * q;
    }
    dettaglio.spedizioneRiga = spedizioneRigaHL;
    dettaglio.ivaSpedizioneRiga = roundToTwo(spedizioneRigaHL * ivaUnitaria);

    // IVA sulla sola merce (Applica la logica storica basata sul ruolo)
    if (ruolo === "CP" || (ruolo === "DS" && usoDistributore === "uso personale")) {
      dettaglio.ivaRiga = roundToTwo((prezzoListino - scontoUnitario) * ivaUnitaria * q);
    } else if (ruolo === "DS" && usoDistributore !== "uso personale") {
      dettaglio.ivaRiga = roundToTwo(prezzoListino * ivaUnitaria * q);
    } else {
      // ruolo === "cliente"
      dettaglio.ivaRiga = roundToTwo(prezzoListino * ivaUnitaria * q);
    }
  }

  // ==========================================
  // TASSE REGOLAMENTARI DISTRIBUTORE (DS)
  // ==========================================
  if (ruolo === "DS") {
    if (usoDistributore === "vendita occasionale") {
      dettaglio.tasseRiga = roundToTwo(scontoUnitario * ritenuta * q);
    } else if (usoDistributore === "abituale <6410") {
      dettaglio.tasseRiga = roundToTwo((scontoUnitario * ritenuta - scontoUnitario * 0.22) * q);
    } else if (usoDistributore === "abituale >6410") {
      dettaglio.tasseRiga = roundToTwo((scontoUnitario * ritenuta - scontoUnitario * 0.22 + scontoUnitario * INPS) * q);
    }
  }

  return dettaglio;
}

export default function CalcoloPreventivo(prodotti, ruolo, usoDistributore, livelloMarketing, isAbbonato) {
  // Variabili generali (accumulatori)
  let iva = 0;
  let tasse = 0;
  let sconto = 0;
  let subtotale = 0;
  let spedizione = 0;
  let puntiVolume = 0;
  let sommaProdotti = 0;
  let venditaCliente = 0;

  // 1. Pre-calcolo dei Punti Volume e controllo della composizione del carrello
  prodotti.forEach((p) => {
    const q = Number(p.quantita) || 0;
    puntiVolume += (Number(p.puntiVolumeUnitario) || 0) * q;
    sommaProdotti += q;
  });

  // Flag per identificare se nel carrello ci sono prodotti Bioniq
  const haBioniq = prodotti.some(p => (p.categoria === "formulazioni personalizzate" || p.ID === "628K") && (Number(p.quantita) || 0) > 0);

  // 2. Ciclo di calcolo analitico riga per riga (delegato a getDettaglioRiga)
  prodotti.forEach((p) => {
    const dettaglio = getDettaglioRiga(p, {
      ruolo,
      usoDistributore,
      livelloMarketing,
      isAbbonato,
      puntiVolumeTotali: puntiVolume,
      sommaProdottiTotali: sommaProdotti,
    });

    subtotale += dettaglio.subtotaleRiga;
    sconto += dettaglio.scontoRiga;
    spedizione += dettaglio.spedizioneRiga;
    iva += dettaglio.ivaRiga + dettaglio.ivaSpedizioneRiga;
    tasse += dettaglio.tasseRiga;
    venditaCliente += dettaglio.venditaClienteRiga;
  });

  // 3. Chiusura e calcolo dei Totali di sintesi
  const tasseIva = roundToTwo(tasse + iva);

  const totale = ruolo === "cliente"
    ? roundToTwo(venditaCliente)
    : roundToTwo(subtotale - sconto + spedizione + tasseIva);

  const guadagnoNetto = roundToTwo(venditaCliente - totale);


  return {
    subtotale: roundToTwo(subtotale),
    sconto: roundToTwo(sconto),
    iva: roundToTwo(iva),
    tasse: roundToTwo(tasse),
    tasseIva: roundToTwo(tasseIva),
    spedizione: roundToTwo(spedizione),
    totale: roundToTwo(totale),
    puntiVolume: roundToTwo(puntiVolume),
    venditaCliente: roundToTwo(venditaCliente),
    guadagnoNetto: roundToTwo(guadagnoNetto),
    sommaProdotti,
    haBioniq,
  }
}