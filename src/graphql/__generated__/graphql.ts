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
  user?: Maybe<UserPayload>;
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

export type MemberResponse = {
  __typename?: 'MemberResponse';
  code: Scalars['Int']['output'];
  member?: Maybe<Member>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<CreateUserResponse>;
  login?: Maybe<AuthPayload>;
};


export type MutationCreateUserArgs = {
  input: NewMember;
};


export type MutationLoginArgs = {
  input: SignInUser;
};

export type Query = {
  __typename?: 'Query';
  member?: Maybe<Member>;
  members?: Maybe<Array<Maybe<Member>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryMemberArgs = {
  id: Scalars['UUID']['input'];
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

export type SignInUser = {
  password: Scalars['String']['input'];
  regId: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserMutationVariables = Exact<{
  input: NewMember;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'UserPayload', id: any, regId: string, role: string, photoURL?: string | null } | null } | null };

export type UserLoginMutationVariables = Exact<{
  input: SignInUser;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token?: string | null, user?: { __typename?: 'UserPayload', id: any, regId: string, role: string, member?: { __typename?: 'Member', firstName: string, lastName: string, photoURL?: string | null } | null } | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: any, regId: string, role: string, password: string, rememberMe?: boolean | null, createdAt?: any | null, updatedAt?: any | null } | null> | null };

export type GetMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMembersQuery = { __typename?: 'Query', members?: Array<{ __typename?: 'Member', id: any, regId: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoURL?: string | null, joined?: any | null, membershipType: string, membershipId?: string | null, status?: string | null, createdAt?: any | null } | null> | null };

export type GetMemberQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type GetMemberQuery = { __typename?: 'Query', member?: { __typename?: 'Member', id: any, regId: string, firstName: string, lastName: string, email: string, phoneNumber: string, photoURL?: string | null, address: string, userId: any, joined?: any | null, membershipType: string, membershipId?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };


export const CreateUserDocument = gql`
    mutation CreateUser($input: newMember!) {
  createUser(input: $input) {
    code
    success
    message
    user {
      id
      regId
      role
      photoURL
    }
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
        firstName
        lastName
        photoURL
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
  CreateUserResponse: ResolverTypeWrapper<Omit<CreateUserResponse, 'user'> & { user?: Maybe<ResolversTypes['UserPayload']> }>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Member: ResolverTypeWrapper<MemberModel>;
  MemberResponse: ResolverTypeWrapper<Omit<MemberResponse, 'member'> & { member?: Maybe<ResolversTypes['Member']> }>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<UserModel>;
  UserPayload: ResolverTypeWrapper<Omit<UserPayload, 'member'> & { member?: Maybe<ResolversTypes['Member']> }>;
  newMember: NewMember;
  signInUser: SignInUser;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversParentTypes['UserPayload']> };
  Boolean: Scalars['Boolean']['output'];
  CreateUserResponse: Omit<CreateUserResponse, 'user'> & { user?: Maybe<ResolversParentTypes['UserPayload']> };
  Decimal: Scalars['Decimal']['output'];
  Int: Scalars['Int']['output'];
  Member: MemberModel;
  MemberResponse: Omit<MemberResponse, 'member'> & { member?: Maybe<ResolversParentTypes['Member']> };
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  UUID: Scalars['UUID']['output'];
  Upload: Scalars['Upload']['output'];
  User: UserModel;
  UserPayload: Omit<UserPayload, 'member'> & { member?: Maybe<ResolversParentTypes['Member']> };
  newMember: NewMember;
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
  user?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

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

export type MemberResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MemberResponse'] = ResolversParentTypes['MemberResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType, RequireFields<QueryMemberArgs, 'id'>>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
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
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  regId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  Decimal?: GraphQLScalarType;
  Member?: MemberResolvers<ContextType>;
  MemberResponse?: MemberResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
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
