import { ObjectId } from 'mongodb';
import { IssueCollection } from '@/models/Issues';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getIssues(req, res);
    case 'POST':
      return createIssue(req, res);
    case 'DELETE':
      return deleteIssue(req, res);
    case 'PUT':
      return updateIssue(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getIssues(req: NextApiRequest, res: NextApiResponse) {
  try {
    const collection = await IssueCollection();
    const issues = await collection.find({}).toArray();
    res.status(200).json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


async function createIssue(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { imageUri, title, issueNumber, issueDate } = req.body;
    const collection = await IssueCollection();
    const newIssue = { _id: new ObjectId(), imageUri, title, issueNumber, issueDate };
    const result = await collection.insertOne(newIssue);
    res.status(201).json({ message: 'Issue created successfully', result });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteIssue(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const collection = await IssueCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id as string) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Issue deleted successfully' });
    } else {
      res.status(404).json({ message: 'Issue not found' });
    }
  } catch (error) {
    console.error('Error deleting issue:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateIssue(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const updateData = req.body;
    const collection = await IssueCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id as string) },
      { $set: updateData }
    );

    if (result.matchedCount === 1) {
      res.status(200).json({ message: 'Issue updated successfully' });
    } else {
      res.status(404).json({ message: 'Issue not found' });
    }
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}