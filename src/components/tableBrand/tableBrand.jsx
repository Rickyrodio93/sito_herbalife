export default function TableBrand({ dati, bg }) {
  return (
    <>
      <div className={`${bg} w-full p-20`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
          {dati.map((dato, index) => (
            <div key={index} className="text-white">
              <div>
                <p className="text-3xl md:text-6xl">{dato.number}</p>
                <p className="text-lg md:text-xl">{dato.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
