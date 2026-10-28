# AGENTS.md — Authentication-Form

Este arquivo orienta agentes de IA (OpenCode) e desenvolvedores sobre o projeto: contexto, arquitetura, stack, design tokens e regras. **Leia por completo antes de gerar ou alterar código.**

---

## 1. Visão geral

**Nome do projeto:** `Authentication-Form`

**Objetivo:** Desenvolver uma interface de autenticação com telas de **Sign In** e **Sign Up**, usando React + JavaScript + Tailwind CSS + Vite.

A aplicação é construída por **composição**:

- `Input`, `Button` e `SocialButton` são componentes básicos reutilizáveis.
- `SignInForm` e `SignUpForm` combinam esses componentes.
- `AuthPage` controla qual formulário é exibido.

### Resultado esperado

Uma SPA de autenticação responsiva com:

- Telas de Sign In e Sign Up
- Alternância entre as telas sem reload
- Componentes reutilizáveis
- Tailwind CSS
- Inputs controlados
- Validação de campos
- Feedback de erro
- Estado de loading
- Estrutura de pastas organizada

### Fora de escopo

- **Não há backend.** O submit é validado no cliente e inspecionado via `console.log`.
- Não implementar roteamento por URL (a alternância é por estado).

---

## 2. Stack tecnológica

| Camada | Tecnologia |
| --- | --- |
| Biblioteca UI | React |
| Linguagem | JavaScript (ES Modules, **sem TypeScript**) |
| Estilização | Tailwind CSS (integração via `@tailwindcss/vite`) |
| Bundler / Dev server | Vite |
| Tipografia | Inter (Google Fonts) |

### Regras da stack

- Usar a integração atual do Tailwind: plugin **`@tailwindcss/vite`** com `@import "tailwindcss";` em `src/index.css`. **Não** usar PostCSS + `tailwind.config.js` no formato antigo.
- Design tokens são definidos com a diretiva `@theme` no `index.css` (ver seção 5).
- Componentes funcionais com hooks. Sem class components.
- Arquivos de componentes em `.jsx`, nome em PascalCase, um componente por arquivo, com `export default`.

---

## 3. Arquitetura

### 3.1 Estrutura de pastas

```
auth-forms-app/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AuthBadge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── SocialButton.jsx
│   │   ├── auth/
│   │   │   ├── AuthDivider.jsx
│   │   │   ├── SignInForm.jsx
│   │   │   ├── SignUpForm.jsx
│   │   │   └── SocialLogin.jsx
│   │   └── layout/
│   │       └── BackgroundEffects.jsx
│   ├── pages/
│   │   └── AuthPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── AGENTS.md
└── README.md
```

### 3.2 Responsabilidade de cada componente

**`components/ui/` — componentes básicos (sem regra de negócio)**

| Componente | Responsabilidade |
| --- | --- |
| `Input` | Label + campo + mensagem de erro. Controlado via props (`value`, `onChange`). Suporta `type`, `placeholder`, `error`, `id`, `name`. |
| `Button` | Botão principal (amarelo). Props: `children`, `type`, `loading`, `disabled`. Exibe estado de loading. |
| `SocialButton` | Botão quadrado 56×56 com ícone/letra (G, A, f). Props: `label`, `icon`, `onClick`. |
| `AuthBadge` | Pill "AUTHENTICATION UI" (canto superior esquerdo). |

**`components/auth/` — composição**

| Componente | Responsabilidade |
| --- | --- |
| `SignInForm` | Compõe `Input` (email, senha), linha "Remember me / Forgot password?", `Button`, `AuthDivider`, `SocialLogin` e link "Sign Up". |
| `SignUpForm` | Compõe `Input` (nome, email, senha), `Button`, `AuthDivider`, `SocialLogin` e link "Sign In". |
| `AuthDivider` | Divisor com texto "OR CONTINUE WITH". |
| `SocialLogin` | Agrupa os 3 `SocialButton` (G, A, f). |

