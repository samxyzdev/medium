import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','password']);

export const BlogScalarFieldEnumSchema = z.enum(['id','title','content','autherId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  password: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// BLOG SCHEMA
/////////////////////////////////////////

export const BlogSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  autherId: z.string(),
})

export type Blog = z.infer<typeof BlogSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  blogs: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  blogs: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  password: z.boolean().optional(),
  blogs: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BLOG
//------------------------------------------------------

export const BlogIncludeSchema: z.ZodType<Prisma.BlogInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const BlogArgsSchema: z.ZodType<Prisma.BlogDefaultArgs> = z.object({
  select: z.lazy(() => BlogSelectSchema).optional(),
  include: z.lazy(() => BlogIncludeSchema).optional(),
}).strict();

export const BlogSelectSchema: z.ZodType<Prisma.BlogSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  autherId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blogs: z.lazy(() => BlogListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  blogs: z.lazy(() => BlogOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    username: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blogs: z.lazy(() => BlogListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const BlogWhereInputSchema: z.ZodType<Prisma.BlogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogWhereInputSchema),z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogWhereInputSchema),z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  autherId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const BlogOrderByWithRelationInputSchema: z.ZodType<Prisma.BlogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  autherId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const BlogWhereUniqueInputSchema: z.ZodType<Prisma.BlogWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => BlogWhereInputSchema),z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogWhereInputSchema),z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  autherId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const BlogOrderByWithAggregationInputSchema: z.ZodType<Prisma.BlogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  autherId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BlogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BlogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BlogMinOrderByAggregateInputSchema).optional()
}).strict();

export const BlogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BlogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BlogScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogScalarWhereWithAggregatesInputSchema),z.lazy(() => BlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  autherId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string(),
  blogs: z.lazy(() => BlogCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string(),
  blogs: z.lazy(() => BlogUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogCreateInputSchema: z.ZodType<Prisma.BlogCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  User: z.lazy(() => UserCreateNestedOneWithoutBlogsInputSchema)
}).strict();

export const BlogUncheckedCreateInputSchema: z.ZodType<Prisma.BlogUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  autherId: z.string()
}).strict();

export const BlogUpdateInputSchema: z.ZodType<Prisma.BlogUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutBlogsNestedInputSchema).optional()
}).strict();

export const BlogUncheckedUpdateInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  autherId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogCreateManyInputSchema: z.ZodType<Prisma.BlogCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  autherId: z.string()
}).strict();

export const BlogUpdateManyMutationInputSchema: z.ZodType<Prisma.BlogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  autherId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BlogListRelationFilterSchema: z.ZodType<Prisma.BlogListRelationFilter> = z.object({
  every: z.lazy(() => BlogWhereInputSchema).optional(),
  some: z.lazy(() => BlogWhereInputSchema).optional(),
  none: z.lazy(() => BlogWhereInputSchema).optional()
}).strict();

export const BlogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BlogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const BlogCountOrderByAggregateInputSchema: z.ZodType<Prisma.BlogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  autherId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BlogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  autherId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogMinOrderByAggregateInputSchema: z.ZodType<Prisma.BlogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  autherId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BlogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BlogCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutUserInputSchema),z.lazy(() => BlogCreateWithoutUserInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutUserInputSchema),z.lazy(() => BlogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BlogUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BlogUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutUserInputSchema),z.lazy(() => BlogCreateWithoutUserInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutUserInputSchema),z.lazy(() => BlogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BlogUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BlogUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutUserInputSchema),z.lazy(() => BlogCreateWithoutUserInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutUserInputSchema),z.lazy(() => BlogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BlogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BlogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BlogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BlogUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BlogCreateWithoutUserInputSchema),z.lazy(() => BlogCreateWithoutUserInputSchema).array(),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutUserInputSchema),z.lazy(() => BlogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BlogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema),z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BlogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BlogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutBlogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBlogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBlogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBlogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutBlogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBlogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBlogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBlogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBlogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBlogsInputSchema),z.lazy(() => UserUpdateWithoutBlogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBlogsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BlogCreateWithoutUserInputSchema: z.ZodType<Prisma.BlogCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string()
}).strict();

export const BlogUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string()
}).strict();

