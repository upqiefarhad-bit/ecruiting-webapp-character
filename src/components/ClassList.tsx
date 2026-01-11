import '../css/ClassLists.css';
import { CLASS_LIST } from '../consts';
import type { Attributes as AttributesType, Class } from '../types';

interface ClassListProps {
    attributes: AttributesType;
}

export const ClassList = ({ attributes }: ClassListProps) => {
    const meetsRequirements = (className: Class): boolean => {
        const classRequirements = CLASS_LIST[className];
        return Object.keys(classRequirements).every(currAttribute => {
            return attributes[currAttribute] >= classRequirements[currAttribute];
        });
    };

    return (
        <div className="class-list-container">
            <h1>Class List</h1>
            {Object.entries(CLASS_LIST).map(([className]) => {
                const meetsReq = meetsRequirements(className as Class);
                return (
                    <div key={className} className="class-row">
                        <span className={`class-name ${meetsReq ? 'meets-requirements' : ''}`}>{className}</span>
                    </div>
                )
            })}
        </div>
    )
}

