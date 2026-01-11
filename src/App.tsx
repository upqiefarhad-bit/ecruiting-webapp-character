import { useState } from 'react';
import './App.css';
import { initialAttributes } from './consts';
import { Attributes } from './components/Attributes';
import { ClassList } from './components/ClassList';
import { Skills } from './components/Skills';
import type { Attributes as AttributesType } from './types';

function App() {
  const [attributes, setAttributes] = useState<AttributesType>(initialAttributes);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="App-section-content">
          <Attributes attributes={attributes} setAttributes={setAttributes} />
          <ClassList attributes={attributes} />
          <Skills intelligenceModifier={attributes.Intelligence.modifier} attributes={attributes}/>
        </div>
      </section>
    </div>
  );
}

export default App;
