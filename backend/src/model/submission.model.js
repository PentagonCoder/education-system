import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SubmissionSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['submitted', 'pending'],
        default: 'pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Submission = mongoose.model('Submission', SubmissionSchema);
export default Submission;