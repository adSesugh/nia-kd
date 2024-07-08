import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Member as MemberModel, Blog as BlogModel, Tag as TagModel, Payment as PaymentModel, Dues as DuesModel, Event as EventModel, EventResource as EventResourceModel, EventRegistration as EventRegistrationModel } from '@prisma/client';
import { GraphQLContext } from '../context/index';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Decimal: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AdminDashboardStatResponse = {
  __typename?: 'AdminDashboardStatResponse';
  avgAttendance?: Maybe<Scalars['Decimal']['output']>;
  eventHeld?: Maybe<Scalars['Int']['output']>;
  membership?: Maybe<Array<Scalars['Int']['output']>>;
  result?: Maybe<Scalars['JSON']['output']>;
  revByCategory?: Maybe<Scalars['JSON']['output']>;
  revenue?: Maybe<Scalars['Decimal']['output']>;
  totalMember?: Maybe<Scalars['Decimal']['output']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserPayload>;
};

export type Blog = {
  __typename?: 'Blog';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Time']['output']>;
  featuredImage: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type BlogResponse = {
  __typename?: 'BlogResponse';
  blog?: Maybe<Blog>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CpdpPoint = {
  __typename?: 'CpdpPoint';
  eventId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['UUID']['output'];
  points: Scalars['Int']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Due = {
  __typename?: 'Due';
  amount?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  endsAt?: Maybe<Scalars['Time']['output']>;
  id: Scalars['UUID']['output'];
  membershipType?: Maybe<MembershipType>;
  membershipTypeId: Scalars['UUID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  startsAt?: Maybe<Scalars['Time']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type DueResponse = {
  __typename?: 'DueResponse';
  code: Scalars['Int']['output'];
  due?: Maybe<Due>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Event = {
  __typename?: 'Event';
  address?: Maybe<Scalars['String']['output']>;
  amount: Scalars['Decimal']['output'];
  certificate?: Maybe<Scalars['String']['output']>;
  coverPhoto?: Maybe<Scalars['String']['output']>;
  cpdp_points?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  ends_at: Scalars['Time']['output'];
  ends_time: Scalars['String']['output'];
  eventForms?: Maybe<Array<Maybe<EventForm>>>;
  eventPayments?: Maybe<Array<Maybe<Payment>>>;
  eventRegistrations?: Maybe<Array<Maybe<EventRegistration>>>;
  eventResources?: Maybe<Array<Maybe<EventResource>>>;
  formTitle: Scalars['String']['output'];
  hasCertificate?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['UUID']['output'];
  instructions: Scalars['String']['output'];
  isInfinity?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  paymentType: Scalars['String']['output'];
  sendTag?: Maybe<Scalars['Boolean']['output']>;
  speakers?: Maybe<Array<Maybe<Speaker>>>;
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  starts_at: Scalars['Time']['output'];
  starts_time: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tickets?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['UUID']['output']>;
  views?: Maybe<Scalars['Int']['output']>;
};

export type EventForm = {
  __typename?: 'EventForm';
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  required?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
};

export type EventFormInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  type: Scalars['String']['input'];
};

export type EventRegistration = {
  __typename?: 'EventRegistration';
  checkin?: Maybe<Scalars['Boolean']['output']>;
  checkinDate?: Maybe<Scalars['Time']['output']>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  event?: Maybe<Event>;
  eventId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['UUID']['output']>;
  registrantDetail: Scalars['JSON']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

export type EventResource = {
  __typename?: 'EventResource';
  event?: Maybe<Event>;
  eventId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  resourceUrl: Scalars['String']['output'];
};

export type EventResponse = {
  __typename?: 'EventResponse';
  code: Scalars['Int']['output'];
  event?: Maybe<Event>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type FormDesign = {
  __typename?: 'FormDesign';
  createdAt?: Maybe<Scalars['Time']['output']>;
  id: Scalars['UUID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  required?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

export type Member = {
  __typename?: 'Member';
  cpdpPoints?: Maybe<CpdpPoint>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  joined?: Maybe<Scalars['Time']['output']>;
  lastName: Scalars['String']['output'];
  membershipId?: Maybe<Scalars['String']['output']>;
  membershipType?: Maybe<MembershipType>;
  membershipTypeId: Scalars['UUID']['output'];
  phoneNumber: Scalars['String']['output'];
  photoURL?: Maybe<Scalars['String']['output']>;
  regId: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
  userId: Scalars['UUID']['output'];
  workplace: Scalars['String']['output'];
};

export type MemberDueResponse = {
  __typename?: 'MemberDueResponse';
  amount?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  endsAt?: Maybe<Scalars['Time']['output']>;
  id: Scalars['UUID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  paymentStatus?: Maybe<Scalars['Boolean']['output']>;
  startsAt?: Maybe<Scalars['Time']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type MemberResponse = {
  __typename?: 'MemberResponse';
  code: Scalars['Int']['output'];
  member?: Maybe<Member>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type MembershipType = {
  __typename?: 'MembershipType';
  dues?: Maybe<Array<Maybe<Due>>>;
  id: Scalars['UUID']['output'];
  members?: Maybe<Array<Maybe<Member>>>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveDue?: Maybe<Scalars['Boolean']['output']>;
  cancelEvent?: Maybe<Scalars['Boolean']['output']>;
  createBlog?: Maybe<BlogResponse>;
  createDue?: Maybe<DueResponse>;
  createEvent?: Maybe<EventResponse>;
  createResources?: Maybe<ResourceResponse>;
  createUser?: Maybe<CreateUserResponse>;
  deactivateMember?: Maybe<Member>;
  deleteEvent?: Maybe<Scalars['Boolean']['output']>;
  deleteResource?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AuthPayload>;
  postEventRegistration?: Maybe<EventRegistration>;
  postMultiPayment?: Maybe<Scalars['Boolean']['output']>;
  postPayment: Payment;
  profilephotoUpload?: Maybe<UploadResponse>;
  publishedBlog?: Maybe<BlogResponse>;
  resetPassword?: Maybe<ResetPasswordResponse>;
  updateDues?: Maybe<DueResponse>;
  watchEventViews?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationArchiveDueArgs = {
  dueId: Scalars['UUID']['input'];
};


export type MutationCancelEventArgs = {
  eventId: Scalars['UUID']['input'];
  status: Scalars['String']['input'];
};


export type MutationCreateBlogArgs = {
  input: BlogInput;
};


export type MutationCreateDueArgs = {
  input: DueInput;
};


export type MutationCreateEventArgs = {
  input: EventInput;
};


export type MutationCreateResourcesArgs = {
  input: ResourcesInput;
};


export type MutationCreateUserArgs = {
  input: NewMember;
};


export type MutationDeactivateMemberArgs = {
  memberId: Scalars['UUID']['input'];
  status: Scalars['String']['input'];
};


export type MutationDeleteEventArgs = {
  eventId: Scalars['UUID']['input'];
};


export type MutationDeleteResourceArgs = {
  resourceId: Scalars['UUID']['input'];
};


export type MutationLoginArgs = {
  input: SignInUser;
};


export type MutationPostEventRegistrationArgs = {
  input: EventRegistrationInput;
};


export type MutationPostMultiPaymentArgs = {
  input: MultiPaymentInput;
};


export type MutationPostPaymentArgs = {
  input: PaymentInput;
};


export type MutationProfilephotoUploadArgs = {
  memberId: Scalars['UUID']['input'];
  photo: Scalars['String']['input'];
};


export type MutationPublishedBlogArgs = {
  blogId: Scalars['UUID']['input'];
  status: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};


export type MutationUpdateDuesArgs = {
  dueId: Scalars['UUID']['input'];
  input: DueUpdateInput;
};


export type MutationWatchEventViewsArgs = {
  eventId: Scalars['UUID']['input'];
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Decimal']['output'];
  createdAt?: Maybe<Scalars['Time']['output']>;
  description: Scalars['String']['output'];
  due?: Maybe<Due>;
  duesId?: Maybe<Scalars['UUID']['output']>;
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['UUID']['output']>;
  paymentRef?: Maybe<Scalars['String']['output']>;
  paymentType: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

export type Query = {
  __typename?: 'Query';
  dues?: Maybe<Array<Maybe<Due>>>;
  eventFormFields: Array<FormDesign>;
  getAdminDashboardStat?: Maybe<AdminDashboardStatResponse>;
  getBlog?: Maybe<Blog>;
  getBlogs?: Maybe<Array<Blog>>;
  getDuePayment?: Maybe<MemberDueResponse>;
  getEvent?: Maybe<Event>;
  getEvents?: Maybe<Array<Event>>;
  getEventsForPublic?: Maybe<Array<Event>>;
  getMember?: Maybe<Member>;
  getMemberStat?: Maybe<MemberStat>;
  getMemberUnpaidDues?: Maybe<Array<Maybe<Due>>>;
  getMembersAttendance?: Maybe<Array<EventRegistration>>;
  getMembershipTypes?: Maybe<Array<MembershipType>>;
  getPastEvents?: Maybe<Array<Event>>;
  getPayment?: Maybe<Payment>;
  getPayments?: Maybe<Array<Payment>>;
  getRecentRegistration?: Maybe<Array<Member>>;
  getRegisteredMembers?: Maybe<Array<EventRegistration>>;
  getRegistrationForm?: Maybe<Event>;
  getResource?: Maybe<Resource>;
  getResources?: Maybe<Array<Resource>>;
  getSidebarStat?: Maybe<SidebarResponse>;
  getUpComingEvents?: Maybe<Array<EventRegistration>>;
  getUser?: Maybe<Member>;
  member?: Maybe<Member>;
  memberPayments?: Maybe<Array<Payment>>;
  members?: Maybe<Array<Maybe<Member>>>;
  revenueByCategory?: Maybe<Scalars['JSON']['output']>;
  singeDue?: Maybe<Due>;
  tags?: Maybe<Array<Tag>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetBlogArgs = {
  blogId: Scalars['UUID']['input'];
};


export type QueryGetBlogsArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDuePaymentArgs = {
  memberId: Scalars['UUID']['input'];
};


export type QueryGetEventArgs = {
  eventId: Scalars['UUID']['input'];
};


export type QueryGetMemberArgs = {
  memberId: Scalars['UUID']['input'];
};


export type QueryGetMemberStatArgs = {
  memberId: Scalars['UUID']['input'];
};


export type QueryGetMemberUnpaidDuesArgs = {
  memberId: Scalars['UUID']['input'];
  membershipTypeId: Scalars['UUID']['input'];
};


export type QueryGetMembersAttendanceArgs = {
  eventId: Scalars['UUID']['input'];
};


export type QueryGetPaymentArgs = {
  paymentId: Scalars['UUID']['input'];
};


export type QueryGetPaymentsArgs = {
  memberId?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryGetRegisteredMembersArgs = {
  eventId: Scalars['UUID']['input'];
};


export type QueryGetRegistrationFormArgs = {
  eventId: Scalars['UUID']['input'];
};


export type QueryGetResourceArgs = {
  resourceId: Scalars['UUID']['input'];
};


export type QueryGetUpComingEventsArgs = {
  memberId: Scalars['UUID']['input'];
};


export type QueryGetUserArgs = {
  userId: Scalars['UUID']['input'];
};


export type QueryMemberArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryMemberPaymentsArgs = {
  memberId: Scalars['UUID']['input'];
};


export type QueryRevenueByCategoryArgs = {
  duration: Scalars['String']['input'];
};


export type QuerySingeDueArgs = {
  dueId: Scalars['UUID']['input'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Resource = {
  __typename?: 'Resource';
  createdAt?: Maybe<Scalars['Time']['output']>;
  fileSize?: Maybe<Scalars['Int']['output']>;
  fileType?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  resourcePath: Scalars['String']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type ResourceInput = {
  name: Scalars['String']['input'];
  resourceUrl: Scalars['String']['input'];
};

export type ResourceResponse = {
  __typename?: 'ResourceResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ResourcesInput = {
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  fileType: Scalars['String']['input'];
  name: Scalars['String']['input'];
  resourcePath: Scalars['String']['input'];
};

export type SidebarResponse = {
  __typename?: 'SidebarResponse';
  ads?: Maybe<Scalars['Int']['output']>;
  blogs?: Maybe<Scalars['Int']['output']>;
  events?: Maybe<Scalars['Int']['output']>;
  members?: Maybe<Scalars['Int']['output']>;
  resources?: Maybe<Scalars['Int']['output']>;
};

export type Speaker = {
  __typename?: 'Speaker';
  about: Scalars['String']['output'];
  avatar: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type SpeakerFormInput = {
  about: Scalars['String']['input'];
  avatar: Scalars['String']['input'];
  name: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Sponsor = {
  __typename?: 'Sponsor';
  id: Scalars['UUID']['output'];
  logo: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type UploadResponse = {
  __typename?: 'UploadResponse';
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Time']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  member?: Maybe<Member>;
  password: Scalars['String']['output'];
  regId: Scalars['String']['output'];
  rememberMe?: Maybe<Scalars['Boolean']['output']>;
  role: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  id: Scalars['UUID']['output'];
  member?: Maybe<Member>;
  photoURL?: Maybe<Scalars['String']['output']>;
  regId: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type BlogInput = {
  content: Scalars['String']['input'];
  featuredImage: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type DueInput = {
  endsAt: Scalars['Time']['input'];
  membership?: InputMaybe<Array<Scalars['JSON']['input']>>;
  name: Scalars['String']['input'];
  startsAt: Scalars['Time']['input'];
  status: Scalars['String']['input'];
};

export type DueUpdateInput = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  endsAt?: InputMaybe<Scalars['Time']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startsAt?: InputMaybe<Scalars['Time']['input']>;
};

export type EventInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  amount: Scalars['Decimal']['input'];
  certificate?: InputMaybe<Scalars['String']['input']>;
  coverPhoto?: InputMaybe<Scalars['String']['input']>;
  cpdpPoint?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ends_at: Scalars['Time']['input'];
  ends_time: Scalars['String']['input'];
  form?: InputMaybe<Array<EventFormInput>>;
  formTitle: Scalars['String']['input'];
  hasCertificate?: InputMaybe<Scalars['Boolean']['input']>;
  instructions: Scalars['String']['input'];
  isInfinity?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  paymentType: Scalars['String']['input'];
  resources?: InputMaybe<Array<ResourceInput>>;
  sendTag?: InputMaybe<Scalars['Boolean']['input']>;
  speakers?: InputMaybe<Array<SpeakerFormInput>>;
  sponsors?: InputMaybe<Array<Scalars['String']['input']>>;
  starts_at: Scalars['Time']['input'];
  starts_time: Scalars['String']['input'];
  tickets?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};

export type EventRegistrationInput = {
  eventId: Scalars['String']['input'];
  memberId?: InputMaybe<Scalars['String']['input']>;
  payment?: InputMaybe<Scalars['JSON']['input']>;
  registrantDetail?: InputMaybe<Scalars['JSON']['input']>;
};

export type MemberStat = {
  __typename?: 'memberStat';
  eventAttended: Scalars['Int']['output'];
  fin_status?: Maybe<Scalars['Boolean']['output']>;
  pointsEarned: Scalars['Int']['output'];
  totalEventPoints: Scalars['Int']['output'];
};

export type MultiPaymentInput = {
  duesId?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eventId?: InputMaybe<Scalars['UUID']['input']>;
  memberId: Scalars['UUID']['input'];
  paymentRef: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type NewMember = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  membershipId?: InputMaybe<Scalars['String']['input']>;
  membershipType: Scalars['UUID']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  workplace: Scalars['String']['input'];
};

export type PaymentInput = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  description: Scalars['String']['input'];
  duesId?: InputMaybe<Scalars['UUID']['input']>;
  eventId?: InputMaybe<Scalars['UUID']['input']>;
  memberId?: InputMaybe<Scalars['UUID']['input']>;
  paymentRef?: InputMaybe<Scalars['String']['input']>;
  paymentType: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type SignInUser = {
  password: Scalars['String']['input'];
  regId: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserMutationVariables = Exact<{
  input: NewMember;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserResponse', code: number, success: boolean, message?: string | null } | null };

export type UserLoginMutationVariables = Exact<{
  input: SignInUser;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token?: string | null, user?: { __typename?: 'UserPayload', id: any, regId: string, role: string, photoURL?: string | null, member?: { __typename?: 'Member', email: string, photoURL?: string | null, lastName: string, firstName: string, phoneNumber: string, id: any, membershipType?: { __typename?: 'MembershipType', id: any, name: string } | null } | null } | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: any, regId: string, role: string, password: string, rememberMe?: boolean | null, createdAt?: any | null, updatedAt?: any | null } | null> | null };

export type GetMembershipTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembershipTypesQuery = { __typename?: 'Query', getMembershipTypes?: Array<{ __typename?: 'MembershipType', id: any, name: string }> | null };

export type CreateBlogMutationVariables = Exact<{
  input: BlogInput;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog?: { __typename?: 'BlogResponse', code: number, success: boolean, message: string, blog?: { __typename?: 'Blog', id: any, title: string, content: string, summary: string, featuredImage: string, createdAt?: any | null, updatedAt?: any | null, tags?: Array<{ __typename?: 'Tag', name: string, id: any }> | null } | null } | null };

export type GetBlogsQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBlogsQuery = { __typename?: 'Query', getBlogs?: Array<{ __typename?: 'Blog', id: any, title: string, content: string, summary: string, featuredImage: string, status: string, createdAt?: any | null }> | null };

export type PublishedBlogMutationVariables = Exact<{
  blogId: Scalars['UUID']['input'];
  status: Scalars['String']['input'];
}>;


export type PublishedBlogMutation = { __typename?: 'Mutation', publishedBlog?: { __typename?: 'BlogResponse', code: number, success: boolean, message: string, blog?: { __typename?: 'Blog', id: any, title: string, content: string, summary: string, featuredImage: string, status: string, createdAt?: any | null } | null } | null };

export type GetRecentRegistrationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentRegistrationQuery = { __typename?: 'Query', getRecentRegistration?: Array<{ __typename?: 'Member', id: any, firstName: string, lastName: string, createdAt?: any | null, membershipType?: { __typename?: 'MembershipType', id: any, name: string } | null }> | null };

export type GetAdminDashboardStatQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminDashboardStatQuery = { __typename?: 'Query', getAdminDashboardStat?: { __typename?: 'AdminDashboardStatResponse', totalMember?: any | null, eventHeld?: number | null, membership?: Array<number> | null, avgAttendance?: any | null, revenue?: any | null, result?: any | null, revByCategory?: any | null } | null };

export type GetSidebarStatQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSidebarStatQuery = { __typename?: 'Query', getSidebarStat?: { __typename?: 'SidebarResponse', members?: number | null, events?: number | null, blogs?: number | null, resources?: number | null, ads?: number | null } | null };

export type GetMemberStatQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type GetMemberStatQuery = { __typename?: 'Query', getMemberStat?: { __typename?: 'memberStat', eventAttended: number, totalEventPoints: number, pointsEarned: number, fin_status?: boolean | null } | null };

export type RevenueCategoryQueryVariables = Exact<{
  duration: Scalars['String']['input'];
}>;


export type RevenueCategoryQuery = { __typename?: 'Query', revenueByCategory?: any | null };

export type GetDuesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDuesQuery = { __typename?: 'Query', dues?: Array<{ __typename?: 'Due', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, userId?: any | null, createdAt?: any | null, updatedAt?: any | null, membershipType?: { __typename?: 'MembershipType', id: any, name: string } | null } | null> | null };

export type GetSingeDueQueryVariables = Exact<{
  dueId: Scalars['UUID']['input'];
}>;


export type GetSingeDueQuery = { __typename?: 'Query', singeDue?: { __typename?: 'Due', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, userId?: any | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type CreateDueMutationVariables = Exact<{
  input: DueInput;
}>;


export type CreateDueMutation = { __typename?: 'Mutation', createDue?: { __typename?: 'DueResponse', code: number, success: boolean, message: string, due?: { __typename?: 'Due', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, userId?: any | null, createdAt?: any | null, updatedAt?: any | null } | null } | null };

export type GetDuePaymentQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type GetDuePaymentQuery = { __typename?: 'Query', getDuePayment?: { __typename?: 'MemberDueResponse', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, paymentStatus?: boolean | null, userId?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type GetMemberUnpaidDuesQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
  membershipTypeId: Scalars['UUID']['input'];
}>;


export type GetMemberUnpaidDuesQuery = { __typename?: 'Query', getMemberUnpaidDues?: Array<{ __typename?: 'Due', amount?: any | null, name?: string | null, startsAt?: any | null, status?: string | null, id: any, endsAt?: any | null } | null> | null };

export type ArchiveDueMutationVariables = Exact<{
  dueId: Scalars['UUID']['input'];
}>;


export type ArchiveDueMutation = { __typename?: 'Mutation', archiveDue?: boolean | null };

export type UpdateDuesMutationVariables = Exact<{
  dueId: Scalars['UUID']['input'];
  input: DueUpdateInput;
}>;


export type UpdateDuesMutation = { __typename?: 'Mutation', updateDues?: { __typename?: 'DueResponse', code: number, success: boolean, message: string, due?: { __typename?: 'Due', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, userId?: any | null, createdAt?: any | null, updatedAt?: any | null } | null } | null };

export type EventFormFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventFormFieldsQuery = { __typename?: 'Query', eventFormFields: Array<{ __typename?: 'FormDesign', id: any, name: string, label?: string | null, type: string, required?: boolean | null }> };

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'EventResponse', code: number, success: boolean, message: string, event?: { __typename?: 'Event', id: any, name: string, description?: string | null, type: string, link?: string | null, address?: string | null, starts_at: any, ends_at: any, paymentType: string, amount: any, tickets?: number | null, isInfinity?: boolean | null, coverPhoto?: string | null, userId?: any | null, formTitle: string, instructions: string, message: string, createdAt?: any | null, status: string, user?: { __typename?: 'User', member?: { __typename?: 'Member', firstName: string, lastName: string } | null } | null, eventForms?: Array<{ __typename?: 'EventForm', id: any, name: string, type: string, required?: boolean | null } | null> | null } | null } | null };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', getEvents?: Array<{ __typename?: 'Event', coverPhoto?: string | null, amount: any, tickets?: number | null, address?: string | null, id: any, name: string, type: string, status: string, starts_at: any, eventRegistrations?: Array<{ __typename?: 'EventRegistration', id: any } | null> | null }> | null };

export type GetEventQueryVariables = Exact<{
  eventId: Scalars['UUID']['input'];
}>;


export type GetEventQuery = { __typename?: 'Query', getEvent?: { __typename?: 'Event', id: any, name: string, amount: any, tickets?: number | null, isInfinity?: boolean | null, formTitle: string, message: string, views?: number | null, eventRegistrations?: Array<{ __typename?: 'EventRegistration', id: any } | null> | null } | null };

export type CancelEventMutationVariables = Exact<{
  eventId: Scalars['UUID']['input'];
  status: Scalars['String']['input'];
}>;


export type CancelEventMutation = { __typename?: 'Mutation', cancelEvent?: boolean | null };

export type DeleteEventMutationVariables = Exact<{
  eventId: Scalars['UUID']['input'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: boolean | null };

export type WatchEventViewsMutationVariables = Exact<{
  eventId: Scalars['UUID']['input'];
}>;


export type WatchEventViewsMutation = { __typename?: 'Mutation', watchEventViews?: boolean | null };

export type GetRegisteredMembersQueryVariables = Exact<{
  eventId: Scalars['UUID']['input'];
}>;


export type GetRegisteredMembersQuery = { __typename?: 'Query', getRegisteredMembers?: Array<{ __typename?: 'EventRegistration', id: any, registrantDetail: any, createdAt?: any | null }> | null };

export type GetMembersAttendanceQueryVariables = Exact<{
  eventId: Scalars['UUID']['input'];
}>;


export type GetMembersAttendanceQuery = { __typename?: 'Query', getMembersAttendance?: Array<{ __typename?: 'EventRegistration', id: any, registrantDetail: any, checkin?: boolean | null, checkinDate?: any | null, createdAt?: any | null }> | null };

export type GetEventsForPublicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsForPublicQuery = { __typename?: 'Query', getEventsForPublic?: Array<{ __typename?: 'Event', id: any, type: string, status: string, starts_at: any, starts_time: string, paymentType: string, name: string, coverPhoto?: string | null, createdAt?: any | null, amount: any, tickets?: number | null, eventRegistrations?: Array<{ __typename?: 'EventRegistration', id: any } | null> | null }> | null };

export type GetEventForPublicQueryVariables = Exact<{
  eventId: Scalars['UUID']['input'];
}>;


export type GetEventForPublicQuery = { __typename?: 'Query', getEvent?: { __typename?: 'Event', address?: string | null, amount: any, coverPhoto?: string | null, description?: string | null, id: any, name: string, paymentType: string, starts_at: any, starts_time: string, status: string, type: string, sponsors?: Array<{ __typename?: 'Sponsor', id: any, logo: string } | null> | null, eventResources?: Array<{ __typename?: 'EventResource', id: any, resourceUrl: string, name: string } | null> | null, speakers?: Array<{ __typename?: 'Speaker', about: string, avatar: string, id: any, name: string, title: string } | null> | null } | null };

export type GetUpComingEventsQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type GetUpComingEventsQuery = { __typename?: 'Query', getUpComingEvents?: Array<{ __typename?: 'EventRegistration', id: any, createdAt?: any | null, event?: { __typename?: 'Event', id: any, starts_at: any, starts_time: string, name: string, coverPhoto?: string | null } | null }> | null };

export type GetPastEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPastEventsQuery = { __typename?: 'Query', getPastEvents?: Array<{ __typename?: 'Event', id: any, starts_at: any, starts_time: string, name: string, coverPhoto?: string | null, eventRegistrations?: Array<{ __typename?: 'EventRegistration', createdAt?: any | null, memberId?: any | null, id: any } | null> | null }> | null };

export type GetRegistrationFormQueryVariables = Exact<{
  eventId: Scalars['UUID']['input'];
}>;


export type GetRegistrationFormQuery = { __typename?: 'Query', getRegistrationForm?: { __typename?: 'Event', name: string, amount: any, formTitle: string, instructions: string, status: string, paymentType: string, eventForms?: Array<{ __typename?: 'EventForm', id: any, name: string, label: string, type: string, required?: boolean | null } | null> | null } | null };

export type PostEventRegistrationMutationVariables = Exact<{
  input: EventRegistrationInput;
}>;


export type PostEventRegistrationMutation = { __typename?: 'Mutation', postEventRegistration?: { __typename?: 'EventRegistration', id: any, memberId?: any | null, eventId: any, registrantDetail: any, checkin?: boolean | null, checkinDate?: any | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type GetMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersQuery = { __typename?: 'Query', members?: Array<{ __typename?: 'Member', id: any, regId: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoURL?: string | null, joined?: any | null, membershipId?: string | null, status?: string | null, createdAt?: any | null, membershipType?: { __typename?: 'MembershipType', id: any, name: string } | null } | null> | null };

export type DeactivateMemberMutationVariables = Exact<{
  memberId: Scalars['UUID']['input'];
  status: Scalars['String']['input'];
}>;


export type DeactivateMemberMutation = { __typename?: 'Mutation', deactivateMember?: { __typename?: 'Member', id: any, regId: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoURL?: string | null, workplace: string, userId: any, joined?: any | null, membershipId?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null, membershipType?: { __typename?: 'MembershipType', id: any, name: string } | null } | null };

export type GetMemberQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type GetMemberQuery = { __typename?: 'Query', getMember?: { __typename?: 'Member', id: any, regId: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoURL?: string | null, workplace: string, userId: any, joined?: any | null, membershipId?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null, membershipType?: { __typename?: 'MembershipType', id: any, name: string } | null, cpdpPoints?: { __typename?: 'CpdpPoint', id: any, points: number } | null } | null };

export type ProfilephotoUploadMutationVariables = Exact<{
  memberId: Scalars['UUID']['input'];
  photo: Scalars['String']['input'];
}>;


export type ProfilephotoUploadMutation = { __typename?: 'Mutation', profilephotoUpload?: { __typename?: 'UploadResponse', url: string } | null };

export type GetPaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPaymentsQuery = { __typename?: 'Query', getPayments?: Array<{ __typename?: 'Payment', id: any, amount: any, status: string, createdAt?: any | null, member?: { __typename?: 'Member', firstName: string, lastName: string, membershipType?: { __typename?: 'MembershipType', id: any, name: string } | null } | null, due?: { __typename?: 'Due', name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null } | null }> | null };

export type GetPaymentQueryVariables = Exact<{
  paymentId: Scalars['UUID']['input'];
}>;


export type GetPaymentQuery = { __typename?: 'Query', getPayment?: { __typename?: 'Payment', id: any, paymentRef?: string | null, amount: any, status: string, createdAt?: any | null, updatedAt?: any | null, member?: { __typename?: 'Member', firstName: string, lastName: string, regId: string, membershipType?: { __typename?: 'MembershipType', id: any, name: string } | null } | null, due?: { __typename?: 'Due', name?: string | null, startsAt?: any | null, endsAt?: any | null, amount?: any | null } | null } | null };

export type PostPaymentMutationVariables = Exact<{
  input: PaymentInput;
}>;


export type PostPaymentMutation = { __typename?: 'Mutation', postPayment: { __typename?: 'Payment', id: any, memberId?: any | null, duesId?: any | null, paymentRef?: string | null, amount: any, status: string, createdAt?: any | null } };

export type PostMultiPaymentMutationVariables = Exact<{
  input: MultiPaymentInput;
}>;


export type PostMultiPaymentMutation = { __typename?: 'Mutation', postMultiPayment?: boolean | null };

export type MemberPaymentsQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type MemberPaymentsQuery = { __typename?: 'Query', memberPayments?: Array<{ __typename?: 'Payment', id: any, duesId?: any | null, paymentRef?: string | null, amount: any, status: string, createdAt?: any | null, due?: { __typename?: 'Due', status?: string | null, startsAt?: any | null, name?: string | null, id: any, endsAt?: any | null, amount?: any | null } | null }> | null };

export type GetMemberPaymentsQueryVariables = Exact<{
  memberId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetMemberPaymentsQuery = { __typename?: 'Query', getPayments?: Array<{ __typename?: 'Payment', id: any, amount: any, createdAt?: any | null, description: string, paymentRef?: string | null, paymentType: string, status: string }> | null };

export type GetResourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetResourcesQuery = { __typename?: 'Query', getResources?: Array<{ __typename?: 'Resource', id: any, name: string, resourcePath: string, fileType?: string | null, fileSize?: number | null, createdAt?: any | null }> | null };

export type GetResourceQueryVariables = Exact<{
  resourceId: Scalars['UUID']['input'];
}>;


export type GetResourceQuery = { __typename?: 'Query', getResource?: { __typename?: 'Resource', id: any, name: string, resourcePath: string, fileType?: string | null, fileSize?: number | null, createdAt?: any | null } | null };

export type CreateResourcesMutationVariables = Exact<{
  input: ResourcesInput;
}>;


export type CreateResourcesMutation = { __typename?: 'Mutation', createResources?: { __typename?: 'ResourceResponse', code: number, success: boolean, message?: string | null } | null };

export type DeleteResourceMutationMutationVariables = Exact<{
  resourceId: Scalars['UUID']['input'];
}>;


export type DeleteResourceMutationMutation = { __typename?: 'Mutation', deleteResource?: boolean | null };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'Member', id: any, regId: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoURL?: string | null, workplace: string, userId: any, joined?: any | null, membershipId?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null, membershipType?: { __typename?: 'MembershipType', id: any, name: string } | null, cpdpPoints?: { __typename?: 'CpdpPoint', id: any, points: number } | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'ResetPasswordResponse', code: number, success: boolean, message?: string | null } | null };


export const CreateUserDocument = gql`
    mutation CreateUser($input: newMember!) {
  createUser(input: $input) {
    code
    success
    message
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UserLoginDocument = gql`
    mutation UserLogin($input: signInUser!) {
  login(input: $input) {
    token
    user {
      id
      regId
      role
      photoURL
      member {
        membershipType {
          id
          name
        }
        email
        photoURL
        lastName
        firstName
        phoneNumber
        id
      }
    }
  }
}
    `;
export type UserLoginMutationFn = Apollo.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    regId
    role
    password
    rememberMe
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetMembershipTypesDocument = gql`
    query GetMembershipTypes {
  getMembershipTypes {
    id
    name
  }
}
    `;

/**
 * __useGetMembershipTypesQuery__
 *
 * To run a query within a React component, call `useGetMembershipTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembershipTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembershipTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMembershipTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetMembershipTypesQuery, GetMembershipTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembershipTypesQuery, GetMembershipTypesQueryVariables>(GetMembershipTypesDocument, options);
      }
export function useGetMembershipTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembershipTypesQuery, GetMembershipTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembershipTypesQuery, GetMembershipTypesQueryVariables>(GetMembershipTypesDocument, options);
        }
export function useGetMembershipTypesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMembershipTypesQuery, GetMembershipTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMembershipTypesQuery, GetMembershipTypesQueryVariables>(GetMembershipTypesDocument, options);
        }
export type GetMembershipTypesQueryHookResult = ReturnType<typeof useGetMembershipTypesQuery>;
export type GetMembershipTypesLazyQueryHookResult = ReturnType<typeof useGetMembershipTypesLazyQuery>;
export type GetMembershipTypesSuspenseQueryHookResult = ReturnType<typeof useGetMembershipTypesSuspenseQuery>;
export type GetMembershipTypesQueryResult = Apollo.QueryResult<GetMembershipTypesQuery, GetMembershipTypesQueryVariables>;
export const CreateBlogDocument = gql`
    mutation CreateBlog($input: blogInput!) {
  createBlog(input: $input) {
    code
    success
    message
    blog {
      id
      title
      content
      summary
      featuredImage
      tags {
        name
        id
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBlogMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, options);
      }
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const GetBlogsDocument = gql`
    query GetBlogs($status: String) {
  getBlogs(status: $status) {
    id
    title
    content
    summary
    featuredImage
    status
    createdAt
  }
}
    `;

/**
 * __useGetBlogsQuery__
 *
 * To run a query within a React component, call `useGetBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetBlogsQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
      }
export function useGetBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
        }
export function useGetBlogsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
        }
export type GetBlogsQueryHookResult = ReturnType<typeof useGetBlogsQuery>;
export type GetBlogsLazyQueryHookResult = ReturnType<typeof useGetBlogsLazyQuery>;
export type GetBlogsSuspenseQueryHookResult = ReturnType<typeof useGetBlogsSuspenseQuery>;
export type GetBlogsQueryResult = Apollo.QueryResult<GetBlogsQuery, GetBlogsQueryVariables>;
export const PublishedBlogDocument = gql`
    mutation PublishedBlog($blogId: UUID!, $status: String!) {
  publishedBlog(blogId: $blogId, status: $status) {
    code
    success
    message
    blog {
      id
      title
      content
      summary
      featuredImage
      status
      createdAt
    }
  }
}
    `;
export type PublishedBlogMutationFn = Apollo.MutationFunction<PublishedBlogMutation, PublishedBlogMutationVariables>;

/**
 * __usePublishedBlogMutation__
 *
 * To run a mutation, you first call `usePublishedBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishedBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishedBlogMutation, { data, loading, error }] = usePublishedBlogMutation({
 *   variables: {
 *      blogId: // value for 'blogId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function usePublishedBlogMutation(baseOptions?: Apollo.MutationHookOptions<PublishedBlogMutation, PublishedBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishedBlogMutation, PublishedBlogMutationVariables>(PublishedBlogDocument, options);
      }
export type PublishedBlogMutationHookResult = ReturnType<typeof usePublishedBlogMutation>;
export type PublishedBlogMutationResult = Apollo.MutationResult<PublishedBlogMutation>;
export type PublishedBlogMutationOptions = Apollo.BaseMutationOptions<PublishedBlogMutation, PublishedBlogMutationVariables>;
export const GetRecentRegistrationDocument = gql`
    query GetRecentRegistration {
  getRecentRegistration {
    id
    firstName
    lastName
    membershipType {
      id
      name
    }
    createdAt
  }
}
    `;

/**
 * __useGetRecentRegistrationQuery__
 *
 * To run a query within a React component, call `useGetRecentRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentRegistrationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecentRegistrationQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentRegistrationQuery, GetRecentRegistrationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentRegistrationQuery, GetRecentRegistrationQueryVariables>(GetRecentRegistrationDocument, options);
      }
export function useGetRecentRegistrationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentRegistrationQuery, GetRecentRegistrationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentRegistrationQuery, GetRecentRegistrationQueryVariables>(GetRecentRegistrationDocument, options);
        }
export function useGetRecentRegistrationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRecentRegistrationQuery, GetRecentRegistrationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecentRegistrationQuery, GetRecentRegistrationQueryVariables>(GetRecentRegistrationDocument, options);
        }
export type GetRecentRegistrationQueryHookResult = ReturnType<typeof useGetRecentRegistrationQuery>;
export type GetRecentRegistrationLazyQueryHookResult = ReturnType<typeof useGetRecentRegistrationLazyQuery>;
export type GetRecentRegistrationSuspenseQueryHookResult = ReturnType<typeof useGetRecentRegistrationSuspenseQuery>;
export type GetRecentRegistrationQueryResult = Apollo.QueryResult<GetRecentRegistrationQuery, GetRecentRegistrationQueryVariables>;
export const GetAdminDashboardStatDocument = gql`
    query GetAdminDashboardStat {
  getAdminDashboardStat {
    totalMember
    eventHeld
    membership
    avgAttendance
    revenue
    result
    revByCategory
  }
}
    `;

/**
 * __useGetAdminDashboardStatQuery__
 *
 * To run a query within a React component, call `useGetAdminDashboardStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminDashboardStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminDashboardStatQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminDashboardStatQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminDashboardStatQuery, GetAdminDashboardStatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminDashboardStatQuery, GetAdminDashboardStatQueryVariables>(GetAdminDashboardStatDocument, options);
      }
export function useGetAdminDashboardStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminDashboardStatQuery, GetAdminDashboardStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminDashboardStatQuery, GetAdminDashboardStatQueryVariables>(GetAdminDashboardStatDocument, options);
        }
export function useGetAdminDashboardStatSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAdminDashboardStatQuery, GetAdminDashboardStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdminDashboardStatQuery, GetAdminDashboardStatQueryVariables>(GetAdminDashboardStatDocument, options);
        }
export type GetAdminDashboardStatQueryHookResult = ReturnType<typeof useGetAdminDashboardStatQuery>;
export type GetAdminDashboardStatLazyQueryHookResult = ReturnType<typeof useGetAdminDashboardStatLazyQuery>;
export type GetAdminDashboardStatSuspenseQueryHookResult = ReturnType<typeof useGetAdminDashboardStatSuspenseQuery>;
export type GetAdminDashboardStatQueryResult = Apollo.QueryResult<GetAdminDashboardStatQuery, GetAdminDashboardStatQueryVariables>;
export const GetSidebarStatDocument = gql`
    query GetSidebarStat {
  getSidebarStat {
    members
    events
    blogs
    resources
    ads
  }
}
    `;

/**
 * __useGetSidebarStatQuery__
 *
 * To run a query within a React component, call `useGetSidebarStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSidebarStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSidebarStatQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSidebarStatQuery(baseOptions?: Apollo.QueryHookOptions<GetSidebarStatQuery, GetSidebarStatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSidebarStatQuery, GetSidebarStatQueryVariables>(GetSidebarStatDocument, options);
      }
export function useGetSidebarStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSidebarStatQuery, GetSidebarStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSidebarStatQuery, GetSidebarStatQueryVariables>(GetSidebarStatDocument, options);
        }
export function useGetSidebarStatSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSidebarStatQuery, GetSidebarStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSidebarStatQuery, GetSidebarStatQueryVariables>(GetSidebarStatDocument, options);
        }
export type GetSidebarStatQueryHookResult = ReturnType<typeof useGetSidebarStatQuery>;
export type GetSidebarStatLazyQueryHookResult = ReturnType<typeof useGetSidebarStatLazyQuery>;
export type GetSidebarStatSuspenseQueryHookResult = ReturnType<typeof useGetSidebarStatSuspenseQuery>;
export type GetSidebarStatQueryResult = Apollo.QueryResult<GetSidebarStatQuery, GetSidebarStatQueryVariables>;
export const GetMemberStatDocument = gql`
    query GetMemberStat($memberId: UUID!) {
  getMemberStat(memberId: $memberId) {
    eventAttended
    totalEventPoints
    pointsEarned
    fin_status
  }
}
    `;

/**
 * __useGetMemberStatQuery__
 *
 * To run a query within a React component, call `useGetMemberStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberStatQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetMemberStatQuery(baseOptions: Apollo.QueryHookOptions<GetMemberStatQuery, GetMemberStatQueryVariables> & ({ variables: GetMemberStatQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberStatQuery, GetMemberStatQueryVariables>(GetMemberStatDocument, options);
      }
export function useGetMemberStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberStatQuery, GetMemberStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberStatQuery, GetMemberStatQueryVariables>(GetMemberStatDocument, options);
        }
export function useGetMemberStatSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMemberStatQuery, GetMemberStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMemberStatQuery, GetMemberStatQueryVariables>(GetMemberStatDocument, options);
        }
export type GetMemberStatQueryHookResult = ReturnType<typeof useGetMemberStatQuery>;
export type GetMemberStatLazyQueryHookResult = ReturnType<typeof useGetMemberStatLazyQuery>;
export type GetMemberStatSuspenseQueryHookResult = ReturnType<typeof useGetMemberStatSuspenseQuery>;
export type GetMemberStatQueryResult = Apollo.QueryResult<GetMemberStatQuery, GetMemberStatQueryVariables>;
export const RevenueCategoryDocument = gql`
    query revenueCategory($duration: String!) {
  revenueByCategory(duration: $duration)
}
    `;

/**
 * __useRevenueCategoryQuery__
 *
 * To run a query within a React component, call `useRevenueCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevenueCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueCategoryQuery({
 *   variables: {
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useRevenueCategoryQuery(baseOptions: Apollo.QueryHookOptions<RevenueCategoryQuery, RevenueCategoryQueryVariables> & ({ variables: RevenueCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RevenueCategoryQuery, RevenueCategoryQueryVariables>(RevenueCategoryDocument, options);
      }
export function useRevenueCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RevenueCategoryQuery, RevenueCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RevenueCategoryQuery, RevenueCategoryQueryVariables>(RevenueCategoryDocument, options);
        }
export function useRevenueCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RevenueCategoryQuery, RevenueCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RevenueCategoryQuery, RevenueCategoryQueryVariables>(RevenueCategoryDocument, options);
        }
export type RevenueCategoryQueryHookResult = ReturnType<typeof useRevenueCategoryQuery>;
export type RevenueCategoryLazyQueryHookResult = ReturnType<typeof useRevenueCategoryLazyQuery>;
export type RevenueCategorySuspenseQueryHookResult = ReturnType<typeof useRevenueCategorySuspenseQuery>;
export type RevenueCategoryQueryResult = Apollo.QueryResult<RevenueCategoryQuery, RevenueCategoryQueryVariables>;
export const GetDuesDocument = gql`
    query GetDues {
  dues {
    id
    name
    amount
    startsAt
    endsAt
    status
    userId
    membershipType {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetDuesQuery__
 *
 * To run a query within a React component, call `useGetDuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDuesQuery(baseOptions?: Apollo.QueryHookOptions<GetDuesQuery, GetDuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDuesQuery, GetDuesQueryVariables>(GetDuesDocument, options);
      }
export function useGetDuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDuesQuery, GetDuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDuesQuery, GetDuesQueryVariables>(GetDuesDocument, options);
        }
export function useGetDuesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDuesQuery, GetDuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDuesQuery, GetDuesQueryVariables>(GetDuesDocument, options);
        }
export type GetDuesQueryHookResult = ReturnType<typeof useGetDuesQuery>;
export type GetDuesLazyQueryHookResult = ReturnType<typeof useGetDuesLazyQuery>;
export type GetDuesSuspenseQueryHookResult = ReturnType<typeof useGetDuesSuspenseQuery>;
export type GetDuesQueryResult = Apollo.QueryResult<GetDuesQuery, GetDuesQueryVariables>;
export const GetSingeDueDocument = gql`
    query GetSingeDue($dueId: UUID!) {
  singeDue(dueId: $dueId) {
    id
    name
    amount
    startsAt
    endsAt
    status
    userId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetSingeDueQuery__
 *
 * To run a query within a React component, call `useGetSingeDueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingeDueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingeDueQuery({
 *   variables: {
 *      dueId: // value for 'dueId'
 *   },
 * });
 */
export function useGetSingeDueQuery(baseOptions: Apollo.QueryHookOptions<GetSingeDueQuery, GetSingeDueQueryVariables> & ({ variables: GetSingeDueQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingeDueQuery, GetSingeDueQueryVariables>(GetSingeDueDocument, options);
      }
export function useGetSingeDueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingeDueQuery, GetSingeDueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingeDueQuery, GetSingeDueQueryVariables>(GetSingeDueDocument, options);
        }
export function useGetSingeDueSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSingeDueQuery, GetSingeDueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSingeDueQuery, GetSingeDueQueryVariables>(GetSingeDueDocument, options);
        }
export type GetSingeDueQueryHookResult = ReturnType<typeof useGetSingeDueQuery>;
export type GetSingeDueLazyQueryHookResult = ReturnType<typeof useGetSingeDueLazyQuery>;
export type GetSingeDueSuspenseQueryHookResult = ReturnType<typeof useGetSingeDueSuspenseQuery>;
export type GetSingeDueQueryResult = Apollo.QueryResult<GetSingeDueQuery, GetSingeDueQueryVariables>;
export const CreateDueDocument = gql`
    mutation CreateDue($input: dueInput!) {
  createDue(input: $input) {
    code
    success
    message
    due {
      id
      name
      amount
      startsAt
      endsAt
      status
      userId
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateDueMutationFn = Apollo.MutationFunction<CreateDueMutation, CreateDueMutationVariables>;

/**
 * __useCreateDueMutation__
 *
 * To run a mutation, you first call `useCreateDueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDueMutation, { data, loading, error }] = useCreateDueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDueMutation(baseOptions?: Apollo.MutationHookOptions<CreateDueMutation, CreateDueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDueMutation, CreateDueMutationVariables>(CreateDueDocument, options);
      }
export type CreateDueMutationHookResult = ReturnType<typeof useCreateDueMutation>;
export type CreateDueMutationResult = Apollo.MutationResult<CreateDueMutation>;
export type CreateDueMutationOptions = Apollo.BaseMutationOptions<CreateDueMutation, CreateDueMutationVariables>;
export const GetDuePaymentDocument = gql`
    query GetDuePayment($memberId: UUID!) {
  getDuePayment(memberId: $memberId) {
    id
    name
    amount
    startsAt
    endsAt
    status
    paymentStatus
    userId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetDuePaymentQuery__
 *
 * To run a query within a React component, call `useGetDuePaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDuePaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDuePaymentQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetDuePaymentQuery(baseOptions: Apollo.QueryHookOptions<GetDuePaymentQuery, GetDuePaymentQueryVariables> & ({ variables: GetDuePaymentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDuePaymentQuery, GetDuePaymentQueryVariables>(GetDuePaymentDocument, options);
      }
export function useGetDuePaymentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDuePaymentQuery, GetDuePaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDuePaymentQuery, GetDuePaymentQueryVariables>(GetDuePaymentDocument, options);
        }
export function useGetDuePaymentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDuePaymentQuery, GetDuePaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDuePaymentQuery, GetDuePaymentQueryVariables>(GetDuePaymentDocument, options);
        }
export type GetDuePaymentQueryHookResult = ReturnType<typeof useGetDuePaymentQuery>;
export type GetDuePaymentLazyQueryHookResult = ReturnType<typeof useGetDuePaymentLazyQuery>;
export type GetDuePaymentSuspenseQueryHookResult = ReturnType<typeof useGetDuePaymentSuspenseQuery>;
export type GetDuePaymentQueryResult = Apollo.QueryResult<GetDuePaymentQuery, GetDuePaymentQueryVariables>;
export const GetMemberUnpaidDuesDocument = gql`
    query GetMemberUnpaidDues($memberId: UUID!, $membershipTypeId: UUID!) {
  getMemberUnpaidDues(memberId: $memberId, membershipTypeId: $membershipTypeId) {
    amount
    name
    startsAt
    status
    id
    endsAt
  }
}
    `;

/**
 * __useGetMemberUnpaidDuesQuery__
 *
 * To run a query within a React component, call `useGetMemberUnpaidDuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberUnpaidDuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberUnpaidDuesQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      membershipTypeId: // value for 'membershipTypeId'
 *   },
 * });
 */
export function useGetMemberUnpaidDuesQuery(baseOptions: Apollo.QueryHookOptions<GetMemberUnpaidDuesQuery, GetMemberUnpaidDuesQueryVariables> & ({ variables: GetMemberUnpaidDuesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberUnpaidDuesQuery, GetMemberUnpaidDuesQueryVariables>(GetMemberUnpaidDuesDocument, options);
      }
export function useGetMemberUnpaidDuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberUnpaidDuesQuery, GetMemberUnpaidDuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberUnpaidDuesQuery, GetMemberUnpaidDuesQueryVariables>(GetMemberUnpaidDuesDocument, options);
        }
export function useGetMemberUnpaidDuesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMemberUnpaidDuesQuery, GetMemberUnpaidDuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMemberUnpaidDuesQuery, GetMemberUnpaidDuesQueryVariables>(GetMemberUnpaidDuesDocument, options);
        }
export type GetMemberUnpaidDuesQueryHookResult = ReturnType<typeof useGetMemberUnpaidDuesQuery>;
export type GetMemberUnpaidDuesLazyQueryHookResult = ReturnType<typeof useGetMemberUnpaidDuesLazyQuery>;
export type GetMemberUnpaidDuesSuspenseQueryHookResult = ReturnType<typeof useGetMemberUnpaidDuesSuspenseQuery>;
export type GetMemberUnpaidDuesQueryResult = Apollo.QueryResult<GetMemberUnpaidDuesQuery, GetMemberUnpaidDuesQueryVariables>;
export const ArchiveDueDocument = gql`
    mutation ArchiveDue($dueId: UUID!) {
  archiveDue(dueId: $dueId)
}
    `;
export type ArchiveDueMutationFn = Apollo.MutationFunction<ArchiveDueMutation, ArchiveDueMutationVariables>;

/**
 * __useArchiveDueMutation__
 *
 * To run a mutation, you first call `useArchiveDueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveDueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveDueMutation, { data, loading, error }] = useArchiveDueMutation({
 *   variables: {
 *      dueId: // value for 'dueId'
 *   },
 * });
 */
export function useArchiveDueMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveDueMutation, ArchiveDueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveDueMutation, ArchiveDueMutationVariables>(ArchiveDueDocument, options);
      }
export type ArchiveDueMutationHookResult = ReturnType<typeof useArchiveDueMutation>;
export type ArchiveDueMutationResult = Apollo.MutationResult<ArchiveDueMutation>;
export type ArchiveDueMutationOptions = Apollo.BaseMutationOptions<ArchiveDueMutation, ArchiveDueMutationVariables>;
export const UpdateDuesDocument = gql`
    mutation updateDues($dueId: UUID!, $input: dueUpdateInput!) {
  updateDues(dueId: $dueId, input: $input) {
    code
    success
    message
    due {
      id
      name
      amount
      startsAt
      endsAt
      status
      userId
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdateDuesMutationFn = Apollo.MutationFunction<UpdateDuesMutation, UpdateDuesMutationVariables>;

/**
 * __useUpdateDuesMutation__
 *
 * To run a mutation, you first call `useUpdateDuesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDuesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDuesMutation, { data, loading, error }] = useUpdateDuesMutation({
 *   variables: {
 *      dueId: // value for 'dueId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDuesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDuesMutation, UpdateDuesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDuesMutation, UpdateDuesMutationVariables>(UpdateDuesDocument, options);
      }
export type UpdateDuesMutationHookResult = ReturnType<typeof useUpdateDuesMutation>;
export type UpdateDuesMutationResult = Apollo.MutationResult<UpdateDuesMutation>;
export type UpdateDuesMutationOptions = Apollo.BaseMutationOptions<UpdateDuesMutation, UpdateDuesMutationVariables>;
export const EventFormFieldsDocument = gql`
    query EventFormFields {
  eventFormFields {
    id
    name
    label
    type
    required
  }
}
    `;

/**
 * __useEventFormFieldsQuery__
 *
 * To run a query within a React component, call `useEventFormFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventFormFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventFormFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventFormFieldsQuery(baseOptions?: Apollo.QueryHookOptions<EventFormFieldsQuery, EventFormFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventFormFieldsQuery, EventFormFieldsQueryVariables>(EventFormFieldsDocument, options);
      }
export function useEventFormFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventFormFieldsQuery, EventFormFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventFormFieldsQuery, EventFormFieldsQueryVariables>(EventFormFieldsDocument, options);
        }
export function useEventFormFieldsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventFormFieldsQuery, EventFormFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventFormFieldsQuery, EventFormFieldsQueryVariables>(EventFormFieldsDocument, options);
        }
export type EventFormFieldsQueryHookResult = ReturnType<typeof useEventFormFieldsQuery>;
export type EventFormFieldsLazyQueryHookResult = ReturnType<typeof useEventFormFieldsLazyQuery>;
export type EventFormFieldsSuspenseQueryHookResult = ReturnType<typeof useEventFormFieldsSuspenseQuery>;
export type EventFormFieldsQueryResult = Apollo.QueryResult<EventFormFieldsQuery, EventFormFieldsQueryVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($input: eventInput!) {
  createEvent(input: $input) {
    code
    success
    message
    event {
      id
      name
      description
      type
      link
      address
      starts_at
      ends_at
      paymentType
      amount
      tickets
      isInfinity
      coverPhoto
      userId
      formTitle
      instructions
      message
      user {
        member {
          firstName
          lastName
        }
      }
      eventForms {
        id
        name
        type
        required
      }
      createdAt
      status
    }
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const GetEventsDocument = gql`
    query GetEvents {
  getEvents {
    coverPhoto
    amount
    tickets
    address
    id
    name
    type
    status
    starts_at
    eventRegistrations {
      id
    }
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export function useGetEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetEventDocument = gql`
    query GetEvent($eventId: UUID!) {
  getEvent(eventId: $eventId) {
    id
    name
    amount
    tickets
    isInfinity
    formTitle
    message
    views
    eventRegistrations {
      id
    }
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables> & ({ variables: GetEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export function useGetEventSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventSuspenseQueryHookResult = ReturnType<typeof useGetEventSuspenseQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const CancelEventDocument = gql`
    mutation CancelEvent($eventId: UUID!, $status: String!) {
  cancelEvent(eventId: $eventId, status: $status)
}
    `;
export type CancelEventMutationFn = Apollo.MutationFunction<CancelEventMutation, CancelEventMutationVariables>;

/**
 * __useCancelEventMutation__
 *
 * To run a mutation, you first call `useCancelEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelEventMutation, { data, loading, error }] = useCancelEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useCancelEventMutation(baseOptions?: Apollo.MutationHookOptions<CancelEventMutation, CancelEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelEventMutation, CancelEventMutationVariables>(CancelEventDocument, options);
      }
export type CancelEventMutationHookResult = ReturnType<typeof useCancelEventMutation>;
export type CancelEventMutationResult = Apollo.MutationResult<CancelEventMutation>;
export type CancelEventMutationOptions = Apollo.BaseMutationOptions<CancelEventMutation, CancelEventMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($eventId: UUID!) {
  deleteEvent(eventId: $eventId)
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const WatchEventViewsDocument = gql`
    mutation WatchEventViews($eventId: UUID!) {
  watchEventViews(eventId: $eventId)
}
    `;
export type WatchEventViewsMutationFn = Apollo.MutationFunction<WatchEventViewsMutation, WatchEventViewsMutationVariables>;

/**
 * __useWatchEventViewsMutation__
 *
 * To run a mutation, you first call `useWatchEventViewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWatchEventViewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [watchEventViewsMutation, { data, loading, error }] = useWatchEventViewsMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useWatchEventViewsMutation(baseOptions?: Apollo.MutationHookOptions<WatchEventViewsMutation, WatchEventViewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WatchEventViewsMutation, WatchEventViewsMutationVariables>(WatchEventViewsDocument, options);
      }
export type WatchEventViewsMutationHookResult = ReturnType<typeof useWatchEventViewsMutation>;
export type WatchEventViewsMutationResult = Apollo.MutationResult<WatchEventViewsMutation>;
export type WatchEventViewsMutationOptions = Apollo.BaseMutationOptions<WatchEventViewsMutation, WatchEventViewsMutationVariables>;
export const GetRegisteredMembersDocument = gql`
    query GetRegisteredMembers($eventId: UUID!) {
  getRegisteredMembers(eventId: $eventId) {
    id
    registrantDetail
    createdAt
  }
}
    `;

/**
 * __useGetRegisteredMembersQuery__
 *
 * To run a query within a React component, call `useGetRegisteredMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRegisteredMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRegisteredMembersQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetRegisteredMembersQuery(baseOptions: Apollo.QueryHookOptions<GetRegisteredMembersQuery, GetRegisteredMembersQueryVariables> & ({ variables: GetRegisteredMembersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRegisteredMembersQuery, GetRegisteredMembersQueryVariables>(GetRegisteredMembersDocument, options);
      }
export function useGetRegisteredMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRegisteredMembersQuery, GetRegisteredMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRegisteredMembersQuery, GetRegisteredMembersQueryVariables>(GetRegisteredMembersDocument, options);
        }
export function useGetRegisteredMembersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRegisteredMembersQuery, GetRegisteredMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRegisteredMembersQuery, GetRegisteredMembersQueryVariables>(GetRegisteredMembersDocument, options);
        }
export type GetRegisteredMembersQueryHookResult = ReturnType<typeof useGetRegisteredMembersQuery>;
export type GetRegisteredMembersLazyQueryHookResult = ReturnType<typeof useGetRegisteredMembersLazyQuery>;
export type GetRegisteredMembersSuspenseQueryHookResult = ReturnType<typeof useGetRegisteredMembersSuspenseQuery>;
export type GetRegisteredMembersQueryResult = Apollo.QueryResult<GetRegisteredMembersQuery, GetRegisteredMembersQueryVariables>;
export const GetMembersAttendanceDocument = gql`
    query GetMembersAttendance($eventId: UUID!) {
  getMembersAttendance(eventId: $eventId) {
    id
    registrantDetail
    checkin
    checkinDate
    createdAt
  }
}
    `;

/**
 * __useGetMembersAttendanceQuery__
 *
 * To run a query within a React component, call `useGetMembersAttendanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersAttendanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersAttendanceQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetMembersAttendanceQuery(baseOptions: Apollo.QueryHookOptions<GetMembersAttendanceQuery, GetMembersAttendanceQueryVariables> & ({ variables: GetMembersAttendanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembersAttendanceQuery, GetMembersAttendanceQueryVariables>(GetMembersAttendanceDocument, options);
      }
export function useGetMembersAttendanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembersAttendanceQuery, GetMembersAttendanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembersAttendanceQuery, GetMembersAttendanceQueryVariables>(GetMembersAttendanceDocument, options);
        }
export function useGetMembersAttendanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMembersAttendanceQuery, GetMembersAttendanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMembersAttendanceQuery, GetMembersAttendanceQueryVariables>(GetMembersAttendanceDocument, options);
        }
export type GetMembersAttendanceQueryHookResult = ReturnType<typeof useGetMembersAttendanceQuery>;
export type GetMembersAttendanceLazyQueryHookResult = ReturnType<typeof useGetMembersAttendanceLazyQuery>;
export type GetMembersAttendanceSuspenseQueryHookResult = ReturnType<typeof useGetMembersAttendanceSuspenseQuery>;
export type GetMembersAttendanceQueryResult = Apollo.QueryResult<GetMembersAttendanceQuery, GetMembersAttendanceQueryVariables>;
export const GetEventsForPublicDocument = gql`
    query GetEventsForPublic {
  getEventsForPublic {
    id
    type
    status
    starts_at
    starts_time
    paymentType
    name
    eventRegistrations {
      id
    }
    coverPhoto
    createdAt
    amount
    tickets
  }
}
    `;

/**
 * __useGetEventsForPublicQuery__
 *
 * To run a query within a React component, call `useGetEventsForPublicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsForPublicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsForPublicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventsForPublicQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsForPublicQuery, GetEventsForPublicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsForPublicQuery, GetEventsForPublicQueryVariables>(GetEventsForPublicDocument, options);
      }
export function useGetEventsForPublicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsForPublicQuery, GetEventsForPublicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsForPublicQuery, GetEventsForPublicQueryVariables>(GetEventsForPublicDocument, options);
        }
export function useGetEventsForPublicSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventsForPublicQuery, GetEventsForPublicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsForPublicQuery, GetEventsForPublicQueryVariables>(GetEventsForPublicDocument, options);
        }
export type GetEventsForPublicQueryHookResult = ReturnType<typeof useGetEventsForPublicQuery>;
export type GetEventsForPublicLazyQueryHookResult = ReturnType<typeof useGetEventsForPublicLazyQuery>;
export type GetEventsForPublicSuspenseQueryHookResult = ReturnType<typeof useGetEventsForPublicSuspenseQuery>;
export type GetEventsForPublicQueryResult = Apollo.QueryResult<GetEventsForPublicQuery, GetEventsForPublicQueryVariables>;
export const GetEventForPublicDocument = gql`
    query GetEventForPublic($eventId: UUID!) {
  getEvent(eventId: $eventId) {
    address
    amount
    coverPhoto
    description
    id
    name
    paymentType
    starts_at
    starts_time
    sponsors {
      id
      logo
    }
    eventResources {
      id
      resourceUrl
      name
    }
    speakers {
      about
      avatar
      id
      name
      title
    }
    status
    type
  }
}
    `;

/**
 * __useGetEventForPublicQuery__
 *
 * To run a query within a React component, call `useGetEventForPublicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventForPublicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventForPublicQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventForPublicQuery(baseOptions: Apollo.QueryHookOptions<GetEventForPublicQuery, GetEventForPublicQueryVariables> & ({ variables: GetEventForPublicQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventForPublicQuery, GetEventForPublicQueryVariables>(GetEventForPublicDocument, options);
      }
export function useGetEventForPublicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventForPublicQuery, GetEventForPublicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventForPublicQuery, GetEventForPublicQueryVariables>(GetEventForPublicDocument, options);
        }
export function useGetEventForPublicSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventForPublicQuery, GetEventForPublicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventForPublicQuery, GetEventForPublicQueryVariables>(GetEventForPublicDocument, options);
        }
export type GetEventForPublicQueryHookResult = ReturnType<typeof useGetEventForPublicQuery>;
export type GetEventForPublicLazyQueryHookResult = ReturnType<typeof useGetEventForPublicLazyQuery>;
export type GetEventForPublicSuspenseQueryHookResult = ReturnType<typeof useGetEventForPublicSuspenseQuery>;
export type GetEventForPublicQueryResult = Apollo.QueryResult<GetEventForPublicQuery, GetEventForPublicQueryVariables>;
export const GetUpComingEventsDocument = gql`
    query GetUpComingEvents($memberId: UUID!) {
  getUpComingEvents(memberId: $memberId) {
    id
    createdAt
    event {
      id
      starts_at
      starts_time
      name
      coverPhoto
    }
  }
}
    `;

/**
 * __useGetUpComingEventsQuery__
 *
 * To run a query within a React component, call `useGetUpComingEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpComingEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpComingEventsQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetUpComingEventsQuery(baseOptions: Apollo.QueryHookOptions<GetUpComingEventsQuery, GetUpComingEventsQueryVariables> & ({ variables: GetUpComingEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpComingEventsQuery, GetUpComingEventsQueryVariables>(GetUpComingEventsDocument, options);
      }
export function useGetUpComingEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpComingEventsQuery, GetUpComingEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpComingEventsQuery, GetUpComingEventsQueryVariables>(GetUpComingEventsDocument, options);
        }
export function useGetUpComingEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUpComingEventsQuery, GetUpComingEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUpComingEventsQuery, GetUpComingEventsQueryVariables>(GetUpComingEventsDocument, options);
        }
export type GetUpComingEventsQueryHookResult = ReturnType<typeof useGetUpComingEventsQuery>;
export type GetUpComingEventsLazyQueryHookResult = ReturnType<typeof useGetUpComingEventsLazyQuery>;
export type GetUpComingEventsSuspenseQueryHookResult = ReturnType<typeof useGetUpComingEventsSuspenseQuery>;
export type GetUpComingEventsQueryResult = Apollo.QueryResult<GetUpComingEventsQuery, GetUpComingEventsQueryVariables>;
export const GetPastEventsDocument = gql`
    query GetPastEvents {
  getPastEvents {
    id
    starts_at
    starts_time
    name
    coverPhoto
    eventRegistrations {
      createdAt
      memberId
      id
    }
  }
}
    `;

/**
 * __useGetPastEventsQuery__
 *
 * To run a query within a React component, call `useGetPastEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPastEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetPastEventsQuery, GetPastEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPastEventsQuery, GetPastEventsQueryVariables>(GetPastEventsDocument, options);
      }
export function useGetPastEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPastEventsQuery, GetPastEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPastEventsQuery, GetPastEventsQueryVariables>(GetPastEventsDocument, options);
        }
export function useGetPastEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPastEventsQuery, GetPastEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPastEventsQuery, GetPastEventsQueryVariables>(GetPastEventsDocument, options);
        }
export type GetPastEventsQueryHookResult = ReturnType<typeof useGetPastEventsQuery>;
export type GetPastEventsLazyQueryHookResult = ReturnType<typeof useGetPastEventsLazyQuery>;
export type GetPastEventsSuspenseQueryHookResult = ReturnType<typeof useGetPastEventsSuspenseQuery>;
export type GetPastEventsQueryResult = Apollo.QueryResult<GetPastEventsQuery, GetPastEventsQueryVariables>;
export const GetRegistrationFormDocument = gql`
    query GetRegistrationForm($eventId: UUID!) {
  getRegistrationForm(eventId: $eventId) {
    name
    amount
    formTitle
    instructions
    status
    paymentType
    eventForms {
      id
      name
      label
      type
      required
    }
  }
}
    `;

/**
 * __useGetRegistrationFormQuery__
 *
 * To run a query within a React component, call `useGetRegistrationFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRegistrationFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRegistrationFormQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetRegistrationFormQuery(baseOptions: Apollo.QueryHookOptions<GetRegistrationFormQuery, GetRegistrationFormQueryVariables> & ({ variables: GetRegistrationFormQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRegistrationFormQuery, GetRegistrationFormQueryVariables>(GetRegistrationFormDocument, options);
      }
export function useGetRegistrationFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRegistrationFormQuery, GetRegistrationFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRegistrationFormQuery, GetRegistrationFormQueryVariables>(GetRegistrationFormDocument, options);
        }
export function useGetRegistrationFormSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRegistrationFormQuery, GetRegistrationFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRegistrationFormQuery, GetRegistrationFormQueryVariables>(GetRegistrationFormDocument, options);
        }
export type GetRegistrationFormQueryHookResult = ReturnType<typeof useGetRegistrationFormQuery>;
export type GetRegistrationFormLazyQueryHookResult = ReturnType<typeof useGetRegistrationFormLazyQuery>;
export type GetRegistrationFormSuspenseQueryHookResult = ReturnType<typeof useGetRegistrationFormSuspenseQuery>;
export type GetRegistrationFormQueryResult = Apollo.QueryResult<GetRegistrationFormQuery, GetRegistrationFormQueryVariables>;
export const PostEventRegistrationDocument = gql`
    mutation PostEventRegistration($input: eventRegistrationInput!) {
  postEventRegistration(input: $input) {
    id
    memberId
    eventId
    registrantDetail
    checkin
    checkinDate
    createdAt
    updatedAt
  }
}
    `;
export type PostEventRegistrationMutationFn = Apollo.MutationFunction<PostEventRegistrationMutation, PostEventRegistrationMutationVariables>;

/**
 * __usePostEventRegistrationMutation__
 *
 * To run a mutation, you first call `usePostEventRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostEventRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postEventRegistrationMutation, { data, loading, error }] = usePostEventRegistrationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostEventRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<PostEventRegistrationMutation, PostEventRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostEventRegistrationMutation, PostEventRegistrationMutationVariables>(PostEventRegistrationDocument, options);
      }
export type PostEventRegistrationMutationHookResult = ReturnType<typeof usePostEventRegistrationMutation>;
export type PostEventRegistrationMutationResult = Apollo.MutationResult<PostEventRegistrationMutation>;
export type PostEventRegistrationMutationOptions = Apollo.BaseMutationOptions<PostEventRegistrationMutation, PostEventRegistrationMutationVariables>;
export const GetMembersDocument = gql`
    query GetMembers {
  members {
    id
    regId
    firstName
    lastName
    email
    phoneNumber
    photoURL
    joined
    membershipType {
      id
      name
    }
    membershipId
    status
    createdAt
  }
}
    `;

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
      }
export function useGetMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
        }
export function useGetMembersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
        }
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>;
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>;
export type GetMembersSuspenseQueryHookResult = ReturnType<typeof useGetMembersSuspenseQuery>;
export type GetMembersQueryResult = Apollo.QueryResult<GetMembersQuery, GetMembersQueryVariables>;
export const DeactivateMemberDocument = gql`
    mutation DeactivateMember($memberId: UUID!, $status: String!) {
  deactivateMember(memberId: $memberId, status: $status) {
    id
    regId
    firstName
    lastName
    email
    phoneNumber
    photoURL
    workplace
    userId
    joined
    membershipType {
      id
      name
    }
    membershipId
    status
    createdAt
    updatedAt
  }
}
    `;
export type DeactivateMemberMutationFn = Apollo.MutationFunction<DeactivateMemberMutation, DeactivateMemberMutationVariables>;

/**
 * __useDeactivateMemberMutation__
 *
 * To run a mutation, you first call `useDeactivateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateMemberMutation, { data, loading, error }] = useDeactivateMemberMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useDeactivateMemberMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateMemberMutation, DeactivateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateMemberMutation, DeactivateMemberMutationVariables>(DeactivateMemberDocument, options);
      }
export type DeactivateMemberMutationHookResult = ReturnType<typeof useDeactivateMemberMutation>;
export type DeactivateMemberMutationResult = Apollo.MutationResult<DeactivateMemberMutation>;
export type DeactivateMemberMutationOptions = Apollo.BaseMutationOptions<DeactivateMemberMutation, DeactivateMemberMutationVariables>;
export const GetMemberDocument = gql`
    query GetMember($memberId: UUID!) {
  getMember(memberId: $memberId) {
    id
    regId
    firstName
    lastName
    email
    phoneNumber
    photoURL
    workplace
    userId
    joined
    membershipType {
      id
      name
    }
    membershipId
    status
    cpdpPoints {
      id
      points
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMemberQuery__
 *
 * To run a query within a React component, call `useGetMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetMemberQuery(baseOptions: Apollo.QueryHookOptions<GetMemberQuery, GetMemberQueryVariables> & ({ variables: GetMemberQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options);
      }
export function useGetMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options);
        }
export function useGetMemberSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options);
        }
export type GetMemberQueryHookResult = ReturnType<typeof useGetMemberQuery>;
export type GetMemberLazyQueryHookResult = ReturnType<typeof useGetMemberLazyQuery>;
export type GetMemberSuspenseQueryHookResult = ReturnType<typeof useGetMemberSuspenseQuery>;
export type GetMemberQueryResult = Apollo.QueryResult<GetMemberQuery, GetMemberQueryVariables>;
export const ProfilephotoUploadDocument = gql`
    mutation ProfilephotoUpload($memberId: UUID!, $photo: String!) {
  profilephotoUpload(memberId: $memberId, photo: $photo) {
    url
  }
}
    `;
export type ProfilephotoUploadMutationFn = Apollo.MutationFunction<ProfilephotoUploadMutation, ProfilephotoUploadMutationVariables>;

/**
 * __useProfilephotoUploadMutation__
 *
 * To run a mutation, you first call `useProfilephotoUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfilephotoUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profilephotoUploadMutation, { data, loading, error }] = useProfilephotoUploadMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      photo: // value for 'photo'
 *   },
 * });
 */
export function useProfilephotoUploadMutation(baseOptions?: Apollo.MutationHookOptions<ProfilephotoUploadMutation, ProfilephotoUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProfilephotoUploadMutation, ProfilephotoUploadMutationVariables>(ProfilephotoUploadDocument, options);
      }
export type ProfilephotoUploadMutationHookResult = ReturnType<typeof useProfilephotoUploadMutation>;
export type ProfilephotoUploadMutationResult = Apollo.MutationResult<ProfilephotoUploadMutation>;
export type ProfilephotoUploadMutationOptions = Apollo.BaseMutationOptions<ProfilephotoUploadMutation, ProfilephotoUploadMutationVariables>;
export const GetPaymentsDocument = gql`
    query GetPayments {
  getPayments {
    id
    member {
      membershipType {
        id
        name
      }
      firstName
      lastName
    }
    due {
      name
      amount
      startsAt
      endsAt
    }
    amount
    status
    createdAt
  }
}
    `;

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPaymentsQuery(baseOptions?: Apollo.QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
      }
export function useGetPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
        }
export function useGetPaymentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
        }
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>;
export type GetPaymentsLazyQueryHookResult = ReturnType<typeof useGetPaymentsLazyQuery>;
export type GetPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetPaymentsSuspenseQuery>;
export type GetPaymentsQueryResult = Apollo.QueryResult<GetPaymentsQuery, GetPaymentsQueryVariables>;
export const GetPaymentDocument = gql`
    query GetPayment($paymentId: UUID!) {
  getPayment(paymentId: $paymentId) {
    id
    member {
      firstName
      lastName
      membershipType {
        id
        name
      }
      regId
    }
    due {
      name
      startsAt
      endsAt
      amount
    }
    paymentRef
    amount
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPaymentQuery__
 *
 * To run a query within a React component, call `useGetPaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentQuery({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useGetPaymentQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentQuery, GetPaymentQueryVariables> & ({ variables: GetPaymentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentQuery, GetPaymentQueryVariables>(GetPaymentDocument, options);
      }
export function useGetPaymentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentQuery, GetPaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentQuery, GetPaymentQueryVariables>(GetPaymentDocument, options);
        }
export function useGetPaymentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPaymentQuery, GetPaymentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaymentQuery, GetPaymentQueryVariables>(GetPaymentDocument, options);
        }
export type GetPaymentQueryHookResult = ReturnType<typeof useGetPaymentQuery>;
export type GetPaymentLazyQueryHookResult = ReturnType<typeof useGetPaymentLazyQuery>;
export type GetPaymentSuspenseQueryHookResult = ReturnType<typeof useGetPaymentSuspenseQuery>;
export type GetPaymentQueryResult = Apollo.QueryResult<GetPaymentQuery, GetPaymentQueryVariables>;
export const PostPaymentDocument = gql`
    mutation PostPayment($input: paymentInput!) {
  postPayment(input: $input) {
    id
    memberId
    duesId
    paymentRef
    amount
    status
    createdAt
  }
}
    `;
export type PostPaymentMutationFn = Apollo.MutationFunction<PostPaymentMutation, PostPaymentMutationVariables>;

/**
 * __usePostPaymentMutation__
 *
 * To run a mutation, you first call `usePostPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postPaymentMutation, { data, loading, error }] = usePostPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostPaymentMutation(baseOptions?: Apollo.MutationHookOptions<PostPaymentMutation, PostPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostPaymentMutation, PostPaymentMutationVariables>(PostPaymentDocument, options);
      }
export type PostPaymentMutationHookResult = ReturnType<typeof usePostPaymentMutation>;
export type PostPaymentMutationResult = Apollo.MutationResult<PostPaymentMutation>;
export type PostPaymentMutationOptions = Apollo.BaseMutationOptions<PostPaymentMutation, PostPaymentMutationVariables>;
export const PostMultiPaymentDocument = gql`
    mutation PostMultiPayment($input: multiPaymentInput!) {
  postMultiPayment(input: $input)
}
    `;
export type PostMultiPaymentMutationFn = Apollo.MutationFunction<PostMultiPaymentMutation, PostMultiPaymentMutationVariables>;

/**
 * __usePostMultiPaymentMutation__
 *
 * To run a mutation, you first call `usePostMultiPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMultiPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMultiPaymentMutation, { data, loading, error }] = usePostMultiPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostMultiPaymentMutation(baseOptions?: Apollo.MutationHookOptions<PostMultiPaymentMutation, PostMultiPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostMultiPaymentMutation, PostMultiPaymentMutationVariables>(PostMultiPaymentDocument, options);
      }
export type PostMultiPaymentMutationHookResult = ReturnType<typeof usePostMultiPaymentMutation>;
export type PostMultiPaymentMutationResult = Apollo.MutationResult<PostMultiPaymentMutation>;
export type PostMultiPaymentMutationOptions = Apollo.BaseMutationOptions<PostMultiPaymentMutation, PostMultiPaymentMutationVariables>;
export const MemberPaymentsDocument = gql`
    query MemberPayments($memberId: UUID!) {
  memberPayments(memberId: $memberId) {
    id
    duesId
    due {
      status
      startsAt
      name
      id
      endsAt
      amount
    }
    paymentRef
    amount
    status
    createdAt
  }
}
    `;

/**
 * __useMemberPaymentsQuery__
 *
 * To run a query within a React component, call `useMemberPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberPaymentsQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useMemberPaymentsQuery(baseOptions: Apollo.QueryHookOptions<MemberPaymentsQuery, MemberPaymentsQueryVariables> & ({ variables: MemberPaymentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MemberPaymentsQuery, MemberPaymentsQueryVariables>(MemberPaymentsDocument, options);
      }
export function useMemberPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MemberPaymentsQuery, MemberPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MemberPaymentsQuery, MemberPaymentsQueryVariables>(MemberPaymentsDocument, options);
        }
export function useMemberPaymentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MemberPaymentsQuery, MemberPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MemberPaymentsQuery, MemberPaymentsQueryVariables>(MemberPaymentsDocument, options);
        }
export type MemberPaymentsQueryHookResult = ReturnType<typeof useMemberPaymentsQuery>;
export type MemberPaymentsLazyQueryHookResult = ReturnType<typeof useMemberPaymentsLazyQuery>;
export type MemberPaymentsSuspenseQueryHookResult = ReturnType<typeof useMemberPaymentsSuspenseQuery>;
export type MemberPaymentsQueryResult = Apollo.QueryResult<MemberPaymentsQuery, MemberPaymentsQueryVariables>;
export const GetMemberPaymentsDocument = gql`
    query GetMemberPayments($memberId: UUID) {
  getPayments(memberId: $memberId) {
    id
    amount
    createdAt
    description
    paymentRef
    paymentType
    status
  }
}
    `;

/**
 * __useGetMemberPaymentsQuery__
 *
 * To run a query within a React component, call `useGetMemberPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberPaymentsQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetMemberPaymentsQuery(baseOptions?: Apollo.QueryHookOptions<GetMemberPaymentsQuery, GetMemberPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberPaymentsQuery, GetMemberPaymentsQueryVariables>(GetMemberPaymentsDocument, options);
      }
export function useGetMemberPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberPaymentsQuery, GetMemberPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberPaymentsQuery, GetMemberPaymentsQueryVariables>(GetMemberPaymentsDocument, options);
        }
export function useGetMemberPaymentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMemberPaymentsQuery, GetMemberPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMemberPaymentsQuery, GetMemberPaymentsQueryVariables>(GetMemberPaymentsDocument, options);
        }
export type GetMemberPaymentsQueryHookResult = ReturnType<typeof useGetMemberPaymentsQuery>;
export type GetMemberPaymentsLazyQueryHookResult = ReturnType<typeof useGetMemberPaymentsLazyQuery>;
export type GetMemberPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetMemberPaymentsSuspenseQuery>;
export type GetMemberPaymentsQueryResult = Apollo.QueryResult<GetMemberPaymentsQuery, GetMemberPaymentsQueryVariables>;
export const GetResourcesDocument = gql`
    query GetResources {
  getResources {
    id
    name
    resourcePath
    fileType
    fileSize
    createdAt
  }
}
    `;

/**
 * __useGetResourcesQuery__
 *
 * To run a query within a React component, call `useGetResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetResourcesQuery(baseOptions?: Apollo.QueryHookOptions<GetResourcesQuery, GetResourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResourcesQuery, GetResourcesQueryVariables>(GetResourcesDocument, options);
      }
export function useGetResourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourcesQuery, GetResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResourcesQuery, GetResourcesQueryVariables>(GetResourcesDocument, options);
        }
export function useGetResourcesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetResourcesQuery, GetResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetResourcesQuery, GetResourcesQueryVariables>(GetResourcesDocument, options);
        }
export type GetResourcesQueryHookResult = ReturnType<typeof useGetResourcesQuery>;
export type GetResourcesLazyQueryHookResult = ReturnType<typeof useGetResourcesLazyQuery>;
export type GetResourcesSuspenseQueryHookResult = ReturnType<typeof useGetResourcesSuspenseQuery>;
export type GetResourcesQueryResult = Apollo.QueryResult<GetResourcesQuery, GetResourcesQueryVariables>;
export const GetResourceDocument = gql`
    query GetResource($resourceId: UUID!) {
  getResource(resourceId: $resourceId) {
    id
    name
    resourcePath
    fileType
    fileSize
    createdAt
  }
}
    `;

/**
 * __useGetResourceQuery__
 *
 * To run a query within a React component, call `useGetResourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceQuery({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useGetResourceQuery(baseOptions: Apollo.QueryHookOptions<GetResourceQuery, GetResourceQueryVariables> & ({ variables: GetResourceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResourceQuery, GetResourceQueryVariables>(GetResourceDocument, options);
      }
export function useGetResourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourceQuery, GetResourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResourceQuery, GetResourceQueryVariables>(GetResourceDocument, options);
        }
export function useGetResourceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetResourceQuery, GetResourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetResourceQuery, GetResourceQueryVariables>(GetResourceDocument, options);
        }
export type GetResourceQueryHookResult = ReturnType<typeof useGetResourceQuery>;
export type GetResourceLazyQueryHookResult = ReturnType<typeof useGetResourceLazyQuery>;
export type GetResourceSuspenseQueryHookResult = ReturnType<typeof useGetResourceSuspenseQuery>;
export type GetResourceQueryResult = Apollo.QueryResult<GetResourceQuery, GetResourceQueryVariables>;
export const CreateResourcesDocument = gql`
    mutation CreateResources($input: ResourcesInput!) {
  createResources(input: $input) {
    code
    success
    message
  }
}
    `;
export type CreateResourcesMutationFn = Apollo.MutationFunction<CreateResourcesMutation, CreateResourcesMutationVariables>;

/**
 * __useCreateResourcesMutation__
 *
 * To run a mutation, you first call `useCreateResourcesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResourcesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResourcesMutation, { data, loading, error }] = useCreateResourcesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateResourcesMutation(baseOptions?: Apollo.MutationHookOptions<CreateResourcesMutation, CreateResourcesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateResourcesMutation, CreateResourcesMutationVariables>(CreateResourcesDocument, options);
      }
export type CreateResourcesMutationHookResult = ReturnType<typeof useCreateResourcesMutation>;
export type CreateResourcesMutationResult = Apollo.MutationResult<CreateResourcesMutation>;
export type CreateResourcesMutationOptions = Apollo.BaseMutationOptions<CreateResourcesMutation, CreateResourcesMutationVariables>;
export const DeleteResourceMutationDocument = gql`
    mutation DeleteResourceMutation($resourceId: UUID!) {
  deleteResource(resourceId: $resourceId)
}
    `;
export type DeleteResourceMutationMutationFn = Apollo.MutationFunction<DeleteResourceMutationMutation, DeleteResourceMutationMutationVariables>;

/**
 * __useDeleteResourceMutationMutation__
 *
 * To run a mutation, you first call `useDeleteResourceMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteResourceMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteResourceMutationMutation, { data, loading, error }] = useDeleteResourceMutationMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useDeleteResourceMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteResourceMutationMutation, DeleteResourceMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteResourceMutationMutation, DeleteResourceMutationMutationVariables>(DeleteResourceMutationDocument, options);
      }
export type DeleteResourceMutationMutationHookResult = ReturnType<typeof useDeleteResourceMutationMutation>;
export type DeleteResourceMutationMutationResult = Apollo.MutationResult<DeleteResourceMutationMutation>;
export type DeleteResourceMutationMutationOptions = Apollo.BaseMutationOptions<DeleteResourceMutationMutation, DeleteResourceMutationMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: UUID!) {
  getUser(userId: $userId) {
    id
    regId
    firstName
    lastName
    email
    phoneNumber
    photoURL
    workplace
    userId
    joined
    membershipType {
      id
      name
    }
    membershipId
    status
    cpdpPoints {
      id
      points
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($userId: UUID!, $password: String!) {
  resetPassword(userId: $userId, password: $password) {
    code
    success
    message
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AdminDashboardStatResponse: ResolverTypeWrapper<AdminDashboardStatResponse>;
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversTypes['UserPayload']> }>;
  Blog: ResolverTypeWrapper<BlogModel>;
  BlogResponse: ResolverTypeWrapper<Omit<BlogResponse, 'blog'> & { blog?: Maybe<ResolversTypes['Blog']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CpdpPoint: ResolverTypeWrapper<Omit<CpdpPoint, 'member'> & { member?: Maybe<ResolversTypes['Member']> }>;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  Due: ResolverTypeWrapper<Omit<Due, 'membershipType' | 'user'> & { membershipType?: Maybe<ResolversTypes['MembershipType']>, user?: Maybe<ResolversTypes['User']> }>;
  DueResponse: ResolverTypeWrapper<Omit<DueResponse, 'due'> & { due?: Maybe<ResolversTypes['Due']> }>;
  Event: ResolverTypeWrapper<EventModel>;
  EventForm: ResolverTypeWrapper<Omit<EventForm, 'event'> & { event?: Maybe<ResolversTypes['Event']> }>;
  EventFormInput: EventFormInput;
  EventRegistration: ResolverTypeWrapper<EventRegistrationModel>;
  EventResource: ResolverTypeWrapper<EventResourceModel>;
  EventResponse: ResolverTypeWrapper<Omit<EventResponse, 'event'> & { event?: Maybe<ResolversTypes['Event']> }>;
  FormDesign: ResolverTypeWrapper<FormDesign>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Member: ResolverTypeWrapper<MemberModel>;
  MemberDueResponse: ResolverTypeWrapper<MemberDueResponse>;
  MemberResponse: ResolverTypeWrapper<Omit<MemberResponse, 'member'> & { member?: Maybe<ResolversTypes['Member']> }>;
  MembershipType: ResolverTypeWrapper<Omit<MembershipType, 'dues' | 'members'> & { dues?: Maybe<Array<Maybe<ResolversTypes['Due']>>>, members?: Maybe<Array<Maybe<ResolversTypes['Member']>>> }>;
  Mutation: ResolverTypeWrapper<{}>;
  Payment: ResolverTypeWrapper<PaymentModel>;
  Query: ResolverTypeWrapper<{}>;
  ResetPasswordResponse: ResolverTypeWrapper<ResetPasswordResponse>;
  Resource: ResolverTypeWrapper<Omit<Resource, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  ResourceInput: ResourceInput;
  ResourceResponse: ResolverTypeWrapper<ResourceResponse>;
  ResourcesInput: ResourcesInput;
  SidebarResponse: ResolverTypeWrapper<SidebarResponse>;
  Speaker: ResolverTypeWrapper<Speaker>;
  SpeakerFormInput: SpeakerFormInput;
  Sponsor: ResolverTypeWrapper<Sponsor>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<TagModel>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  UploadResponse: ResolverTypeWrapper<UploadResponse>;
  User: ResolverTypeWrapper<UserModel>;
  UserPayload: ResolverTypeWrapper<Omit<UserPayload, 'member'> & { member?: Maybe<ResolversTypes['Member']> }>;
  blogInput: BlogInput;
  dueInput: DueInput;
  dueUpdateInput: DueUpdateInput;
  eventInput: EventInput;
  eventRegistrationInput: EventRegistrationInput;
  memberStat: ResolverTypeWrapper<MemberStat>;
  multiPaymentInput: MultiPaymentInput;
  newMember: NewMember;
  paymentInput: PaymentInput;
  signInUser: SignInUser;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AdminDashboardStatResponse: AdminDashboardStatResponse;
  AuthPayload: Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversParentTypes['UserPayload']> };
  Blog: BlogModel;
  BlogResponse: Omit<BlogResponse, 'blog'> & { blog?: Maybe<ResolversParentTypes['Blog']> };
  Boolean: Scalars['Boolean']['output'];
  CpdpPoint: Omit<CpdpPoint, 'member'> & { member?: Maybe<ResolversParentTypes['Member']> };
  CreateUserResponse: CreateUserResponse;
  Decimal: Scalars['Decimal']['output'];
  Due: Omit<Due, 'membershipType' | 'user'> & { membershipType?: Maybe<ResolversParentTypes['MembershipType']>, user?: Maybe<ResolversParentTypes['User']> };
  DueResponse: Omit<DueResponse, 'due'> & { due?: Maybe<ResolversParentTypes['Due']> };
  Event: EventModel;
  EventForm: Omit<EventForm, 'event'> & { event?: Maybe<ResolversParentTypes['Event']> };
  EventFormInput: EventFormInput;
  EventRegistration: EventRegistrationModel;
  EventResource: EventResourceModel;
  EventResponse: Omit<EventResponse, 'event'> & { event?: Maybe<ResolversParentTypes['Event']> };
  FormDesign: FormDesign;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Member: MemberModel;
  MemberDueResponse: MemberDueResponse;
  MemberResponse: Omit<MemberResponse, 'member'> & { member?: Maybe<ResolversParentTypes['Member']> };
  MembershipType: Omit<MembershipType, 'dues' | 'members'> & { dues?: Maybe<Array<Maybe<ResolversParentTypes['Due']>>>, members?: Maybe<Array<Maybe<ResolversParentTypes['Member']>>> };
  Mutation: {};
  Payment: PaymentModel;
  Query: {};
  ResetPasswordResponse: ResetPasswordResponse;
  Resource: Omit<Resource, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  ResourceInput: ResourceInput;
  ResourceResponse: ResourceResponse;
  ResourcesInput: ResourcesInput;
  SidebarResponse: SidebarResponse;
  Speaker: Speaker;
  SpeakerFormInput: SpeakerFormInput;
  Sponsor: Sponsor;
  String: Scalars['String']['output'];
  Tag: TagModel;
  Time: Scalars['Time']['output'];
  UUID: Scalars['UUID']['output'];
  Upload: Scalars['Upload']['output'];
  UploadResponse: UploadResponse;
  User: UserModel;
  UserPayload: Omit<UserPayload, 'member'> & { member?: Maybe<ResolversParentTypes['Member']> };
  blogInput: BlogInput;
  dueInput: DueInput;
  dueUpdateInput: DueUpdateInput;
  eventInput: EventInput;
  eventRegistrationInput: EventRegistrationInput;
  memberStat: MemberStat;
  multiPaymentInput: MultiPaymentInput;
  newMember: NewMember;
  paymentInput: PaymentInput;
  signInUser: SignInUser;
}>;

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = GraphQLContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UppercaseDirectiveArgs = { };

export type UppercaseDirectiveResolver<Result, Parent, ContextType = GraphQLContext, Args = UppercaseDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AdminDashboardStatResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AdminDashboardStatResponse'] = ResolversParentTypes['AdminDashboardStatResponse']> = ResolversObject<{
  avgAttendance?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  eventHeld?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  membership?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  revByCategory?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  revenue?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  totalMember?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlogResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  featuredImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlogResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['BlogResponse'] = ResolversParentTypes['BlogResponse']> = ResolversObject<{
  blog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CpdpPointResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CpdpPoint'] = ResolversParentTypes['CpdpPoint']> = ResolversObject<{
  eventId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  memberId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateUserResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export type DueResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Due'] = ResolversParentTypes['Due']> = ResolversObject<{
  amount?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  endsAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  membershipType?: Resolver<Maybe<ResolversTypes['MembershipType']>, ParentType, ContextType>;
  membershipTypeId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startsAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DueResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DueResponse'] = ResolversParentTypes['DueResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  due?: Resolver<Maybe<ResolversTypes['Due']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  certificate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverPhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cpdp_points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ends_at?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  ends_time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eventForms?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventForm']>>>, ParentType, ContextType>;
  eventPayments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Payment']>>>, ParentType, ContextType>;
  eventRegistrations?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventRegistration']>>>, ParentType, ContextType>;
  eventResources?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventResource']>>>, ParentType, ContextType>;
  formTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasCertificate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  instructions?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isInfinity?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sendTag?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  speakers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Speaker']>>>, ParentType, ContextType>;
  sponsors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sponsor']>>>, ParentType, ContextType>;
  starts_at?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  starts_time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tickets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  views?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventFormResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['EventForm'] = ResolversParentTypes['EventForm']> = ResolversObject<{
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  eventId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  required?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventRegistrationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['EventRegistration'] = ResolversParentTypes['EventRegistration']> = ResolversObject<{
  checkin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  checkinDate?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  eventId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  memberId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  registrantDetail?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventResourceResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['EventResource'] = ResolversParentTypes['EventResource']> = ResolversObject<{
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  eventId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resourceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['EventResponse'] = ResolversParentTypes['EventResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FormDesignResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['FormDesign'] = ResolversParentTypes['FormDesign']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  required?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MemberResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = ResolversObject<{
  cpdpPoints?: Resolver<Maybe<ResolversTypes['CpdpPoint']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  joined?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  membershipId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  membershipType?: Resolver<Maybe<ResolversTypes['MembershipType']>, ParentType, ContextType>;
  membershipTypeId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  regId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  workplace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberDueResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MemberDueResponse'] = ResolversParentTypes['MemberDueResponse']> = ResolversObject<{
  amount?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  endsAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startsAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MemberResponse'] = ResolversParentTypes['MemberResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipTypeResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MembershipType'] = ResolversParentTypes['MembershipType']> = ResolversObject<{
  dues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Due']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  archiveDue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationArchiveDueArgs, 'dueId'>>;
  cancelEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCancelEventArgs, 'eventId' | 'status'>>;
  createBlog?: Resolver<Maybe<ResolversTypes['BlogResponse']>, ParentType, ContextType, RequireFields<MutationCreateBlogArgs, 'input'>>;
  createDue?: Resolver<Maybe<ResolversTypes['DueResponse']>, ParentType, ContextType, RequireFields<MutationCreateDueArgs, 'input'>>;
  createEvent?: Resolver<Maybe<ResolversTypes['EventResponse']>, ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  createResources?: Resolver<Maybe<ResolversTypes['ResourceResponse']>, ParentType, ContextType, RequireFields<MutationCreateResourcesArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deactivateMember?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<MutationDeactivateMemberArgs, 'memberId' | 'status'>>;
  deleteEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'eventId'>>;
  deleteResource?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteResourceArgs, 'resourceId'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  postEventRegistration?: Resolver<Maybe<ResolversTypes['EventRegistration']>, ParentType, ContextType, RequireFields<MutationPostEventRegistrationArgs, 'input'>>;
  postMultiPayment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPostMultiPaymentArgs, 'input'>>;
  postPayment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType, RequireFields<MutationPostPaymentArgs, 'input'>>;
  profilephotoUpload?: Resolver<Maybe<ResolversTypes['UploadResponse']>, ParentType, ContextType, RequireFields<MutationProfilephotoUploadArgs, 'memberId' | 'photo'>>;
  publishedBlog?: Resolver<Maybe<ResolversTypes['BlogResponse']>, ParentType, ContextType, RequireFields<MutationPublishedBlogArgs, 'blogId' | 'status'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['ResetPasswordResponse']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password' | 'userId'>>;
  updateDues?: Resolver<Maybe<ResolversTypes['DueResponse']>, ParentType, ContextType, RequireFields<MutationUpdateDuesArgs, 'dueId' | 'input'>>;
  watchEventViews?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationWatchEventViewsArgs, 'eventId'>>;
}>;

export type PaymentResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  due?: Resolver<Maybe<ResolversTypes['Due']>, ParentType, ContextType>;
  duesId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  eventId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  memberId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  paymentRef?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  dues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Due']>>>, ParentType, ContextType>;
  eventFormFields?: Resolver<Array<ResolversTypes['FormDesign']>, ParentType, ContextType>;
  getAdminDashboardStat?: Resolver<Maybe<ResolversTypes['AdminDashboardStatResponse']>, ParentType, ContextType>;
  getBlog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType, RequireFields<QueryGetBlogArgs, 'blogId'>>;
  getBlogs?: Resolver<Maybe<Array<ResolversTypes['Blog']>>, ParentType, ContextType, Partial<QueryGetBlogsArgs>>;
  getDuePayment?: Resolver<Maybe<ResolversTypes['MemberDueResponse']>, ParentType, ContextType, RequireFields<QueryGetDuePaymentArgs, 'memberId'>>;
  getEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryGetEventArgs, 'eventId'>>;
  getEvents?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType>;
  getEventsForPublic?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType>;
  getMember?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<QueryGetMemberArgs, 'memberId'>>;
  getMemberStat?: Resolver<Maybe<ResolversTypes['memberStat']>, ParentType, ContextType, RequireFields<QueryGetMemberStatArgs, 'memberId'>>;
  getMemberUnpaidDues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Due']>>>, ParentType, ContextType, RequireFields<QueryGetMemberUnpaidDuesArgs, 'memberId' | 'membershipTypeId'>>;
  getMembersAttendance?: Resolver<Maybe<Array<ResolversTypes['EventRegistration']>>, ParentType, ContextType, RequireFields<QueryGetMembersAttendanceArgs, 'eventId'>>;
  getMembershipTypes?: Resolver<Maybe<Array<ResolversTypes['MembershipType']>>, ParentType, ContextType>;
  getPastEvents?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType>;
  getPayment?: Resolver<Maybe<ResolversTypes['Payment']>, ParentType, ContextType, RequireFields<QueryGetPaymentArgs, 'paymentId'>>;
  getPayments?: Resolver<Maybe<Array<ResolversTypes['Payment']>>, ParentType, ContextType, Partial<QueryGetPaymentsArgs>>;
  getRecentRegistration?: Resolver<Maybe<Array<ResolversTypes['Member']>>, ParentType, ContextType>;
  getRegisteredMembers?: Resolver<Maybe<Array<ResolversTypes['EventRegistration']>>, ParentType, ContextType, RequireFields<QueryGetRegisteredMembersArgs, 'eventId'>>;
  getRegistrationForm?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryGetRegistrationFormArgs, 'eventId'>>;
  getResource?: Resolver<Maybe<ResolversTypes['Resource']>, ParentType, ContextType, RequireFields<QueryGetResourceArgs, 'resourceId'>>;
  getResources?: Resolver<Maybe<Array<ResolversTypes['Resource']>>, ParentType, ContextType>;
  getSidebarStat?: Resolver<Maybe<ResolversTypes['SidebarResponse']>, ParentType, ContextType>;
  getUpComingEvents?: Resolver<Maybe<Array<ResolversTypes['EventRegistration']>>, ParentType, ContextType, RequireFields<QueryGetUpComingEventsArgs, 'memberId'>>;
  getUser?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'userId'>>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<QueryMemberArgs, 'id'>>;
  memberPayments?: Resolver<Maybe<Array<ResolversTypes['Payment']>>, ParentType, ContextType, RequireFields<QueryMemberPaymentsArgs, 'memberId'>>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  revenueByCategory?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryRevenueByCategoryArgs, 'duration'>>;
  singeDue?: Resolver<Maybe<ResolversTypes['Due']>, ParentType, ContextType, RequireFields<QuerySingeDueArgs, 'dueId'>>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export type ResetPasswordResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ResetPasswordResponse'] = ResolversParentTypes['ResetPasswordResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResourceResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Resource'] = ResolversParentTypes['Resource']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  fileSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fileType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resourcePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResourceResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ResourceResponse'] = ResolversParentTypes['ResourceResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SidebarResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SidebarResponse'] = ResolversParentTypes['SidebarResponse']> = ResolversObject<{
  ads?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  blogs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  events?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  resources?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpeakerResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Speaker'] = ResolversParentTypes['Speaker']> = ResolversObject<{
  about?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SponsorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Sponsor'] = ResolversParentTypes['Sponsor']> = ResolversObject<{
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TagResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UploadResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UploadResponse'] = ResolversParentTypes['UploadResponse']> = ResolversObject<{
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  regId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rememberMe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']> = ResolversObject<{
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  regId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberStatResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['memberStat'] = ResolversParentTypes['memberStat']> = ResolversObject<{
  eventAttended?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fin_status?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pointsEarned?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalEventPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  AdminDashboardStatResponse?: AdminDashboardStatResponseResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Blog?: BlogResolvers<ContextType>;
  BlogResponse?: BlogResponseResolvers<ContextType>;
  CpdpPoint?: CpdpPointResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  Decimal?: GraphQLScalarType;
  Due?: DueResolvers<ContextType>;
  DueResponse?: DueResponseResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventForm?: EventFormResolvers<ContextType>;
  EventRegistration?: EventRegistrationResolvers<ContextType>;
  EventResource?: EventResourceResolvers<ContextType>;
  EventResponse?: EventResponseResolvers<ContextType>;
  FormDesign?: FormDesignResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Member?: MemberResolvers<ContextType>;
  MemberDueResponse?: MemberDueResponseResolvers<ContextType>;
  MemberResponse?: MemberResponseResolvers<ContextType>;
  MembershipType?: MembershipTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResetPasswordResponse?: ResetPasswordResponseResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  ResourceResponse?: ResourceResponseResolvers<ContextType>;
  SidebarResponse?: SidebarResponseResolvers<ContextType>;
  Speaker?: SpeakerResolvers<ContextType>;
  Sponsor?: SponsorResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Time?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  UploadResponse?: UploadResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
  memberStat?: MemberStatResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = GraphQLContext> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  uppercase?: UppercaseDirectiveResolver<any, any, ContextType>;
}>;
