"use client"

export default function Input({
  as = "input", 
  type = "text",
  placeholder,
  value,
  onChange,
  name,        
  children,       
  iconaDestra,    
  className = "", 
  ...props     
}) {
  const ComponenteTag = as;

  // Costruiamo gli attributi in modo sicuro per evitare che "type" finisca su select o textarea
  const attributiSicuri = {
    value,
    placeholder,
    onChange,
    name,
    ...props
  };

  // Iniettiamo il "type" SOLO se stiamo usando un vero e proprio tag <input>
  if (as === "input") {
    attributiSicuri.type = type;
  }

  return (
    <div className={`relative flex items-center w-full max-w-5xl mx-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md focus-within:border-herbalife-1 dark:focus-within:border-green-500 focus-within:ring-2 focus-within:ring-herbalife-1/20 dark:focus-within:ring-green-500/20 shadow-sm transition-all duration-300 group ${
      as === "textarea" ? "h-auto py-2" : "h-14"
    } ${className}`}>
      
      <ComponenteTag
        {...attributiSicuri}
        className={`w-full h-full bg-transparent pl-5 pr-12 text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 font-medium outline-none border-none appearance-none ${
          as === "textarea" ? "h-32 pt-2 resize-none" : ""
        }`}
      >
        {/* I children (<option>) vengono inseriti SOLO se il tag è effettivamente una select */}
        {as === "select" ? children : null}
      </ComponenteTag>

      {/* Icona decorativa a destra */}
      {(iconaDestra || as === "select") && (
        <div className={`absolute right-4 flex items-center justify-center pointer-events-none text-zinc-400 group-focus-within:text-herbalife-1 dark:group-within:text-green-400 transition-colors duration-300 ${
          as === "textarea" ? "top-4" : ""
        }`}>
          {iconaDestra ? iconaDestra : <span className="text-xs">▼</span>}
        </div>
      )}
    </div>
  );
}