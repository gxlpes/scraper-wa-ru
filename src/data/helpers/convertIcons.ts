export const organizeIcons = (url: string) => {
  const iconMap: Record<string, string> = {
    vegano: "🌱",
    animal: "🥩",
    gluten: "🌾",
    leite: "🥛",
    ovo: "🍳",
    alergenico: "⚠️",
    mel: "🍯",
    pimenta: "🌶️",
  };

  const matchingKey = Object.keys(iconMap).find((key) => url.toLowerCase().includes(key));

  return matchingKey ? iconMap[matchingKey] : "❌";
};
