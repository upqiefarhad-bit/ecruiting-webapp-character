export type AttributeData = {
    value: number;
    modifier: number;
};

export type Attributes = {
    Strength: AttributeData;
    Dexterity: AttributeData;
    Constitution: AttributeData;
    Intelligence: AttributeData;
    Wisdom: AttributeData;
    Charisma: AttributeData;
};

export type AttributeValues = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";