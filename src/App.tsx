import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { initialAttributes, SKILL_LIST } from './consts';
import { Attributes } from './components/Attributes';
import { ClassList } from './components/ClassList';
import { Skills } from './components/Skills';
import { SkillCheck } from './components/SkillCheck';
import { saveCharacter, getCharacter } from './api/CharacterData';
import type { Attributes as AttributesType, Character, CheckResult } from './types';

function App() {
  const [lastResult, setLastResult] = useState<CheckResult | null>(null);

  const getDefaultSkillPoints = () => {
    const initial: Record<string, number> = {};
    SKILL_LIST.forEach(skill => initial[skill.name] = 0);
    return initial;
  };

  const [characters, setCharacters] = useState<Character[]>([
    { id: Date.now(), attributes: initialAttributes, skillPoints: getDefaultSkillPoints() }
  ]);

  const addNewCharacter = () => {
    const newChar: Character = {
      id: Date.now(),
      attributes: initialAttributes,
      skillPoints: getDefaultSkillPoints(),
    };
    setCharacters([...characters, newChar]);
  };

  const updateCharacter = (id: number, updatedData: Partial<Character>) => {
    setCharacters(prev => prev.map(char => 
      char.id === id ? { ...char, ...updatedData } : char
    ));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all characters to default values?")) {
      setCharacters(prevCharacters => 
        prevCharacters.map(char => ({
          ...char,
          attributes: initialAttributes,
          skillPoints: getDefaultSkillPoints()
        }))
      );
    }
  };

  const handleLoad = useCallback(async () => {
    try {
      const data = await getCharacter();
      if (data && data.characters) {
        setCharacters(data.characters);
      }
    } catch (e) {
      console.error('Load error', e);
    }
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleSave = async () => {
    try {
      await saveCharacter({ characters });
      alert('All characters saved successfully!');
    } catch (e) {
      alert('Error saving data');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <div className="controls">
        <button onClick={addNewCharacter}>Add New Character</button>
        <button onClick={handleSave}>Save Character</button>
        <button onClick={handleReset}>Reset All</button>
      </div>
      {lastResult && (
        <section className="result-display">
          <h3>Last Skill Check Result ({lastResult.characterName})</h3>
          <span>Chosen Skill: {lastResult.skillName} (points: {lastResult.skillPoints})</span>
          <span>Chosen Roll: {lastResult.roll}</span>
          <span> DC: {lastResult.dc} - <strong>{lastResult.success ? "SUCCESS" : "FAILURE"}</strong></span>
        </section>
      )}
      {characters.map((char, index) => (
        <section key={char.id} className="App-section">
          <h2>Character {index + 1}</h2>
          <SkillCheck 
              characterName={`Character ${index + 1}`}
              attributes={char.attributes}
              skillPoints={char.skillPoints}
              onRoll={(result) => setLastResult(result)}
            />
          <div className="App-section-content">
            <Attributes 
              attributes={char.attributes} 
              setAttributes={(newAttrAction) => {
                const newAttributes = typeof newAttrAction === 'function' 
                    ? newAttrAction(char.attributes) 
                    : newAttrAction;
                updateCharacter(char.id, { attributes: newAttributes });
              }} 
            />
            
            <ClassList attributes={char.attributes} />
            
            <Skills 
              attributes={char.attributes} 
              skillPoints={char.skillPoints} 
              setSkillPoints={(newSkillsAction) => {
                const newSkills = typeof newSkillsAction === 'function'
                    ? newSkillsAction(char.skillPoints)
                    : newSkillsAction;
                updateCharacter(char.id, { skillPoints: newSkills });
              }} 
            />
          </div>
          <hr />
        </section>
      ))}
    </div>
  );
}

export default App;
