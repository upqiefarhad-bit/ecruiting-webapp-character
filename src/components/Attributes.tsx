import { useState } from 'react';
import { ATTRIBUTE_LIST } from '../consts';
import type { Attributes as AttributesType } from '../types';
import '../css/Attributes.css';

const initialAttributes: AttributesType = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
};

export const Attributes = () => {
    const [attributes, setAttributes] = useState<AttributesType>(initialAttributes);

    const incrementAttribute = (attributeName: keyof AttributesType) => {
        setAttributes(prev => ({
            ...prev,
            [attributeName]: prev[attributeName] + 1,
        }));
    };

    const decrementAttribute = (attributeName: keyof AttributesType) => {
        setAttributes(prev => ({
            ...prev,
            [attributeName]: prev[attributeName] - 1,
        }));
    };

    return (
        <div className="attributes-container">
            <h1 className="attributes-header">Attributes</h1>
            {ATTRIBUTE_LIST.map(attributeName => (
                <div key={attributeName} className="attribute-row">
                    <span className="attribute-name">{attributeName}:</span>
                    <span className="attribute-value">{attributes[attributeName]}</span>
                    <button onClick={() => decrementAttribute(attributeName as keyof AttributesType)}>-</button>
                    <button onClick={() => incrementAttribute(attributeName as keyof AttributesType)}>+</button>
                </div>
            ))}
        </div>
    );
}
