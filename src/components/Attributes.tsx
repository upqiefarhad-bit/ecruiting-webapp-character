import { ATTRIBUTE_LIST } from '../consts';
import type { Attributes as AttributesType } from '../types';
import '../css/Attributes.css';

interface AttributesProps {
    attributes: AttributesType;
    setAttributes: React.Dispatch<React.SetStateAction<AttributesType>>;
}

export const Attributes = ({ attributes, setAttributes }: AttributesProps) => {

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
