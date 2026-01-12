export type AttributeData = {
    value: number;
    modifier: number;
};

export type Character = {
    id: number;
    attributes: Attributes;
    skillPoints: Record<string, number>;
};

export type CheckResult = {
    characterName: string;
    skillName: string;
    skillPoints: number;
    roll: number;
    total: number;
    dc: number;
    success: boolean;
} | null;

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