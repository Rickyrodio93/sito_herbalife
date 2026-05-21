import axios from "axios";
import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function UltimaModifica() {
  const [dataUltimaModifica, setDataUltimaModifica] = useState("");

  useEffect(() => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCM_3vWzdtq9AefTo1Qh44lF4d1lpbrUMLVihG5SJJB1m0LfpaTf35K1FvLUG5jm_m5eyMpOqmViGJ/pub?gid=146688255&single=true&output=csv";

    axios
      .get(csvUrl)
      .then((res) => {
        Papa.parse(res.data, {
          header: false,
          complete: (result) => {
            const primaRiga = result.data?.[1];
            const data = primaRiga?.[8];
            if (data) setDataUltimaModifica(data);
          },
        });
      })
      .catch((err) => {
        console.error("Errore nel recupero data ultima modifica:", err);
      });
  }, []);

  return (
    <p className="text-right text-sm text-gray-500 mb-2 capitalize">
      Ultimo aggiornamento:{" "}
      <span className="italic">{dataUltimaModifica || "Verifico ultimo aggiornamento..."}</span>
    </p>
  );
}
