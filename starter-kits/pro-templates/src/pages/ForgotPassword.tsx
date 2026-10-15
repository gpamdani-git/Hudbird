import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Card } from "@/components/ui";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md p-8 shadow-xl">
        {!submitted ? (
          <>
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-bold">Reset password</h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm font-medium">Email address</label>
                <Input type="email" placeholder="john@example.com" className="w-full" required />
              </div>

              <Button className="mt-6 w-full" type="submit">
                Send reset link
              </Button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h2 className="mb-3 text-2xl font-bold">Check your email</h2>
            <p className="mb-8 text-zinc-500 dark:text-zinc-400">
              We've sent a password reset link to your email address.
            </p>
            <Button className="w-full" variant="outline" onClick={() => setSubmitted(false)}>
              Didn't receive the email? Try again
            </Button>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to log in
          </Link>
        </div>
      </Card>
    </div>
  );
}
