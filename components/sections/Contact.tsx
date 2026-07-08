"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { Logo } from "@/components/layout/Logo";
import { Reveal } from "@/components/motion/Reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Philippine mobile numbers: local 09XXXXXXXXX or international +63/63 9XXXXXXXXX.
const PH_PHONE_RE = /^(?:\+?63|0)9\d{9}$/;

type FieldName = "firstName" | "lastName" | "email" | "phone" | "message";
type Errors = Partial<
  Record<"firstName" | "lastName" | "email" | "phone" | "message", string>
>;

const initialValues: Record<FieldName, string> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

// Max digits allowed for each recognized phone prefix: +63XXXXXXXXXX (13),
// 09XXXXXXXXX (11). Anything else falls back to the wider +63 limit so
// typing isn't cut off mid-prefix.
function phoneMaxLength(value: string): number {
  if (value.startsWith("+63")) return 13;
  if (value.startsWith("0")) return 11;
  return 13;
}

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function setValue(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  // Phone: keep digits only, plus an optional leading "+" for the +63 prefix,
  // then cap length to match whichever format (+63... or 09...) the user is typing.
  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = event.target.value
      .replace(/[^\d+]/g, "")
      .replace(/(?!^)\+/g, "");
    setValue("phone", cleaned.slice(0, phoneMaxLength(cleaned)));
  }

  // Names: trim whitespace and flag the field if it's left empty once the user
  // leaves it — both names are required by the API, so validate them client-side
  // too instead of letting a blank submission bounce off the server.
  function validateName(name: "firstName" | "lastName") {
    return () => {
      const trimmed = values[name].trim();
      setValue(name, trimmed);
      setErrors((prev) => ({
        ...prev,
        [name]: trimmed ? undefined : "This field is required.",
      }));
    };
  }

  function validateEmail() {
    const email = values.email.trim();
    setValue("email", email);
    setErrors((prev) => ({
      ...prev,
      email: email && !EMAIL_RE.test(email) ? "Enter a valid email address." : undefined,
    }));
  }

  function validatePhone() {
    setErrors((prev) => ({
      ...prev,
      phone:
        values.phone && !PH_PHONE_RE.test(values.phone)
          ? "Enter a valid Philippine phone number."
          : undefined,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate every field up front so the form matches what the API requires
    // (first name, last name, email, and message are all mandatory there).
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const email = values.email.trim();
    const nextErrors: Errors = {
      firstName: firstName ? undefined : "This field is required.",
      lastName: lastName ? undefined : "This field is required.",
      email: EMAIL_RE.test(email) ? undefined : "Enter a valid email address.",
      phone:
        values.phone && !PH_PHONE_RE.test(values.phone)
          ? "Enter a valid Philippine phone number."
          : undefined,
      message: values.message.trim() ? undefined : "Please enter a message.",
    };
    setValues((prev) => ({ ...prev, firstName, lastName, email }));
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorMessage(
          res.status === 429
            ? "Too many messages sent. Please try again later."
            : (data?.error ?? "Something went wrong. Please try again."),
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialValues);
      setErrors({});
      // Re-arm the form after a moment so a visitor can send another message
      // without having to reload the page.
      window.setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-28 sm:px-8 lg:px-16"
    >
      <h2 id="contact-heading" className="sr-only">
        Contact
      </h2>
      <div className="mx-auto w-full max-w-[1312px]">
        <Reveal>
          <Card variant="outline" className="relative overflow-hidden p-6 sm:p-10">
            <GlowOrb position={{ top: -60, right: "15%" }} />
            <div className="relative z-10">
              <Card className="flex flex-col gap-8 p-6 sm:p-8">
                <Logo />
                <div className="border-edge flex flex-col gap-10 border-t pt-10 lg:flex-row">
                  <div className="flex flex-col gap-6 lg:w-[413px] lg:shrink-0">
                    <h3 className="font-display text-fg text-[28px] font-semibold uppercase sm:text-[34px]">
                      Send Me a Message
                    </h3>
                    <p className="text-muted font-display text-base leading-6">
                      Have a specific inquiry or message for me? Please use the
                      contact form below, and I&rsquo;ll get back to you promptly.
                    </p>
                  </div>
                  <form
                    className="flex flex-1 flex-col items-end gap-10"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:gap-10">
                      <Field
                        label="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={(e) => setValue("firstName", e.target.value)}
                        onBlur={validateName("firstName")}
                        error={errors.firstName}
                      />
                      <Field
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={(e) => setValue("lastName", e.target.value)}
                        onBlur={validateName("lastName")}
                        error={errors.lastName}
                      />
                    </div>
                    <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:gap-10">
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={values.email}
                        onChange={(e) => setValue("email", e.target.value)}
                        onBlur={validateEmail}
                        error={errors.email}
                      />
                      <Field
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={phoneMaxLength(values.phone)}
                        value={values.phone}
                        onChange={handlePhoneChange}
                        onBlur={validatePhone}
                        error={errors.phone}
                      />
                    </div>
                    <Field
                      label="Your Message"
                      name="message"
                      type="textarea"
                      placeholder="Message"
                      className="w-full"
                      value={values.message}
                      onChange={(e) => setValue("message", e.target.value)}
                      error={errors.message}
                    />
                    <div className="flex w-full flex-col items-end gap-3">
                      {status === "success" && (
                        <p className="text-muted font-display text-sm">
                          Thanks for reaching out — I&rsquo;ll get back to you soon.
                        </p>
                      )}
                      {status === "error" && (
                        <p className="font-display text-sm text-red-400">
                          {errorMessage}
                        </p>
                      )}
                      <GlassButton
                        type="submit"
                        className="bg-[#353535]"
                        disabled={status === "sending"}
                      >
                        {status === "sending"
                          ? "Sending..."
                          : status === "success"
                            ? "Message Sent"
                            : "Send a Message"}
                      </GlassButton>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
