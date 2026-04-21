"use client";

import * as React from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Field {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
  autoComplete?: string;
  placeholder?: string;
  span?: "full" | "half";
}

const fields: Field[] = [
  {
    id: "farmacia",
    label: "Nome da farmácia",
    type: "text",
    required: true,
    autoComplete: "organization",
    placeholder: "Farmácia …",
    span: "half",
  },
  {
    id: "localidade",
    label: "Localidade",
    type: "text",
    required: true,
    autoComplete: "address-level2",
    placeholder: "Lisboa, Porto, Évora…",
    span: "half",
  },
  {
    id: "responsavel",
    label: "Responsável / Direcção Técnica",
    type: "text",
    required: true,
    autoComplete: "name",
    placeholder: "Nome e função",
    span: "half",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    autoComplete: "email",
    placeholder: "nome@farmacia.pt",
    span: "half",
  },
  {
    id: "telefone",
    label: "Telefone",
    type: "tel",
    required: false,
    autoComplete: "tel",
    placeholder: "+351",
    span: "full",
  },
  {
    id: "mensagem",
    label: "Mensagem (opcional)",
    type: "textarea",
    required: false,
    placeholder:
      "Conte-nos um pouco sobre a farmácia e o que vos trouxe até aqui.",
    span: "full",
  },
];

export function JoinForm() {
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.log("[join-form demo]", payload);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast.success("Candidatura recebida", {
      description:
        "Obrigado. A equipa do Grupo vai responder nas próximas 48h úteis.",
      icon: <Check className="h-4 w-4 text-primary" />,
    });
    (event.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section
      id="candidatura"
      aria-label="Formulário de candidatura de farmácias"
      className="relative border-t border-border-subtle py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="type-eyebrow text-primary">Candidatura</span>
            <h2 className="type-display-2 text-foreground">
              Junta a tua farmácia <span className="font-serif italic font-normal">ao Grupo.</span>
            </h2>
            <p className="type-body-lg text-foreground-muted max-w-md">
              Preenche este formulário em 2 minutos. A equipa do Grupo entra
              em contacto, sem compromisso, nas próximas 48h úteis.
            </p>

            <dl className="mt-4 flex flex-col gap-4 border-t border-border-subtle pt-6 max-w-sm">
              {[
                { k: "Resposta", v: "48h úteis" },
                { k: "Compromisso", v: "Nenhum nesta fase" },
                { k: "Contrato tipo", v: "Sem fidelização obrigatória" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="flex items-baseline justify-between gap-4"
                >
                  <dt className="type-body-sm text-foreground-muted">
                    {item.k}
                  </dt>
                  <dd className="font-mono text-[13px] text-foreground tabular-nums">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            onSubmit={handleSubmit}
            noValidate
            className="relative rounded-[var(--radius-2xl)] border border-border bg-surface p-8 md:p-10 shadow-[var(--shadow-card)]"
          >
            <div
              aria-hidden="true"
              className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />

            <div className="flex items-center justify-between mb-8">
              <span className="type-eyebrow text-foreground-subtle">
                Formulário de adesão
              </span>
              <span className="type-mono text-foreground-subtle">
                GNF · PT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={cn(
                    "flex flex-col gap-1.5",
                    field.span === "full" && "md:col-span-2"
                  )}
                >
                  <label
                    htmlFor={field.id}
                    className="type-eyebrow text-foreground-muted"
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-primary">*</span>
                    )}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      name={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full resize-y bg-transparent py-2 text-foreground placeholder:text-foreground-subtle border-b border-border outline-none transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] focus:border-border-focus"
                    />
                  ) : (
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={field.required}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent py-2 text-foreground placeholder:text-foreground-subtle border-b border-border outline-none transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] focus:border-border-focus"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-border-subtle">
              <p className="type-body-xs text-foreground-subtle max-w-xs">
                Ao submeter, aceita o tratamento dos seus dados ao abrigo do
                RGPD, para efeitos de contacto sobre esta candidatura.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full md:w-auto"
              >
                {submitting ? "A enviar…" : "Enviar candidatura"}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
