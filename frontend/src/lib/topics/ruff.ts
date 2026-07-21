import { TopicData } from "@/lib/types/topic";

export const ruff: TopicData = {
  slug: "ruff-linter",
  title: "Linter Ruff (uv + ruff)",
  subtitle: "Padronização e qualidade de código Python",
  categorySlug: "backend",
  accent: "#22d3ee",
  image: "/images/ruff.jpg",
  imagePosition: "center",
  quote: {
    text: "Ruff is so fast that sometimes I add an intentional bug in the code just to confirm it's actually running and checking the code.",
    source: "Sebastián Ramírez, criador do FastAPI",
  },
  intro:
    "Ruff é um linter de código Python desenvolvido em Rust, criado para substituir ferramentas como Flake8 e Black com um desempenho muito superior. Ele resolve dois problemas distintos: o check valida imports não utilizados, variáveis em desuso e boas práticas gerais de código, enquanto o format cuida apenas da aparência visual — indentação, uso de aspas, quebra de linha. O ideal é usar os dois em conjunto, já que resolvem problemas complementares.",
  sections: [
    {
      heading: "Instalação",
      body: "A instalação do Ruff pode ser feita via pip, dentro de um ambiente virtual do projeto, ou de forma global usando o uv como gerenciador de ferramentas. Para confirmar que a instalação funcionou, basta verificar a versão instalada.",
      code: `pip install ruff
# ou, instalando globalmente com uv
uv tool install ruff

ruff --version`,
    },
    {
      heading: "Formas de executar o Ruff",
      body: "Existem três formas de rodar o Ruff, cada uma com um propósito. O comando direto usa a instalação global da ferramenta para analisar o diretório atual. Prefixado com uvx, o Ruff é instalado temporariamente, executa o linter completo e é removido em seguida — o equivalente ao npx do Node. Já uv run executa o Ruff dentro do ambiente virtual do projeto, respeitando a versão específica fixada no pyproject.toml.",
      code: `ruff check .        # instalação global, analisa o diretório atual
uvx ruff check .    # instalação temporária (como npx do Node)
uv run ruff check . # executa dentro do venv, versão do pyproject.toml`,
    },
    {
      heading: "Formatação com ruff format",
      body: "O format mexe apenas com validações visuais do código: indentação, uso de aspas, quebra de linha e afins. Ele não altera lógica nem remove nada do seu código — só padroniza a forma como ele é escrito.",
      examples: [
        {
          title: "Verificando o que precisa ser formatado",
          body: "Esse comando verifica, dentro da pasta informada, todos os arquivos que precisam de alterações, sem alterá-los de fato. Lembrando que o último argumento é o nome da pasta/diretório ou arquivo que você quer que o Ruff execute.",
          code: `ruff format --check backend/

# Would reformat: backend/assets/models.py`,
        },
        {
          title: "Visualizando o diff antes de aplicar",
          body: "Para ver exatamente a diferença que o Ruff aplicaria, usamos a flag --diff.",
          code: `ruff format --diff backend/`,
        },
        {
          title: "Aplicando a formatação",
          body: "Para executar o formatter de fato, ajustando os arquivos de acordo com as regras do Ruff, basta rodar o comando apontando para a pasta ou arquivo desejado.",
          code: `ruff format backend/`,
        },
      ],
    },
    {
      heading: "Usando o check do ruff",
      body: "O check valida imports não utilizados, variáveis em desuso e boas práticas gerais de código — problemas de lógica, não de estilo visual.",
      examples: [
        {
          title: "Visão geral com --statistics",
          body: "Antes de sair corrigindo erro por erro, vale rodar o check com a flag --statistics. Ela varre o projeto inteiro e monta um relatório agrupado por tipo de erro, dando um escopo geral dos problemas antes de começar a mexer em qualquer coisa — por isso costuma ser o primeiro comando a rodar num projeto novo.",
          code: `uv run ruff check --statistics backend/

# 17     I001    [*] unsorted-imports
#  6     E501    [ ] line-too-long
#  4     F401    [*] unused-import
#  1     F811    [*] redefined-while-unused
# Found 28 errors.
# [*] 22 fixable with the --fix option.`,
          note: "Resumindo os códigos desse relatório: I001 é bloco de import desorganizado, E501 é linha longa demais, F401 é import não utilizado e F811 é uma redefinição de algo que já tinha sido definido antes e nunca chegou a ser usado. A letra no início do código (E, F, I) indica a categoria da regra, e o número identifica a regra específica dentro dela.",
        },
        {
          title: "Encontrando problemas no código",
          body: "Uma resposta possível do check é essa abaixo, sobre uma importação sem nenhum uso em um arquivo models.py.",
          code: `ruff check backend/

# F401 [*] \`os\` imported but unused
#  --> backend/assets/models.py:2:8
#    |
#  1 | from django.db import models
#  2 | import os
#    |        ^^
#  3 | from costumers.models import CustomUser
#    |
#    help: Remove unused import: \`os\`
#
# Found 1 error.
# [*] 1 fixable with the --fix option.`,
        },
        {
          title: "Visualizando a correção antes de aplicar",
          body: "Para vermos a diferença que o Ruff faria caso corrigíssemos automaticamente, combinamos --fix com --diff.",
          code: `ruff check --fix --diff backend/

# --- backend/assets/models.py
# +++ backend/assets/models.py
# @@ -1,5 +1,4 @@
#  from django.db import models
# -import os
#  from costumers.models import CustomUser
#
# Would fix 1 error.`,
        },
        {
          title: "Aplicando a correção automaticamente",
          body: "Para corrigirmos automaticamente, como a própria ferramenta sugere, basta rodar --fix.",
          code: `ruff check --fix backend/`,
        },
        {
          title: "Organizando imports automaticamente",
          body: "Com a regra I (isort), o Ruff também identifica blocos de import desorganizados ou mal formatados — comum quando vários desenvolvedores editam o mesmo arquivo. O erro I001 indica que o bloco precisa ser reorganizado, e pode ser corrigido com --fix.",
          code: `uv run ruff check --select I backend/assets/models.py

# I001 [*] Import block is un-sorted or un-formatted
#  --> backend/assets/models.py:1:1
#    |
#  1 | / from django.db import models
#  2 | | from costumers.models import CustomUser
#  3 | | import os
#  4 | | import json
#  5 | | from django.db import models
#  6 | | import sys
#  7 | | from django.utils import timezone
#    | |_________________________________^
#  8 |
#  9 |   class TypeAsset(models.TextChoices):
#    |
#    help: Organize imports
#
# Found 1 error.
# [*] 1 fixable with the --fix option.`,
        },
        {
          title: "Correções inseguras com --unsafe-fixes",
          body: "O Ruff distingue entre correções seguras e inseguras. Sempre que rodamos --fix sozinho, estamos aplicando apenas correções seguras — que não mudam a lógica do código nem geram erros novos. Já as correções inseguras podem, em expressões mais complexas, desencadear bugs lógicos. Por isso a recomendação é sempre rodar primeiro com --diff, para ver o que seria alterado antes de aplicar de fato, e depois conferir manualmente se a correção não introduziu nenhum erro de lógica.",
          code: `# visualizando o que as correções inseguras fariam, antes de aplicar
uv run ruff check --fix --unsafe-fixes --diff backend/

# aplicando de fato
uv run ruff check --fix --unsafe-fixes backend/`,
        },
      ],
    },
    {
      heading: "Como ignorar erros",
      body: "Nem todo erro apontado pelo Ruff precisa ser corrigido. Às vezes uma importação não é usada diretamente no arquivo, mas ainda assim é necessária — ou uma regra simplesmente não faz sentido para um trecho específico do projeto. Para esses casos, existem duas formas de ignorar: de forma pontual, direto no código, ou de forma persistente, configurando o pyproject.toml.",
      examples: [
        {
          title: "Ignorando uma linha específica com noqa",
          body: "Às vezes precisamos de uma importação que não é necessariamente utilizada em algum lugar do arquivo, mas que ainda assim é importante para o código. Nesse caso, devemos ignorar apenas esse erro específico com um comentário noqa — F401 se refere ao erro de import não utilizado. Também é possível ignorar de forma mais genérica, omitindo o código do erro, mas aí qualquer regra que o Ruff aponte naquela linha é silenciada.",
          code: `import os  # noqa: F401

# de forma mais genérica: ignora qualquer erro nessa linha
import os  # noqa`,
          note: "Também dá pra ignorar mais de uma regra na mesma linha, separando os códigos por vírgula: # noqa: F401, E501.",
        },
        {
          title: "Ignorando o arquivo inteiro",
          body: "Quando o problema não é uma linha específica, mas o arquivo inteiro, o comentário # ruff: noqa no topo do arquivo ignora todas as regras naquele arquivo. Do mesmo jeito que o noqa de linha, também dá pra restringir a uma regra específica em vez de ignorar tudo.",
          code: `# opção 1 — ignora todas as regras nesse arquivo inteiro
# ruff: noqa

# opção 2 — ignora apenas uma regra específica nesse arquivo inteiro
# ruff: noqa: F401`,
        },
        {
          title: "Ignorando uma regra em todo o projeto",
          body: "A outra forma de ignorar é customizando o pyproject.toml. Para ignorar uma regra de forma global — nesse exemplo, o F401 (imports não usados) — o linter do Ruff passa a ignorar essa regra em todos os lugares do projeto.",
          code: `[tool.ruff.lint]
ignore = ["F401"]`,
          language: "toml",
        },
        {
          title: "Ignorando uma regra em uma pasta específica",
          body: "Também é possível ignorar uma regra específica apenas dentro de uma pasta específica do projeto — como as migrations, por exemplo.",
          code: `[tool.ruff.lint.per-file-ignores]
"**/migrations/*.py" = ["E501", "F401"]`,
          language: "toml",
        },
        {
          title: "Excluindo pastas inteiras da análise",
          body: "O per-file-ignores ainda analisa o arquivo, só ignora regras específicas nele. Já o extend-exclude tira a pasta inteira do escopo do Ruff — ele nem chega a abrir esses arquivos. Faz sentido pra pastas de migrations, vendor ou qualquer código gerado automaticamente que não faz sentido lintar. Vale usar extend-exclude em vez de exclude: o extend-exclude soma à lista padrão de exclusões do Ruff (como .git e __pycache__), enquanto exclude substitui essa lista inteira.",
          code: `[tool.ruff]
extend-exclude = ["**/migrations/*.py", "vendor/"]`,
          language: "toml",
        },
        {
          title: "Definindo comprimento de linha e regras habilitadas",
          body: "Também podemos dizer o limite de caracteres por linha que queremos, junto com algumas configurações adicionais. Por padrão, o Ruff usa 88 como o número limite de caracteres dentro de uma linha, mas isso pode ser customizado. O select, por padrão, habilita o E (estilos: espaçamento, linhas em branco, comprimento de linha...) e o F (formatações lógicas: import não usado, variável definida mas não lida, nome não definido...). Aqui habilitamos também o I (imports: ordem errada, mistura de pacotes externos com internos de forma bagunçada, imports duplicados...) e ignoramos de forma global o erro E501.",
          code: `[tool.ruff]
line-length = 88

[tool.ruff.lint]
select = ["E", "F", "I"]
ignore = ["E501"]`,
          language: "toml",
        },
      ],
    },
    {
      heading: "Ruff no CI/CD",
      body: "Aqui configuramos um step de linter dentro do CI: durante um job do GitHub Actions, o Ruff roda à procura de erros no código e, caso encontre algum, quebra o step para que o desenvolvedor corrija e envie o código formatado corretamente, de acordo com as regras configuradas.",
      examples: [
        {
          title: "Step de linter no GitHub Actions",
          body: "O primeiro comando instala o uv de forma silenciosa, com a flag --quiet. Em seguida rodamos uvx ruff check backend/ — usamos o uvx para que, no momento do CI, o uv instale o Ruff de forma temporária, sem deixar nada permanente no runner. Se o check encontrar algum problema, o step quebra ali mesmo: como o GitHub Actions roda cada step de run com bash -e por padrão, se o check falhar o format --check nem chega a rodar naquela execução. Só quando o check passa é que o format --check roda, validando a formatação. Se os dois comandos passarem, o código está de acordo com as regras do Ruff e o step é aprovado.",
          code: `- name: Ruff
  run: |
    pip install uv --quiet
    uvx ruff check backend/
    uvx ruff format --check backend/`,
          language: "yaml",
        },
      ],
    },
  ],
  relatedSlugs: ["pytest"],
};
