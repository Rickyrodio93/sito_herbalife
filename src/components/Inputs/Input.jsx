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
      <div className="bg-white dark:bg-[#333333] text-black dark:text-white shadow-nav h-15 max-w-5xl mx-auto mb-6.25 rounded-lg relative px-4 py-3 flex">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
          }}
          className="w-full h-full rounded-lg bg-transparent focus-visible:border-blue-400 px-4 border-[#a1a1a1] border"
        />
        {children}
      </div>
    </>
  );
}
