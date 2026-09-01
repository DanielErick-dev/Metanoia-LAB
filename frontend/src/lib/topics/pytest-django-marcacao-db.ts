import { TopicData } from "@/lib/types/topic";

export const pytestDjangoMarcacaoDb: TopicData = {
  slug: "marcacao-django-db",
  title: "Capítulo 2 — Testando o banco de dados com @pytest.mark.django_db",
  subtitle: "A marcação que libera acesso ao banco de dados de teste",
  categorySlug: "pytest-django",
  accent: "#eab308",
  status: "em-construcao",
  intro:
    "Por padrão, o pytest-django não permite testes diretamente no banco de dados por segurança, para evitar escrita acidental no banco durante os testes. Para contornarmos isso, o pytest-django nos fornece uma marcação para fazermos os nossos testes envolvendo banco de dados.",
  sections: [
    {
      heading: "A marcação django_db",
      body: "Nós importamos o objeto User padrão do Django junto com nosso pytest e usamos o seguinte decorator: @pytest.mark.django_db, que nos dá acesso ao banco de dados temporário. Assim, no primeiro código estamos criando um usuário usando o objeto User, em seguida verificando a quantidade de usuários criados e verificando se a quantidade é igual a 1, enquanto no segundo teste nós apenas pegamos a quantidade de usuários e verificamos se a quantidade é 0.",
      code: `import pytest
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_user_create():
    User.objects.create_user('test', 'test@test.com', 'test')
    count = User.objects.all().count()
    print(f'\\nquantidade de usuários: {count}')
    assert User.objects.count() == 1

@pytest.mark.django_db
def test_user_create1():
    count = User.objects.all().count()
    print(f'\\nquantidade de usuários: {count}')
    assert count == 0`,
      language: "python",
    },
    {
      heading: "Por que o segundo teste não vê o usuário do primeiro",
      body: "Inicialmente pode parecer que o teste irá falhar, mas vejamos o resultado:",
      code: `uv run pytest tests/test_django_db.py -v -s

# tests/test_django_db.py::test_user_create Creating test database for alias 'default'...
#
# quantidade de usuários: 1
# PASSED
# tests/test_django_db.py::test_user_create1
# quantidade de usuários: 0
# PASSED Destroying test database for alias 'default'...
#
# 2 passed`,
      language: "bash",
      examples: [
        {
          title: "O motivo do isolamento",
          body: "Observe que ambos os testes passaram. Então surge a seguinte pergunta: se ambos os testes usam o mesmo banco de dados temporário, por que o segundo teste não deu count = 1, já que um usuário tinha sido criado no primeiro teste? Acontece que cada teste marcado com @pytest.mark.django_db roda dentro de uma transação de banco, e no final do teste o pytest-django roda um rollback para desfazer o que foi escrito de forma automática. Dessa forma, um teste não compromete o outro teste, e ao final o banco de dados é destruído, como você pode verificar no final do comando do próprio pytest.",
          code: `# cada teste roda dentro da sua própria transação:
# 1. pytest-django abre uma transação
# 2. o teste roda e escreve no banco
# 3. no fim do teste, pytest-django faz rollback da transação
# 4. o próximo teste começa "limpo", sem o que o anterior escreveu`,
          language: "text",
        },
      ],
    },
  ],
  relatedSlugs: ["configuracao", "pytest"],
};
