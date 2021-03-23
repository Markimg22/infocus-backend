import { Schema } from 'mongoose';

export interface PerformanceInterface {
  totalTasksCompleted: number;
  totalWorkTime: number;
  totalRestTiem: number;
}

export const PerformanceSchema = new Schema({
  totalTasksCompleted: Number,
  totalWorkTime: Number,
  totalRestTiem: Number,
}, {
  timestamps: true,
});
