export default function TableBrand({ dati, bg = "bg-neutral-950" }) {
  if (!dati || dati.length === 0) return null;

  return (
    <section className={`w-full py-16 px-6 md:px-12 ${bg}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dati.map((dato, index) => (
            <div
              key={dato.id || index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/[0.07]"
            >
              {/* Accento grafico superiore al passaggio del mouse */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full" />

              <div>
                <p className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
                  {dato.number}
                </p>
                <p className="mt-3 text-sm font-medium uppercase tracking-wider text-neutral-300 md:text-base">
                  {dato.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
