import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";


// queries
import { createContact, getCaptchaWithCSRF } from "../queries/contact.queries";

// types
import type { ContactSubmission } from "../types/contact.type";

type Props = {
  animationClass?: string;
};

export default function Contact({ animationClass }: Props) {
  const queryClient = useQueryClient();
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [captcha, setCaptcha] = useState<{ question: string; token: string } | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [csrfToken, setCsrfToken] = useState<string>("");

  // Load CAPTCHA and CSRF token on component mount
  useEffect(() => {
    const loadCaptcha = async () => {
      try {
        const data = await getCaptchaWithCSRF();
        setCaptcha(data.captcha);
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Failed to load CAPTCHA:", error);
      }
    };
    loadCaptcha();
  }, []);

  const { mutate: addContact, isPending } = useMutation({
    mutationFn: (data: { contactData: ContactSubmission; csrfToken: string }) => createContact(data.contactData, data.csrfToken),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
      setErrorMessage(data.message);
      setErrorStatus("success");
    },
    onError: (error) => {
      const data = error as {
        response?: {
          data?: {
            message?: string;
            errMessage?: string[];
            emptyFields?: string[];
          };
        };
      };

      setEmptyFields(data.response?.data?.emptyFields ?? []);

      if (data.response?.data?.message) {
        setErrorMessage(data.response.data.message);
        setErrorStatus("error");
        return;
      }

      setErrorMessage("Something went wrong. Please try again.");
      setErrorStatus("error");
    }
  });

  const handleContact = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmptyFields([]);
    setErrorMessage("");

    const full = e.currentTarget.fullname.value;
    const email = e.currentTarget.email.value;
    const message = e.currentTarget.message.value;

    if (!captchaAnswer || !captcha) {
      setErrorMessage("Please complete the CAPTCHA");
      setErrorStatus("error");
      return;
    }

    const contactData = { name: full, email, message, captchaAnswer, captchaToken: captcha.token };
    addContact({ contactData, csrfToken });
    e.currentTarget.reset();
    setCaptchaAnswer("");
    setErrorMessage("");
    setErrorStatus("");

    // Reload CAPTCHA and CSRF token after submission
    try {
      const data = await getCaptchaWithCSRF();
      setCaptcha(data.captcha);
      setCsrfToken(data.csrfToken);
    } catch (error) {
      console.error("Failed to reload CAPTCHA:", error);
    }
  };

  // console.log(emptyFields);
  // console.log(errorMessage);

  return (
    <>
      <div className={`w-full md:w-1/2 sm:w-full border-white/10 dark:border-slate-300/20 bg-slate-600/20 dark:bg-amber-50/30 rounded-3xl border py-5 px-5 md:py-8 md:px-8 ${animationClass ?? ""}`}>
        {errorMessage && (
          <p
            className={`${errorStatus === "success" ? "bg-green-500" : "bg-red-500"
              } text-white py-3 px-3 rounded-md mb-5 text-center`}
          >
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleContact}>
          <div className="mb-5">
            <label htmlFor="fullname" className="text-white mb-2 block">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="fullname"
              className={`w-full border bg-white dark:bg-slate-100 py-3 px-3 rounded-md ${emptyFields.includes("name") ? "border-red-500/70 outline-red-500" : "border-white dark:border-slate-300"}`}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="text-white mb-2 block">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`w-full border bg-white dark:bg-slate-100 py-3 px-3 rounded-md ${emptyFields.includes("email") || emptyFields.includes("valid-email") ? "border-red-500/70 outline-red-500" : "border-white dark:border-slate-300"}`}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="text-white mb-2 block">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              className={`w-full border bg-white dark:bg-slate-100 py-3 px-3 rounded-md ${emptyFields.includes("message") ? "border-red-500/70 outline-red-500" : "border-white dark:border-slate-300"}`}
              rows={5}
            ></textarea>
          </div>
          <div className="mb-5">
            <label htmlFor="captcha" className="text-white mb-2 block">
              Security Check: {captcha?.question} <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="captcha"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              className={`w-full border bg-white dark:bg-slate-100 py-3 px-3 rounded-md ${emptyFields.includes("captcha") ? "border-red-500/70 outline-red-500" : "border-white dark:border-slate-300"}`}
              placeholder="Enter your answer"
            />
          </div>
          <div className="mb-0">
            <button
              type="submit"
              className={`bg-white dark:bg-slate-800 hover:bg-green-400 text-slate-700 dark:text-slate-200 hover:text-white transition font-bold py-3 px-6 rounded-md font-mono uppercase tracking-widest ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={isPending}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
