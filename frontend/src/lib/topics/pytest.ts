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
      body: "Num arquivo pedido.py, temos uma classe ItemCardapio (com nome e preço) e uma classe Pedido, que guarda uma lista de itens e tem métodos para adicionar item e calcular o total — com um cupom de desconto percentual opcional.",
      code: `class ItemCardapio:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

class Pedido:
    def __init__(self):
        self.itens = []

    def adicionar_item(self, item):
        self.itens.append(item)

    def calcular_total(self, cupom_percentual=0):
        total = sum(item.preco for item in self.itens)
        valor_desconto = total * (cupom_percentual / 100)
        return total - valor_desconto`,
      examples: [
        {
          title: "Testando o total sem cupom",
          body: "Montamos um pedido, criamos dois itens (10 e 20 reais), adicionamos os dois e chamamos calcular_total(). Se o resultado bater com 30.0 — a soma dos dois —, o teste passa.",
          code: `from pedido import ItemCardapio, Pedido

def test_calcular_total_sem_cupom():
    pedido = Pedido()
    item1 = ItemCardapio("Item 1", 10.0)
    item2 = ItemCardapio("Item 2", 20.0)

    pedido.adicionar_item(item1)
    pedido.adicionar_item(item2)

    total = pedido.calcular_total()
    assert total == 30.0`,
        },
        {
          title: "Testando o total com cupom",
          body: "Mesma ideia, mas passando cupom_percentual=10. 10% de 30 reais é 3, então o esperado com desconto é 27.0 — confirmando que a conta do desconto também está certa.",
          code: `def test_calcular_total_com_cupom():
    pedido = Pedido()
    item1 = ItemCardapio("Item 1", 10.0)
    item2 = ItemCardapio("Item 2", 20.0)

    pedido.adicionar_item(item1)
    pedido.adicionar_item(item2)

    total_com_cupom = pedido.calcular_total(cupom_percentual=10)
    assert total_com_cupom == 27.0`,
        },
      ],
    },
    {
      heading: "Rodando os testes",
      body: "Rodamos com uv run pytest ou apenas pytest, dependendo de como foi instalado. O Pytest percorre o diretório atual em busca de arquivos test_*.py e funções test_*, executa cada um e reporta o resultado. Os dois pontinhos (..) representam os dois testes que passaram.",
      code: `uv run pytest

# ================================= test session starts =================================
# platform linux -- Python 3.14.3, pytest-9.1.1, pluggy-1.6.0
# rootdir: /home/dan/projects/pytest
# configfile: pyproject.toml
# collected 2 items
#
# test_pedido.py ..                                                              [100%]
#
# ================================== 2 passed in 0.01s ==================================`,
    },
    {
      heading: "Testando regra de negócio, não só o caminho feliz",
      body: "Pytest não serve só para conferir se a função devolve o valor certo — também dá para testar regra de negócio. Imagine alguém aplicando um cupom de 120%: do jeito que calcular_total está, ela aceita numa boa e o pedido fica com valor negativo, o que não faz sentido.",
      code: `def test_cupom_alto_nao_gera_valor_negativo():
    pedido = Pedido()
    item1 = ItemCardapio("Item 1", 10.0)
    item2 = ItemCardapio("Item 2", 20.0)

    pedido.adicionar_item(item1)
    pedido.adicionar_item(item2)

    total_pedido = pedido.calcular_total(cupom_percentual=90)
    assert total_pedido >= 0`,
      examples: [
        {
          title: "O que esse teste expõe",
          body: "Os dois itens somam 30 reais. Aqui usamos assert para checar se total_pedido é maior ou igual a 0. Com 90% ainda dá certo, mas se alguém testar com 120%, o resultado vira -6 e o teste falharia — expondo que a função precisa de uma validação.",
          code: `# com cupom_percentual=120:
# total_pedido = -6.0
# assert total_pedido >= 0  -> AssertionError`,
        },
      ],
    },
    {
      heading: "Testando uma exceção com pytest.raises",
      body: "Ajustamos calcular_total para bloquear cupom fora do intervalo 0-100:",
      code: `def calcular_total(self, cupom_percentual=0):
    total = sum(item.preco for item in self.itens)
    if cupom_percentual < 0 or cupom_percentual > 100:
        raise ValueError("O cupom de desconto deve estar entre 0 e 100.")
    valor_desconto = total * (cupom_percentual / 100)
    return total - valor_desconto`,
      examples: [
        {
          title: "Confirmando que a exceção é lançada",
          body: "Para testar que o erro é realmente lançado quando o valor é inválido, a gente não usa assert — usa pytest.raises dentro de um with. O with pytest.raises(ValueError) diz 'dentro desse bloco, espero que um ValueError aconteça'. Se a exceção for lançada, o teste passa; se não for (ou for de outro tipo), falha com DID NOT RAISE.",
          code: `import pytest
from pedido import ItemCardapio, Pedido

def test_cupom_fora_do_intervalo():
    pedido = Pedido()
    item1 = ItemCardapio("Item 1", 10.0)
    item2 = ItemCardapio("Item 2", 20.0)

    pedido.adicionar_item(item1)
    pedido.adicionar_item(item2)

    with pytest.raises(ValueError):
        pedido.calcular_total(cupom_percentual=120)`,
          note: "Vale só uma chamada por bloco: assim que a exceção é lançada, o with é interrompido na hora. Se você colocar mais de uma chamada ali dentro e a primeira já lançar o erro, a segunda nunca roda — e você nem percebe.",
        },
        {
          title: "Capturando a mensagem da exceção com as",
          body: "Dá para ir além de só confirmar que 'algum ValueError' foi lançado — também dá para capturar a exceção e conferir a mensagem dela. exc_info guarda a exceção capturada; exc_info.value é o objeto da exceção em si, então dá para usar assert normal em cima da mensagem.",
          code: `def test_cupom_fora_do_intervalo_mensagem_especifica():
    pedido = Pedido()
    item1 = ItemCardapio("Item 1", 10.0)
    item2 = ItemCardapio("Item 2", 20.0)

    pedido.adicionar_item(item1)
    pedido.adicionar_item(item2)

    with pytest.raises(ValueError) as exc_info:
        pedido.calcular_total(cupom_percentual=120)

    assert "cupom" in str(exc_info.value)`,
          note: "Isso importa porque um pytest.raises(ValueError) genérico pode mascarar o erro errado: se o código tivesse dois ValueError diferentes em pontos diferentes da função, o teste passaria mesmo pegando o erro errado. Checar a mensagem garante que foi exatamente aquela validação que disparou.",
        },
      ],
    },
    {
      heading: "Fixture: evitando repetição entre testes",
      body: "Repara que, em quase todo teste acima, a gente repete o mesmo bloco: cria um Pedido, cria dois ItemCardapio, adiciona os dois — é o mesmo código copiado em cada função. O pytest resolve isso com fixture: uma função especial que prepara um 'estado' pronto (dados, objetos, conexões etc.) e entrega para quem precisar, mantendo cada teste isolado — cada um recebe sua própria instância nova, sem compartilhar estado com os outros. Para virar fixture, usa o decorator @pytest.fixture:",
      code: `import pytest
from pedido import ItemCardapio, Pedido

@pytest.fixture
def pedido_completo():
    pedido = Pedido()
    item1 = ItemCardapio("Item 1", 10.0)
    item2 = ItemCardapio("Item 2", 20.0)
    pedido.adicionar_item(item1)
    pedido.adicionar_item(item2)
    return pedido`,
      examples: [
        {
          title: "Usando a fixture nos testes",
          body: "Para usar, basta declarar o nome da fixture como parâmetro da função de teste — o pytest reconhece pelo nome e injeta o retorno dela automaticamente. Toda função que for usar esse recurso recebe pedido_completo no parâmetro e acessa as propriedades normalmente.",
          code: `def test_calcular_total_sem_cupom(pedido_completo):
    total = pedido_completo.calcular_total()
    assert total == 30.0

def test_calcular_total_com_cupom(pedido_completo):
    total_com_cupom = pedido_completo.calcular_total(cupom_percentual=10)
    assert total_com_cupom == 27.0

def test_cupom_fora_do_intervalo(pedido_completo):
    with pytest.raises(ValueError):
        pedido_completo.calcular_total(cupom_percentual=120)`,
          note: "Repare como as funções ficam muito mais limpas — usar fixtures é boa prática para reduzir repetição nos testes. E vale reforçar: bons nomes de teste, que 'falam' exatamente o que será feito, evitam ambiguidade.",
        },
      ],
    },
    {
      heading: "Parametrize: testando várias entradas de uma vez",
      body: "Quando você quer passar parâmetros diferentes para uma mesma função de teste sem reescrevê-la, usa parametrize:",
      code: `@pytest.mark.parametrize("valor_desconto, valor_esperado", [
    (10, 27.0),
    (20, 24.0),
    (30, 21.0),
])
def test_calcular_total_com_cupom(pedido_completo, valor_desconto, valor_esperado):
    total_com_cupom = pedido_completo.calcular_total(cupom_percentual=valor_desconto)
    assert total_com_cupom == valor_esperado`,
      examples: [
        {
          title: "Rodando com -v para ver cada chamada",
          body: "valor_desconto e valor_esperado são os parâmetros passados para a função, nessa ordem. A lista logo acima tem 3 tuplas — o pytest desempacota cada uma nas variáveis e chama o teste uma vez por tupla. Na primeira chamada, valor_desconto=10 e valor_esperado=27.0; nesse exemplo, o teste roda 3 vezes.",
          code: `uv run pytest -v

# test_pedido.py::test_calcular_total_sem_cupom PASSED                    [ 14%]
# test_pedido.py::test_calcular_total_com_cupom[10-27.0] PASSED           [ 28%]
# test_pedido.py::test_calcular_total_com_cupom[20-24.0] PASSED           [ 42%]
# test_pedido.py::test_calcular_total_com_cupom[30-21.0] PASSED           [ 57%]
# test_pedido.py::test_cupom_alto_nao_gera_valor_negativo PASSED          [ 71%]
# test_pedido.py::test_cupom_fora_do_intervalo PASSED                    [ 85%]
# test_pedido.py::test_cupom_fora_do_intervalo_mensagem_especifica PASSED [100%]`,
          note: "Repare que os testes rodaram passando os valores na mesma ordem em que preenchemos a lista de tuplas.",
        },
      ],
    },
    {
      heading: "Mock: testando dependências externas",
      body: "Até agora usamos só exemplos internos do nosso próprio código. Mas frequentemente vamos testar funções que dependem de algo externo — um banco de dados, uma API, um e-mail — e essas chamadas podem demorar ou ter efeitos reais, como uma cobrança num cartão. Imagine testar uma função que chama uma API de pagamento: cada teste rodado faria uma chamada real, gerando tráfego indesejado e, dependendo da quantidade, até um bloqueio. É para isso que existe o Mock. Veja o exemplo, continuando do que já vínhamos construindo, em finalizacao.py:",
      code: `import time

class ProcessadorDePagamentos:
    def cobrar(self, valor, cartao):
        """Simula uma chamada real a uma API de pagamento"""
        print(f"Conectando ao processador para cobrar R\${valor} do cartão {cartao}...")
        time.sleep(5)  # Simula o tempo de processamento
        return True

class FinalizadorDePedido:
    def __init__(self, processador: ProcessadorDePagamentos):
        self.processador = processador

    def finalizar(self, pedido, cartao):
        total = pedido.calcular_total()
        if total <= 0:
            return "Sucesso: pedido gratuito"

        aprovado = self.processador.cobrar(total, cartao)
        if aprovado:
            return "Sucesso: pagamento aprovado"
        else:
            raise ValueError("Pagamento recusado pelo banco")`,
      examples: [
        {
          title: "O que é o Mock",
          body: "A função cobrar de ProcessadorDePagamentos simula uma chamada real a uma API: imprime uma mensagem, espera 5 segundos e devolve True. FinalizadorDePedido recebe o próprio ProcessadorDePagamentos por parâmetro — o que chamamos de injeção de dependência — e sua função finalizar calcula o total do pedido, chama cobrar passando o valor e o cartão, e verifica se foi aprovado. Mock é um objeto 'dublê': um substituto falso que usamos no lugar de uma dependência externa que não controlamos, com comportamento definido por nós — sem depender do comportamento real dela. Além de nativo do Python, o Mock deixa a gente controlar exatamente as situações que quer testar.",
          code: `from unittest.mock import Mock

mock_processador = Mock(ProcessadorDePagamentos)
# mock_processador sabe que existe um método "cobrar"
# (tentar mock_processador.devolver, por exemplo, dá erro)`,
        },
        {
          title: "Simulando uma compra com sucesso",
          body: "Atribuímos return_value = True para que, toda vez que alguém chamar mock_processador.cobrar, o retorno seja sempre True. Passamos o mock para o FinalizadorDePedido (nossa injeção de dependência) e chamamos finalizar com o pedido da fixture e um cartão falso.",
          code: `def test_compra_com_sucesso(pedido_completo):
    mock_processador = Mock(ProcessadorDePagamentos)
    mock_processador.cobrar.return_value = True

    finalizador = FinalizadorDePedido(mock_processador)
    cartao_falso = '1234-5678-9012-3456'

    resultado = finalizador.finalizar(pedido_completo, cartao_falso)
    assert resultado == "Sucesso: pagamento aprovado"`,
          note: "O fluxo: finalizar chama cobrar do processador por dentro; como o processador é o mock, a resposta é o valor configurado (True); cai no if aprovado, devolve a mensagem de sucesso, e o assert passa.",
        },
        {
          title: "Simulando uma compra com erro",
          body: "Mesmo raciocínio, mas configurando return_value = False, forçando o caminho do erro.",
          code: `def test_compra_com_erro(pedido_completo):
    mock_processador = Mock(ProcessadorDePagamentos)
    mock_processador.cobrar.return_value = False

    finalizador = FinalizadorDePedido(mock_processador)
    cartao_falso = '1234-5678-9012-3456'

    with pytest.raises(ValueError):
        finalizador.finalizar(pedido_completo, cartao_falso)`,
          note: "Aqui não usamos assert porque queremos validar que o raise ValueError('Pagamento recusado pelo banco') é executado de fato — o mock sempre retorna False para garantir que esse caminho seja testado.",
        },
      ],
    },
    {
      heading: "Conferindo como o Mock foi chamado: assert_called_once_with",
      body: "Esse método garante duas coisas: que o mock foi chamado apenas uma vez (pega chamadas duplicadas, um bug comum no dia a dia) e que, nessa chamada, os argumentos recebidos são exatamente os que especificamos. No teste de compra com sucesso, adicionamos no final:",
      code: `mock_processador.cobrar.assert_called_once_with(30.0, cartao_falso)`,
      examples: [
        {
          title: "O fluxo por trás da checagem",
          body: "O mock é criado com retorno True, passado para o FinalizadorDePedido e guardado em self.processador. Ao rodar finalizador.finalizar(pedido_completo, cartao_falso), lá dentro executa aprovado = self.processador.cobrar(total, cartao), que retorna True e registra internamente a chamada.",
          code: `# depois da chamada, o mock guarda:
call_count = 1
called = True
call_args = call(30.0, '1234-5678-9012-3456')`,
          note: "O assert_called_once_with compara esses valores registrados com os que passamos; se baterem, o teste passa; se não, quebra avisando que não é o valor esperado. Esse método garante que cobrar realmente é chamado, com os valores corretos, uma única vez — não testamos só a saída final, mas o processo até ela.",
        },
      ],
    },
  ],
  relatedSlugs: ["ruff-linter"],
};
