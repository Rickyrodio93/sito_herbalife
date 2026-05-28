"use client"
export default function Input({
  type,
  placeholder,
  value,
  onChange,
  children,
}) {
  return (
    <>
      <div className="relative flex items-center w-full max-w-5xl mx-auto h-14 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md focus-within:border-herbalife-1 dark:focus-within:border-green-500 focus-within:ring-2 focus-within:ring-herbalife-1/20 dark:focus-within:ring-green-500/20 shadow-sm transition-all duration-300 group">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
          }}
          className="w-full h-full bg-transparent pl-5 pr-12 text-base text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 font-medium outline-none border-none"
        />
        {children && (
          <div className="absolute right-4 flex items-center justify-center pointer-events-none text-zinc-400 group-focus-within:text-herbalife-1 dark:group-focus-within:text-green-400 transition-colors duration-300">
            {children}
          </div>
        )}
      </div>
    </>
  );
}
