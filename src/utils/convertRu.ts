export const convertRuToUrl = (ru: string) => {
  switch (ru) {
    case "pol":
    case "Centro Politécnico":
      return "https://pra.ufpr.br/ru/ru-centro-politecnico/";
    case "bot":
    case "Jardim Botânico":
      return "https://pra.ufpr.br/ru/cardapio-ru-jardim-botanico/";
    default:
      return "Any website found";
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
