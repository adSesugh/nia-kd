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

  type Due {
    id: UUID!
    name: String
    amount: Decimal
    startsAt: Time
    endsAt: Time
    status: String
    userId: String
    createdAt: Time
    updatedAt: Time
    user: User
  }

  type Payment {
    id: UUID!
    memberId: String!
    member: Member
    duesId: String!
    due: Due
    paymentRef: String
    amount: Decimal!
    status: String!
    createdAt:  Time
    updatedAt:  Time
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

  input dueInput {
    name: String
    amount: Decimal
    startsAt: Time
    endsAt: Time
    status: String
    userId: String
  }

  input paymentInput {
    memberId: String!
    duesId: String!
    paymentRef: String
    amount: Decimal!
    status: String!
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

  type DueResponse {
    code: Int!
    success: Boolean!
    message: String!
    due: Due
  }

  type MemberDueResponse {
    id: UUID!
    name: String
    amount: Decimal
    startsAt: Time
    endsAt: Time
    status: String
    paymentStatus: Boolean
    userId: String
    createdAt: Time
    updatedAt: Time
  }

  ## ------------------------------------- Mutation ---------------------------------------------------##

  type Mutation {
    createUser(input: newMember!): CreateUserResponse
    login(input: signInUser!): AuthPayload
    createDue(input: dueInput!): DueResponse
    updateDue(dueId: UUID!, input: dueInput!): DueResponse
    postPayment(input: paymentInput!): Payment!
  }

  ## ------------------------------------- Query ---------------------------------------------------##


  type Query {
    members: [Member] @auth
    users: [User] @auth
    member(id: UUID!): Member
    dues: [Due] @auth
    singeDue(dueId: UUID!): Due
    getPayments: [Payment!]
    memberPayments(memberId: UUID!): [Payment!]
    getPayment(paymentId: UUID!): Payment
    getDuePayment(memberId: UUID!): MemberDueResponse
    getRecentRegistration: [Member!]
  }
`;