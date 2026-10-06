interface EditPreferreceProps {
  modalOpenEdit: boolean;
  setModalOpenEdit: (open: boolean) => void;
}

const EditPreferrece = ({ modalOpenEdit, setModalOpenEdit }: EditPreferreceProps) => {
  return (
    <div
      tabIndex={-1}
      className={`
                fixed inset-0 z-50 flex justify-center transition-all duration-300 ease-in-out
                ${modalOpenEdit
          ? "opacity-100 visible bg-black/30"
          : "opacity-0 invisible pointer-events-none"
        }
              `}
    >
      <div
        className={`
                  relative p-5 w-full max-w-4xl
                  transition-all duration-300 ease-in-out
                  ${modalOpenEdit ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
                `}
      >
        <div className="relative bg-white border border-gray-900/10 rounded-base shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-900/10 py-4 px-4">
            <strong className="font-bold text-xl text-center">
              Edit Preferrece
            </strong>
            <button
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              onClick={() => setModalOpenEdit(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hover:text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="border-white/10 px-4">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPreferrece;
