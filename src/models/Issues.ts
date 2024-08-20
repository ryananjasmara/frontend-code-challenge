import connectToDatabase from '@/lib/mongodb';
import { ObjectId, Collection } from 'mongodb';

export interface IIssue {
  _id: ObjectId;
  imageUri: string;
  title: string;
  issueNumber: number;
  issueDate: string;
}

export const IssueCollection = async (): Promise<Collection<IIssue>> => {
  const { db } = await connectToDatabase();
  return db.collection('issues');
};