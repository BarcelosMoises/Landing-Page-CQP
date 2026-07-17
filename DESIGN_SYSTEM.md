# Design System & Art Direction — CQP (Versão Corrigida)

> Regras estritas de design para o projeto CQP. Inegociável para o LLM.
> Foco: Profissionalismo, Autoridade Técnica e Alta Conversão.

---

## 1. Diretriz de Cores (Proibido o uso de Navy/Azul)
A identidade visual oficial é baseada estritamente no logotipo: Teal/Ciano e Preto/Grafite.

### Cores da Marca (CSS Custom Properties)
*   `--cqp-teal`:       #33B8B8;  /* Ciano oficial da logo - Usar APENAS para CTAs e Destaques */
*   `--cqp-teal-dark`:  #0c6161;  /* Hover states e elementos ativos */
*   `--cqp-black`:      #090A0F;  /* Fundo principal (Substitui o antigo Navy). Um preto rico, premium e denso */
*   `--cqp-carbon`:     #12141C;  /* Fundo secundário para variação de seções e fundos de cards */

### Cores de Interface e Texto
*   `--color-border`:               rgba(51, 184, 184, 0.1);  /* Bordas ultra finas usando o ciano com opacidade baixa */
*   `--color-text-inverse`:         #FFFFFF;                  /* Títulos e textos sobre fundo escuro */
*   `--color-text-muted-on-dark`:   rgba(255, 255, 255, 0.65);/* Corpo de texto e descrições */

> ⚠️ **Regra de Ouro:** Nunca use hexadecimais soltos no código. Sempre referencie as variáveis acima.

---

## 2. Tipografia e Hierarquia Visual
*   **Títulos de Seção (Display):** Use a fonte **Boska** apenas para títulos principais grandes (`--text-xl` para cima).
*   **Interface e Corpo (UI/Body):** Use a fonte **Satoshi** para listagem de cursos, botões, descrições e badges.
*   **Alinhamento:** Textos longos devem ser alinhados à esquerda. O alinhamento centralizado tira o peso profissional do layout.

---

## 3. Arquitetura da Grade de Cursos (239 cursos)
Para gerenciar o grande volume de cursos de forma profissional e sem quebras visuais:
*   **Consistência dos Cards:** Todos os cards devem possuir exatamente o mesmo background (`var(--cqp-carbon)`), borda sutil (`var(--color-border)`) e cantos arredondados de 12px.
*   **Tratamento de Imagens (Cursos Técnicos):** Forçar `aspect-ratio: 16/9` com `object-fit: cover`. NENHUM texto ou logotipo deve estar embutido na imagem do card. Badges e títulos devem ser renderizados puramente via código CSS/Satoshi.
*   **Design Text-First (Pós-Graduações EAD):** Pós-graduações não possuem imagens. O card deve se adaptar de forma elegante, expandindo a tipografia e eliminando qualquer placeholder ou ícone genérico.
*   **Regra de Negócio Automática:** Cursos da categoria 'pos-graduacao' devem exibir obrigatoriamente o badge "EAD".

---

## 4. Anti-padrões Absolutos (O que NÃO fazer)
*   PROIBIDO usar fundos azulados (Navy/Azul-marinho). O fundo deve ser Carbono/Preto Premium.
*   PROIBIDO o uso de glassmorphism excessivo, gradientes espalhafatosos ou fundos translúcidos borrados que prejudiquem a leitura.
*   PROIBIDO o uso de ícones repetitivos (como chapéus de formatura em massa) para suprir a falta de imagens. O design deve ser limpo e tipográfico.