export default function InputPreventivo({ title, onChange, value, option }) {
  return (
    <>
      <label className="flex w-full items-stretch">
        <span className="bg-[#f8f9fa] dark:bg-[#2b3035] py-1.5 px-3 rounded-tl-lg rounded-bl-lg text-black dark:text-white capitalize">
          {title}
        </span>

        <select
          value={value}
          onChange={onChange}
          className="rounded-tr-lg rounded-br-lg  px-4 py-2 bg-white dark:bg-zinc-800 dark:text-white w-full"
        >
          {option.map((o) => (
            <option key={o.name} value={o.optionValue} className="capitalize">
              {o.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
