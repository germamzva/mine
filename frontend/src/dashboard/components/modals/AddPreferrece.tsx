import { useMutation, useQueryClient } from "@tanstack/react-query";

// queries
import { addPreferrence } from "../../../queries/preferrence";

// types
import type { Preferrence } from "../../../types/preferrence.type";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddPreferrece = ({ modalOpen, setModalOpen }: Props) => {
  const queryClient = useQueryClient();

//   const [errorMessage, setErrorMessage] = React.useState("");
//   const [errValue, setErrValue] = React.useState<string[]>([]);

  const { mutate: addPreferrenceMutate } = useMutation<
    unknown,
    Error,
    Preferrence
  >({
    mutationFn: addPreferrence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferrences"] });
    },
    // onError: (error: Error) => {
    //   if (axios.isAxiosError(error) && error.response?.data) {
    //     const data = error.response.data as {
    //       message?: string;
    //       errValue?: string[];
    //     };
    //     if (data.message) {
    //       setErrorMessage(data.message);
    //     }
    //     if (data.errValue) {
    //       setErrValue(data.errValue);
    //     }
    //   }
    // },
  });

  const handleSubmitPreferreceAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Preferrence;
    addPreferrenceMutate(data);
    // reset form
    e.currentTarget.reset();
    // setModalOpen((prev) => !prev);
    // setErrorMessage("");
  };

//   console.log(errorMessage);
//   console.log(errValue);
  
  return (
    <div
      tabIndex={-1}
      className={`
                fixed inset-0 z-50 flex justify-center transition-all duration-300 ease-in-out
                ${modalOpen
          ? "opacity-100 visible bg-black/30"
          : "opacity-0 invisible pointer-events-none"
        }
              `}
    >
      <div
        className={`
                  relative p-5 w-full max-w-4xl
                  transition-all duration-300 ease-in-out
                  ${modalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
                `}
      >
        <div className="relative bg-white border border-gray-900/10 rounded-base shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-900/10 py-4 px-4">
            <strong className="font-bold text-xl text-center">
              Add Preferrece
            </strong>
            <button
              type="button"
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              onClick={() => setModalOpen(false)}
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
            {/* {errorMessage && (
              <div className="mt-5 mb-4 p-3 bg-red-100 text-red-700 rounded">
                {errorMessage}
              </div>
            )} */}
            <form onSubmit={handleSubmitPreferreceAdd}>
              <div className="mt-5">
                <div className="mb-5 ">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-5 ">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                    />
                    </div>
                    <div className="mb-5 ">
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                    />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-5 ">
                    <label
                        htmlFor="job_title"
                        className="block mb-2 text-sm font-medium"
                    >
                        Job Title
                    </label>
                    <input
                        type="text"
                        name="job_title"
                        id="job_title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                    />
                    </div>
                    <div className="mb-5 ">
                    <label
                        htmlFor="company"
                        className="block mb-2 text-sm font-medium"
                    >
                        Company
                    </label>
                    <input
                        type="text"
                        name="company"
                        id="company"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-green-400 block w-full p-3.5"
                    />
                    </div>
                </div>
                <div className="mb-7">
                  <button
                    type="submit"
                    className="bg-green-400 text-white hover:text-slate-700 transition font-bold py-3 px-6 rounded-md font-roboto uppercase tracking-widest cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPreferrece;
