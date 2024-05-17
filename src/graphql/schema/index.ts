export const typeDefs = `#graphql
  scalar Time
  scalar UUID
  scalar Decimal
  scalar Upload

  directive @auth on FIELD | FIELD_DEFINITION | OBJECT
  directive @skip on FIELD | FIELD_DEFINITION
  directive @uppercase on FIELD_DEFINITION

  type User {
    id: UUID!
    regId: String!
    role: String! @uppercase
    email: String
    password: String! @skip
    rememberMe: Boolean @skip
    member: Member
    createdAt: Time  
    updatedAt: Time @skip
  }

  type Member {
    id: UUID!
    regId: String!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    photoURL: String
    address: String!
    userId: UUID!
    joined: Time
    membershipType: String! @uppercase
    membershipId: String
    status: String @uppercase
    createdAt: Time
    updatedAt: Time
  }  

  ## ------------------------------------- Type Input ---------------------------------------------------##

  input signInUser {
    regId: String!
    password: String!
    rememberMe: String
  }

  input newMember {
    membershipType: String!
    membershipId: String
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    address: String!
    password: String!
  }

  ## ------------------------------------- Type Response ---------------------------------------------------##
  
  type UserPayload {
    id: UUID!
    regId: String!
    role: String!
    member: Member
  }

  type AuthPayload {
    token: String
    user: UserPayload
  }

  type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String
  }

  type MemberResponse {
    code: Int!
    success: Boolean!
    message: String!
    member: Member
  }

  type Mutation {
    createUser(input: newMember!): CreateUserResponse
    login(input: signInUser!): AuthPayload
  }

  type Query {
    members: [Member] @auth
    users: [User] @auth
    member(id: UUID!): Member
  }
`;