# Guia de Contribuição — CQP Landing Page

> Como adicionar cursos, editar conteúdo, fazer deploy e manter o projeto.
> Escrito para colaboradores sem experiência prévia com o projeto.

---

## Adicionar um Novo Curso

Todo o catálogo de cursos está centralizado em **`data/cursos.ts`**. Não edite o HTML.

### 1. Abra `data/cursos.ts`

Escolha o array correspondente à categoria do novo curso:

| Categoria | Array |
|---|---|
| Curso técnico | `CURSOS_TECNICOS` |
| Profissionalizante | `CURSOS_PROFISSIONALIZANTES` |
| Treinamento / NR | `CURSOS_TREINAMENTOS` |
| Graduação / Tecnólogo / Pós | `CURSOS_GRADUACOES` |
| Idioma | `CURSOS_IDIOMAS` |
| Kids | `CURSOS_KIDS` |

### 2. Adicione um objeto `Curso`

```ts
{
  id: 'tec-novo-curso',            // único, kebab-case: prefixo-nome
  nome: 'Nome do Curso',
  categoria: 'tecnicos',           // slug da categoria
  imagem: '/images/novo-curso.jpg',// coloque a imagem em /public/images/
  modalidades: ['presencial'],     // 'presencial' | 'online' | 'hibrido'
  extra: '40h',                    // duração, certificação ou faixa etária (opcional)
},
```

### 3. Adicione a imagem

Coloque o arquivo em `public/images/` com o mesmo nome que você usou no campo `imagem`.

- Formato: JPG ou WebP
- Dimensões recomendadas: **400×300px** (proporção 4:3)
- Peso máximo: **80 KB**

### 4. Salve e verifique

```bash
npm run dev
```

Abra `http://localhost:4321`, vá até a seção de cursos e confirme que o novo curso aparece na aba correta e na busca.

---

## Atualizar o Número de WhatsApp

O número está em uma única constante em `data/cursos.ts`:

```ts
const WA_NUMBER = '5522999999999'; // formato: código país + DDD + número (sem espaços ou traços)
```

Alterado aqui, todos os botões do site são atualizados automaticamente.

---

## Atualizar Informações da Escola

Nome, cidade, e-mail, redes sociais → edite `data/escola.ts` (quando criado).

---

## Estrutura de Branches

```
main                  ← protótipo original (HTML + Bootstrap)
feat/modernization    ← versão modernizada (Astro + Tailwind + TypeScript)
```

**Nunca faça commits diretamente em `main`.**

Fluxo recomendado:

```bash
# 1. Crie uma branch para sua alteração
git checkout feat/modernization
git pull origin feat/modernization
git checkout -b fix/nome-da-correcao

# 2. Faça as alterações e commite
git add .
git commit -m "fix: descrição da correção"

# 3. Abra um Pull Request para feat/modernization no GitHub
```

---

## Padrão de Commits

Use o padrão **Conventional Commits**:

| Prefixo | Quando usar |
|---|---|
| `feat:` | Nova funcionalidade ou novo curso |
| `fix:` | Correção de bug ou erro de conteúdo |
| `docs:` | Alteração em arquivos `.md` |
| `style:` | Mudança de CSS/Tailwind sem alterar lógica |
| `refactor:` | Refatoração de código sem mudar comportamento |
| `chore:` | Atualização de dependências, configurações |

Exemplos:
```
feat: adicionar curso NR-38 em CURSOS_TREINAMENTOS
fix: corrigir link WhatsApp do curso de Enfermagem
docs: atualizar CONTENT.md com novo número de contato
style: ajustar espaçamento da seção de depoimentos no mobile
```

---

## Deploy

### Opção 1 — Vercel (recomendado)

1. Acesse [vercel.com](https://vercel.com) e conecte sua conta GitHub.
2. Importe o repositório `Landing-Page-CQP`.
3. Configure:
   - **Framework Preset**: Astro
   - **Branch de deploy**: `feat/modernization` (ou `main` após o merge)
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. Clique em **Deploy**.

A partir daí, cada commit na branch configurada dispara um novo deploy automaticamente.

### Opção 2 — Netlify

1. Acesse [netlify.com](https://netlify.com) e conecte o GitHub.
2. Importe o repositório.
3. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Clique em **Deploy site**.

### Opção 3 — GitHub Pages (limitado)

GitHub Pages não suporta roteamento dinâmico do Astro out-of-the-box. Para sites puramente estáticos (sem rotas dinâmicas), adicione ao `astro.config.mjs`:

```js
export default defineConfig({
  output: 'static',
  site: 'https://barcelosmoises.github.io',
  base: '/Landing-Page-CQP',
});
```

---

## Checklist antes de abrir um Pull Request

- [ ] `npm run build` termina sem erros
- [ ] Novo curso aparece na aba correta e na busca
- [ ] Imagem do curso está em `public/images/` com dimensões corretas
- [ ] Link WhatsApp do novo curso abre com a mensagem pré-preenchida
- [ ] Página funciona em mobile (375px) e desktop (1280px)
- [ ] Nenhum valor hexadecimal hardcoded no código novo — apenas tokens CSS ou classes Tailwind
