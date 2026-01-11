import '../css/ClassLists.css';
import { CLASS_LIST } from '../consts';
import type { Attributes as AttributesType, AttributeValues, Class } from '../types';
import { useState } from 'react';

interface ClassListProps {
    attributes: AttributesType;
}

export const ClassList = ({ attributes }: ClassListProps) => {
    const [classToShow, setClassToShow] = useState<Class | null>(null)
    const meetsRequirements = (classRequirements: AttributeValues): boolean => {
        return Object.keys(classRequirements).every(currAttribute => {
            return attributes[currAttribute as keyof AttributesType].value >= classRequirements[currAttribute as keyof AttributeValues];
        });
    };

    return (
        <div className="class-list-container">
            <h1>Class List</h1>
            {classToShow ? (
                <>
                    <button onClick={() => setClassToShow(null)}>Close</button>
                    <ul className="class-list-reqs">
                        {Object.entries(CLASS_LIST[classToShow]).map(([attribute, value]) => (
                            <li key={attribute}>{attribute}: {value as number}</li>
                        ))}
                    </ul>
                </>
            ) : (
                Object.entries(CLASS_LIST).map(([className]) => {
                    const classRequirements = CLASS_LIST[className];
                    const meetsReq = meetsRequirements(classRequirements);
                    return (
                        <div key={className} className="class-row"> 
                            <span className={`class-name ${meetsReq ? 'meets-requirements' : ''}`} onClick={() => setClassToShow(className as Class)}>
                                {className}
                            </span>
                        </div>
                    )
                })
            )}
        </div>
    )
}

