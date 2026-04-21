"use client";

import * as React from "react";
import { toast } from "sonner";
import { Building2, Pill, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Role = "colaborador" | "farmacia" | "fornecedor";

const roleCopy: Record<
  Role,
  { title: string; description: string; cta: string }
> = {
  colaborador: {
    title: "Entrar como colaborador",
    description:
      "Acesso interno à plataforma do Grupo — ferramentas, comunicação e operação.",
    cta: "Entrar",
  },
  farmacia: {
    title: "Entrar como farmácia",
    description:
      "Área reservada a farmácias associadas: encomendas, campanhas e Nossa AI.",
    cta: "Aceder à área da farmácia",
  },
  fornecedor: {
    title: "Entrar como fornecedor",
    description:
      "Portal logístico Addo Log — catálogos, propostas e integração com o Grupo.",
    cta: "Aceder ao portal",
  },
};

interface LoginDialogProps {
  children: React.ReactNode;
}

export function LoginDialog({ children }: LoginDialogProps) {
  const [role, setRole] = React.useState<Role>("farmacia");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    console.log("[login demo]", { role, email });
    toast.success("Área de login em preparação", {
      description:
        "Esta landing é apenas demonstrativa. A autenticação será ligada ao portal real em breve.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[440px] gap-6 p-7">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="type-eyebrow text-primary">Área reservada</span>
          </div>
          <DialogTitle>{roleCopy[role].title}</DialogTitle>
          <DialogDescription>{roleCopy[role].description}</DialogDescription>
        </DialogHeader>

        <Tabs
          value={role}
          onValueChange={(value) => setRole(value as Role)}
          className="w-full"
        >
          <TabsList className="h-11">
            <TabsTrigger value="colaborador" className="gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Colaborador
            </TabsTrigger>
            <TabsTrigger value="farmacia" className="gap-1.5">
              <Pill className="h-3.5 w-3.5" />
              Farmácia
            </TabsTrigger>
            <TabsTrigger value="fornecedor" className="gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              Fornecedor
            </TabsTrigger>
          </TabsList>

          {(Object.keys(roleCopy) as Role[]).map((value) => (
            <TabsContent key={value} value={value}>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                noValidate
              >
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`email-${value}`}>Email</Label>
                  <Input
                    id={`email-${value}`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nome@farmacia.pt"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`password-${value}`}>Palavra-passe</Label>
                    <button
                      type="button"
                      className="type-body-xs text-foreground-muted hover:text-primary transition-colors"
                      onClick={() =>
                        toast.info("Recuperação indisponível nesta demo.")
                      }
                    >
                      Esqueceu-se?
                    </button>
                  </div>
                  <Input
                    id={`password-${value}`}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="mt-1 w-full">
                  {roleCopy[value].cta}
                </Button>

                <p className="type-body-xs text-foreground-subtle text-center">
                  Ao entrar, concorda com os{" "}
                  <a href="#termos" className="text-foreground-muted underline underline-offset-2 hover:text-primary">
                    Termos
                  </a>{" "}
                  e a{" "}
                  <a href="#privacidade" className="text-foreground-muted underline underline-offset-2 hover:text-primary">
                    Política de Privacidade
                  </a>
                  .
                </p>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
