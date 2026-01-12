import { ATTRIBUTE_LIST } from '../consts';
import type { Attributes as AttributesType } from '../types';
import { calculateModifier } from '../utils';
import '../css/Attributes.css';

interface AttributesProps {
    attributes: AttributesType;
    setAttributes: React.Dispatch<React.SetStateAction<AttributesType>>;
}

export const Attributes = ({ attributes, setAttributes }: AttributesProps) => {
    const totalAttributePoints = Object.values(attributes).reduce(
        (sum, attr) => sum + attr.value, 
        0
    );

    const formatModifier = (modifier: number): string => {
        return modifier >= 0 ? `+${modifier}` : `${modifier}`;
    };

    const incrementAttribute = (attributeName: keyof AttributesType) => {
        if (totalAttributePoints >= 70) {
            alert("Max attribute total points reached, you must decrease one before they can increase another");
            return;
        }
        setAttributes(prev => {
            const newValue = prev[attributeName].value + 1;
            const newModifier = calculateModifier(newValue);
            return {
                ...prev,
                [attributeName]: { value: newValue, modifier: newModifier },
            };
        });
    };

    const decrementAttribute = (attributeName: keyof AttributesType) => {
        setAttributes(prev => {
            const newValue = prev[attributeName].value - 1;
            const newModifier = calculateModifier(newValue);
            return {
                ...prev,
                [attributeName]: { value: newValue, modifier: newModifier },
            };
        });
    };

    return (
        <div className="attributes-container">
            <h1 className="attributes-header">Attributes</h1>
            <span className='total'>Current Total Attribute Points: {totalAttributePoints}</span>
            {ATTRIBUTE_LIST.map(attributeName => {
                const attributeData = attributes[attributeName as keyof AttributesType];
                const formattedModifier = formatModifier(attributeData.modifier);
                return (
                    <div key={attributeName} className="attribute-row">
                        <span>{attributeName} (Modifier: {formattedModifier}):</span>
                        <span>{attributeData.value}</span>
                        <button onClick={() => decrementAttribute(attributeName as keyof AttributesType)}>-</button>
                        <button onClick={() => incrementAttribute(attributeName as keyof AttributesType)}>+</button>
                    </div>
                );
            })}
        </div>
    );
}
