import { TopicData } from "@/lib/types/topic";

export const pytestDjangoConfiguracao: TopicData = {
  slug: "configuracao",
  title: "Capítulo 1 — Configurando o projeto",
  subtitle: "Criando um projeto Django pequeno para testar com pytest",
  categorySlug: "pytest-django",
  accent: "#eab308",
  status: "em-construcao",
  intro:
    "O pytest-django é um plugin do pytest que integra o Django ao ecossistema de testes do pytest — em vez do TestCase e do estilo unittest que vêm nativos do Django, você escreve os testes com fixtures, assert simples e toda a sintaxe do pytest que já usamos, mas com acesso total ao banco de dados de teste e às ferramentas do Django por baixo dos panos. Vamos realizar testes unitários dentro do ecossistema Django, começando por um projeto pequeno de exemplo.",
  sections: [
    {
      heading: "Criando o projeto",
      body: "Os passos abaixo criam a pasta do projeto, iniciam o uv, adicionam o Django como dependência normal e o pytest com o pytest-django como dependências de desenvolvimento, criam o projeto e um app Django simples, e rodam a migração inicial (usa SQLite por padrão, não precisa configurar nada).",
      code: `# 1. criar e entrar na pasta
mkdir django_pytest_pratica
cd django_pytest_pratica

# 2. iniciar o projeto com uv
uv init

# 3. adicionar o Django como dependência normal
uv add django

# 4. adicionar pytest e pytest-django como dependências de dev
uv add --dev pytest pytest-django

# 5. criar o projeto Django (o "." evita uma pasta extra redundante)
uv run django-admin startproject mysite .

# 6. criar um app simples pra ter algo real pra testar
uv run python manage.py startapp core

# 7. rodar a migração inicial (usa SQLite por padrão, não precisa configurar nada)
uv run python manage.py migrate`,
      language: "bash",
    },
    {
      heading: "Ajustes manuais",
      body: "Depois desses comandos, dois ajustes manuais nos arquivos: em mysite/settings.py, adicione 'core' na lista INSTALLED_APPS; e no pyproject.toml, adicione a configuração abaixo.",
      code: `[tool.pytest.ini_options]
DJANGO_SETTINGS_MODULE = "mysite.settings"`,
      language: "toml",
    },
    {
      heading: "Validando a configuração",
      body: "Por fim, valide a configuração rodando o pytest. Saída esperada, ainda sem nenhum teste escrito:",
      code: `uv run pytest

# platform linux -- Python 3.14.3, pytest-9.1.1, pluggy-1.6.0
# django: version: 6.1, settings: mysite.settings (from ini)
# plugins: django-4.14.0
# collected 0 items
#
# no tests ran in 0.05s`,
      language: "bash",
    },
  ],
  relatedSlugs: ["pytest"],
};
