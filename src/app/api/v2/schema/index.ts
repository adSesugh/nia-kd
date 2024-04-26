export const typeDefs = `#graphql
  scalar Time
  scalar UUID
  
  type Query {
    books: [Book]
    blogs: [Blog]
  }
  
  type Book {
    title: String
    author: String
  }

  type Tag {
    id: UUID!
    name: String!
    blogs: [Blog]
    createdAt: Time
    updatedAt: Time
  }

  type Blog {
    id: UUID!
    title: String!
    content: String!
    link: String!
    summary: String!
    image: String!
    tags: [Tag]
    userId: String
    createdAt: Time
    updatedAt: Time
  }
  
  type AddBookMutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }
  
  type Mutation {
    addBook(title: String, author: String): AddBookMutationResponse
  }
`