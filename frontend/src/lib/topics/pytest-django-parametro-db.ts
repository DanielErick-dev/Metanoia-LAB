import { TopicData } from "@/lib/types/topic";

export const pytestDjangoParametroDb: TopicData = {
  slug: "parametro-db",
  title: "Capítulo 3 — O parâmetro db em fixtures e testes",
  subtitle: "Uma alternativa ao @pytest.mark.django_db",
  categorySlug: "pytest-django",
  accent: "#eab308",
  status: "em-construcao",
  intro:
    "Além da marcação django_db, temos uma outra forma de conseguirmos fazer testes no banco de dados: através do parâmetro db dentro de uma fixture.",
  sections: [
    {
      heading: "Usando db numa fixture",
      body: "Quando, através de uma fixture, nós recebemos por parâmetro o db (ele não é importado, o próprio pytest desenrola pra gente), e retornamos um usuário criado, quando inserimos a nossa fixture dentro do nosso teste podemos alterar a senha desse usuário e em seguida verificar se a senha foi corretamente trocada. Observe que o teste não precisa declarar @pytest.mark.django_db, isso porque ele recebe como parâmetro a fixture que já tem o db como parâmetro — então quaisquer testes que usem essa fixture com db não precisarão usar o decorator.",
      code: `@pytest.fixture()
def user_1(db):
    return User.objects.create_user('test-user')

def test_set_check_password(user_1):
    user_1.set_password('new-password')
    assert user_1.check_password('new-password') is True`,
      language: "python",
    },
    {
      heading: "Usando db diretamente numa função de teste",
      body: "Outro detalhe é que podemos colocar um db como parâmetro em qualquer função de teste, e não somente em fixtures, dessa forma, por exemplo:",
      code: `def test_set_check_password(db):
    user_1 = User.objects.create_user('test-user')
    user_1.set_password('new-password')
    assert user_1.check_password('new-password') is True`,
      language: "python",
    },
    {
      heading: "Cuidado com scope session",
      body: "Aqui vale uma última consideração: não se deve tentar utilizar scope session em uma fixture que tenha db, isso porque o pytest-django, ao utilizar a fixture universal db, já a prende como function. Caso tentemos colocar scope session, ele retorna o seguinte:",
      code: `ScopeMismatch: You tried to access the function scoped fixture db with a session scoped request object. Requesting fixture stack:
tests/test_django_db.py:18:  def user_1(db)
Requested fixture:
../.venv/lib/python3.14/site-packages/pytest_django/fixtures.py:379:  def db(_django_db_helper: 'None') -> 'None'`,
      language: "text",
      examples: [
        {
          title: "Conclusão",
          body: "Então utilizamos apenas o padrão, que é function mesmo.",
          code: `@pytest.fixture()
def user_1(db):
    return User.objects.create_user('test-user')`,
          language: "python",
        },
      ],
    },
  ],
  relatedSlugs: ["marcacao-django-db", "pytest"],
};
