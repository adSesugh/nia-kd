import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Member as MemberModel } from '@prisma/client';
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
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserPayload>;
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
  endsAt?: Maybe<Scalars['Time']['output']>;
  id: Scalars['UUID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  startsAt?: Maybe<Scalars['Time']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type DueResponse = {
  __typename?: 'DueResponse';
  code: Scalars['Int']['output'];
  due?: Maybe<Due>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Member = {
  __typename?: 'Member';
  address: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Time']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  joined?: Maybe<Scalars['Time']['output']>;
  lastName: Scalars['String']['output'];
  membershipId?: Maybe<Scalars['String']['output']>;
  membershipType: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  photoURL?: Maybe<Scalars['String']['output']>;
  regId: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
  userId: Scalars['UUID']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createDue?: Maybe<DueResponse>;
  createUser?: Maybe<CreateUserResponse>;
  deactivateMember?: Maybe<Member>;
  login?: Maybe<AuthPayload>;
  postPayment: Payment;
  updateDue?: Maybe<DueResponse>;
};


export type MutationCreateDueArgs = {
  input: DueInput;
};


export type MutationCreateUserArgs = {
  input: NewMember;
};


export type MutationDeactivateMemberArgs = {
  memberId: Scalars['UUID']['input'];
  status: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: SignInUser;
};


export type MutationPostPaymentArgs = {
  input: PaymentInput;
};


export type MutationUpdateDueArgs = {
  dueId: Scalars['UUID']['input'];
  input: DueInput;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Decimal']['output'];
  createdAt?: Maybe<Scalars['Time']['output']>;
  due?: Maybe<Due>;
  duesId: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['String']['output'];
  paymentRef?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

export type Query = {
  __typename?: 'Query';
  dues?: Maybe<Array<Maybe<Due>>>;
  getDuePayment?: Maybe<MemberDueResponse>;
  getPayment?: Maybe<Payment>;
  getPayments?: Maybe<Array<Payment>>;
  getRecentRegistration?: Maybe<Array<Member>>;
  member?: Maybe<Member>;
  memberPayments?: Maybe<Array<Payment>>;
  members?: Maybe<Array<Maybe<Member>>>;
  singeDue?: Maybe<Due>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetDuePaymentArgs = {
  memberId: Scalars['UUID']['input'];
};


export type QueryGetPaymentArgs = {
  paymentId: Scalars['UUID']['input'];
};


export type QueryMemberArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryMemberPaymentsArgs = {
  memberId: Scalars['UUID']['input'];
};


export type QuerySingeDueArgs = {
  dueId: Scalars['UUID']['input'];
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
  regId: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type DueInput = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  endsAt?: InputMaybe<Scalars['Time']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startsAt?: InputMaybe<Scalars['Time']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type NewMember = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  membershipId?: InputMaybe<Scalars['String']['input']>;
  membershipType: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type PaymentInput = {
  amount: Scalars['Decimal']['input'];
  duesId: Scalars['String']['input'];
  memberId: Scalars['String']['input'];
  paymentRef?: InputMaybe<Scalars['String']['input']>;
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


export type UserLoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token?: string | null, user?: { __typename?: 'UserPayload', id: any, regId: string, role: string, member?: { __typename?: 'Member', membershipType: string, photoURL?: string | null, lastName: string, firstName: string, id: any } | null } | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: any, regId: string, role: string, password: string, rememberMe?: boolean | null, createdAt?: any | null, updatedAt?: any | null } | null> | null };

export type GetDuesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDuesQuery = { __typename?: 'Query', dues?: Array<{ __typename?: 'Due', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, userId?: string | null, createdAt?: any | null, updatedAt?: any | null } | null> | null };

export type GetSingeDueQueryVariables = Exact<{
  dueId: Scalars['UUID']['input'];
}>;


export type GetSingeDueQuery = { __typename?: 'Query', singeDue?: { __typename?: 'Due', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, userId?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type CreateDueMutationVariables = Exact<{
  input: DueInput;
}>;


export type CreateDueMutation = { __typename?: 'Mutation', createDue?: { __typename?: 'DueResponse', code: number, success: boolean, message: string, due?: { __typename?: 'Due', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, userId?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null };

export type UpdateDueMutationVariables = Exact<{
  dueId: Scalars['UUID']['input'];
  input: DueInput;
}>;


export type UpdateDueMutation = { __typename?: 'Mutation', updateDue?: { __typename?: 'DueResponse', code: number, success: boolean, message: string, due?: { __typename?: 'Due', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, userId?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } | null };

export type GetDuePaymentQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type GetDuePaymentQuery = { __typename?: 'Query', getDuePayment?: { __typename?: 'MemberDueResponse', id: any, name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null, status?: string | null, paymentStatus?: boolean | null, userId?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type GetMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersQuery = { __typename?: 'Query', members?: Array<{ __typename?: 'Member', id: any, regId: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoURL?: string | null, joined?: any | null, membershipType: string, membershipId?: string | null, status?: string | null, createdAt?: any | null } | null> | null };

export type GetMemberQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type GetMemberQuery = { __typename?: 'Query', member?: { __typename?: 'Member', id: any, regId: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoURL?: string | null, address: string, userId: any, joined?: any | null, membershipType: string, membershipId?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type GetPaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPaymentsQuery = { __typename?: 'Query', getPayments?: Array<{ __typename?: 'Payment', id: any, amount: any, status: string, createdAt?: any | null, member?: { __typename?: 'Member', membershipType: string, firstName: string, lastName: string } | null, due?: { __typename?: 'Due', name?: string | null, amount?: any | null, startsAt?: any | null, endsAt?: any | null } | null }> | null };

export type GetPaymentQueryVariables = Exact<{
  paymentId: Scalars['UUID']['input'];
}>;


export type GetPaymentQuery = { __typename?: 'Query', getPayment?: { __typename?: 'Payment', id: any, paymentRef?: string | null, amount: any, status: string, createdAt?: any | null, updatedAt?: any | null, member?: { __typename?: 'Member', firstName: string, lastName: string, membershipType: string, regId: string } | null, due?: { __typename?: 'Due', name?: string | null, startsAt?: any | null, endsAt?: any | null, amount?: any | null } | null } | null };

export type PostPaymentMutationVariables = Exact<{
  input: PaymentInput;
}>;


export type PostPaymentMutation = { __typename?: 'Mutation', postPayment: { __typename?: 'Payment', id: any, memberId: string, duesId: string, paymentRef?: string | null, amount: any, status: string, createdAt?: any | null } };

export type MemberPaymentsQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type MemberPaymentsQuery = { __typename?: 'Query', memberPayments?: Array<{ __typename?: 'Payment', id: any, duesId: string, paymentRef?: string | null, amount: any, status: string, createdAt?: any | null, due?: { __typename?: 'Due', status?: string | null, startsAt?: any | null, name?: string | null, id: any, endsAt?: any | null, amount?: any | null } | null }> | null };

export type GetRecentRegistrationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentRegistrationQuery = { __typename?: 'Query', getRecentRegistration?: Array<{ __typename?: 'Member', id: any, firstName: string, lastName: string, membershipType: string, createdAt?: any | null }> | null };

export type DeactivateMemberMutationVariables = Exact<{
  memberId: Scalars['UUID']['input'];
  status: Scalars['String']['input'];
}>;


export type DeactivateMemberMutation = { __typename?: 'Mutation', deactivateMember?: { __typename?: 'Member', id: any, regId: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoURL?: string | null, address: string, userId: any, joined?: any | null, membershipType: string, membershipId?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };


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
      member {
        membershipType
        photoURL
        lastName
        firstName
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
export const UpdateDueDocument = gql`
    mutation UpdateDue($dueId: UUID!, $input: dueInput!) {
  updateDue(dueId: $dueId, input: $input) {
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
export type UpdateDueMutationFn = Apollo.MutationFunction<UpdateDueMutation, UpdateDueMutationVariables>;

/**
 * __useUpdateDueMutation__
 *
 * To run a mutation, you first call `useUpdateDueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDueMutation, { data, loading, error }] = useUpdateDueMutation({
 *   variables: {
 *      dueId: // value for 'dueId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDueMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDueMutation, UpdateDueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDueMutation, UpdateDueMutationVariables>(UpdateDueDocument, options);
      }
export type UpdateDueMutationHookResult = ReturnType<typeof useUpdateDueMutation>;
export type UpdateDueMutationResult = Apollo.MutationResult<UpdateDueMutation>;
export type UpdateDueMutationOptions = Apollo.BaseMutationOptions<UpdateDueMutation, UpdateDueMutationVariables>;
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
    membershipType
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
export const GetMemberDocument = gql`
    query GetMember($memberId: UUID!) {
  member(id: $memberId) {
    id
    regId
    firstName
    lastName
    email
    phoneNumber
    photoURL
    address
    userId
    joined
    membershipType
    membershipId
    status
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
export const GetPaymentsDocument = gql`
    query GetPayments {
  getPayments {
    id
    member {
      membershipType
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
      membershipType
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
export const GetRecentRegistrationDocument = gql`
    query GetRecentRegistration {
  getRecentRegistration {
    id
    firstName
    lastName
    membershipType
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
    address
    userId
    joined
    membershipType
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
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversTypes['UserPayload']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  Due: ResolverTypeWrapper<Omit<Due, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  DueResponse: ResolverTypeWrapper<Omit<DueResponse, 'due'> & { due?: Maybe<ResolversTypes['Due']> }>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Member: ResolverTypeWrapper<MemberModel>;
  MemberDueResponse: ResolverTypeWrapper<MemberDueResponse>;
  MemberResponse: ResolverTypeWrapper<Omit<MemberResponse, 'member'> & { member?: Maybe<ResolversTypes['Member']> }>;
  Mutation: ResolverTypeWrapper<{}>;
  Payment: ResolverTypeWrapper<Omit<Payment, 'due' | 'member'> & { due?: Maybe<ResolversTypes['Due']>, member?: Maybe<ResolversTypes['Member']> }>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<UserModel>;
  UserPayload: ResolverTypeWrapper<Omit<UserPayload, 'member'> & { member?: Maybe<ResolversTypes['Member']> }>;
  dueInput: DueInput;
  newMember: NewMember;
  paymentInput: PaymentInput;
  signInUser: SignInUser;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversParentTypes['UserPayload']> };
  Boolean: Scalars['Boolean']['output'];
  CreateUserResponse: CreateUserResponse;
  Decimal: Scalars['Decimal']['output'];
  Due: Omit<Due, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  DueResponse: Omit<DueResponse, 'due'> & { due?: Maybe<ResolversParentTypes['Due']> };
  Int: Scalars['Int']['output'];
  Member: MemberModel;
  MemberDueResponse: MemberDueResponse;
  MemberResponse: Omit<MemberResponse, 'member'> & { member?: Maybe<ResolversParentTypes['Member']> };
  Mutation: {};
  Payment: Omit<Payment, 'due' | 'member'> & { due?: Maybe<ResolversParentTypes['Due']>, member?: Maybe<ResolversParentTypes['Member']> };
  Query: {};
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  UUID: Scalars['UUID']['output'];
  Upload: Scalars['Upload']['output'];
  User: UserModel;
  UserPayload: Omit<UserPayload, 'member'> & { member?: Maybe<ResolversParentTypes['Member']> };
  dueInput: DueInput;
  newMember: NewMember;
  paymentInput: PaymentInput;
  signInUser: SignInUser;
}>;

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = GraphQLContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UppercaseDirectiveArgs = { };

export type UppercaseDirectiveResolver<Result, Parent, ContextType = GraphQLContext, Args = UppercaseDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType>;
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
  endsAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startsAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DueResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DueResponse'] = ResolversParentTypes['DueResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  due?: Resolver<Maybe<ResolversTypes['Due']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  joined?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  membershipId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  membershipType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  regId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
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

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createDue?: Resolver<Maybe<ResolversTypes['DueResponse']>, ParentType, ContextType, RequireFields<MutationCreateDueArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deactivateMember?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<MutationDeactivateMemberArgs, 'memberId' | 'status'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  postPayment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType, RequireFields<MutationPostPaymentArgs, 'input'>>;
  updateDue?: Resolver<Maybe<ResolversTypes['DueResponse']>, ParentType, ContextType, RequireFields<MutationUpdateDueArgs, 'dueId' | 'input'>>;
}>;

export type PaymentResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  due?: Resolver<Maybe<ResolversTypes['Due']>, ParentType, ContextType>;
  duesId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  memberId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentRef?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  dues?: Resolver<Maybe<Array<Maybe<ResolversTypes['Due']>>>, ParentType, ContextType>;
  getDuePayment?: Resolver<Maybe<ResolversTypes['MemberDueResponse']>, ParentType, ContextType, RequireFields<QueryGetDuePaymentArgs, 'memberId'>>;
  getPayment?: Resolver<Maybe<ResolversTypes['Payment']>, ParentType, ContextType, RequireFields<QueryGetPaymentArgs, 'paymentId'>>;
  getPayments?: Resolver<Maybe<Array<ResolversTypes['Payment']>>, ParentType, ContextType>;
  getRecentRegistration?: Resolver<Maybe<Array<ResolversTypes['Member']>>, ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<QueryMemberArgs, 'id'>>;
  memberPayments?: Resolver<Maybe<Array<ResolversTypes['Payment']>>, ParentType, ContextType, RequireFields<QueryMemberPaymentsArgs, 'memberId'>>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  singeDue?: Resolver<Maybe<ResolversTypes['Due']>, ParentType, ContextType, RequireFields<QuerySingeDueArgs, 'dueId'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
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
  regId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  Decimal?: GraphQLScalarType;
  Due?: DueResolvers<ContextType>;
  DueResponse?: DueResponseResolvers<ContextType>;
  Member?: MemberResolvers<ContextType>;
  MemberDueResponse?: MemberDueResponseResolvers<ContextType>;
  MemberResponse?: MemberResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Time?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = GraphQLContext> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  uppercase?: UppercaseDirectiveResolver<any, any, ContextType>;
}>;
