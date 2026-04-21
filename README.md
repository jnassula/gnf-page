# Grupo Nossa Farmácia — Landing Page

Landing page institucional e de captação para o Grupo Nossa Farmácia (cerca de 400 farmácias associadas em Portugal).

> **Estado actual:** fundação concluída — tokens do NF Design System integrados, `Header` fixo com blur-on-scroll, `LoginDialog` com tabs (Colaborador · Farmácia · Fornecedor), e `Hero` cinético. Restantes secções (Números, Sobre, Ecossistema, Vantagens, Adesão, Formulário, Testemunhos, CTA final, Footer) estão por construir.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@theme inline`, tokens expostos como utilities)
- **shadcn/ui** primitives customizados para consumir os tokens do NF DS
- **Framer Motion** (`motion/react`) para animações e respeito por `prefers-reduced-motion`
- **lucide-react** · **sonner** (toasts)

## Instalação

```bash
npm install
npm run dev
# http://localhost:3000
```

Scripts disponíveis: `dev`, `build`, `start`, `lint`, `typecheck`.

## NF Design System — integração

Os tokens oficiais do **NF Design System** estão em [app/globals.css](app/globals.css), portados a partir do ficheiro canónico:

```
nf-ds/nossa-ai-design-system/project/colors_and_type.css
```

(Design file original: `https://api.anthropic.com/v1/design/h/0TMff8WbQiNz9sYMhYk-Rw` — bundle "Nossa AI Design System", exportado de claude.ai/design.)

### O que foi integrado sem alterações

- Escalas OKLCH: `--brand-emerald-{50..950}`, `--ink-{0..950}`, accents (mint, spring), signals (success, warning, danger, info)
- Semânticos: `--background`, `--surface*`, `--foreground*`, `--primary*`, `--border*`, `--ring`
- Dark mode via classe `.dark` no `<html>`
- Tipografia: DM Sans (UI), Instrument Serif (display), JetBrains Mono (mono)
- Espaçamento `--space-*`, radius `--radius-*`, sombras `--shadow-*`, motion `--dur-*` + `--ease-*`

### Extensões documentadas para esta landing

No fim da raiz `:root`, sob o comentário **LANDING EXTENSIONS**:

- `--display-xl-*` / `--display-2-*` — escala maior que a display oficial, para headlines editoriais estilo Stripe Press
- `--dur-slower` / `--dur-cinema` — durações mais longas para reveals cinéticos
- `--noise-opacity` — intensidade do grão textural (estilo Resend)
- `--gradient-aurora`, `--gradient-editorial`, `--gradient-text-hero` — gradientes específicos da landing, compostos com tokens OKLCH oficiais

Tokens oficiais não foram modificados. Se surgir necessidade de ajuste, deve ser discutido com os autores do NF DS e propagado ao ficheiro canónico.

### Tokens como utilities Tailwind v4

O bloco `@theme inline` em [app/globals.css](app/globals.css) mapeia as CSS variables para utilities:

```
bg-background · bg-surface · bg-primary · bg-primary-soft
text-foreground · text-foreground-muted · text-primary
border-border · border-border-strong · ring-ring
rounded-[var(--radius-md)] · shadow-[var(--shadow-card)]
```

Classes semânticas de tipografia (`type-display-xl`, `type-h1`, `type-body-lg`, `type-eyebrow`, `type-mono`, etc.) estão definidas no mesmo ficheiro, a partir dos tokens oficiais.

## Estrutura

```
app/
  globals.css        → tokens NF DS + @theme inline + utilities
  layout.tsx         → metadata, Toaster
  page.tsx           → composição da landing (por secções)
components/
  landing/
    Header.tsx       → fixo, blur-on-scroll, mobile menu
    Hero.tsx         → headline cinética + PharmacyGrid
    PharmacyGrid.tsx → 20×20 = 400 células formando a cruz
    LoginDialog.tsx  → 3 tabs (Colaborador / Farmácia / Fornecedor)
    NfMark.tsx       → marca gráfica do logo (SVG inline)
  ui/                → shadcn primitives (Button, Dialog, Tabs, Input, Label)
lib/utils.ts         → cn() com tailwind-merge
public/assets/       → gnf-logo-primary.png, gnf-logo-secondary.png
```

## Extrair a landing para outro projeto

A página foi deliberadamente desenhada para ser **embebida noutro projeto Next.js** sem arrastar rotas externas:

1. Copie `app/globals.css` para o projeto destino (ou faça merge dos tokens `:root` e do bloco `@theme inline` com o `globals.css` existente).
2. Copie o directório `components/landing/` e os componentes de `components/ui/` necessários (Button, Dialog, Tabs, Input, Label).
3. Copie `lib/utils.ts` (ou use o `cn()` já existente no projeto destino).
4. Copie `public/assets/` (logos).
5. Importe `<Header />` e `<Hero />` dentro de qualquer `page.tsx` — nenhum usa `next/link` para rotas específicas; todos os links internos apontam a `#anchors` locais da landing.

Dependências runtime necessárias: `motion`, `lucide-react`, `sonner`, `@radix-ui/react-dialog`, `@radix-ui/react-tabs`, `@radix-ui/react-label`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`.

Para manter a coerência visual, o projeto destino precisa das mesmas fontes (DM Sans, Instrument Serif, JetBrains Mono — carregadas via `@import` do Google Fonts no topo do `globals.css`).

## Acessibilidade

- Semântica HTML (`<main>`, `<nav>`, `<header>`, `<section>` com `aria-label`, `<dl>` para stats)
- Focus states visíveis (ring emerald + outline)
- `prefers-reduced-motion` desactiva animações grandes (regra CSS + hook `useReducedMotion`)
- Contraste validado contra tokens foreground/background em ambos os temas
- Diálogo de login com título/descrição ligados via Radix

## Conteúdo

- PT-pt formal, sem emojis no chrome, sentence case para botões (conforme NF DS SKILL.md)
- Sem lorem ipsum — copy escrito para o Grupo

## Próximos passos

Secções pendentes, na ordem descrita no briefing:
Números · Sobre · Ecossistema (Nossa AI, Addo Log) · Vantagens · Como aderir · Formulário de angariação · Testemunhos · CTA final + Footer.
