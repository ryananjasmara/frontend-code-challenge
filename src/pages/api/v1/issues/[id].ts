import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { IssueCollection } from '@/models/Issues';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getDetail(req, res);
    case 'PUT':
      return updateIssue(req, res);
    case 'DELETE':
      return deleteIssue(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getDetail(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!ObjectId.isValid(id as string)) {
      return res.status(400).json({ message: 'Invalid issue ID' });
    }

    const collection = await IssueCollection();
    const issue = await collection.findOne({ _id: new ObjectId(id as string) });

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json({ data: issue });
  } catch (error) {
    console.error('Error fetching issue detail:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateIssue(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const { imageUri, title, issueNumber, issueDate } = req.body;
    const collection = await IssueCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id as string) },
      { $set: { imageUri, title, issueNumber, issueDate } }
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Issue updated successfully' });
    } else {
      res.status(404).json({ message: 'Issue not found' });
    }
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteIssue(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const collection = await IssueCollection();
    const result = await collection.deleteOne({
      _id: new ObjectId(id as string)
    });
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
