export const typeDefs = `#graphql
  scalar Time
  scalar UUID
  scalar Decimal
  scalar Upload
  scalar JSON

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

  type Blog {
    id: UUID!
    title: String!
    content: String!
    summary: String!
    featuredImage: String!
    tags: [Tag!]
    userId: String
    user: User
    status: String!
    createdAt: Time
    updatedAt: Time
  }

  type Tag {
    id: UUID!
    name: String!
  }

  type Event {
    id: UUID!
    name: String!
    description: String
    type: String!
    link: String
    address: String
    starts_at: Time!
    ends_at: Time!
    paymentType: String!
    amount: Decimal!
    tickets: Int
    isInfinity: Boolean
    coverPhoto: String!
    userId: UUID
    formTitle: String!
    instructions: String!
    message: String!
    status: String!
    user: User
    eventForm: [EventForm!]
    eventPayments: [EventPayment!]
    eventRegistrations: [EventRegistration!]
    eventResources: [EventResource!]
    createdAt: Time
    updatedAt: Time
  }

  type EventForm {
    id: UUID!
    name: String!
    type: String!
    required: Boolean
    event: Event
    eventId: UUID
  }

  type FormDesign {
    id: UUID!
    name: String!
    label: String
    type: String!
    required: Boolean
    createdAt: Time
    updatedAt: Time
  }

  type EventPayment {
    id: UUID!
    phoneNumber: String!
    paymentRef: String!
    amount: Decimal
    status: String
    eventId: UUID
    createdAt: Time
    updatedAt: Time
  }

  type EventResource {
    id: UUID!
    resourceUrl: String!
    eventId: UUID!
    event: Event
  }
  
  type EventRegistration {
    id: UUID!
    memberId: UUID
    member: Member
    eventId: UUID!
    event: Event
    registrantDetail: JSON
    amount: Decimal
    paymentRef: String!
    status: String
    checkin: Boolean
    checkinDate: Time
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

  input blogInput {
    title: String!
    content: String!
    summary: String!
    featuredImage: String!
    tags: [String!]
  }

  input EventFormInput {
    name: String!
    label: String
    type: String!
    required: Boolean
  }
  
  input SpeakerFormInput {
    name: String!
    title: String
    about: String!
    avatar: String!
  }

  input eventInput {
    name: String!
    description: String
    cpdpPoint: Int
    type: String!
    link: String
    address: String
    starts_at: Time!
    ends_at: Time!
    paymentType: String!
    amount: Decimal!
    tickets: Int
    isInfinity: Boolean
    coverPhoto: String
    formTitle: String!
    instructions: String!
    message: String!
    form: [EventFormInput]
    resources: [String!]
    certificate: String
    hadCertificate: Boolean
    speakers: [SpeakerFormInput!]
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

  type BlogResponse {
    code: Int!
    success: Boolean!
    message: String!
    blog: Blog
  }

  type EventResponse {
    code: Int!
    success: Boolean!
    message: String!
    event: Event
  }

  type AdminDashboardStatResponse {
    totalMember: Decimal
    eventHeld: Int
    membership: [Int!]
    avgAttendance: Decimal
    revenue: Decimal
    revByCategory: JSON
  }

  type SidebarResponse {
    members: Int
    events: Int
    blogs: Int
    resources: Int
    ads: Int
  }

  ## ------------------------------------- Mutation ---------------------------------------------------##

  type Mutation {
    createUser(input: newMember!): CreateUserResponse
    login(input: signInUser!): AuthPayload
    createDue(input: dueInput!): DueResponse
    updateDue(dueId: UUID!, input: dueInput!): DueResponse
    postPayment(input: paymentInput!): Payment!
    deactivateMember(memberId: UUID!, status: String!): Member
    createBlog(input: blogInput!): BlogResponse
    publishedBlog(blogId: UUID!, status: String!): BlogResponse
    createEvent(input: eventInput!): EventResponse
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
    getBlogs(status: String): [Blog!]
    getBlog(blogId: UUID!): Blog
    tags: [Tag!]
    eventFormFields: [FormDesign!] 
    getEvents: [Event!]
    getEvent(eventId: UUID): Event
    getAdminDashboardStat: AdminDashboardStatResponse
    getSidebarStat: SidebarResponse
  }
`;