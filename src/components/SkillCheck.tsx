import { useState } from 'react';
import { SKILL_LIST } from '../consts';
import { Attributes as AttributesType } from '../types';
import '../css/SkillCheck.css'

interface SkillCheckProps {
  characterName: string;
  attributes: AttributesType;
  skillPoints: Record<string, number>;
  onRoll: (result: any) => void;
}

export const SkillCheck = ({ characterName, attributes, skillPoints, onRoll }: SkillCheckProps) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(20);

  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 20) + 1;

    const skillData = SKILL_LIST.find(s => s.name === selectedSkill)!;
    const attrName = skillData.attributeModifier as keyof AttributesType;
    
    const modifier = attributes[attrName].modifier;
    const points = skillPoints[selectedSkill] || 0;
    
    const total = roll + modifier + points;
    const success = total >= dc;

    onRoll({
      characterName,
      skillName: selectedSkill,
      skillPoints: modifier + points,
      roll,
      total,
      dc,
      success
    });
  };

  return (
    <div className="skill-check-card">
      <h2>Skill Check</h2>
      <div className='skill-check-content'>
        <label>Skill: 
          <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
            {SKILL_LIST.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
          </select>
        </label>

        <label>DC: 
          <input type="number" value={dc} onChange={(e) => setDc(Number(e.target.value))} min={0}/>
        </label>

        <button onClick={handleRoll}>Roll</button>
      </div>
    </div>
  );
};