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
    const { page = '1', limit = '10', keyword = '', sortBy, order } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const validSortBy = ['issueNumber', 'title', 'date'];
    const validOrder = ['ascending', 'descending'];

    if (sortBy && !validSortBy.includes(sortBy as string)) {
      return res.status(400).json({ message: 'Invalid sortBy parameter' });
    }

    if (order && !validOrder.includes(order as string)) {
      return res.status(400).json({ message: 'Invalid order parameter' });
    }

    let sortField = 'issueNumber';
    if (sortBy) {
      if (sortBy === 'date') {
        sortField = 'issueDate';
      } else {
        sortField = sortBy as string;
      }
    }

    const sortOrder = order === 'descending' ? -1 : 1;

    const collection = await IssueCollection();

    const filter: Record<string, unknown> = {};
    if (keyword) {
      filter.title = { $regex: keyword, $options: 'i' };
    }

    const issues = await collection
      .find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limitNumber)
      .toArray();
    const totalIssues = await collection.countDocuments(filter);

    res.status(200).json({
      data: issues,
      meta: {
        page: pageNumber,
        limit: limitNumber,
        total: totalIssues,
        totalPage: Math.ceil(totalIssues / limitNumber)
      }
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function createIssue(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { imageUri, title, issueNumber, issueDate } = req.body;
    const collection = await IssueCollection();
    const newIssue = {
      _id: new ObjectId(),
      imageUri,
      title,
      issueNumber,
      issueDate
    };
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
