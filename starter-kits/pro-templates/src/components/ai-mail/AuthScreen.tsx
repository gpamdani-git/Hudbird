import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";

interface AuthScreenProps {
  onSuccess: () => void;
}

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<"choose" | "login" | "create">("choose");
  const [step, setStep] = useState(1); // For create account
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (mode === "login") {
        onSuccess();
      } else {
        if (step < 3) {
          setStep(step + 1);
        } else {
          onSuccess();
        }
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-900 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode + step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative flex h-[520px] w-full max-w-[1040px] flex-col overflow-hidden rounded-3xl bg-[#1f1f1f] p-10"
        >
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <img
              src="/assets/new-logo/hudbirdui-icon-white.svg"
              alt="HudMail"
              className="h-9 w-9"
            />
            <span className="text-xl font-medium tracking-tight text-white">HudMail</span>
          </div>

          {mode === "choose" && (
            <div className="flex flex-1 flex-col">
              <h1 className="mb-2 text-4xl font-normal text-white">Sign in</h1>
              <p className="mb-8 text-zinc-400">Use your HudMail Account</p>

              <div className="flex-1" />

              <div className="mt-auto flex items-center justify-between">
                <button
                  onClick={() => setMode("create")}
                  className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  Create account
                </button>
                <button
                  onClick={() => setMode("login")}
                  className="rounded-full bg-blue-300 px-6 py-2.5 font-medium text-blue-900 transition-colors hover:bg-blue-400"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {mode === "login" && (
            <div className="flex flex-1 flex-col">
              <h1 className="mb-2 text-4xl font-normal text-white">Sign in</h1>
              <p className="mb-8 text-zinc-400">to continue to HudMail</p>

              <div className="w-full max-w-md">
                <div className="relative mb-6">
                  <input
                    type="email"
                    id="email"
                    className="peer w-full rounded-md border border-zinc-600 bg-transparent px-4 py-3.5 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-3.5 left-4 text-zinc-400 transition-all peer-focus:-top-2 peer-focus:bg-[#1f1f1f] peer-focus:px-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-[#1f1f1f] peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Email or phone
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-blue-400 hover:underline">
                  Forgot email?
                </a>
              </div>

              <div className="flex-1" />

              <div className="mt-auto flex items-center justify-between">
                <button
                  onClick={() => setMode("choose")}
                  className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  Create account
                </button>
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-full bg-blue-300 px-6 py-2.5 font-medium text-blue-900 transition-colors hover:bg-blue-400"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Next"}
                </button>
              </div>
            </div>
          )}

          {mode === "create" && (
            <div className="flex flex-1 flex-col">
              <h1 className="mb-2 text-4xl font-normal text-white">Create a HudMail Account</h1>
              <p className="mb-8 text-zinc-400">
                {step === 1
                  ? "Enter your name"
                  : step === 2
                    ? "Basic information"
                    : "Choose your Gmail address"}
              </p>

              <div className="w-full max-w-md">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        className="peer w-full rounded-md border border-zinc-600 bg-transparent px-4 py-3.5 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        placeholder=" "
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        autoFocus
                      />
                      <label
                        htmlFor="firstName"
                        className="absolute top-3.5 left-4 text-zinc-400 transition-all peer-focus:-top-2 peer-focus:bg-[#1f1f1f] peer-focus:px-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-[#1f1f1f] peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs"
                      >
                        First name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        className="peer w-full rounded-md border border-zinc-600 bg-transparent px-4 py-3.5 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        placeholder=" "
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute top-3.5 left-4 text-zinc-400 transition-all peer-focus:-top-2 peer-focus:bg-[#1f1f1f] peer-focus:px-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-[#1f1f1f] peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs"
                      >
                        Last name (optional)
                      </label>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-300">Enter your birthday and gender</p>
                    <div className="flex gap-2">
                      <select className="flex-1 rounded-md border border-zinc-600 bg-transparent px-4 py-3.5 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400">
                        <option value="" disabled selected>
                          Month
                        </option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Day"
                        className="w-20 rounded-md border border-zinc-600 bg-transparent px-4 py-3.5 text-white outline-none focus:border-blue-400"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        className="w-24 rounded-md border border-zinc-600 bg-transparent px-4 py-3.5 text-white outline-none focus:border-blue-400"
                      />
                    </div>
                    <select className="w-full rounded-md border border-zinc-600 bg-transparent px-4 py-3.5 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400">
                      <option value="" disabled selected>
                        Gender
                      </option>
                      <option value="f">Female</option>
                      <option value="m">Male</option>
                      <option value="n">Rather not say</option>
                    </select>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        id="newEmail"
                        className="peer w-full rounded-md border border-zinc-600 bg-transparent px-4 py-3.5 text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        placeholder=" "
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        autoFocus
                      />
                      <label
                        htmlFor="newEmail"
                        className="absolute top-3.5 left-4 text-zinc-400 transition-all peer-focus:-top-2 peer-focus:bg-[#1f1f1f] peer-focus:px-1 peer-focus:text-xs peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-[#1f1f1f] peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs"
                      >
                        Username
                      </label>
                      <span className="absolute top-3.5 right-4 text-zinc-400">@hudmail.com</span>
                    </div>
                    <p className="text-xs text-zinc-400">You can use letters, numbers & periods</p>
                    <a
                      href="#"
                      className="mt-4 inline-block text-sm font-medium text-blue-400 hover:underline"
                    >
                      Use my current email address instead
                    </a>
                  </div>
                )}
              </div>

              <div className="flex-1" />

              <div className="mt-auto flex items-center justify-between">
                <button
                  onClick={() => (step > 1 ? setStep(step - 1) : setMode("choose"))}
                  className="px-2 py-1 font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-full bg-blue-300 px-6 py-2.5 font-medium text-blue-900 transition-colors hover:bg-blue-400"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Next"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer links */}
      <div className="mt-4 flex w-full max-w-[1040px] items-center justify-between text-xs text-zinc-400">
        <select className="cursor-pointer border-none bg-transparent outline-none hover:text-zinc-300">
          <option>English (United States)</option>
        </select>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-zinc-300">
            Help
          </a>
          <a href="#" className="hover:text-zinc-300">
            Privacy
          </a>
          <a href="#" className="hover:text-zinc-300">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}