**`components/layout/`**

| Componente | Responsabilidade |
| --- | --- |
| `BackgroundEffects` | Renderiza os dois glows decorativos (amarelo e azul) sobre o fundo `#000814`. |

**`pages/AuthPage.jsx`**

- Detém o estado que alterna entre `"signin"` e `"signup"`.
- Renderiza `BackgroundEffects`, `AuthBadge`, o indicador superior direito (**SIGN IN** ou **SIGN UP**) e o formulário ativo centralizado.
- Passa callbacks (ex.: `onSwitchToSignUp`, `onSwitchToSignIn`) aos formulários.

### 3.3 Regras de arquitetura

1. Criar os componentes de `ui/` **antes** dos formulários completos.
2. `SignInForm` e `SignUpForm` são **componentes de composição**: não repetir `<input>`, estilos de botão ou botões sociais diretamente neles — reutilizar `Input`, `Button` e `SocialButton`.
3. O estado de alternância Sign In / Sign Up fica **somente** em `AuthPage`.
4. O estado dos campos (valores, erros, loading) fica **no formulário ao qual pertence** (`useState` local).
5. Todos os inputs são **controlados**.
6. A label **AUTHENTICATION UI** deve existir desde a primeira versão visual estática.
7. Sem backend: no submit, validar e então `console.log` dos dados (nunca logar a senha em texto puro — mascarar ou omitir).
8. **Nunca armazenar senha em `localStorage`** (nem em `sessionStorage` ou cookies).
9. Não substituir o background do Figma por outro gradiente.

### 3.4 Fluxo de dados

```
AuthPage (mode: "signin" | "signup")
 ├── BackgroundEffects
 ├── AuthBadge
 ├── Indicador (SIGN IN / SIGN UP)
 └── SignInForm | SignUpForm   ← estado dos campos, erros e loading
      ├── Input (xN)
      ├── Button
      ├── AuthDivider
      └── SocialLogin → SocialButton (x3)
```

---

## 4. Comportamento e validação

### Sign In
- Campos: **Email Address**, **Password**.
- Extras: checkbox/label "Remember me" e link "Forgot password?".
- Validações: e-mail obrigatório e em formato válido; senha obrigatória.

### Sign Up
- Campos: **Full Name**, **Email Address**, **Password**.
- Validações: nome obrigatório (mín. 2 caracteres); e-mail válido; senha com mínimo de 8 caracteres.

### Comum
- Erros aparecem abaixo do campo correspondente, com cor de erro dos tokens.
- Ao enviar: bloquear múltiplos submits, exibir `loading` no `Button` (simular com `setTimeout`), e ao final `console.log` dos dados válidos.
- Limpar o erro do campo quando o usuário voltar a digitar.
- Alternar entre Sign In / Sign Up **sem reload** e sem perder consistência visual do card.
- Acessibilidade: `label` associada ao `input` (`htmlFor`/`id`), `aria-invalid` e `aria-describedby` nos erros, foco visível, botões com `type` explícito.

---

## 5. Design tokens

> Fonte: especificação do Figma + imagens de referência (telas Sign In e Sign Up). As imagens fornecidas são o **padrão visual oficial**. Valores de cor marcados como *(estimado)* foram inferidos das imagens; ajustar se o Figma indicar outro valor.

### 5.1 Artboard e layout

| Token | Valor |
| --- | --- |
| Artboard de referência | 1440 × 1024 px |
| Card — largura | 480 px |
| Card — padding horizontal | 30 px |
| Card — padding topo | 34 px |
| Card — padding base | 30 px |
| Card — border-radius | 24 px |
| Card — gap entre blocos | 18 px |
| Altura do `SignInForm` (sem erros) | ≈ 594 px |
| Altura do `SignUpForm` (sem erros) | ≈ 652 px |

