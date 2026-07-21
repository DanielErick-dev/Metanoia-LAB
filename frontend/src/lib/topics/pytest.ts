import { TopicData } from "@/lib/types/topic";

export const pytest: TopicData = {
  slug: "pytest",
  title: "Testes com Pytest",
  subtitle: "Framework de testes profissional para Python",
  categorySlug: "backend",
  accent: "#eab308",
  quote: {
    text: "Um framework de testes que executa arquivos e funções, testando o comportamento real do seu projeto.",
    source: "Pytest — Testing Framework",
  },
  intro:
    "Pytest é um framework profissional para testes em Python. Ele percorre o projeto em busca de arquivos e funções de teste, executa cada um e reporta o que passou e o que falhou — a base de qualquer fluxo sério de qualidade de código.",
  sections: [
    {
      heading: "Instalação",
      body: "A instalação pode ser feita com o uv, adicionando o Pytest como dependência de desenvolvimento, ou via pip. Para confirmar que a instalação funcionou, verificamos a versão instalada.",
      code: `uv add --dev pytest
# ou
pip install pytest

pytest --version
# ou
uv run pytest --version`,
    },
    {
      heading: "Como o pytest encontra os testes",
      body: "Para o Pytest encontrar os testes dentro do projeto, o arquivo precisa começar com test_, e as funções de teste também precisam começar com test_. Abaixo, um arquivo test_sample.py com uma função func que recebe um parâmetro x e retorna x + 1, e um teste que chama func(3) e verifica (assert) se o retorno é igual a 4.",
      code: `def func(x):
    return x + 1

def test_answer():
    assert func(3) == 4`,
    },
    {
      heading: "Testando orientação a objetos",
      body: "Num arquivo carrinho.py, temos uma classe Produto (com nome e preço) e uma classe CarrinhoDeCompras, com métodos para adicionar produtos e calcular o total — com ou sem desconto percentual.",
      code: `class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

class CarrinhoDeCompras:
    def __init__(self):
        self.produtos = []

    def adicionar_produto(self, produto):
        self.produtos.append(produto)

    def calcular_total(self, desconto_percentual=0):
        total = sum(produto.preco for produto in self.produtos)

        valor_desconto = total * (desconto_percentual / 100)
        return total - valor_desconto`,
      examples: [
        {
          title: "Testando o total sem desconto",
          body: "Instanciamos o carrinho e dois produtos (10 e 20 reais), adicionamos ambos ao carrinho e verificamos se calcular_total() retorna a soma exata: 30.0.",
          code: `from carrinho import Produto, CarrinhoDeCompras

def test_calcular_total_sem_desconto():
    carrinho = CarrinhoDeCompras()
    produto1 = Produto("Produto 1", 10.0)
    produto2 = Produto("Produto 2", 20.0)

    carrinho.adicionar_produto(produto1)
    carrinho.adicionar_produto(produto2)

    total = carrinho.calcular_total()
    assert total == 30.0`,
        },
        {
          title: "Testando o total com desconto",
          body: "Mesmo carrinho, mas passando desconto_percentual=10. 10% de 30 reais é 3 reais, então o total esperado com desconto é 27.0.",
          code: `def test_calcular_total_com_desconto():
    carrinho = CarrinhoDeCompras()
    produto1 = Produto("Produto 1", 10.0)
    produto2 = Produto("Produto 2", 20.0)

    carrinho.adicionar_produto(produto1)
    carrinho.adicionar_produto(produto2)

    total_com_desconto = carrinho.calcular_total(desconto_percentual=10)
    assert total_com_desconto == 27.0`,
        },
      ],
    },
    {
      heading: "Rodando os testes",
      body: "Rodamos com uv run pytest ou apenas pytest, dependendo de como foi instalado. O Pytest percorre o diretório atual em busca de arquivos test_*.py e funções test_*, executa cada um e reporta o resultado.",
      code: `uv run pytest

# ================================= test session starts =================================
# platform linux -- Python 3.14.3, pytest-9.1.1, pluggy-1.6.0
# rootdir: /home/dan/projects/pytest
# configfile: pyproject.toml
# collected 2 items
#
# test_carrinho.py ..                                                              [100%]
#
# ================================== 2 passed in 0.01s ==================================`,
    },
  ],
  relatedSlugs: ["ruff-linter"],
};
