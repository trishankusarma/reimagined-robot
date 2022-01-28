import { Schema, Document, model } from 'mongoose';

export interface Department extends Document {
    name: string;
    classes: Array<Object>;
}

const Department_Schema = new Schema({
    departmentName: {
        type: String,
        unique: true
    },
    classes: [
        {
            class: String,
            sections: Array,
            subjects: Array
        }
    ]
});

export const DepartmentModel = model<Department>('Department', Department_Schema);
