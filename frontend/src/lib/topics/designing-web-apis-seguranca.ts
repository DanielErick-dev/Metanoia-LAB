import { TopicData } from "@/lib/types/topic";

export const designingWebApisCap3: TopicData = {
  slug: "seguranca-de-api",
  title: "Capítulo 3 — Segurança de API",
  subtitle: "Autenticação, autorização e os problemas do Basic Authentication",
  categorySlug: "designing-web-apis",
  accent: "#2dd4bf",
  status: "em-construcao",
  intro:
    "Neste capítulo o autor fala sobre a parte de segurança das APIs, desde as práticas de segurança padrão contra ataques CSRF e XSS até algumas técnicas adicionais para tornar uma API mais segura.",
  sections: [
    {
      heading: "Autenticação x autorização",
      body: "O autor apresenta a distinção entre autenticação e autorização. De forma resumida: autenticação é o processo para verificar se você realmente é quem diz ser, enquanto autorização é garantir que você realmente possa realizar determinada ação. Por exemplo, se você tem permissão apenas para visualizar uma página, o certo é que você não possa editar ou deletar essa página — isso é autorização.",
    },
    {
      heading: "Basic Authentication",
      body: "O autor fala também sobre o método de autenticação básico que as empresas usavam antes, o Basic Authentication. Nele é passado um header Authorization com a palavra Basic e o texto usuario:senha codificado em base64, o que abre várias brechas de segurança.",
    },
    {
      heading: "As brechas do Basic Authentication",
      body: "Algumas das brechas que esse método abre:",
      table: {
        headers: ["Brecha", "Consequência"],
        rows: [
          [
            "Senha em base64",
            "É facilmente decodificada, tornando a senha pública para um hacker, o que por sua vez dá acesso total ao atacante",
          ],
          [
            "Senha armazenada em texto puro ou de forma recuperável",
            "Em caso de vazamento ou bug, entrega tudo",
          ],
          [
            "Não é possível cortar o acesso de um único app",
            "Só trocando a senha, o que por sua vez derruba todos os outros",
          ],
          [
            "O app recebe a conta inteira",
            "Não é possível limitar o acesso a certos recursos",
          ],
        ],
      },
    },
    {
      heading: "O fim do Basic Auth no Twitter",
      body: "O autor também conta que o Twitter abandonou o Basic Authentication em 2010.",
    },
  ],
  relatedSlugs: ["paradigmas-de-api"],
};
