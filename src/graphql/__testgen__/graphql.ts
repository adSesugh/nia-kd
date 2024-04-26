import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { AppContext } from '../context/index';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AddBookMutationResponse = {
  __typename?: 'AddBookMutationResponse';
  book?: Maybe<Book>;
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Blog = {
  __typename?: 'Blog';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Time']['output']>;
  id: Scalars['UUID']['output'];
  image: Scalars['String']['output'];
  link: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  tags?: Maybe<Array<Maybe<Tag>>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<AddBookMutationResponse>;
};


export type MutationAddBookArgs = {
  author?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  blogs?: Maybe<Array<Maybe<Blog>>>;
  books?: Maybe<Array<Maybe<Book>>>;
};

export type Tag = {
  __typename?: 'Tag';
  blogs?: Maybe<Array<Maybe<Blog>>>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

export type GetBooksQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksQueryQuery = { __typename?: 'Query', books?: Array<{ __typename?: 'Book', title?: string | null, author?: string | null } | null> | null };

export type GetBlogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogsQuery = { __typename?: 'Query', blogs?: Array<{ __typename?: 'Blog', id: any, title: string, content: string, link: string, summary: string, image: string, userId?: string | null, createdAt?: any | null, updatedAt?: any | null, tags?: Array<{ __typename?: 'Tag', id: any, name: string } | null> | null } | null> | null };


export const GetBooksQueryDocument = gql`
    query GetBooksQuery {
  books {
    title
    author
  }
}
    `;

/**
 * __useGetBooksQueryQuery__
 *
 * To run a query within a React component, call `useGetBooksQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBooksQueryQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksQueryQuery, GetBooksQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksQueryQuery, GetBooksQueryQueryVariables>(GetBooksQueryDocument, options);
      }
export function useGetBooksQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQueryQuery, GetBooksQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksQueryQuery, GetBooksQueryQueryVariables>(GetBooksQueryDocument, options);
        }
export function useGetBooksQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBooksQueryQuery, GetBooksQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBooksQueryQuery, GetBooksQueryQueryVariables>(GetBooksQueryDocument, options);
        }
export type GetBooksQueryQueryHookResult = ReturnType<typeof useGetBooksQueryQuery>;
export type GetBooksQueryLazyQueryHookResult = ReturnType<typeof useGetBooksQueryLazyQuery>;
export type GetBooksQuerySuspenseQueryHookResult = ReturnType<typeof useGetBooksQuerySuspenseQuery>;
export type GetBooksQueryQueryResult = Apollo.QueryResult<GetBooksQueryQuery, GetBooksQueryQueryVariables>;
export const GetBlogsDocument = gql`
    query GetBlogs {
  blogs {
    id
    title
    content
    link
    summary
    image
    userId
    createdAt
    updatedAt
    tags {
      id
      name
    }
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
  AddBookMutationResponse: ResolverTypeWrapper<AddBookMutationResponse>;
  Blog: ResolverTypeWrapper<Blog>;
  Book: ResolverTypeWrapper<Book>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddBookMutationResponse: AddBookMutationResponse;
  Blog: Blog;
  Book: Book;
  Boolean: Scalars['Boolean']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
  Time: Scalars['Time']['output'];
  UUID: Scalars['UUID']['output'];
}>;

export type AddBookMutationResponseResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['AddBookMutationResponse'] = ResolversParentTypes['AddBookMutationResponse']> = ResolversObject<{
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlogResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addBook?: Resolver<Maybe<ResolversTypes['AddBookMutationResponse']>, ParentType, ContextType, Partial<MutationAddBookArgs>>;
}>;

export type QueryResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  blogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Blog']>>>, ParentType, ContextType>;
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
}>;

export type TagResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = ResolversObject<{
  blogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Blog']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type Resolvers<ContextType = AppContext> = ResolversObject<{
  AddBookMutationResponse?: AddBookMutationResponseResolvers<ContextType>;
  Blog?: BlogResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Time?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
}>;

