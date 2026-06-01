export type MenuItemData = {
  id: string;
  price?: number;
  supplement?: number;
  tags?: string[];
  perPerson?: boolean;
  minPeople?: number;
  ask?: boolean;
};

export type MenuSectionData = {
  id: string;
  basePrice?: number;
  items: MenuItemData[];
};

export type MenuData = {
  id: "lunch" | "dinner" | "saturday";
  sections: MenuSectionData[];
  formulas?: { id: string; price: number }[];
  drinks?: MenuSectionData[];
};

export const LUNCH_MENU: MenuData = {
  id: "lunch",
  sections: [
    {
      id: "mezze",
      basePrice: 10,
      items: [
        { id: "feta", tags: ["V"] },
        { id: "brick_agneau" },
        { id: "courgette", tags: ["V"] },
        { id: "caviar_aubergines", tags: ["V"] },
      ],
    },
    {
      id: "mains",
      basePrice: 20,
      items: [
        { id: "schnitzel" },
        { id: "souvlaki" },
        { id: "avo_toast", tags: ["V"] },
        { id: "poivron_farci", tags: ["V"] },
        { id: "mititei" },
        { id: "daurade", supplement: 4 },
      ],
    },
    {
      id: "desserts",
      basePrice: 10,
      items: [
        { id: "pistache", tags: ["signature"] },
        { id: "cozonac" },
        { id: "papanasi" },
        { id: "pavlova", supplement: 3 },
      ],
    },
  ],
  formulas: [
    { id: "mezze_main", price: 25 },
    { id: "main_dessert", price: 25 },
    { id: "full", price: 33 },
  ],
};

export const DINNER_MENU: MenuData = {
  id: "dinner",
  sections: [
    {
      id: "bread_wine",
      items: [
        { id: "lavash", price: 7 },
        { id: "thierry_breton", price: 6 },
      ],
    },
    {
      id: "wild_sharp",
      items: [
        { id: "caviar_aubergines", price: 15, tags: ["V"] },
        { id: "kefta_courgette", price: 12, tags: ["V"] },
        { id: "feta_rotie", price: 13, tags: ["V"] },
        { id: "risoni", price: 11, tags: ["V"] },
      ],
    },
    {
      id: "embers",
      items: [
        { id: "mititei", price: 15 },
        { id: "souvlaki", price: 14 },
        { id: "daurade_royale", price: 33 },
        { id: "os_moelle", price: 17 },
      ],
    },
    {
      id: "patronne",
      items: [
        { id: "epaule_agneau", price: 52, perPerson: true, minPeople: 2 },
      ],
    },
    {
      id: "stewed",
      items: [
        { id: "borek_agneau", price: 15 },
        { id: "sarmale", price: 26 },
        { id: "poivron_farci", price: 19, tags: ["V"] },
      ],
    },
    {
      id: "dulciuri",
      items: [
        { id: "pistache", price: 11, tags: ["signature"] },
        { id: "papanasi", price: 11 },
        { id: "pavlova", price: 14 },
        { id: "affogato", price: 13 },
      ],
    },
  ],
};

export const SATURDAY_MENU: MenuData = {
  id: "saturday",
  sections: [
    {
      id: "mezze",
      basePrice: 10,
      items: [
        { id: "feta", tags: ["V"] },
        { id: "brick_agneau" },
        { id: "courgette", tags: ["V"] },
        { id: "caviar_aubergines", tags: ["V"] },
      ],
    },
    {
      id: "mains",
      basePrice: 20,
      items: [
        { id: "schnitzel" },
        { id: "souvlaki" },
        { id: "avo_toast", tags: ["V"] },
        { id: "poivron_farci", tags: ["V"] },
        { id: "mititei" },
        { id: "sarmale" },
        { id: "daurade", supplement: 4 },
        { id: "epaule_agneau", ask: true },
      ],
    },
    {
      id: "desserts",
      basePrice: 10,
      items: [
        { id: "pistache", tags: ["signature"] },
        { id: "cozonac" },
        { id: "papanasi" },
        { id: "pavlova", supplement: 3 },
      ],
    },
  ],
  drinks: [
    {
      id: "cold",
      items: [
        { id: "bissap", price: 5.5 },
        { id: "the_glace", price: 5.5 },
        { id: "citronnade", price: 5.5 },
        { id: "framboise", price: 6 },
        { id: "biere", price: 8 },
        { id: "cafe_glace", price: 4 },
      ],
    },
    {
      id: "hot",
      items: [
        { id: "espresso", price: 3.5 },
        { id: "latte", price: 5.5 },
        { id: "cafe_ibrik", price: 6.5, tags: ["signature"] },
        { id: "thes", price: 5.5 },
        { id: "the_menthe", price: 6 },
        { id: "choco", price: 6 },
      ],
    },
    {
      id: "wines",
      items: [
        { id: "vin_mois", price: 8.5 },
        { id: "vins_carte", ask: true },
      ],
    },
    {
      id: "waters",
      items: [
        { id: "eau_plate", price: 7 },
        { id: "eau_petillante", price: 9 },
      ],
    },
  ],
};

export const ALL_MENUS: MenuData[] = [LUNCH_MENU, DINNER_MENU, SATURDAY_MENU];
