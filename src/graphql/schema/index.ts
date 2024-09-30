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
    email: String!
    password: String! @skip
    rememberMe: Boolean @skip
    member: Member
    createdAt: Time  
    updatedAt: Time @skip
  }
  
  type MembershipType {
    id: UUID!
    name: String!
    members: [Member]
    dues: [Due]
  }

  type Member {
    id: UUID!
    regId: String!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    photoURL: String
    workplace: String!
    userId: UUID!
    joined: Time
    membershipTypeId: UUID!
    membershipType: MembershipType!
    membershipId: String
    proofDocument: String
    status: String @uppercase
    cpdpPoints: CpdpPoint
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
    userId: UUID
    membershipTypeId: UUID!
    createdAt: Time
    updatedAt: Time
    deletedAt: Time
    user: User
    membershipType: MembershipType
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
    theme: String
    description: String
    type: String!
    link: String
    address: String
    starts_at: Time!
    starts_time: String!
    ends_at: Time!
    ends_time: String!
    paymentType: String!
    amount: Decimal!
    tickets: Int
    isInfinity: Boolean
    coverPhoto: String
    userId: UUID
    user: User
    formTitle: String!
    instructions: String!
    message: String!
    status: String!
    cpdp_points: Int
    hasCertificate: Boolean
    views: Int
    certificate: String
    eventForms: [EventForm]
    eventPayments: [Payment]
    eventRegistrations: [EventRegistration]
    eventResources: [EventResource]
    eventPlanPrices: [EventPlanPrice]
    speakers: [Speaker]
    sponsors: [Sponsor]
    sendTag: Boolean
    createdAt: Time
    updatedAt: Time
    deletedAt: Time
  }

  type EventForm {
    id: UUID!
    name: String!
    label: String!
    type: String!
    required: Boolean
    priority: Int
    event: Event
    eventId: UUID
  }

  type FormDesign {
    id: UUID!
    name: String!
    label: String
    type: String!
    required: Boolean
    order: Int
    createdAt: Time
    updatedAt: Time
  }

  type Payment {
    id: UUID!
    paymentType: String!
    memberId: UUID
    member: Member
    duesId: UUID
    due: Due
    eventId: UUID
    event: Event
    description: String!
    phoneNumber: String!
    paymentRef: String
    amount: Decimal!
    status: String!
    createdAt:  Time
    updatedAt:  Time
  }  
  
  type EventPlanPrice {
    id:               UUID!
    eventId:          String!
    membershipTypeId: UUID!
    membershipType:   MembershipType
    event:            Event
    name:             String!
    tickets:          Int
    charge:           Decimal
    createdAt:        Time
    updatedAt:        Time 
  }


  type EventResource {
    id: UUID!
    resourceUrl: String!
    name: String!
    eventId: UUID!
    event: Event
  }
  
  type EventRegistration {
    id: UUID!
    memberId: UUID
    member: Member
    eventId: UUID!
    event: Event
    registrantDetail: JSON!
    checkin: Boolean
    checkinDate: Time
    createdAt: Time
    updatedAt: Time
  }
  
  type Speaker {
    id: UUID!
    name: String!
    title: String!
    about: String!
    avatar: String!
  }

  type Sponsor {
    id: UUID!
    logo: String!
  }
  
  type CpdpPoint {
    id: UUID!
    eventId: UUID!
    memberId: UUID!
    member: Member
    points: Int!
  } 
  
  type Resource {
    id: UUID!
    name: String!
    resourcePath: String!
    fileType: String
    fileSize: Int
    userId: UUID
    user: User,
    createdAt: Time
  }

  type Compaign {
  id: UUID!
  name: String!
  duration: Int!
  starts_at: Time!
  ends_at: Time!
  start_time: Time!
  web_banner: String
  mobile_banner: String
  link: String
  clicks: Int
  views: Int
  status: Boolean
  createdAt: Time
  updatedAt: Time
  deletedAt: Time
}

  ## ------------------------------------- Type Input ---------------------------------------------------##

  input signInUser {
    regId: String!
    password: String!
    rememberMe: String
  }

  input newMember {
    membershipType: UUID!
    membershipId: String
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    workplace: String!
    proofDocument: String
    password: String!
  }

  input dueInput {
    name: String!
    membership: [JSON!]
    startsAt: Time!
    endsAt: Time!
    status: String!
  }
  
  input dueUpdateInput {
    name: String
    amount: Decimal
    startsAt: Time
    endsAt: Time
  }

  input paymentInput {
    paymentType: String!
    memberId: UUID
    duesId: UUID
    eventId: UUID
    description: String!
    phoneNumber: String!
    paymentRef: String
    amount: Decimal
    status: String!
  }
  
  input multiPaymentInput {
    memberId: UUID!
    duesId: [UUID!]
    eventId: UUID
    phoneNumber: String!
    paymentRef: String!
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
    id: UUID
    name: String!
    label: String
    type: String!
    required: Boolean
    priority: Int
  }
  
  input SpeakerFormInput {
    name: String!
    title: String
    about: String!
    avatar: String!
  }
  
  input ResourceInput {
    name: String!
    resourceUrl: String!
  }

  input eventInput {
    name: String!
    theme: String!
    description: String
    cpdpPoint: Int
    type: String!
    link: String
    address: String
    starts_at: Time!
    starts_time: String!
    ends_at: Time!
    ends_time: String!
    paymentType: String!
    amount: Decimal!
    tickets: Int
    isInfinity: Boolean
    coverPhoto: String
    formTitle: String!
    instructions: String!
    message: String!
    form: [EventFormInput!]
    resources: [ResourceInput!]
    certificate: String
    hasCertificate: Boolean
    speakers: [SpeakerFormInput!]
    eventPlanPrices: [EventPlanPriceInput]
    sponsors: [String!]
    sendTag: Boolean
  }
  
  input EventPlanPriceInput {
    membershipTypeId: UUID!
    name:             String!
    tickets:          Int
    charge:           Decimal
  }
  
  input eventRegistrationInput {
    memberId: String
    eventId: String!
    registrantDetail: JSON
    payment: JSON
  }
  
  input ResourcesInput {
    name: String!
    resourcePath: String!
    fileType: String!
    fileSize: Int
  }
  
  input sendMailInput {
    eventId: String!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    memberPhotoURL: String
  }

  input CompaignInput {
  name: String!
  duration: Int!
  starts_at: Time!
  ends_at: Time!
  start_time: Time!
  web_banner: String
  mobile_banner: String
  link: String
}

  ## ------------------------------------- Type Response ---------------------------------------------------##
  
  type UserPayload {
    id: UUID!
    regId: String!
    role: String!
    photoURL: String
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
    result: JSON
    revByCategory: JSON
  }

  type SidebarResponse {
    members: Int
    events: Int
    blogs: Int
    resources: Int
    ads: Int
  }
  
  type memberStat {
    totalEventPoints: Int!,
    pointsEarned: Int!,
    eventAttended: Int!
    fin_status: Boolean
  }

  type ResetPasswordResponse {
    code: Int!
    success: Boolean!
    userId: String
    message: String
  }
  
  type UploadResponse {
    url: String!
  }
  
  type ResourceResponse {
    code: Int!
    success: Boolean!
    message: String
  }

  ## ------------------------------------- Mutation ---------------------------------------------------##

  type Mutation {
    createUser(input: newMember!): CreateUserResponse
    login(input: signInUser!): AuthPayload
    createDue(input: dueInput!): DueResponse
    postPayment(input: paymentInput!): Payment!
    deactivateMember(memberId: UUID!, status: String!): Member
    createBlog(input: blogInput!): BlogResponse
    publishedBlog(blogId: UUID!, status: String!): BlogResponse
    createEvent(input: eventInput!): EventResponse
    watchEventViews(eventId: UUID!): Boolean
    cancelEvent(eventId: UUID!, status: String!): Boolean
    deleteEvent(eventId: UUID!): Boolean
    archiveDue(dueId: UUID!): Boolean
    updateDues(dueId: UUID!, input: dueUpdateInput!): DueResponse
    postMultiPayment(input: multiPaymentInput!): Boolean
    postEventRegistration(input: eventRegistrationInput!): EventRegistration
    resetPassword(userId: UUID!, password: String!): ResetPasswordResponse
    profilephotoUpload(memberId: UUID!, photo: String!): UploadResponse
    createResources(input: ResourcesInput!): ResourceResponse
    deleteResource(resourceId: UUID!): Boolean
    resendEventMail(input: sendMailInput!): Boolean
    memberEventCheckin(id: UUID!): Boolean
    createCompaign(input: CompaignInput!): Compaign
    deleteCompaign(compaignId: String!): Compaign
    updateCompaign(compaignId: String!, input: CompaignInput!): Compaign,
    stopCompaign(compaignId: String!, status: Boolean!): Compaign
    sendForgotPasswordCode(email: String!): ResetPasswordResponse
    codeConfirmation(code: Int!): ResetPasswordResponse
    
  }

  ## ------------------------------------- Query ---------------------------------------------------##


  type Query {
    members: [Member] @auth
    users: [User] @auth
    member(id: UUID!): Member
    dues: [Due] @auth
    singeDue(dueId: UUID!): Due
    getPayments(memberId: UUID): [Payment!]
    memberPayments(memberId: UUID!): [Payment!]
    getPayment(paymentId: UUID!): Payment
    getDuePayment(memberId: UUID!): MemberDueResponse
    getRecentRegistration: [Member!]
    getBlogs(status: String): [Blog!]
    getBlog(blogId: UUID!): Blog
    tags: [Tag!]
    eventFormFields: [FormDesign!]! 
    getEvents: [Event!]
    getEvent(eventId: UUID!): Event
    getAdminDashboardStat: AdminDashboardStatResponse
    getSidebarStat: SidebarResponse
    getRegisteredMembers(eventId: UUID!): [EventRegistration!]
    getMembersAttendance(eventId: UUID!): [EventRegistration!]
    getEventsForPublic: [Event!]
    getUpComingEvents(memberId: UUID!): [EventRegistration!]
    getPastEvents: [Event!]
    getMemberStat(memberId: UUID!): memberStat
    getMemberUnpaidDues(memberId: UUID!, membershipTypeId: UUID!): [Due]
    getMembershipTypes: [MembershipType!]
    getRegistrationForm(eventId: UUID!): Event
    getMember(memberId: UUID!): Member
    getUser(userId: UUID!): Member
    getResources: [Resource!]
    getResource(resourceId: UUID!): Resource
    revenueByCategory(duration: String!): JSON
    getCompaigns: [Compaign!]
    getCompaign(compaignId: String!): Compaign
  }
`;