export const BlogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutUserInputSchema),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BlogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BlogCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BlogCreateManyUserInputSchema),z.lazy(() => BlogCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BlogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BlogUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogUpdateWithoutUserInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutUserInputSchema),z.lazy(() => BlogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BlogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BlogUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateWithoutUserInputSchema),z.lazy(() => BlogUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const BlogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BlogUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BlogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateManyMutationInputSchema),z.lazy(() => BlogUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const BlogScalarWhereInputSchema: z.ZodType<Prisma.BlogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogScalarWhereInputSchema),z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  autherId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutBlogsInputSchema: z.ZodType<Prisma.UserCreateWithoutBlogsInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string()
}).strict();

export const UserUncheckedCreateWithoutBlogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBlogsInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  password: z.string()
}).strict();

export const UserCreateOrConnectWithoutBlogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBlogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBlogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlogsInputSchema) ]),
}).strict();

export const UserUpsertWithoutBlogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutBlogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBlogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBlogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBlogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBlogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutBlogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBlogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBlogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBlogsInputSchema) ]),
}).strict();

export const UserUpdateWithoutBlogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutBlogsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutBlogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBlogsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogCreateManyUserInputSchema: z.ZodType<Prisma.BlogCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string()
}).strict();

export const BlogUpdateWithoutUserInputSchema: z.ZodType<Prisma.BlogUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BlogUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const BlogFindFirstArgsSchema: z.ZodType<Prisma.BlogFindFirstArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(),BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogScalarFieldEnumSchema,BlogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BlogFindFirstOrThrowArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(),BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogScalarFieldEnumSchema,BlogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogFindManyArgsSchema: z.ZodType<Prisma.BlogFindManyArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(),BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogScalarFieldEnumSchema,BlogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BlogAggregateArgsSchema: z.ZodType<Prisma.BlogAggregateArgs> = z.object({
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(),BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogGroupByArgsSchema: z.ZodType<Prisma.BlogGroupByArgs> = z.object({
  where: BlogWhereInputSchema.optional(),
  orderBy: z.union([ BlogOrderByWithAggregationInputSchema.array(),BlogOrderByWithAggregationInputSchema ]).optional(),
  by: BlogScalarFieldEnumSchema.array(),
  having: BlogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BlogFindUniqueArgsSchema: z.ZodType<Prisma.BlogFindUniqueArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema,
}).strict() ;

export const BlogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BlogFindUniqueOrThrowArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogCreateArgsSchema: z.ZodType<Prisma.BlogCreateArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  data: z.union([ BlogCreateInputSchema,BlogUncheckedCreateInputSchema ]),
}).strict() ;

export const BlogUpsertArgsSchema: z.ZodType<Prisma.BlogUpsertArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema,
  create: z.union([ BlogCreateInputSchema,BlogUncheckedCreateInputSchema ]),
  update: z.union([ BlogUpdateInputSchema,BlogUncheckedUpdateInputSchema ]),
}).strict() ;

export const BlogCreateManyArgsSchema: z.ZodType<Prisma.BlogCreateManyArgs> = z.object({
  data: z.union([ BlogCreateManyInputSchema,BlogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogCreateManyAndReturnArgs> = z.object({
  data: z.union([ BlogCreateManyInputSchema,BlogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BlogDeleteArgsSchema: z.ZodType<Prisma.BlogDeleteArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema,
}).strict() ;

export const BlogUpdateArgsSchema: z.ZodType<Prisma.BlogUpdateArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  data: z.union([ BlogUpdateInputSchema,BlogUncheckedUpdateInputSchema ]),
  where: BlogWhereUniqueInputSchema,
}).strict() ;

export const BlogUpdateManyArgsSchema: z.ZodType<Prisma.BlogUpdateManyArgs> = z.object({
  data: z.union([ BlogUpdateManyMutationInputSchema,BlogUncheckedUpdateManyInputSchema ]),
  where: BlogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BlogUpdateManyMutationInputSchema,BlogUncheckedUpdateManyInputSchema ]),
  where: BlogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BlogDeleteManyArgsSchema: z.ZodType<Prisma.BlogDeleteManyArgs> = z.object({
  where: BlogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;