### 5.2 Cores

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-bg` | `#000814` | Background principal da página |
| `--color-primary` | `#FFD60A` | Botão principal, títulos, links, ícones sociais, badge |
| `--color-on-primary` | `#000814` | Texto sobre o botão amarelo |
| `--color-surface` | `#001233` *(estimado)* | Fundo do card |
| `--color-field` | `#001D3D` *(estimado)* | Fundo dos inputs e botões sociais |
| `--color-border` | `#003566` *(estimado, usar com opacidade ~40–60%)* | Bordas de card, inputs e botões sociais |
| `--color-text` | `#FFFFFF` | Labels e texto principal |
| `--color-text-muted` | `#94A3B8` *(estimado)* | Subtítulo, placeholders, "Remember me", divisor |
| `--color-glow-yellow` | `#FFD60A` (baixa opacidade) | Glow amarelo |
| `--color-glow-blue` | `#003566` / azul `#0A4FA3` (baixa opacidade) *(estimado)* | Glow azul |
| `--color-error` | `#FF6B6B` *(sugerido)* | Mensagens de erro e borda de input inválido |

### 5.3 Efeitos de fundo (`BackgroundEffects`)

| Elemento | Especificação |
| --- | --- |
| Glow amarelo | 520 × 520 px; posição aproximada `left: -120px; top: -130px`; `blur: 100px`; círculo (`rounded-full`); opacidade baixa |
| Glow azul | 600 × 600 px; parcialmente fora do canto inferior direito; `blur: 120px`; círculo; opacidade baixa |

Regras: `position: absolute`/`fixed`, `pointer-events: none`, `z-index` abaixo do conteúdo, container com `overflow: hidden`.

### 5.4 Elementos de interface

| Elemento | Especificação |
| --- | --- |
| **Badge "AUTHENTICATION UI"** | `left: 56px; top: 48px`; pill amarela translúcida (`#FFD60A` com ~15% de opacidade), borda amarela translúcida, `border-radius: 999px`; texto amarelo, maiúsculas, ~12px, `font-weight` 600, `letter-spacing` leve |
| **Indicador superior direito** | Texto "SIGN IN" ou "SIGN UP", maiúsculas, ~12px, `font-weight` 600, cor `text-muted` claro; alinhado à direita (≈ 56px de margem) |
| **Título do card** ("Welcome Back" / "Create Account") | Amarelo `#FFD60A`, ~32px, `font-weight` 800 |
| **Subtítulo** | `text-muted`, ~15px, `font-weight` 400 |
| **Input — label** | 13px, branca, `font-weight` 500; gap de **8px** até o campo |
| **Input — campo** | Altura **56px**, `border-radius: 12px`, fundo `field`, borda `border`, padding horizontal ~16px, texto branco, placeholder `text-muted`; foco com borda amarela |
| **Botão principal** | Altura **56px**, largura 100%, `border-radius: 12px`, fundo `#FFD60A`, texto `#000814`, ~15px, `font-weight` 700, leve sombra/glow amarelo |
| **Botão social** | **56 × 56 px**, `border-radius: 14px`, fundo `field`, borda `border`, ícone/letra amarela (G, A, f); **gap de 14px** entre botões; centralizados |
| **Divisor** | Texto "OR CONTINUE WITH" ~11px, maiúsculas, `text-muted`, com linhas finas (`border`) dos dois lados |
| **Links** ("Forgot password?", "Sign Up", "Sign In") | Amarelo, `font-weight` 700, ~13–14px |
| **Rodapé do card** | "Don't have an account? **Sign Up**" / "Already have an account? **Sign In**" — texto `text-muted` ~13px + link amarelo |

### 5.5 Tipografia

- **Família:** Inter (carregar via Google Fonts em `index.html` com pesos 400, 500, 600, 700, 800).
- **Fallback:** `ui-sans-serif, system-ui, sans-serif`.

