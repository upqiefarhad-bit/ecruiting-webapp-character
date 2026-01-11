import { useState } from 'react';
import '../css/Skills.css';
import { SKILL_LIST } from '../consts';
import type { Attributes as AttributesType } from '../types';

interface SkillsProps {
    intelligenceModifier: number;
    attributes: AttributesType;
}

export const Skills = ({ intelligenceModifier, attributes }: SkillsProps) => {
    const [skillPoints, setSkillPoints] = useState<Record<string, number>>(() => {
        const initial: Record<string, number> = {};
        SKILL_LIST.forEach(skill => initial[skill.name] = 0);
        return initial;
    });

    const totalAvailPoints = 10 + (4 * intelligenceModifier);

    const totalPointsUsed = Object.values(skillPoints).reduce((acc, points) => acc + points, 0);


    const incrementSkillPoints = (skillName: string) => {
        setSkillPoints(prev => {
            if (totalPointsUsed >= totalAvailPoints) {
                window.alert('max points already used');
                return prev;
            }
            return {
                ...prev,
                [skillName]: (prev[skillName] || 0) + 1,
            };
        });
    };

    const decrementSkillPoints = (skillName: string) => {
        setSkillPoints(prev => ({
            ...prev,
            [skillName]: Math.max(0, (prev[skillName] || 0) - 1),
        }));
    };

    return (
        <div className="skills-container">
            <h1 className="skills-header">Skills</h1>
            <div className="points-info">Total Points Available: {Math.max(0, totalAvailPoints)} | Points Used: {totalPointsUsed}</div>
            {SKILL_LIST.map(skill => {
                const points = skillPoints[skill.name];
                const attributeName = skill.attributeModifier as keyof AttributesType;
                const modifierValue = attributes[attributeName].modifier;
                const total = points + modifierValue;
                return (
                    <div key={skill.name} className="skill-row">
                        <span>{skill.name}:</span>
                        <span>{points}</span>
                        <button onClick={() => decrementSkillPoints(skill.name)} disabled={points === 0}>-</button>
                        <button onClick={() => incrementSkillPoints(skill.name)}>+</button>
                        <span>
                            Modifier ({skill.attributeModifier.substring(0, 3)}): {modifierValue}
                        </span>
                        <strong>total: {total}</strong>
                    </div>
                );
            })}
        </div>
    );
}