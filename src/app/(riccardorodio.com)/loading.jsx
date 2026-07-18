export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-4">
      <div className="relative flex items-center justify.center">
        <div className="w-16 h-16 border-4 border-zinc-200 dark:border-zinc-800 border-t-emerald-500 dark:border-t-emerald-400 rounded-full animate-spin"></div>
        <div className="absolute w-8 h-8 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full animate-ping"></div>
      </div>
      <p className="mt-4 text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400 uppercase animate-pulse">
        Caricamento in corso...
      </p>
    </div>
  );
}