| Papel | Tamanho | Peso |
| --- | --- | --- |
| Título do card | 32px | 800 |
| Subtítulo | 15px | 400 |
| Label de input | 13px | 500 |
| Texto de input | 15px | 400 |
| Botão principal | 15px | 700 |
| Badge / indicador | 12px | 600 |
| Divisor | 11px | 500 |

### 5.6 Exemplo de tokens no Tailwind (`src/index.css`)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --color-bg: #000814;
  --color-surface: #001233;
  --color-field: #001d3d;
  --color-border: #003566;
  --color-primary: #ffd60a;
  --color-on-primary: #000814;
  --color-muted: #94a3b8;
  --color-error: #ff6b6b;

  --radius-card: 24px;
  --radius-field: 12px;
  --radius-social: 14px;

  --spacing-field: 56px;
}

body {
  @apply bg-bg font-sans text-white antialiased;
}
```

---

## 6. Responsividade

- Desktop (referência 1440 × 1024): card centralizado, 480px de largura.
- Mobile/tablet: card com `w-full max-w-[480px]` e margem lateral mínima de 16px; badge e indicador reduzem a margem lateral; glows mantêm proporção e não geram scroll horizontal.
- Manter alturas de campos e botões (56px) em todos os breakpoints.

---

## 7. Convenções de código

- JavaScript moderno (ES2020+), ESLint padrão do template Vite.
- Tailwind: classes utilitárias no JSX; usar tokens do `@theme` (`bg-surface`, `text-primary`, `rounded-card` etc.) em vez de valores soltos quando existir token. Valores arbitrários (`h-[56px]`) apenas quando necessário.
- Props documentadas de forma clara (nomes autoexplicativos). Sem `PropTypes` obrigatório.
- Não duplicar estilos: se um padrão aparece 2+ vezes, extrair para componente.
- Commits pequenos e descritivos (sugestão: Conventional Commits).
- Não instalar dependências além das necessárias sem justificativa (stack base: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`).

---

## 8. Comandos

```bash
npm install        # instalar dependências
npm run dev        # servidor de desenvolvimento (Vite)
npm run build      # build de produção
npm run preview    # pré-visualizar o build
```

---

## 9. Ordem de implementação sugerida

1. Setup: Vite + React + Tailwind (`@tailwindcss/vite`), fonte Inter, tokens no `index.css`.
2. `BackgroundEffects` e `AuthBadge` (versão visual estática).
3. Componentes básicos: `Input`, `Button`, `SocialButton`.
4. `AuthDivider` e `SocialLogin`.
5. `SignInForm` e `SignUpForm` (visual estático, conferindo alturas ≈ 594px / ≈ 652px).
6. `AuthPage` com alternância de estado e indicador superior direito.
7. Inputs controlados, validação, mensagens de erro e estado de loading.
8. Responsividade, acessibilidade e revisão final contra as imagens de referência.
9. `README.md` com instruções de uso.

---

## 10. Checklist de revisão (Definition of Done)

- [ ] Fundo `#000814` com dois glows (amarelo e azul), sem outro gradiente
- [ ] Badge "AUTHENTICATION UI" posicionada em `left: 56px; top: 48px`
- [ ] Indicador "SIGN IN" / "SIGN UP" no canto superior direito
- [ ] Card com 480px, paddings 30/34/30, radius 24px e gap 18px
- [ ] Inputs: label 13px, gap 8px, campo 56px, radius 12px
- [ ] Botão principal: 56px, radius 12px, `#FFD60A` / texto `#000814`
- [ ] Botões sociais: 56×56, radius 14px, gap 14px
- [ ] Fonte Inter aplicada
- [ ] Sem `<input>`/botões duplicados nos formulários (uso de componentes)
- [ ] Estado de alternância apenas em `AuthPage`; estado dos campos nos formulários
- [ ] Validação, erros e loading funcionando; submit inspecionável no console
- [ ] Senha nunca armazenada em `localStorage`
- [ ] Layout responsivo sem scroll horizontal