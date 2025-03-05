
type LanguageType = "eng" | "jap";

export type SetType = {
  [key: string]: any;
}

export type CardType = {
  id: string;
  variant: string;
  image: string;
  hasCard: boolean;
  language: LanguageType;
}

export type CardDisplayType = {
  left: CardType[];
  right: CardType[];
}

export type ViewModeType = "all" | "missing" | "japanese";

export type PageSize = 4 | 9 | 12;

export type SelectOption = {
  label: string;
  value: string | number;
}