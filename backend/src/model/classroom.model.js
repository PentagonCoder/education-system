import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    code: {
        type: String,
        default: null
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['teacher', 'student'],
            default: 'student'
        }
    }]
}, { timestamps: true });

const Classroom = mongoose.model('Classroom', classroomSchema);

export default Classroom; 
