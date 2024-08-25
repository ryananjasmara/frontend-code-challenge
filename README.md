# frontend-code-challange
This is a simple yet functional project built with Next.js, designed to demonstrate the core capabilities of CRUD operations (Create, Read, Update, Delete). The project showcases how to efficiently handle data management in a web application, leveraging Next.js for server-side rendering and seamless integration with backend services.

[Live Site](https://frontendcodechallange-8f49986ae2a0.herokuapp.com/)

In creating this project, I used a document to help me track the tasks that I needed to complete. You can find the task tracker [here](https://docs.google.com/spreadsheets/d/1RvZei1m_jt9VfnJrPhZrVHbc8vnFbmFfAFiGT9xhBcE/edit#gid=1386834576). Feel free to check it out and see the progress of the project.

## Folder Structure
```
└── src
  ├── app
  ├── contexts
  ├── hooks
  │  └── Issues
  ├── lib
  ├── models
  ├── pages
  │  ├── api
  │  │  └── v1
  │  │    └── issues
  │  └── views
  │    └── issues
  │      └── __partials
  ├── services
  │  ├── apis
  │  ├── constant
  │  ├── queries
  │  └── types
  ├── shared
  │  ├── components
  │  ├── types
  │  └── utils
  └── tests
    └── issues
```

## Features
- Create, Read, Update and Delete Issues
- Searching Issues by its title
- Filter and Sorting Issues
- Pagination
- Content Loading Skeleton

## Tech Stack
- `Next.js` : For its server-side rendering and static site generation.
- `Tailwind CSS` : It allows for rapid UI development.
- `React Query` : It simplifies data fetching, caching, synchronization, and updates in React applications.
- `Jest` : It provides a comprehensive testing framework.
- `React Testing Library` : It encourages testing best practices by focusing on user interactions and rendering components in a way that resembles how they are used.
- `MongoDB` : It offers a flexible schema design

## Unit Test
I have implemented unit tests for this project, focusing on components, utility functions, and the main pages.

![image](https://github.com/user-attachments/assets/3e7251df-cd4c-499c-8d04-03816624653f)

## API Documentation

### GET /api/v1/issues

Fetch a list of issues.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `keyword` (optional): Search keyword
- `sortBy` (optional): Field to sort by (`issueNumber`, `title`, `date`)
- `order` (optional): Sort order (`ascending`, `descending`)

**Response:**
```json
{
  "data": [
    {
      "_id": "string",
      "imageUri": "string",
      "title": "string",
      "issueNumber": "number",
      "issueDate": "string"
    }
  ],
  "meta": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPage": "number"
  }
}
```

### POST /api/v1/issues

Create a new issue.

**Request Body**
```json
{
  "imageUri": "string",
  "title": "string",
  "issueNumber": "number",
  "issueDate": "string"
}
```

**Response**
```json
{
  "message": "Issue created successfully",
  "result": {
    "acknowledged": true,
    "insertedId": "string"
  }
}
```

### GET /api/v1/issues/[id]

Get specific data of an issue.

**Query Parameters**
- `id` : ObjectID of an issue

**Response**
```json
{
  "data": {
    "_id": "string",
    "imageUri": "string",
    "title": "string",
    "issueNumber": "number",
    "issueDate": "string"
  }
}
```

### PUT /api/v1/issues/[id]

Update an existing issue.

**Query Parameters**
- `id` : ObjectID of an issue

**Request Body**
```json
{
  "imageUri": "string",
  "title": "string",
  "issueNumber": "number",
  "issueDate": "string"
}
```

**Response**
```json
{
  "message": "Issue updated successfully"
}
```

### DELETE /api/v1/issues/[id]

Delete an existing issue.

**Query Parameters**
- `id` : ObjectID of an issue

**Response**
```json
{
  "message": "Issue deleted successfully"
}
```
