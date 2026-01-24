import mongoose, { Schema } from 'mongoose';
import { IComment } from './commentsInterface';
const commentSchema = new Schema<IComment>({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model<IComment>('comment', commentSchema);
export default Comment;
