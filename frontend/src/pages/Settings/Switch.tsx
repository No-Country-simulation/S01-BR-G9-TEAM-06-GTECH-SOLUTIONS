type Props = {
  checked: boolean;
  onChange: () => void;
  label?: string;
};

export function Switch({
  checked,
  onChange,
  label,
}: Props) {
  return (
    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`
        relative
        h-7
        w-12
        rounded-full
        transition
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-yellow-400
        focus:ring-offset-2

        dark:focus:ring-offset-slate-900

        ${
          checked
            ? "bg-yellow-500"
            : "bg-slate-300 dark:bg-slate-600"
        }
      `}
    >
      <span
        className={`
          absolute
          top-1
          h-5
          w-5
          rounded-full
          bg-white
          shadow-sm
          transition
          duration-200

          ${
            checked
              ? "left-6"
              : "left-1"
          }
        `}
      />
    </button>
  );
}
