import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { initialAttributes, SKILL_LIST } from './consts';
import { Attributes } from './components/Attributes';
import { ClassList } from './components/ClassList';
import { Skills } from './components/Skills';
import { saveCharacter, getCharacter } from './api/CharacterData';
import type { Attributes as AttributesType } from './types';

function App() {
  const [attributes, setAttributes] = useState<AttributesType>(initialAttributes);

  const getDefaultSkillPoints = () => {
    const initial: Record<string, number> = {};
    SKILL_LIST.forEach(skill => initial[skill.name] = 0);
    return initial;
  };

  const [skillPoints, setSkillPoints] = useState<Record<string, number>>(getDefaultSkillPoints);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all attributes and skills to default?")) {
      setAttributes(initialAttributes);
      setSkillPoints(getDefaultSkillPoints());
    }
  };

  const handleLoad = useCallback(async () => {
    try {
      const data = await getCharacter();

      console.log('check the data', data)

      if (data && data.attributes && data.skillPoints) {
        setAttributes(data.attributes);
        setSkillPoints(data.skillPoints);
        console.log("Character loaded successfully from API.");
      } else {
        console.log("No existing character found. Using defaults.");
      }
    } catch (e) {
      console.error('Error loading character:', e);
    }
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleSave = async () => {
    try {
      const payload = { attributes, skillPoints };
      await saveCharacter(payload);
      alert('Character saved successfully!');
    } catch (e) {
      alert('Error saving character');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <div className="controls">
          <button onClick={handleSave}>Save Character</button>
          <button onClick={handleReset}>Reset All</button>
      </div>
      <section className="App-section">
        <div className="App-section-content">
          <Attributes attributes={attributes} setAttributes={setAttributes} />
          <ClassList attributes={attributes} />
          <Skills 
            attributes={attributes} 
            skillPoints={skillPoints} 
            setSkillPoints={setSkillPoints} 
          />
        </div>
      </section>
    </div>
  );
}

export default App;
