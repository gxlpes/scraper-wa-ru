export const convertRuToUrl = (ru: string) => {
  switch (ru) {
    case "pol":
      return "https://pra.ufpr.br/ru/ru-centro-politecnico/";
    case "bot":
      return "https://pra.ufpr.br/ru/cardapio-ru-jardim-botanico/";
    default:
      return "Not found";
  }
};

export const convertRuToName = (ru: string) => {
  switch (ru) {
    case "pol":
      return "Politécnico";
    case "bot":
      return "Botânico";
    default:
      return "Not found";
  }
};
