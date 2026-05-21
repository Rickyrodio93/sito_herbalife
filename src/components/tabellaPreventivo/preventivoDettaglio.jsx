export default function PreventivoDettaglio({
  ruolo,
  preventivo,
  livelloMarketing,
  usoDistributore,
}) {
  return (
    <>
      <div className="text-sm space-y-2 capitalize lg:font-courier mb-6">
        <div className="flex justify-between">
          <span>riepilogo carrello:</span>
          <span>
            {ruolo === "cliente"
              ? `${preventivo.venditaCliente.toFixed(2)} €`
              : `${preventivo.subtotale.toFixed(2)} €`}
          </span>
        </div>

        {ruolo !== "cliente" ? (
          <>
            <div className="flex justify-between text-green-700">
              <span>sconto (-{livelloMarketing}%)</span>
              <span>- {preventivo.sconto.toFixed(2)} €</span>
            </div>

            <div
              className={`flex justify-between ${
                preventivo.spedizione === 0 ? "text-green-700" : "text-red-600"
              }`}
            >
              <span>spedizione</span>
              <span>
                {preventivo.spedizione === 0
                  ? "🚚 gratuita"
                  : `${preventivo.spedizione.toFixed(2)} €`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tasse</span>
              <span>{preventivo.tasse.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span>Iva</span>
              <span>{preventivo.iva.toFixed(2)} €</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <span>di cui Iva</span>
              <span>{preventivo.iva.toFixed(2)} €</span>
            </div>
          
          </>
        )}

        <div className="flex justify-between text-lg font-semibold border-t border-dashed border-gray-400 pt-2">
          <span>totale</span>
          <span>
            {ruolo === "cliente"
              ? `${preventivo.venditaCliente.toFixed(2)} €`
              : `${preventivo.totale.toFixed(2)} €`}
          </span>
        </div>

        {ruolo !== "cliente" && (
          <div className="flex justify-between">
            <span>punti volume</span>
            <span>{preventivo.puntiVolume.toFixed(2)} PV</span>
          </div>
        )}

        {ruolo === "DS" && usoDistributore !== "uso personale" && (
          <>
            <div className="flex justify-between font-semibold">
              <span>vendita cliente</span>
              <span>{preventivo.venditaCliente.toFixed(2)} €</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>guadagno netto</span>
              <span>{preventivo.guadagnoNetto.toFixed(2)} €</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
