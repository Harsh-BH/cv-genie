
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>
/**
 * Model ResumeSection
 * 
 */
export type ResumeSection = $Result.DefaultSelection<Prisma.$ResumeSectionPayload>
/**
 * Model ResumeAnalysis
 * 
 */
export type ResumeAnalysis = $Result.DefaultSelection<Prisma.$ResumeAnalysisPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  /**
   * Gives access to the client metrics in json or prometheus format.
   * 
   * @example
   * ```
   * const metrics = await prisma.$metrics.json()
   * // or
   * const metrics = await prisma.$metrics.prometheus()
   * ```
   */
  readonly $metrics: runtime.MetricsClient
  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resumeSection`: Exposes CRUD operations for the **ResumeSection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResumeSections
    * const resumeSections = await prisma.resumeSection.findMany()
    * ```
    */
  get resumeSection(): Prisma.ResumeSectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resumeAnalysis`: Exposes CRUD operations for the **ResumeAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResumeAnalyses
    * const resumeAnalyses = await prisma.resumeAnalysis.findMany()
    * ```
    */
  get resumeAnalysis(): Prisma.ResumeAnalysisDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Resume: 'Resume',
    ResumeSection: 'ResumeSection',
    ResumeAnalysis: 'ResumeAnalysis'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "resume" | "resumeSection" | "resumeAnalysis"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
      ResumeSection: {
        payload: Prisma.$ResumeSectionPayload<ExtArgs>
        fields: Prisma.ResumeSectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeSectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeSectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload>
          }
          findFirst: {
            args: Prisma.ResumeSectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeSectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload>
          }
          findMany: {
            args: Prisma.ResumeSectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload>[]
          }
          create: {
            args: Prisma.ResumeSectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload>
          }
          createMany: {
            args: Prisma.ResumeSectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeSectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload>[]
          }
          delete: {
            args: Prisma.ResumeSectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload>
          }
          update: {
            args: Prisma.ResumeSectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload>
          }
          deleteMany: {
            args: Prisma.ResumeSectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeSectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeSectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload>[]
          }
          upsert: {
            args: Prisma.ResumeSectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeSectionPayload>
          }
          aggregate: {
            args: Prisma.ResumeSectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResumeSection>
          }
          groupBy: {
            args: Prisma.ResumeSectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeSectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeSectionCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeSectionCountAggregateOutputType> | number
          }
        }
      }
      ResumeAnalysis: {
        payload: Prisma.$ResumeAnalysisPayload<ExtArgs>
        fields: Prisma.ResumeAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          findFirst: {
            args: Prisma.ResumeAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          findMany: {
            args: Prisma.ResumeAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>[]
          }
          create: {
            args: Prisma.ResumeAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          createMany: {
            args: Prisma.ResumeAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>[]
          }
          delete: {
            args: Prisma.ResumeAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          update: {
            args: Prisma.ResumeAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.ResumeAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeAnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>[]
          }
          upsert: {
            args: Prisma.ResumeAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeAnalysisPayload>
          }
          aggregate: {
            args: Prisma.ResumeAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResumeAnalysis>
          }
          groupBy: {
            args: Prisma.ResumeAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeAnalysisCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    resume?: ResumeOmit
    resumeSection?: ResumeSectionOmit
    resumeAnalysis?: ResumeAnalysisOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    resumes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resumes?: boolean | UserCountOutputTypeCountResumesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
  }


  /**
   * Count Type ResumeCountOutputType
   */

  export type ResumeCountOutputType = {
    sections: number
    analyses: number
  }

  export type ResumeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | ResumeCountOutputTypeCountSectionsArgs
    analyses?: boolean | ResumeCountOutputTypeCountAnalysesArgs
  }

  // Custom InputTypes
  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeCountOutputType
     */
    select?: ResumeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeSectionWhereInput
  }

  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeCountAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeAnalysisWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    avatar: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    avatar: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    avatar: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    avatar?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    avatar?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    avatar?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string | null
    email: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    avatar: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    avatar?: boolean
    resumes?: boolean | User$resumesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    avatar?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    avatar?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    avatar?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "createdAt" | "updatedAt" | "avatar", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resumes?: boolean | User$resumesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      resumes: Prisma.$ResumePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      email: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
      avatar: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resumes<T extends User$resumesArgs<ExtArgs> = {}>(args?: Subset<T, User$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly avatar: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.resumes
   */
  export type User$resumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    cursor?: ResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ResumeSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ResumeMinAggregateOutputType = {
    id: number | null
    fileName: string | null
    fileType: string | null
    fileData: string | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    profileSummary: string | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: number | null
    fileName: string | null
    fileType: string | null
    fileData: string | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    profileSummary: string | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    fileName: number
    fileType: number
    fileData: number
    userId: number
    createdAt: number
    updatedAt: number
    profileSummary: number
    _all: number
  }


  export type ResumeAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ResumeSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ResumeMinAggregateInputType = {
    id?: true
    fileName?: true
    fileType?: true
    fileData?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    profileSummary?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    fileName?: true
    fileType?: true
    fileData?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    profileSummary?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    fileName?: true
    fileType?: true
    fileData?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    profileSummary?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _avg?: ResumeAvgAggregateInputType
    _sum?: ResumeSumAggregateInputType
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: number
    fileName: string
    fileType: string
    fileData: string
    userId: number
    createdAt: Date
    updatedAt: Date
    profileSummary: string | null
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileType?: boolean
    fileData?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profileSummary?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sections?: boolean | Resume$sectionsArgs<ExtArgs>
    analyses?: boolean | Resume$analysesArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileType?: boolean
    fileData?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profileSummary?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileType?: boolean
    fileData?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profileSummary?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectScalar = {
    id?: boolean
    fileName?: boolean
    fileType?: boolean
    fileData?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profileSummary?: boolean
  }

  export type ResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileName" | "fileType" | "fileData" | "userId" | "createdAt" | "updatedAt" | "profileSummary", ExtArgs["result"]["resume"]>
  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sections?: boolean | Resume$sectionsArgs<ExtArgs>
    analyses?: boolean | Resume$analysesArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      sections: Prisma.$ResumeSectionPayload<ExtArgs>[]
      analyses: Prisma.$ResumeAnalysisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fileName: string
      fileType: string
      fileData: string
      userId: number
      createdAt: Date
      updatedAt: Date
      profileSummary: string | null
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resumes and returns the data saved in the database.
     * @param {ResumeCreateManyAndReturnArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes and returns the data updated in the database.
     * @param {ResumeUpdateManyAndReturnArgs} args - Arguments to update many Resumes.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sections<T extends Resume$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, Resume$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    analyses<T extends Resume$analysesArgs<ExtArgs> = {}>(args?: Subset<T, Resume$analysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'Int'>
    readonly fileName: FieldRef<"Resume", 'String'>
    readonly fileType: FieldRef<"Resume", 'String'>
    readonly fileData: FieldRef<"Resume", 'String'>
    readonly userId: FieldRef<"Resume", 'Int'>
    readonly createdAt: FieldRef<"Resume", 'DateTime'>
    readonly updatedAt: FieldRef<"Resume", 'DateTime'>
    readonly profileSummary: FieldRef<"Resume", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resume createManyAndReturn
   */
  export type ResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume updateManyAndReturn
   */
  export type ResumeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to delete.
     */
    limit?: number
  }

  /**
   * Resume.sections
   */
  export type Resume$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    where?: ResumeSectionWhereInput
    orderBy?: ResumeSectionOrderByWithRelationInput | ResumeSectionOrderByWithRelationInput[]
    cursor?: ResumeSectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeSectionScalarFieldEnum | ResumeSectionScalarFieldEnum[]
  }

  /**
   * Resume.analyses
   */
  export type Resume$analysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    where?: ResumeAnalysisWhereInput
    orderBy?: ResumeAnalysisOrderByWithRelationInput | ResumeAnalysisOrderByWithRelationInput[]
    cursor?: ResumeAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeAnalysisScalarFieldEnum | ResumeAnalysisScalarFieldEnum[]
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Model ResumeSection
   */

  export type AggregateResumeSection = {
    _count: ResumeSectionCountAggregateOutputType | null
    _avg: ResumeSectionAvgAggregateOutputType | null
    _sum: ResumeSectionSumAggregateOutputType | null
    _min: ResumeSectionMinAggregateOutputType | null
    _max: ResumeSectionMaxAggregateOutputType | null
  }

  export type ResumeSectionAvgAggregateOutputType = {
    id: number | null
    orderIndex: number | null
    resumeId: number | null
  }

  export type ResumeSectionSumAggregateOutputType = {
    id: number | null
    orderIndex: number | null
    resumeId: number | null
  }

  export type ResumeSectionMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    orderIndex: number | null
    resumeId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeSectionMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    orderIndex: number | null
    resumeId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeSectionCountAggregateOutputType = {
    id: number
    title: number
    content: number
    orderIndex: number
    resumeId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResumeSectionAvgAggregateInputType = {
    id?: true
    orderIndex?: true
    resumeId?: true
  }

  export type ResumeSectionSumAggregateInputType = {
    id?: true
    orderIndex?: true
    resumeId?: true
  }

  export type ResumeSectionMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    orderIndex?: true
    resumeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeSectionMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    orderIndex?: true
    resumeId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeSectionCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    orderIndex?: true
    resumeId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResumeSectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeSection to aggregate.
     */
    where?: ResumeSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeSections to fetch.
     */
    orderBy?: ResumeSectionOrderByWithRelationInput | ResumeSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResumeSections
    **/
    _count?: true | ResumeSectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeSectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeSectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeSectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeSectionMaxAggregateInputType
  }

  export type GetResumeSectionAggregateType<T extends ResumeSectionAggregateArgs> = {
        [P in keyof T & keyof AggregateResumeSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResumeSection[P]>
      : GetScalarType<T[P], AggregateResumeSection[P]>
  }




  export type ResumeSectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeSectionWhereInput
    orderBy?: ResumeSectionOrderByWithAggregationInput | ResumeSectionOrderByWithAggregationInput[]
    by: ResumeSectionScalarFieldEnum[] | ResumeSectionScalarFieldEnum
    having?: ResumeSectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeSectionCountAggregateInputType | true
    _avg?: ResumeSectionAvgAggregateInputType
    _sum?: ResumeSectionSumAggregateInputType
    _min?: ResumeSectionMinAggregateInputType
    _max?: ResumeSectionMaxAggregateInputType
  }

  export type ResumeSectionGroupByOutputType = {
    id: number
    title: string
    content: string
    orderIndex: number
    resumeId: number
    createdAt: Date
    updatedAt: Date
    _count: ResumeSectionCountAggregateOutputType | null
    _avg: ResumeSectionAvgAggregateOutputType | null
    _sum: ResumeSectionSumAggregateOutputType | null
    _min: ResumeSectionMinAggregateOutputType | null
    _max: ResumeSectionMaxAggregateOutputType | null
  }

  type GetResumeSectionGroupByPayload<T extends ResumeSectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeSectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeSectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeSectionGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeSectionGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    orderIndex?: boolean
    resumeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeSection"]>

  export type ResumeSectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    orderIndex?: boolean
    resumeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeSection"]>

  export type ResumeSectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    orderIndex?: boolean
    resumeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeSection"]>

  export type ResumeSectionSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    orderIndex?: boolean
    resumeId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ResumeSectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "orderIndex" | "resumeId" | "createdAt" | "updatedAt", ExtArgs["result"]["resumeSection"]>
  export type ResumeSectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type ResumeSectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type ResumeSectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }

  export type $ResumeSectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResumeSection"
    objects: {
      resume: Prisma.$ResumePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      orderIndex: number
      resumeId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["resumeSection"]>
    composites: {}
  }

  type ResumeSectionGetPayload<S extends boolean | null | undefined | ResumeSectionDefaultArgs> = $Result.GetResult<Prisma.$ResumeSectionPayload, S>

  type ResumeSectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeSectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeSectionCountAggregateInputType | true
    }

  export interface ResumeSectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResumeSection'], meta: { name: 'ResumeSection' } }
    /**
     * Find zero or one ResumeSection that matches the filter.
     * @param {ResumeSectionFindUniqueArgs} args - Arguments to find a ResumeSection
     * @example
     * // Get one ResumeSection
     * const resumeSection = await prisma.resumeSection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeSectionFindUniqueArgs>(args: SelectSubset<T, ResumeSectionFindUniqueArgs<ExtArgs>>): Prisma__ResumeSectionClient<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResumeSection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeSectionFindUniqueOrThrowArgs} args - Arguments to find a ResumeSection
     * @example
     * // Get one ResumeSection
     * const resumeSection = await prisma.resumeSection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeSectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeSectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeSectionClient<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResumeSection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeSectionFindFirstArgs} args - Arguments to find a ResumeSection
     * @example
     * // Get one ResumeSection
     * const resumeSection = await prisma.resumeSection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeSectionFindFirstArgs>(args?: SelectSubset<T, ResumeSectionFindFirstArgs<ExtArgs>>): Prisma__ResumeSectionClient<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResumeSection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeSectionFindFirstOrThrowArgs} args - Arguments to find a ResumeSection
     * @example
     * // Get one ResumeSection
     * const resumeSection = await prisma.resumeSection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeSectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeSectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeSectionClient<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResumeSections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeSectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResumeSections
     * const resumeSections = await prisma.resumeSection.findMany()
     * 
     * // Get first 10 ResumeSections
     * const resumeSections = await prisma.resumeSection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeSectionWithIdOnly = await prisma.resumeSection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeSectionFindManyArgs>(args?: SelectSubset<T, ResumeSectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResumeSection.
     * @param {ResumeSectionCreateArgs} args - Arguments to create a ResumeSection.
     * @example
     * // Create one ResumeSection
     * const ResumeSection = await prisma.resumeSection.create({
     *   data: {
     *     // ... data to create a ResumeSection
     *   }
     * })
     * 
     */
    create<T extends ResumeSectionCreateArgs>(args: SelectSubset<T, ResumeSectionCreateArgs<ExtArgs>>): Prisma__ResumeSectionClient<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResumeSections.
     * @param {ResumeSectionCreateManyArgs} args - Arguments to create many ResumeSections.
     * @example
     * // Create many ResumeSections
     * const resumeSection = await prisma.resumeSection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeSectionCreateManyArgs>(args?: SelectSubset<T, ResumeSectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResumeSections and returns the data saved in the database.
     * @param {ResumeSectionCreateManyAndReturnArgs} args - Arguments to create many ResumeSections.
     * @example
     * // Create many ResumeSections
     * const resumeSection = await prisma.resumeSection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResumeSections and only return the `id`
     * const resumeSectionWithIdOnly = await prisma.resumeSection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeSectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeSectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResumeSection.
     * @param {ResumeSectionDeleteArgs} args - Arguments to delete one ResumeSection.
     * @example
     * // Delete one ResumeSection
     * const ResumeSection = await prisma.resumeSection.delete({
     *   where: {
     *     // ... filter to delete one ResumeSection
     *   }
     * })
     * 
     */
    delete<T extends ResumeSectionDeleteArgs>(args: SelectSubset<T, ResumeSectionDeleteArgs<ExtArgs>>): Prisma__ResumeSectionClient<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResumeSection.
     * @param {ResumeSectionUpdateArgs} args - Arguments to update one ResumeSection.
     * @example
     * // Update one ResumeSection
     * const resumeSection = await prisma.resumeSection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeSectionUpdateArgs>(args: SelectSubset<T, ResumeSectionUpdateArgs<ExtArgs>>): Prisma__ResumeSectionClient<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResumeSections.
     * @param {ResumeSectionDeleteManyArgs} args - Arguments to filter ResumeSections to delete.
     * @example
     * // Delete a few ResumeSections
     * const { count } = await prisma.resumeSection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeSectionDeleteManyArgs>(args?: SelectSubset<T, ResumeSectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResumeSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeSectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResumeSections
     * const resumeSection = await prisma.resumeSection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeSectionUpdateManyArgs>(args: SelectSubset<T, ResumeSectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResumeSections and returns the data updated in the database.
     * @param {ResumeSectionUpdateManyAndReturnArgs} args - Arguments to update many ResumeSections.
     * @example
     * // Update many ResumeSections
     * const resumeSection = await prisma.resumeSection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResumeSections and only return the `id`
     * const resumeSectionWithIdOnly = await prisma.resumeSection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeSectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeSectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResumeSection.
     * @param {ResumeSectionUpsertArgs} args - Arguments to update or create a ResumeSection.
     * @example
     * // Update or create a ResumeSection
     * const resumeSection = await prisma.resumeSection.upsert({
     *   create: {
     *     // ... data to create a ResumeSection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResumeSection we want to update
     *   }
     * })
     */
    upsert<T extends ResumeSectionUpsertArgs>(args: SelectSubset<T, ResumeSectionUpsertArgs<ExtArgs>>): Prisma__ResumeSectionClient<$Result.GetResult<Prisma.$ResumeSectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResumeSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeSectionCountArgs} args - Arguments to filter ResumeSections to count.
     * @example
     * // Count the number of ResumeSections
     * const count = await prisma.resumeSection.count({
     *   where: {
     *     // ... the filter for the ResumeSections we want to count
     *   }
     * })
    **/
    count<T extends ResumeSectionCountArgs>(
      args?: Subset<T, ResumeSectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeSectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResumeSection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeSectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeSectionAggregateArgs>(args: Subset<T, ResumeSectionAggregateArgs>): Prisma.PrismaPromise<GetResumeSectionAggregateType<T>>

    /**
     * Group by ResumeSection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeSectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeSectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeSectionGroupByArgs['orderBy'] }
        : { orderBy?: ResumeSectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeSectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResumeSection model
   */
  readonly fields: ResumeSectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResumeSection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeSectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resume<T extends ResumeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResumeDefaultArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResumeSection model
   */
  interface ResumeSectionFieldRefs {
    readonly id: FieldRef<"ResumeSection", 'Int'>
    readonly title: FieldRef<"ResumeSection", 'String'>
    readonly content: FieldRef<"ResumeSection", 'String'>
    readonly orderIndex: FieldRef<"ResumeSection", 'Int'>
    readonly resumeId: FieldRef<"ResumeSection", 'Int'>
    readonly createdAt: FieldRef<"ResumeSection", 'DateTime'>
    readonly updatedAt: FieldRef<"ResumeSection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResumeSection findUnique
   */
  export type ResumeSectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeSection to fetch.
     */
    where: ResumeSectionWhereUniqueInput
  }

  /**
   * ResumeSection findUniqueOrThrow
   */
  export type ResumeSectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeSection to fetch.
     */
    where: ResumeSectionWhereUniqueInput
  }

  /**
   * ResumeSection findFirst
   */
  export type ResumeSectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeSection to fetch.
     */
    where?: ResumeSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeSections to fetch.
     */
    orderBy?: ResumeSectionOrderByWithRelationInput | ResumeSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeSections.
     */
    cursor?: ResumeSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeSections.
     */
    distinct?: ResumeSectionScalarFieldEnum | ResumeSectionScalarFieldEnum[]
  }

  /**
   * ResumeSection findFirstOrThrow
   */
  export type ResumeSectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeSection to fetch.
     */
    where?: ResumeSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeSections to fetch.
     */
    orderBy?: ResumeSectionOrderByWithRelationInput | ResumeSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeSections.
     */
    cursor?: ResumeSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeSections.
     */
    distinct?: ResumeSectionScalarFieldEnum | ResumeSectionScalarFieldEnum[]
  }

  /**
   * ResumeSection findMany
   */
  export type ResumeSectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    /**
     * Filter, which ResumeSections to fetch.
     */
    where?: ResumeSectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeSections to fetch.
     */
    orderBy?: ResumeSectionOrderByWithRelationInput | ResumeSectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResumeSections.
     */
    cursor?: ResumeSectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeSections.
     */
    skip?: number
    distinct?: ResumeSectionScalarFieldEnum | ResumeSectionScalarFieldEnum[]
  }

  /**
   * ResumeSection create
   */
  export type ResumeSectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    /**
     * The data needed to create a ResumeSection.
     */
    data: XOR<ResumeSectionCreateInput, ResumeSectionUncheckedCreateInput>
  }

  /**
   * ResumeSection createMany
   */
  export type ResumeSectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResumeSections.
     */
    data: ResumeSectionCreateManyInput | ResumeSectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResumeSection createManyAndReturn
   */
  export type ResumeSectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * The data used to create many ResumeSections.
     */
    data: ResumeSectionCreateManyInput | ResumeSectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResumeSection update
   */
  export type ResumeSectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    /**
     * The data needed to update a ResumeSection.
     */
    data: XOR<ResumeSectionUpdateInput, ResumeSectionUncheckedUpdateInput>
    /**
     * Choose, which ResumeSection to update.
     */
    where: ResumeSectionWhereUniqueInput
  }

  /**
   * ResumeSection updateMany
   */
  export type ResumeSectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResumeSections.
     */
    data: XOR<ResumeSectionUpdateManyMutationInput, ResumeSectionUncheckedUpdateManyInput>
    /**
     * Filter which ResumeSections to update
     */
    where?: ResumeSectionWhereInput
    /**
     * Limit how many ResumeSections to update.
     */
    limit?: number
  }

  /**
   * ResumeSection updateManyAndReturn
   */
  export type ResumeSectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * The data used to update ResumeSections.
     */
    data: XOR<ResumeSectionUpdateManyMutationInput, ResumeSectionUncheckedUpdateManyInput>
    /**
     * Filter which ResumeSections to update
     */
    where?: ResumeSectionWhereInput
    /**
     * Limit how many ResumeSections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResumeSection upsert
   */
  export type ResumeSectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    /**
     * The filter to search for the ResumeSection to update in case it exists.
     */
    where: ResumeSectionWhereUniqueInput
    /**
     * In case the ResumeSection found by the `where` argument doesn't exist, create a new ResumeSection with this data.
     */
    create: XOR<ResumeSectionCreateInput, ResumeSectionUncheckedCreateInput>
    /**
     * In case the ResumeSection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeSectionUpdateInput, ResumeSectionUncheckedUpdateInput>
  }

  /**
   * ResumeSection delete
   */
  export type ResumeSectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
    /**
     * Filter which ResumeSection to delete.
     */
    where: ResumeSectionWhereUniqueInput
  }

  /**
   * ResumeSection deleteMany
   */
  export type ResumeSectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeSections to delete
     */
    where?: ResumeSectionWhereInput
    /**
     * Limit how many ResumeSections to delete.
     */
    limit?: number
  }

  /**
   * ResumeSection without action
   */
  export type ResumeSectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeSection
     */
    select?: ResumeSectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeSection
     */
    omit?: ResumeSectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeSectionInclude<ExtArgs> | null
  }


  /**
   * Model ResumeAnalysis
   */

  export type AggregateResumeAnalysis = {
    _count: ResumeAnalysisCountAggregateOutputType | null
    _avg: ResumeAnalysisAvgAggregateOutputType | null
    _sum: ResumeAnalysisSumAggregateOutputType | null
    _min: ResumeAnalysisMinAggregateOutputType | null
    _max: ResumeAnalysisMaxAggregateOutputType | null
  }

  export type ResumeAnalysisAvgAggregateOutputType = {
    id: number | null
    resumeId: number | null
    overallScore: number | null
    contentScore: number | null
    atsOptimizationScore: number | null
    industryAlignmentScore: number | null
    formattingScore: number | null
    skillsScore: number | null
    grammarScore: number | null
    clarityScore: number | null
  }

  export type ResumeAnalysisSumAggregateOutputType = {
    id: number | null
    resumeId: number | null
    overallScore: number | null
    contentScore: number | null
    atsOptimizationScore: number | null
    industryAlignmentScore: number | null
    formattingScore: number | null
    skillsScore: number | null
    grammarScore: number | null
    clarityScore: number | null
  }

  export type ResumeAnalysisMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    resumeId: number | null
    executiveSummary: string | null
    overview: string | null
    contentQuality: string | null
    atsCompatibility: string | null
    industryFit: string | null
    formattingReview: string | null
    skillsAnalysis: string | null
    careerTrajectory: string | null
    improvementSuggestions: string | null
    overallScore: number | null
    contentScore: number | null
    atsOptimizationScore: number | null
    industryAlignmentScore: number | null
    formattingScore: number | null
    skillsScore: number | null
    status: string | null
    grammarScore: number | null
    clarityScore: number | null
  }

  export type ResumeAnalysisMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    resumeId: number | null
    executiveSummary: string | null
    overview: string | null
    contentQuality: string | null
    atsCompatibility: string | null
    industryFit: string | null
    formattingReview: string | null
    skillsAnalysis: string | null
    careerTrajectory: string | null
    improvementSuggestions: string | null
    overallScore: number | null
    contentScore: number | null
    atsOptimizationScore: number | null
    industryAlignmentScore: number | null
    formattingScore: number | null
    skillsScore: number | null
    status: string | null
    grammarScore: number | null
    clarityScore: number | null
  }

  export type ResumeAnalysisCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    resumeId: number
    executiveSummary: number
    overview: number
    contentQuality: number
    atsCompatibility: number
    industryFit: number
    formattingReview: number
    skillsAnalysis: number
    careerTrajectory: number
    improvementSuggestions: number
    overallScore: number
    contentScore: number
    atsOptimizationScore: number
    industryAlignmentScore: number
    formattingScore: number
    skillsScore: number
    aiGeneratedImprovements: number
    positionedSuggestions: number
    status: number
    grammarScore: number
    clarityScore: number
    grammarIssues: number
    _all: number
  }


  export type ResumeAnalysisAvgAggregateInputType = {
    id?: true
    resumeId?: true
    overallScore?: true
    contentScore?: true
    atsOptimizationScore?: true
    industryAlignmentScore?: true
    formattingScore?: true
    skillsScore?: true
    grammarScore?: true
    clarityScore?: true
  }

  export type ResumeAnalysisSumAggregateInputType = {
    id?: true
    resumeId?: true
    overallScore?: true
    contentScore?: true
    atsOptimizationScore?: true
    industryAlignmentScore?: true
    formattingScore?: true
    skillsScore?: true
    grammarScore?: true
    clarityScore?: true
  }

  export type ResumeAnalysisMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    resumeId?: true
    executiveSummary?: true
    overview?: true
    contentQuality?: true
    atsCompatibility?: true
    industryFit?: true
    formattingReview?: true
    skillsAnalysis?: true
    careerTrajectory?: true
    improvementSuggestions?: true
    overallScore?: true
    contentScore?: true
    atsOptimizationScore?: true
    industryAlignmentScore?: true
    formattingScore?: true
    skillsScore?: true
    status?: true
    grammarScore?: true
    clarityScore?: true
  }

  export type ResumeAnalysisMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    resumeId?: true
    executiveSummary?: true
    overview?: true
    contentQuality?: true
    atsCompatibility?: true
    industryFit?: true
    formattingReview?: true
    skillsAnalysis?: true
    careerTrajectory?: true
    improvementSuggestions?: true
    overallScore?: true
    contentScore?: true
    atsOptimizationScore?: true
    industryAlignmentScore?: true
    formattingScore?: true
    skillsScore?: true
    status?: true
    grammarScore?: true
    clarityScore?: true
  }

  export type ResumeAnalysisCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    resumeId?: true
    executiveSummary?: true
    overview?: true
    contentQuality?: true
    atsCompatibility?: true
    industryFit?: true
    formattingReview?: true
    skillsAnalysis?: true
    careerTrajectory?: true
    improvementSuggestions?: true
    overallScore?: true
    contentScore?: true
    atsOptimizationScore?: true
    industryAlignmentScore?: true
    formattingScore?: true
    skillsScore?: true
    aiGeneratedImprovements?: true
    positionedSuggestions?: true
    status?: true
    grammarScore?: true
    clarityScore?: true
    grammarIssues?: true
    _all?: true
  }

  export type ResumeAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeAnalysis to aggregate.
     */
    where?: ResumeAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeAnalyses to fetch.
     */
    orderBy?: ResumeAnalysisOrderByWithRelationInput | ResumeAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResumeAnalyses
    **/
    _count?: true | ResumeAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeAnalysisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeAnalysisMaxAggregateInputType
  }

  export type GetResumeAnalysisAggregateType<T extends ResumeAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateResumeAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResumeAnalysis[P]>
      : GetScalarType<T[P], AggregateResumeAnalysis[P]>
  }




  export type ResumeAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeAnalysisWhereInput
    orderBy?: ResumeAnalysisOrderByWithAggregationInput | ResumeAnalysisOrderByWithAggregationInput[]
    by: ResumeAnalysisScalarFieldEnum[] | ResumeAnalysisScalarFieldEnum
    having?: ResumeAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeAnalysisCountAggregateInputType | true
    _avg?: ResumeAnalysisAvgAggregateInputType
    _sum?: ResumeAnalysisSumAggregateInputType
    _min?: ResumeAnalysisMinAggregateInputType
    _max?: ResumeAnalysisMaxAggregateInputType
  }

  export type ResumeAnalysisGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    resumeId: number
    executiveSummary: string
    overview: string | null
    contentQuality: string | null
    atsCompatibility: string | null
    industryFit: string | null
    formattingReview: string | null
    skillsAnalysis: string | null
    careerTrajectory: string | null
    improvementSuggestions: string | null
    overallScore: number
    contentScore: number
    atsOptimizationScore: number
    industryAlignmentScore: number
    formattingScore: number
    skillsScore: number
    aiGeneratedImprovements: JsonValue | null
    positionedSuggestions: JsonValue | null
    status: string
    grammarScore: number
    clarityScore: number
    grammarIssues: JsonValue | null
    _count: ResumeAnalysisCountAggregateOutputType | null
    _avg: ResumeAnalysisAvgAggregateOutputType | null
    _sum: ResumeAnalysisSumAggregateOutputType | null
    _min: ResumeAnalysisMinAggregateOutputType | null
    _max: ResumeAnalysisMaxAggregateOutputType | null
  }

  type GetResumeAnalysisGroupByPayload<T extends ResumeAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type ResumeAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resumeId?: boolean
    executiveSummary?: boolean
    overview?: boolean
    contentQuality?: boolean
    atsCompatibility?: boolean
    industryFit?: boolean
    formattingReview?: boolean
    skillsAnalysis?: boolean
    careerTrajectory?: boolean
    improvementSuggestions?: boolean
    overallScore?: boolean
    contentScore?: boolean
    atsOptimizationScore?: boolean
    industryAlignmentScore?: boolean
    formattingScore?: boolean
    skillsScore?: boolean
    aiGeneratedImprovements?: boolean
    positionedSuggestions?: boolean
    status?: boolean
    grammarScore?: boolean
    clarityScore?: boolean
    grammarIssues?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeAnalysis"]>

  export type ResumeAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resumeId?: boolean
    executiveSummary?: boolean
    overview?: boolean
    contentQuality?: boolean
    atsCompatibility?: boolean
    industryFit?: boolean
    formattingReview?: boolean
    skillsAnalysis?: boolean
    careerTrajectory?: boolean
    improvementSuggestions?: boolean
    overallScore?: boolean
    contentScore?: boolean
    atsOptimizationScore?: boolean
    industryAlignmentScore?: boolean
    formattingScore?: boolean
    skillsScore?: boolean
    aiGeneratedImprovements?: boolean
    positionedSuggestions?: boolean
    status?: boolean
    grammarScore?: boolean
    clarityScore?: boolean
    grammarIssues?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeAnalysis"]>

  export type ResumeAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resumeId?: boolean
    executiveSummary?: boolean
    overview?: boolean
    contentQuality?: boolean
    atsCompatibility?: boolean
    industryFit?: boolean
    formattingReview?: boolean
    skillsAnalysis?: boolean
    careerTrajectory?: boolean
    improvementSuggestions?: boolean
    overallScore?: boolean
    contentScore?: boolean
    atsOptimizationScore?: boolean
    industryAlignmentScore?: boolean
    formattingScore?: boolean
    skillsScore?: boolean
    aiGeneratedImprovements?: boolean
    positionedSuggestions?: boolean
    status?: boolean
    grammarScore?: boolean
    clarityScore?: boolean
    grammarIssues?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resumeAnalysis"]>

  export type ResumeAnalysisSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resumeId?: boolean
    executiveSummary?: boolean
    overview?: boolean
    contentQuality?: boolean
    atsCompatibility?: boolean
    industryFit?: boolean
    formattingReview?: boolean
    skillsAnalysis?: boolean
    careerTrajectory?: boolean
    improvementSuggestions?: boolean
    overallScore?: boolean
    contentScore?: boolean
    atsOptimizationScore?: boolean
    industryAlignmentScore?: boolean
    formattingScore?: boolean
    skillsScore?: boolean
    aiGeneratedImprovements?: boolean
    positionedSuggestions?: boolean
    status?: boolean
    grammarScore?: boolean
    clarityScore?: boolean
    grammarIssues?: boolean
  }

  export type ResumeAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "resumeId" | "executiveSummary" | "overview" | "contentQuality" | "atsCompatibility" | "industryFit" | "formattingReview" | "skillsAnalysis" | "careerTrajectory" | "improvementSuggestions" | "overallScore" | "contentScore" | "atsOptimizationScore" | "industryAlignmentScore" | "formattingScore" | "skillsScore" | "aiGeneratedImprovements" | "positionedSuggestions" | "status" | "grammarScore" | "clarityScore" | "grammarIssues", ExtArgs["result"]["resumeAnalysis"]>
  export type ResumeAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type ResumeAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type ResumeAnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }

  export type $ResumeAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResumeAnalysis"
    objects: {
      resume: Prisma.$ResumePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      resumeId: number
      executiveSummary: string
      overview: string | null
      contentQuality: string | null
      atsCompatibility: string | null
      industryFit: string | null
      formattingReview: string | null
      skillsAnalysis: string | null
      careerTrajectory: string | null
      improvementSuggestions: string | null
      overallScore: number
      contentScore: number
      atsOptimizationScore: number
      industryAlignmentScore: number
      formattingScore: number
      skillsScore: number
      aiGeneratedImprovements: Prisma.JsonValue | null
      positionedSuggestions: Prisma.JsonValue | null
      status: string
      grammarScore: number
      clarityScore: number
      grammarIssues: Prisma.JsonValue | null
    }, ExtArgs["result"]["resumeAnalysis"]>
    composites: {}
  }

  type ResumeAnalysisGetPayload<S extends boolean | null | undefined | ResumeAnalysisDefaultArgs> = $Result.GetResult<Prisma.$ResumeAnalysisPayload, S>

  type ResumeAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeAnalysisCountAggregateInputType | true
    }

  export interface ResumeAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResumeAnalysis'], meta: { name: 'ResumeAnalysis' } }
    /**
     * Find zero or one ResumeAnalysis that matches the filter.
     * @param {ResumeAnalysisFindUniqueArgs} args - Arguments to find a ResumeAnalysis
     * @example
     * // Get one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeAnalysisFindUniqueArgs>(args: SelectSubset<T, ResumeAnalysisFindUniqueArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResumeAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeAnalysisFindUniqueOrThrowArgs} args - Arguments to find a ResumeAnalysis
     * @example
     * // Get one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResumeAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisFindFirstArgs} args - Arguments to find a ResumeAnalysis
     * @example
     * // Get one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeAnalysisFindFirstArgs>(args?: SelectSubset<T, ResumeAnalysisFindFirstArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResumeAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisFindFirstOrThrowArgs} args - Arguments to find a ResumeAnalysis
     * @example
     * // Get one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResumeAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResumeAnalyses
     * const resumeAnalyses = await prisma.resumeAnalysis.findMany()
     * 
     * // Get first 10 ResumeAnalyses
     * const resumeAnalyses = await prisma.resumeAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeAnalysisWithIdOnly = await prisma.resumeAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeAnalysisFindManyArgs>(args?: SelectSubset<T, ResumeAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResumeAnalysis.
     * @param {ResumeAnalysisCreateArgs} args - Arguments to create a ResumeAnalysis.
     * @example
     * // Create one ResumeAnalysis
     * const ResumeAnalysis = await prisma.resumeAnalysis.create({
     *   data: {
     *     // ... data to create a ResumeAnalysis
     *   }
     * })
     * 
     */
    create<T extends ResumeAnalysisCreateArgs>(args: SelectSubset<T, ResumeAnalysisCreateArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResumeAnalyses.
     * @param {ResumeAnalysisCreateManyArgs} args - Arguments to create many ResumeAnalyses.
     * @example
     * // Create many ResumeAnalyses
     * const resumeAnalysis = await prisma.resumeAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeAnalysisCreateManyArgs>(args?: SelectSubset<T, ResumeAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResumeAnalyses and returns the data saved in the database.
     * @param {ResumeAnalysisCreateManyAndReturnArgs} args - Arguments to create many ResumeAnalyses.
     * @example
     * // Create many ResumeAnalyses
     * const resumeAnalysis = await prisma.resumeAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResumeAnalyses and only return the `id`
     * const resumeAnalysisWithIdOnly = await prisma.resumeAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResumeAnalysis.
     * @param {ResumeAnalysisDeleteArgs} args - Arguments to delete one ResumeAnalysis.
     * @example
     * // Delete one ResumeAnalysis
     * const ResumeAnalysis = await prisma.resumeAnalysis.delete({
     *   where: {
     *     // ... filter to delete one ResumeAnalysis
     *   }
     * })
     * 
     */
    delete<T extends ResumeAnalysisDeleteArgs>(args: SelectSubset<T, ResumeAnalysisDeleteArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResumeAnalysis.
     * @param {ResumeAnalysisUpdateArgs} args - Arguments to update one ResumeAnalysis.
     * @example
     * // Update one ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeAnalysisUpdateArgs>(args: SelectSubset<T, ResumeAnalysisUpdateArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResumeAnalyses.
     * @param {ResumeAnalysisDeleteManyArgs} args - Arguments to filter ResumeAnalyses to delete.
     * @example
     * // Delete a few ResumeAnalyses
     * const { count } = await prisma.resumeAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeAnalysisDeleteManyArgs>(args?: SelectSubset<T, ResumeAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResumeAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResumeAnalyses
     * const resumeAnalysis = await prisma.resumeAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeAnalysisUpdateManyArgs>(args: SelectSubset<T, ResumeAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResumeAnalyses and returns the data updated in the database.
     * @param {ResumeAnalysisUpdateManyAndReturnArgs} args - Arguments to update many ResumeAnalyses.
     * @example
     * // Update many ResumeAnalyses
     * const resumeAnalysis = await prisma.resumeAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResumeAnalyses and only return the `id`
     * const resumeAnalysisWithIdOnly = await prisma.resumeAnalysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeAnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResumeAnalysis.
     * @param {ResumeAnalysisUpsertArgs} args - Arguments to update or create a ResumeAnalysis.
     * @example
     * // Update or create a ResumeAnalysis
     * const resumeAnalysis = await prisma.resumeAnalysis.upsert({
     *   create: {
     *     // ... data to create a ResumeAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResumeAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends ResumeAnalysisUpsertArgs>(args: SelectSubset<T, ResumeAnalysisUpsertArgs<ExtArgs>>): Prisma__ResumeAnalysisClient<$Result.GetResult<Prisma.$ResumeAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResumeAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisCountArgs} args - Arguments to filter ResumeAnalyses to count.
     * @example
     * // Count the number of ResumeAnalyses
     * const count = await prisma.resumeAnalysis.count({
     *   where: {
     *     // ... the filter for the ResumeAnalyses we want to count
     *   }
     * })
    **/
    count<T extends ResumeAnalysisCountArgs>(
      args?: Subset<T, ResumeAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResumeAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAnalysisAggregateArgs>(args: Subset<T, ResumeAnalysisAggregateArgs>): Prisma.PrismaPromise<GetResumeAnalysisAggregateType<T>>

    /**
     * Group by ResumeAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: ResumeAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResumeAnalysis model
   */
  readonly fields: ResumeAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResumeAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resume<T extends ResumeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResumeDefaultArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResumeAnalysis model
   */
  interface ResumeAnalysisFieldRefs {
    readonly id: FieldRef<"ResumeAnalysis", 'Int'>
    readonly createdAt: FieldRef<"ResumeAnalysis", 'DateTime'>
    readonly updatedAt: FieldRef<"ResumeAnalysis", 'DateTime'>
    readonly resumeId: FieldRef<"ResumeAnalysis", 'Int'>
    readonly executiveSummary: FieldRef<"ResumeAnalysis", 'String'>
    readonly overview: FieldRef<"ResumeAnalysis", 'String'>
    readonly contentQuality: FieldRef<"ResumeAnalysis", 'String'>
    readonly atsCompatibility: FieldRef<"ResumeAnalysis", 'String'>
    readonly industryFit: FieldRef<"ResumeAnalysis", 'String'>
    readonly formattingReview: FieldRef<"ResumeAnalysis", 'String'>
    readonly skillsAnalysis: FieldRef<"ResumeAnalysis", 'String'>
    readonly careerTrajectory: FieldRef<"ResumeAnalysis", 'String'>
    readonly improvementSuggestions: FieldRef<"ResumeAnalysis", 'String'>
    readonly overallScore: FieldRef<"ResumeAnalysis", 'Float'>
    readonly contentScore: FieldRef<"ResumeAnalysis", 'Int'>
    readonly atsOptimizationScore: FieldRef<"ResumeAnalysis", 'Int'>
    readonly industryAlignmentScore: FieldRef<"ResumeAnalysis", 'Int'>
    readonly formattingScore: FieldRef<"ResumeAnalysis", 'Int'>
    readonly skillsScore: FieldRef<"ResumeAnalysis", 'Int'>
    readonly aiGeneratedImprovements: FieldRef<"ResumeAnalysis", 'Json'>
    readonly positionedSuggestions: FieldRef<"ResumeAnalysis", 'Json'>
    readonly status: FieldRef<"ResumeAnalysis", 'String'>
    readonly grammarScore: FieldRef<"ResumeAnalysis", 'Int'>
    readonly clarityScore: FieldRef<"ResumeAnalysis", 'Int'>
    readonly grammarIssues: FieldRef<"ResumeAnalysis", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * ResumeAnalysis findUnique
   */
  export type ResumeAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalysis to fetch.
     */
    where: ResumeAnalysisWhereUniqueInput
  }

  /**
   * ResumeAnalysis findUniqueOrThrow
   */
  export type ResumeAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalysis to fetch.
     */
    where: ResumeAnalysisWhereUniqueInput
  }

  /**
   * ResumeAnalysis findFirst
   */
  export type ResumeAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalysis to fetch.
     */
    where?: ResumeAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeAnalyses to fetch.
     */
    orderBy?: ResumeAnalysisOrderByWithRelationInput | ResumeAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeAnalyses.
     */
    cursor?: ResumeAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeAnalyses.
     */
    distinct?: ResumeAnalysisScalarFieldEnum | ResumeAnalysisScalarFieldEnum[]
  }

  /**
   * ResumeAnalysis findFirstOrThrow
   */
  export type ResumeAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalysis to fetch.
     */
    where?: ResumeAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeAnalyses to fetch.
     */
    orderBy?: ResumeAnalysisOrderByWithRelationInput | ResumeAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeAnalyses.
     */
    cursor?: ResumeAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeAnalyses.
     */
    distinct?: ResumeAnalysisScalarFieldEnum | ResumeAnalysisScalarFieldEnum[]
  }

  /**
   * ResumeAnalysis findMany
   */
  export type ResumeAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which ResumeAnalyses to fetch.
     */
    where?: ResumeAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeAnalyses to fetch.
     */
    orderBy?: ResumeAnalysisOrderByWithRelationInput | ResumeAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResumeAnalyses.
     */
    cursor?: ResumeAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeAnalyses.
     */
    skip?: number
    distinct?: ResumeAnalysisScalarFieldEnum | ResumeAnalysisScalarFieldEnum[]
  }

  /**
   * ResumeAnalysis create
   */
  export type ResumeAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a ResumeAnalysis.
     */
    data: XOR<ResumeAnalysisCreateInput, ResumeAnalysisUncheckedCreateInput>
  }

  /**
   * ResumeAnalysis createMany
   */
  export type ResumeAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResumeAnalyses.
     */
    data: ResumeAnalysisCreateManyInput | ResumeAnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResumeAnalysis createManyAndReturn
   */
  export type ResumeAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many ResumeAnalyses.
     */
    data: ResumeAnalysisCreateManyInput | ResumeAnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResumeAnalysis update
   */
  export type ResumeAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a ResumeAnalysis.
     */
    data: XOR<ResumeAnalysisUpdateInput, ResumeAnalysisUncheckedUpdateInput>
    /**
     * Choose, which ResumeAnalysis to update.
     */
    where: ResumeAnalysisWhereUniqueInput
  }

  /**
   * ResumeAnalysis updateMany
   */
  export type ResumeAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResumeAnalyses.
     */
    data: XOR<ResumeAnalysisUpdateManyMutationInput, ResumeAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which ResumeAnalyses to update
     */
    where?: ResumeAnalysisWhereInput
    /**
     * Limit how many ResumeAnalyses to update.
     */
    limit?: number
  }

  /**
   * ResumeAnalysis updateManyAndReturn
   */
  export type ResumeAnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * The data used to update ResumeAnalyses.
     */
    data: XOR<ResumeAnalysisUpdateManyMutationInput, ResumeAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which ResumeAnalyses to update
     */
    where?: ResumeAnalysisWhereInput
    /**
     * Limit how many ResumeAnalyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResumeAnalysis upsert
   */
  export type ResumeAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the ResumeAnalysis to update in case it exists.
     */
    where: ResumeAnalysisWhereUniqueInput
    /**
     * In case the ResumeAnalysis found by the `where` argument doesn't exist, create a new ResumeAnalysis with this data.
     */
    create: XOR<ResumeAnalysisCreateInput, ResumeAnalysisUncheckedCreateInput>
    /**
     * In case the ResumeAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeAnalysisUpdateInput, ResumeAnalysisUncheckedUpdateInput>
  }

  /**
   * ResumeAnalysis delete
   */
  export type ResumeAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
    /**
     * Filter which ResumeAnalysis to delete.
     */
    where: ResumeAnalysisWhereUniqueInput
  }

  /**
   * ResumeAnalysis deleteMany
   */
  export type ResumeAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeAnalyses to delete
     */
    where?: ResumeAnalysisWhereInput
    /**
     * Limit how many ResumeAnalyses to delete.
     */
    limit?: number
  }

  /**
   * ResumeAnalysis without action
   */
  export type ResumeAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeAnalysis
     */
    select?: ResumeAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResumeAnalysis
     */
    omit?: ResumeAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeAnalysisInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    avatar: 'avatar'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    fileName: 'fileName',
    fileType: 'fileType',
    fileData: 'fileData',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    profileSummary: 'profileSummary'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const ResumeSectionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    orderIndex: 'orderIndex',
    resumeId: 'resumeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResumeSectionScalarFieldEnum = (typeof ResumeSectionScalarFieldEnum)[keyof typeof ResumeSectionScalarFieldEnum]


  export const ResumeAnalysisScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    resumeId: 'resumeId',
    executiveSummary: 'executiveSummary',
    overview: 'overview',
    contentQuality: 'contentQuality',
    atsCompatibility: 'atsCompatibility',
    industryFit: 'industryFit',
    formattingReview: 'formattingReview',
    skillsAnalysis: 'skillsAnalysis',
    careerTrajectory: 'careerTrajectory',
    improvementSuggestions: 'improvementSuggestions',
    overallScore: 'overallScore',
    contentScore: 'contentScore',
    atsOptimizationScore: 'atsOptimizationScore',
    industryAlignmentScore: 'industryAlignmentScore',
    formattingScore: 'formattingScore',
    skillsScore: 'skillsScore',
    aiGeneratedImprovements: 'aiGeneratedImprovements',
    positionedSuggestions: 'positionedSuggestions',
    status: 'status',
    grammarScore: 'grammarScore',
    clarityScore: 'clarityScore',
    grammarIssues: 'grammarIssues'
  };

  export type ResumeAnalysisScalarFieldEnum = (typeof ResumeAnalysisScalarFieldEnum)[keyof typeof ResumeAnalysisScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    avatar?: StringNullableFilter<"User"> | string | null
    resumes?: ResumeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    avatar?: SortOrderInput | SortOrder
    resumes?: ResumeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    avatar?: StringNullableFilter<"User"> | string | null
    resumes?: ResumeListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    avatar?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: IntFilter<"Resume"> | number
    fileName?: StringFilter<"Resume"> | string
    fileType?: StringFilter<"Resume"> | string
    fileData?: StringFilter<"Resume"> | string
    userId?: IntFilter<"Resume"> | number
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    profileSummary?: StringNullableFilter<"Resume"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sections?: ResumeSectionListRelationFilter
    analyses?: ResumeAnalysisListRelationFilter
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileData?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileSummary?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    sections?: ResumeSectionOrderByRelationAggregateInput
    analyses?: ResumeAnalysisOrderByRelationAggregateInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    fileName?: StringFilter<"Resume"> | string
    fileType?: StringFilter<"Resume"> | string
    fileData?: StringFilter<"Resume"> | string
    userId?: IntFilter<"Resume"> | number
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    profileSummary?: StringNullableFilter<"Resume"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sections?: ResumeSectionListRelationFilter
    analyses?: ResumeAnalysisListRelationFilter
  }, "id">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileData?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileSummary?: SortOrderInput | SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _avg?: ResumeAvgOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
    _sum?: ResumeSumOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Resume"> | number
    fileName?: StringWithAggregatesFilter<"Resume"> | string
    fileType?: StringWithAggregatesFilter<"Resume"> | string
    fileData?: StringWithAggregatesFilter<"Resume"> | string
    userId?: IntWithAggregatesFilter<"Resume"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
    profileSummary?: StringNullableWithAggregatesFilter<"Resume"> | string | null
  }

  export type ResumeSectionWhereInput = {
    AND?: ResumeSectionWhereInput | ResumeSectionWhereInput[]
    OR?: ResumeSectionWhereInput[]
    NOT?: ResumeSectionWhereInput | ResumeSectionWhereInput[]
    id?: IntFilter<"ResumeSection"> | number
    title?: StringFilter<"ResumeSection"> | string
    content?: StringFilter<"ResumeSection"> | string
    orderIndex?: IntFilter<"ResumeSection"> | number
    resumeId?: IntFilter<"ResumeSection"> | number
    createdAt?: DateTimeFilter<"ResumeSection"> | Date | string
    updatedAt?: DateTimeFilter<"ResumeSection"> | Date | string
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
  }

  export type ResumeSectionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    orderIndex?: SortOrder
    resumeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resume?: ResumeOrderByWithRelationInput
  }

  export type ResumeSectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResumeSectionWhereInput | ResumeSectionWhereInput[]
    OR?: ResumeSectionWhereInput[]
    NOT?: ResumeSectionWhereInput | ResumeSectionWhereInput[]
    title?: StringFilter<"ResumeSection"> | string
    content?: StringFilter<"ResumeSection"> | string
    orderIndex?: IntFilter<"ResumeSection"> | number
    resumeId?: IntFilter<"ResumeSection"> | number
    createdAt?: DateTimeFilter<"ResumeSection"> | Date | string
    updatedAt?: DateTimeFilter<"ResumeSection"> | Date | string
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
  }, "id">

  export type ResumeSectionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    orderIndex?: SortOrder
    resumeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResumeSectionCountOrderByAggregateInput
    _avg?: ResumeSectionAvgOrderByAggregateInput
    _max?: ResumeSectionMaxOrderByAggregateInput
    _min?: ResumeSectionMinOrderByAggregateInput
    _sum?: ResumeSectionSumOrderByAggregateInput
  }

  export type ResumeSectionScalarWhereWithAggregatesInput = {
    AND?: ResumeSectionScalarWhereWithAggregatesInput | ResumeSectionScalarWhereWithAggregatesInput[]
    OR?: ResumeSectionScalarWhereWithAggregatesInput[]
    NOT?: ResumeSectionScalarWhereWithAggregatesInput | ResumeSectionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ResumeSection"> | number
    title?: StringWithAggregatesFilter<"ResumeSection"> | string
    content?: StringWithAggregatesFilter<"ResumeSection"> | string
    orderIndex?: IntWithAggregatesFilter<"ResumeSection"> | number
    resumeId?: IntWithAggregatesFilter<"ResumeSection"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ResumeSection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ResumeSection"> | Date | string
  }

  export type ResumeAnalysisWhereInput = {
    AND?: ResumeAnalysisWhereInput | ResumeAnalysisWhereInput[]
    OR?: ResumeAnalysisWhereInput[]
    NOT?: ResumeAnalysisWhereInput | ResumeAnalysisWhereInput[]
    id?: IntFilter<"ResumeAnalysis"> | number
    createdAt?: DateTimeFilter<"ResumeAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"ResumeAnalysis"> | Date | string
    resumeId?: IntFilter<"ResumeAnalysis"> | number
    executiveSummary?: StringFilter<"ResumeAnalysis"> | string
    overview?: StringNullableFilter<"ResumeAnalysis"> | string | null
    contentQuality?: StringNullableFilter<"ResumeAnalysis"> | string | null
    atsCompatibility?: StringNullableFilter<"ResumeAnalysis"> | string | null
    industryFit?: StringNullableFilter<"ResumeAnalysis"> | string | null
    formattingReview?: StringNullableFilter<"ResumeAnalysis"> | string | null
    skillsAnalysis?: StringNullableFilter<"ResumeAnalysis"> | string | null
    careerTrajectory?: StringNullableFilter<"ResumeAnalysis"> | string | null
    improvementSuggestions?: StringNullableFilter<"ResumeAnalysis"> | string | null
    overallScore?: FloatFilter<"ResumeAnalysis"> | number
    contentScore?: IntFilter<"ResumeAnalysis"> | number
    atsOptimizationScore?: IntFilter<"ResumeAnalysis"> | number
    industryAlignmentScore?: IntFilter<"ResumeAnalysis"> | number
    formattingScore?: IntFilter<"ResumeAnalysis"> | number
    skillsScore?: IntFilter<"ResumeAnalysis"> | number
    aiGeneratedImprovements?: JsonNullableFilter<"ResumeAnalysis">
    positionedSuggestions?: JsonNullableFilter<"ResumeAnalysis">
    status?: StringFilter<"ResumeAnalysis"> | string
    grammarScore?: IntFilter<"ResumeAnalysis"> | number
    clarityScore?: IntFilter<"ResumeAnalysis"> | number
    grammarIssues?: JsonNullableFilter<"ResumeAnalysis">
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
  }

  export type ResumeAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resumeId?: SortOrder
    executiveSummary?: SortOrder
    overview?: SortOrderInput | SortOrder
    contentQuality?: SortOrderInput | SortOrder
    atsCompatibility?: SortOrderInput | SortOrder
    industryFit?: SortOrderInput | SortOrder
    formattingReview?: SortOrderInput | SortOrder
    skillsAnalysis?: SortOrderInput | SortOrder
    careerTrajectory?: SortOrderInput | SortOrder
    improvementSuggestions?: SortOrderInput | SortOrder
    overallScore?: SortOrder
    contentScore?: SortOrder
    atsOptimizationScore?: SortOrder
    industryAlignmentScore?: SortOrder
    formattingScore?: SortOrder
    skillsScore?: SortOrder
    aiGeneratedImprovements?: SortOrderInput | SortOrder
    positionedSuggestions?: SortOrderInput | SortOrder
    status?: SortOrder
    grammarScore?: SortOrder
    clarityScore?: SortOrder
    grammarIssues?: SortOrderInput | SortOrder
    resume?: ResumeOrderByWithRelationInput
  }

  export type ResumeAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResumeAnalysisWhereInput | ResumeAnalysisWhereInput[]
    OR?: ResumeAnalysisWhereInput[]
    NOT?: ResumeAnalysisWhereInput | ResumeAnalysisWhereInput[]
    createdAt?: DateTimeFilter<"ResumeAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"ResumeAnalysis"> | Date | string
    resumeId?: IntFilter<"ResumeAnalysis"> | number
    executiveSummary?: StringFilter<"ResumeAnalysis"> | string
    overview?: StringNullableFilter<"ResumeAnalysis"> | string | null
    contentQuality?: StringNullableFilter<"ResumeAnalysis"> | string | null
    atsCompatibility?: StringNullableFilter<"ResumeAnalysis"> | string | null
    industryFit?: StringNullableFilter<"ResumeAnalysis"> | string | null
    formattingReview?: StringNullableFilter<"ResumeAnalysis"> | string | null
    skillsAnalysis?: StringNullableFilter<"ResumeAnalysis"> | string | null
    careerTrajectory?: StringNullableFilter<"ResumeAnalysis"> | string | null
    improvementSuggestions?: StringNullableFilter<"ResumeAnalysis"> | string | null
    overallScore?: FloatFilter<"ResumeAnalysis"> | number
    contentScore?: IntFilter<"ResumeAnalysis"> | number
    atsOptimizationScore?: IntFilter<"ResumeAnalysis"> | number
    industryAlignmentScore?: IntFilter<"ResumeAnalysis"> | number
    formattingScore?: IntFilter<"ResumeAnalysis"> | number
    skillsScore?: IntFilter<"ResumeAnalysis"> | number
    aiGeneratedImprovements?: JsonNullableFilter<"ResumeAnalysis">
    positionedSuggestions?: JsonNullableFilter<"ResumeAnalysis">
    status?: StringFilter<"ResumeAnalysis"> | string
    grammarScore?: IntFilter<"ResumeAnalysis"> | number
    clarityScore?: IntFilter<"ResumeAnalysis"> | number
    grammarIssues?: JsonNullableFilter<"ResumeAnalysis">
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
  }, "id">

  export type ResumeAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resumeId?: SortOrder
    executiveSummary?: SortOrder
    overview?: SortOrderInput | SortOrder
    contentQuality?: SortOrderInput | SortOrder
    atsCompatibility?: SortOrderInput | SortOrder
    industryFit?: SortOrderInput | SortOrder
    formattingReview?: SortOrderInput | SortOrder
    skillsAnalysis?: SortOrderInput | SortOrder
    careerTrajectory?: SortOrderInput | SortOrder
    improvementSuggestions?: SortOrderInput | SortOrder
    overallScore?: SortOrder
    contentScore?: SortOrder
    atsOptimizationScore?: SortOrder
    industryAlignmentScore?: SortOrder
    formattingScore?: SortOrder
    skillsScore?: SortOrder
    aiGeneratedImprovements?: SortOrderInput | SortOrder
    positionedSuggestions?: SortOrderInput | SortOrder
    status?: SortOrder
    grammarScore?: SortOrder
    clarityScore?: SortOrder
    grammarIssues?: SortOrderInput | SortOrder
    _count?: ResumeAnalysisCountOrderByAggregateInput
    _avg?: ResumeAnalysisAvgOrderByAggregateInput
    _max?: ResumeAnalysisMaxOrderByAggregateInput
    _min?: ResumeAnalysisMinOrderByAggregateInput
    _sum?: ResumeAnalysisSumOrderByAggregateInput
  }

  export type ResumeAnalysisScalarWhereWithAggregatesInput = {
    AND?: ResumeAnalysisScalarWhereWithAggregatesInput | ResumeAnalysisScalarWhereWithAggregatesInput[]
    OR?: ResumeAnalysisScalarWhereWithAggregatesInput[]
    NOT?: ResumeAnalysisScalarWhereWithAggregatesInput | ResumeAnalysisScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ResumeAnalysis"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ResumeAnalysis"> | Date | string
    resumeId?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    executiveSummary?: StringWithAggregatesFilter<"ResumeAnalysis"> | string
    overview?: StringNullableWithAggregatesFilter<"ResumeAnalysis"> | string | null
    contentQuality?: StringNullableWithAggregatesFilter<"ResumeAnalysis"> | string | null
    atsCompatibility?: StringNullableWithAggregatesFilter<"ResumeAnalysis"> | string | null
    industryFit?: StringNullableWithAggregatesFilter<"ResumeAnalysis"> | string | null
    formattingReview?: StringNullableWithAggregatesFilter<"ResumeAnalysis"> | string | null
    skillsAnalysis?: StringNullableWithAggregatesFilter<"ResumeAnalysis"> | string | null
    careerTrajectory?: StringNullableWithAggregatesFilter<"ResumeAnalysis"> | string | null
    improvementSuggestions?: StringNullableWithAggregatesFilter<"ResumeAnalysis"> | string | null
    overallScore?: FloatWithAggregatesFilter<"ResumeAnalysis"> | number
    contentScore?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    atsOptimizationScore?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    industryAlignmentScore?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    formattingScore?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    skillsScore?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    aiGeneratedImprovements?: JsonNullableWithAggregatesFilter<"ResumeAnalysis">
    positionedSuggestions?: JsonNullableWithAggregatesFilter<"ResumeAnalysis">
    status?: StringWithAggregatesFilter<"ResumeAnalysis"> | string
    grammarScore?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    clarityScore?: IntWithAggregatesFilter<"ResumeAnalysis"> | number
    grammarIssues?: JsonNullableWithAggregatesFilter<"ResumeAnalysis">
  }

  export type UserCreateInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    avatar?: string | null
    resumes?: ResumeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    avatar?: string | null
    resumes?: ResumeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    resumes?: ResumeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    resumes?: ResumeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    avatar?: string | null
  }

  export type UserUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResumeCreateInput = {
    fileName: string
    fileType: string
    fileData: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
    user: UserCreateNestedOneWithoutResumesInput
    sections?: ResumeSectionCreateNestedManyWithoutResumeInput
    analyses?: ResumeAnalysisCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: number
    fileName: string
    fileType: string
    fileData: string
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
    sections?: ResumeSectionUncheckedCreateNestedManyWithoutResumeInput
    analyses?: ResumeAnalysisUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeUpdateInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutResumesNestedInput
    sections?: ResumeSectionUpdateManyWithoutResumeNestedInput
    analyses?: ResumeAnalysisUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    sections?: ResumeSectionUncheckedUpdateManyWithoutResumeNestedInput
    analyses?: ResumeAnalysisUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeCreateManyInput = {
    id?: number
    fileName: string
    fileType: string
    fileData: string
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
  }

  export type ResumeUpdateManyMutationInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResumeSectionCreateInput = {
    title: string
    content: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resume: ResumeCreateNestedOneWithoutSectionsInput
  }

  export type ResumeSectionUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    orderIndex: number
    resumeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeSectionUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resume?: ResumeUpdateOneRequiredWithoutSectionsNestedInput
  }

  export type ResumeSectionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    resumeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeSectionCreateManyInput = {
    id?: number
    title: string
    content: string
    orderIndex: number
    resumeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeSectionUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeSectionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    resumeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeAnalysisCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    executiveSummary: string
    overview?: string | null
    contentQuality?: string | null
    atsCompatibility?: string | null
    industryFit?: string | null
    formattingReview?: string | null
    skillsAnalysis?: string | null
    careerTrajectory?: string | null
    improvementSuggestions?: string | null
    overallScore: number
    contentScore: number
    atsOptimizationScore: number
    industryAlignmentScore: number
    formattingScore: number
    skillsScore: number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    grammarScore?: number
    clarityScore?: number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
    resume: ResumeCreateNestedOneWithoutAnalysesInput
  }

  export type ResumeAnalysisUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resumeId: number
    executiveSummary: string
    overview?: string | null
    contentQuality?: string | null
    atsCompatibility?: string | null
    industryFit?: string | null
    formattingReview?: string | null
    skillsAnalysis?: string | null
    careerTrajectory?: string | null
    improvementSuggestions?: string | null
    overallScore: number
    contentScore: number
    atsOptimizationScore: number
    industryAlignmentScore: number
    formattingScore: number
    skillsScore: number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    grammarScore?: number
    clarityScore?: number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ResumeAnalysisUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executiveSummary?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    contentQuality?: NullableStringFieldUpdateOperationsInput | string | null
    atsCompatibility?: NullableStringFieldUpdateOperationsInput | string | null
    industryFit?: NullableStringFieldUpdateOperationsInput | string | null
    formattingReview?: NullableStringFieldUpdateOperationsInput | string | null
    skillsAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    careerTrajectory?: NullableStringFieldUpdateOperationsInput | string | null
    improvementSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    overallScore?: FloatFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    atsOptimizationScore?: IntFieldUpdateOperationsInput | number
    industryAlignmentScore?: IntFieldUpdateOperationsInput | number
    formattingScore?: IntFieldUpdateOperationsInput | number
    skillsScore?: IntFieldUpdateOperationsInput | number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    grammarScore?: IntFieldUpdateOperationsInput | number
    clarityScore?: IntFieldUpdateOperationsInput | number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
    resume?: ResumeUpdateOneRequiredWithoutAnalysesNestedInput
  }

  export type ResumeAnalysisUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumeId?: IntFieldUpdateOperationsInput | number
    executiveSummary?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    contentQuality?: NullableStringFieldUpdateOperationsInput | string | null
    atsCompatibility?: NullableStringFieldUpdateOperationsInput | string | null
    industryFit?: NullableStringFieldUpdateOperationsInput | string | null
    formattingReview?: NullableStringFieldUpdateOperationsInput | string | null
    skillsAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    careerTrajectory?: NullableStringFieldUpdateOperationsInput | string | null
    improvementSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    overallScore?: FloatFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    atsOptimizationScore?: IntFieldUpdateOperationsInput | number
    industryAlignmentScore?: IntFieldUpdateOperationsInput | number
    formattingScore?: IntFieldUpdateOperationsInput | number
    skillsScore?: IntFieldUpdateOperationsInput | number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    grammarScore?: IntFieldUpdateOperationsInput | number
    clarityScore?: IntFieldUpdateOperationsInput | number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ResumeAnalysisCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resumeId: number
    executiveSummary: string
    overview?: string | null
    contentQuality?: string | null
    atsCompatibility?: string | null
    industryFit?: string | null
    formattingReview?: string | null
    skillsAnalysis?: string | null
    careerTrajectory?: string | null
    improvementSuggestions?: string | null
    overallScore: number
    contentScore: number
    atsOptimizationScore: number
    industryAlignmentScore: number
    formattingScore: number
    skillsScore: number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    grammarScore?: number
    clarityScore?: number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ResumeAnalysisUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executiveSummary?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    contentQuality?: NullableStringFieldUpdateOperationsInput | string | null
    atsCompatibility?: NullableStringFieldUpdateOperationsInput | string | null
    industryFit?: NullableStringFieldUpdateOperationsInput | string | null
    formattingReview?: NullableStringFieldUpdateOperationsInput | string | null
    skillsAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    careerTrajectory?: NullableStringFieldUpdateOperationsInput | string | null
    improvementSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    overallScore?: FloatFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    atsOptimizationScore?: IntFieldUpdateOperationsInput | number
    industryAlignmentScore?: IntFieldUpdateOperationsInput | number
    formattingScore?: IntFieldUpdateOperationsInput | number
    skillsScore?: IntFieldUpdateOperationsInput | number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    grammarScore?: IntFieldUpdateOperationsInput | number
    clarityScore?: IntFieldUpdateOperationsInput | number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ResumeAnalysisUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resumeId?: IntFieldUpdateOperationsInput | number
    executiveSummary?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    contentQuality?: NullableStringFieldUpdateOperationsInput | string | null
    atsCompatibility?: NullableStringFieldUpdateOperationsInput | string | null
    industryFit?: NullableStringFieldUpdateOperationsInput | string | null
    formattingReview?: NullableStringFieldUpdateOperationsInput | string | null
    skillsAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    careerTrajectory?: NullableStringFieldUpdateOperationsInput | string | null
    improvementSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    overallScore?: FloatFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    atsOptimizationScore?: IntFieldUpdateOperationsInput | number
    industryAlignmentScore?: IntFieldUpdateOperationsInput | number
    formattingScore?: IntFieldUpdateOperationsInput | number
    skillsScore?: IntFieldUpdateOperationsInput | number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    grammarScore?: IntFieldUpdateOperationsInput | number
    clarityScore?: IntFieldUpdateOperationsInput | number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ResumeListRelationFilter = {
    every?: ResumeWhereInput
    some?: ResumeWhereInput
    none?: ResumeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    avatar?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    avatar?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    avatar?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ResumeSectionListRelationFilter = {
    every?: ResumeSectionWhereInput
    some?: ResumeSectionWhereInput
    none?: ResumeSectionWhereInput
  }

  export type ResumeAnalysisListRelationFilter = {
    every?: ResumeAnalysisWhereInput
    some?: ResumeAnalysisWhereInput
    none?: ResumeAnalysisWhereInput
  }

  export type ResumeSectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeAnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileData?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileSummary?: SortOrder
  }

  export type ResumeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileData?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileSummary?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileData?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profileSummary?: SortOrder
  }

  export type ResumeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type ResumeScalarRelationFilter = {
    is?: ResumeWhereInput
    isNot?: ResumeWhereInput
  }

  export type ResumeSectionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    orderIndex?: SortOrder
    resumeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeSectionAvgOrderByAggregateInput = {
    id?: SortOrder
    orderIndex?: SortOrder
    resumeId?: SortOrder
  }

  export type ResumeSectionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    orderIndex?: SortOrder
    resumeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeSectionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    orderIndex?: SortOrder
    resumeId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeSectionSumOrderByAggregateInput = {
    id?: SortOrder
    orderIndex?: SortOrder
    resumeId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ResumeAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resumeId?: SortOrder
    executiveSummary?: SortOrder
    overview?: SortOrder
    contentQuality?: SortOrder
    atsCompatibility?: SortOrder
    industryFit?: SortOrder
    formattingReview?: SortOrder
    skillsAnalysis?: SortOrder
    careerTrajectory?: SortOrder
    improvementSuggestions?: SortOrder
    overallScore?: SortOrder
    contentScore?: SortOrder
    atsOptimizationScore?: SortOrder
    industryAlignmentScore?: SortOrder
    formattingScore?: SortOrder
    skillsScore?: SortOrder
    aiGeneratedImprovements?: SortOrder
    positionedSuggestions?: SortOrder
    status?: SortOrder
    grammarScore?: SortOrder
    clarityScore?: SortOrder
    grammarIssues?: SortOrder
  }

  export type ResumeAnalysisAvgOrderByAggregateInput = {
    id?: SortOrder
    resumeId?: SortOrder
    overallScore?: SortOrder
    contentScore?: SortOrder
    atsOptimizationScore?: SortOrder
    industryAlignmentScore?: SortOrder
    formattingScore?: SortOrder
    skillsScore?: SortOrder
    grammarScore?: SortOrder
    clarityScore?: SortOrder
  }

  export type ResumeAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resumeId?: SortOrder
    executiveSummary?: SortOrder
    overview?: SortOrder
    contentQuality?: SortOrder
    atsCompatibility?: SortOrder
    industryFit?: SortOrder
    formattingReview?: SortOrder
    skillsAnalysis?: SortOrder
    careerTrajectory?: SortOrder
    improvementSuggestions?: SortOrder
    overallScore?: SortOrder
    contentScore?: SortOrder
    atsOptimizationScore?: SortOrder
    industryAlignmentScore?: SortOrder
    formattingScore?: SortOrder
    skillsScore?: SortOrder
    status?: SortOrder
    grammarScore?: SortOrder
    clarityScore?: SortOrder
  }

  export type ResumeAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resumeId?: SortOrder
    executiveSummary?: SortOrder
    overview?: SortOrder
    contentQuality?: SortOrder
    atsCompatibility?: SortOrder
    industryFit?: SortOrder
    formattingReview?: SortOrder
    skillsAnalysis?: SortOrder
    careerTrajectory?: SortOrder
    improvementSuggestions?: SortOrder
    overallScore?: SortOrder
    contentScore?: SortOrder
    atsOptimizationScore?: SortOrder
    industryAlignmentScore?: SortOrder
    formattingScore?: SortOrder
    skillsScore?: SortOrder
    status?: SortOrder
    grammarScore?: SortOrder
    clarityScore?: SortOrder
  }

  export type ResumeAnalysisSumOrderByAggregateInput = {
    id?: SortOrder
    resumeId?: SortOrder
    overallScore?: SortOrder
    contentScore?: SortOrder
    atsOptimizationScore?: SortOrder
    industryAlignmentScore?: SortOrder
    formattingScore?: SortOrder
    skillsScore?: SortOrder
    grammarScore?: SortOrder
    clarityScore?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ResumeCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type ResumeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ResumeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ResumeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput> | ResumeCreateWithoutUserInput[] | ResumeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput | ResumeCreateOrConnectWithoutUserInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutUserInput | ResumeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResumeCreateManyUserInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutUserInput | ResumeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutUserInput | ResumeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutResumesInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    connect?: UserWhereUniqueInput
  }

  export type ResumeSectionCreateNestedManyWithoutResumeInput = {
    create?: XOR<ResumeSectionCreateWithoutResumeInput, ResumeSectionUncheckedCreateWithoutResumeInput> | ResumeSectionCreateWithoutResumeInput[] | ResumeSectionUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeSectionCreateOrConnectWithoutResumeInput | ResumeSectionCreateOrConnectWithoutResumeInput[]
    createMany?: ResumeSectionCreateManyResumeInputEnvelope
    connect?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
  }

  export type ResumeAnalysisCreateNestedManyWithoutResumeInput = {
    create?: XOR<ResumeAnalysisCreateWithoutResumeInput, ResumeAnalysisUncheckedCreateWithoutResumeInput> | ResumeAnalysisCreateWithoutResumeInput[] | ResumeAnalysisUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeAnalysisCreateOrConnectWithoutResumeInput | ResumeAnalysisCreateOrConnectWithoutResumeInput[]
    createMany?: ResumeAnalysisCreateManyResumeInputEnvelope
    connect?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
  }

  export type ResumeSectionUncheckedCreateNestedManyWithoutResumeInput = {
    create?: XOR<ResumeSectionCreateWithoutResumeInput, ResumeSectionUncheckedCreateWithoutResumeInput> | ResumeSectionCreateWithoutResumeInput[] | ResumeSectionUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeSectionCreateOrConnectWithoutResumeInput | ResumeSectionCreateOrConnectWithoutResumeInput[]
    createMany?: ResumeSectionCreateManyResumeInputEnvelope
    connect?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
  }

  export type ResumeAnalysisUncheckedCreateNestedManyWithoutResumeInput = {
    create?: XOR<ResumeAnalysisCreateWithoutResumeInput, ResumeAnalysisUncheckedCreateWithoutResumeInput> | ResumeAnalysisCreateWithoutResumeInput[] | ResumeAnalysisUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeAnalysisCreateOrConnectWithoutResumeInput | ResumeAnalysisCreateOrConnectWithoutResumeInput[]
    createMany?: ResumeAnalysisCreateManyResumeInputEnvelope
    connect?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UserUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    upsert?: UserUpsertWithoutResumesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResumesInput, UserUpdateWithoutResumesInput>, UserUncheckedUpdateWithoutResumesInput>
  }

  export type ResumeSectionUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ResumeSectionCreateWithoutResumeInput, ResumeSectionUncheckedCreateWithoutResumeInput> | ResumeSectionCreateWithoutResumeInput[] | ResumeSectionUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeSectionCreateOrConnectWithoutResumeInput | ResumeSectionCreateOrConnectWithoutResumeInput[]
    upsert?: ResumeSectionUpsertWithWhereUniqueWithoutResumeInput | ResumeSectionUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ResumeSectionCreateManyResumeInputEnvelope
    set?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
    disconnect?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
    delete?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
    connect?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
    update?: ResumeSectionUpdateWithWhereUniqueWithoutResumeInput | ResumeSectionUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ResumeSectionUpdateManyWithWhereWithoutResumeInput | ResumeSectionUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ResumeSectionScalarWhereInput | ResumeSectionScalarWhereInput[]
  }

  export type ResumeAnalysisUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ResumeAnalysisCreateWithoutResumeInput, ResumeAnalysisUncheckedCreateWithoutResumeInput> | ResumeAnalysisCreateWithoutResumeInput[] | ResumeAnalysisUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeAnalysisCreateOrConnectWithoutResumeInput | ResumeAnalysisCreateOrConnectWithoutResumeInput[]
    upsert?: ResumeAnalysisUpsertWithWhereUniqueWithoutResumeInput | ResumeAnalysisUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ResumeAnalysisCreateManyResumeInputEnvelope
    set?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
    disconnect?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
    delete?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
    connect?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
    update?: ResumeAnalysisUpdateWithWhereUniqueWithoutResumeInput | ResumeAnalysisUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ResumeAnalysisUpdateManyWithWhereWithoutResumeInput | ResumeAnalysisUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ResumeAnalysisScalarWhereInput | ResumeAnalysisScalarWhereInput[]
  }

  export type ResumeSectionUncheckedUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ResumeSectionCreateWithoutResumeInput, ResumeSectionUncheckedCreateWithoutResumeInput> | ResumeSectionCreateWithoutResumeInput[] | ResumeSectionUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeSectionCreateOrConnectWithoutResumeInput | ResumeSectionCreateOrConnectWithoutResumeInput[]
    upsert?: ResumeSectionUpsertWithWhereUniqueWithoutResumeInput | ResumeSectionUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ResumeSectionCreateManyResumeInputEnvelope
    set?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
    disconnect?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
    delete?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
    connect?: ResumeSectionWhereUniqueInput | ResumeSectionWhereUniqueInput[]
    update?: ResumeSectionUpdateWithWhereUniqueWithoutResumeInput | ResumeSectionUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ResumeSectionUpdateManyWithWhereWithoutResumeInput | ResumeSectionUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ResumeSectionScalarWhereInput | ResumeSectionScalarWhereInput[]
  }

  export type ResumeAnalysisUncheckedUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ResumeAnalysisCreateWithoutResumeInput, ResumeAnalysisUncheckedCreateWithoutResumeInput> | ResumeAnalysisCreateWithoutResumeInput[] | ResumeAnalysisUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ResumeAnalysisCreateOrConnectWithoutResumeInput | ResumeAnalysisCreateOrConnectWithoutResumeInput[]
    upsert?: ResumeAnalysisUpsertWithWhereUniqueWithoutResumeInput | ResumeAnalysisUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ResumeAnalysisCreateManyResumeInputEnvelope
    set?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
    disconnect?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
    delete?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
    connect?: ResumeAnalysisWhereUniqueInput | ResumeAnalysisWhereUniqueInput[]
    update?: ResumeAnalysisUpdateWithWhereUniqueWithoutResumeInput | ResumeAnalysisUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ResumeAnalysisUpdateManyWithWhereWithoutResumeInput | ResumeAnalysisUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ResumeAnalysisScalarWhereInput | ResumeAnalysisScalarWhereInput[]
  }

  export type ResumeCreateNestedOneWithoutSectionsInput = {
    create?: XOR<ResumeCreateWithoutSectionsInput, ResumeUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutSectionsInput
    connect?: ResumeWhereUniqueInput
  }

  export type ResumeUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<ResumeCreateWithoutSectionsInput, ResumeUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutSectionsInput
    upsert?: ResumeUpsertWithoutSectionsInput
    connect?: ResumeWhereUniqueInput
    update?: XOR<XOR<ResumeUpdateToOneWithWhereWithoutSectionsInput, ResumeUpdateWithoutSectionsInput>, ResumeUncheckedUpdateWithoutSectionsInput>
  }

  export type ResumeCreateNestedOneWithoutAnalysesInput = {
    create?: XOR<ResumeCreateWithoutAnalysesInput, ResumeUncheckedCreateWithoutAnalysesInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutAnalysesInput
    connect?: ResumeWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ResumeUpdateOneRequiredWithoutAnalysesNestedInput = {
    create?: XOR<ResumeCreateWithoutAnalysesInput, ResumeUncheckedCreateWithoutAnalysesInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutAnalysesInput
    upsert?: ResumeUpsertWithoutAnalysesInput
    connect?: ResumeWhereUniqueInput
    update?: XOR<XOR<ResumeUpdateToOneWithWhereWithoutAnalysesInput, ResumeUpdateWithoutAnalysesInput>, ResumeUncheckedUpdateWithoutAnalysesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ResumeCreateWithoutUserInput = {
    fileName: string
    fileType: string
    fileData: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
    sections?: ResumeSectionCreateNestedManyWithoutResumeInput
    analyses?: ResumeAnalysisCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateWithoutUserInput = {
    id?: number
    fileName: string
    fileType: string
    fileData: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
    sections?: ResumeSectionUncheckedCreateNestedManyWithoutResumeInput
    analyses?: ResumeAnalysisUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeCreateOrConnectWithoutUserInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeCreateManyUserInputEnvelope = {
    data: ResumeCreateManyUserInput | ResumeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResumeUpsertWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    update: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type ResumeUpdateWithWhereUniqueWithoutUserInput = {
    where: ResumeWhereUniqueInput
    data: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
  }

  export type ResumeUpdateManyWithWhereWithoutUserInput = {
    where: ResumeScalarWhereInput
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyWithoutUserInput>
  }

  export type ResumeScalarWhereInput = {
    AND?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    OR?: ResumeScalarWhereInput[]
    NOT?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    id?: IntFilter<"Resume"> | number
    fileName?: StringFilter<"Resume"> | string
    fileType?: StringFilter<"Resume"> | string
    fileData?: StringFilter<"Resume"> | string
    userId?: IntFilter<"Resume"> | number
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    profileSummary?: StringNullableFilter<"Resume"> | string | null
  }

  export type UserCreateWithoutResumesInput = {
    name?: string | null
    email?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    avatar?: string | null
  }

  export type UserUncheckedCreateWithoutResumesInput = {
    id?: number
    name?: string | null
    email?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    avatar?: string | null
  }

  export type UserCreateOrConnectWithoutResumesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
  }

  export type ResumeSectionCreateWithoutResumeInput = {
    title: string
    content: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeSectionUncheckedCreateWithoutResumeInput = {
    id?: number
    title: string
    content: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeSectionCreateOrConnectWithoutResumeInput = {
    where: ResumeSectionWhereUniqueInput
    create: XOR<ResumeSectionCreateWithoutResumeInput, ResumeSectionUncheckedCreateWithoutResumeInput>
  }

  export type ResumeSectionCreateManyResumeInputEnvelope = {
    data: ResumeSectionCreateManyResumeInput | ResumeSectionCreateManyResumeInput[]
    skipDuplicates?: boolean
  }

  export type ResumeAnalysisCreateWithoutResumeInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    executiveSummary: string
    overview?: string | null
    contentQuality?: string | null
    atsCompatibility?: string | null
    industryFit?: string | null
    formattingReview?: string | null
    skillsAnalysis?: string | null
    careerTrajectory?: string | null
    improvementSuggestions?: string | null
    overallScore: number
    contentScore: number
    atsOptimizationScore: number
    industryAlignmentScore: number
    formattingScore: number
    skillsScore: number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    grammarScore?: number
    clarityScore?: number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ResumeAnalysisUncheckedCreateWithoutResumeInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    executiveSummary: string
    overview?: string | null
    contentQuality?: string | null
    atsCompatibility?: string | null
    industryFit?: string | null
    formattingReview?: string | null
    skillsAnalysis?: string | null
    careerTrajectory?: string | null
    improvementSuggestions?: string | null
    overallScore: number
    contentScore: number
    atsOptimizationScore: number
    industryAlignmentScore: number
    formattingScore: number
    skillsScore: number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    grammarScore?: number
    clarityScore?: number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ResumeAnalysisCreateOrConnectWithoutResumeInput = {
    where: ResumeAnalysisWhereUniqueInput
    create: XOR<ResumeAnalysisCreateWithoutResumeInput, ResumeAnalysisUncheckedCreateWithoutResumeInput>
  }

  export type ResumeAnalysisCreateManyResumeInputEnvelope = {
    data: ResumeAnalysisCreateManyResumeInput | ResumeAnalysisCreateManyResumeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutResumesInput = {
    update: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResumesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
  }

  export type UserUpdateWithoutResumesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateWithoutResumesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResumeSectionUpsertWithWhereUniqueWithoutResumeInput = {
    where: ResumeSectionWhereUniqueInput
    update: XOR<ResumeSectionUpdateWithoutResumeInput, ResumeSectionUncheckedUpdateWithoutResumeInput>
    create: XOR<ResumeSectionCreateWithoutResumeInput, ResumeSectionUncheckedCreateWithoutResumeInput>
  }

  export type ResumeSectionUpdateWithWhereUniqueWithoutResumeInput = {
    where: ResumeSectionWhereUniqueInput
    data: XOR<ResumeSectionUpdateWithoutResumeInput, ResumeSectionUncheckedUpdateWithoutResumeInput>
  }

  export type ResumeSectionUpdateManyWithWhereWithoutResumeInput = {
    where: ResumeSectionScalarWhereInput
    data: XOR<ResumeSectionUpdateManyMutationInput, ResumeSectionUncheckedUpdateManyWithoutResumeInput>
  }

  export type ResumeSectionScalarWhereInput = {
    AND?: ResumeSectionScalarWhereInput | ResumeSectionScalarWhereInput[]
    OR?: ResumeSectionScalarWhereInput[]
    NOT?: ResumeSectionScalarWhereInput | ResumeSectionScalarWhereInput[]
    id?: IntFilter<"ResumeSection"> | number
    title?: StringFilter<"ResumeSection"> | string
    content?: StringFilter<"ResumeSection"> | string
    orderIndex?: IntFilter<"ResumeSection"> | number
    resumeId?: IntFilter<"ResumeSection"> | number
    createdAt?: DateTimeFilter<"ResumeSection"> | Date | string
    updatedAt?: DateTimeFilter<"ResumeSection"> | Date | string
  }

  export type ResumeAnalysisUpsertWithWhereUniqueWithoutResumeInput = {
    where: ResumeAnalysisWhereUniqueInput
    update: XOR<ResumeAnalysisUpdateWithoutResumeInput, ResumeAnalysisUncheckedUpdateWithoutResumeInput>
    create: XOR<ResumeAnalysisCreateWithoutResumeInput, ResumeAnalysisUncheckedCreateWithoutResumeInput>
  }

  export type ResumeAnalysisUpdateWithWhereUniqueWithoutResumeInput = {
    where: ResumeAnalysisWhereUniqueInput
    data: XOR<ResumeAnalysisUpdateWithoutResumeInput, ResumeAnalysisUncheckedUpdateWithoutResumeInput>
  }

  export type ResumeAnalysisUpdateManyWithWhereWithoutResumeInput = {
    where: ResumeAnalysisScalarWhereInput
    data: XOR<ResumeAnalysisUpdateManyMutationInput, ResumeAnalysisUncheckedUpdateManyWithoutResumeInput>
  }

  export type ResumeAnalysisScalarWhereInput = {
    AND?: ResumeAnalysisScalarWhereInput | ResumeAnalysisScalarWhereInput[]
    OR?: ResumeAnalysisScalarWhereInput[]
    NOT?: ResumeAnalysisScalarWhereInput | ResumeAnalysisScalarWhereInput[]
    id?: IntFilter<"ResumeAnalysis"> | number
    createdAt?: DateTimeFilter<"ResumeAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"ResumeAnalysis"> | Date | string
    resumeId?: IntFilter<"ResumeAnalysis"> | number
    executiveSummary?: StringFilter<"ResumeAnalysis"> | string
    overview?: StringNullableFilter<"ResumeAnalysis"> | string | null
    contentQuality?: StringNullableFilter<"ResumeAnalysis"> | string | null
    atsCompatibility?: StringNullableFilter<"ResumeAnalysis"> | string | null
    industryFit?: StringNullableFilter<"ResumeAnalysis"> | string | null
    formattingReview?: StringNullableFilter<"ResumeAnalysis"> | string | null
    skillsAnalysis?: StringNullableFilter<"ResumeAnalysis"> | string | null
    careerTrajectory?: StringNullableFilter<"ResumeAnalysis"> | string | null
    improvementSuggestions?: StringNullableFilter<"ResumeAnalysis"> | string | null
    overallScore?: FloatFilter<"ResumeAnalysis"> | number
    contentScore?: IntFilter<"ResumeAnalysis"> | number
    atsOptimizationScore?: IntFilter<"ResumeAnalysis"> | number
    industryAlignmentScore?: IntFilter<"ResumeAnalysis"> | number
    formattingScore?: IntFilter<"ResumeAnalysis"> | number
    skillsScore?: IntFilter<"ResumeAnalysis"> | number
    aiGeneratedImprovements?: JsonNullableFilter<"ResumeAnalysis">
    positionedSuggestions?: JsonNullableFilter<"ResumeAnalysis">
    status?: StringFilter<"ResumeAnalysis"> | string
    grammarScore?: IntFilter<"ResumeAnalysis"> | number
    clarityScore?: IntFilter<"ResumeAnalysis"> | number
    grammarIssues?: JsonNullableFilter<"ResumeAnalysis">
  }

  export type ResumeCreateWithoutSectionsInput = {
    fileName: string
    fileType: string
    fileData: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
    user: UserCreateNestedOneWithoutResumesInput
    analyses?: ResumeAnalysisCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateWithoutSectionsInput = {
    id?: number
    fileName: string
    fileType: string
    fileData: string
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
    analyses?: ResumeAnalysisUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeCreateOrConnectWithoutSectionsInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutSectionsInput, ResumeUncheckedCreateWithoutSectionsInput>
  }

  export type ResumeUpsertWithoutSectionsInput = {
    update: XOR<ResumeUpdateWithoutSectionsInput, ResumeUncheckedUpdateWithoutSectionsInput>
    create: XOR<ResumeCreateWithoutSectionsInput, ResumeUncheckedCreateWithoutSectionsInput>
    where?: ResumeWhereInput
  }

  export type ResumeUpdateToOneWithWhereWithoutSectionsInput = {
    where?: ResumeWhereInput
    data: XOR<ResumeUpdateWithoutSectionsInput, ResumeUncheckedUpdateWithoutSectionsInput>
  }

  export type ResumeUpdateWithoutSectionsInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutResumesNestedInput
    analyses?: ResumeAnalysisUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateWithoutSectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    analyses?: ResumeAnalysisUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeCreateWithoutAnalysesInput = {
    fileName: string
    fileType: string
    fileData: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
    user: UserCreateNestedOneWithoutResumesInput
    sections?: ResumeSectionCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateWithoutAnalysesInput = {
    id?: number
    fileName: string
    fileType: string
    fileData: string
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
    sections?: ResumeSectionUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeCreateOrConnectWithoutAnalysesInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutAnalysesInput, ResumeUncheckedCreateWithoutAnalysesInput>
  }

  export type ResumeUpsertWithoutAnalysesInput = {
    update: XOR<ResumeUpdateWithoutAnalysesInput, ResumeUncheckedUpdateWithoutAnalysesInput>
    create: XOR<ResumeCreateWithoutAnalysesInput, ResumeUncheckedCreateWithoutAnalysesInput>
    where?: ResumeWhereInput
  }

  export type ResumeUpdateToOneWithWhereWithoutAnalysesInput = {
    where?: ResumeWhereInput
    data: XOR<ResumeUpdateWithoutAnalysesInput, ResumeUncheckedUpdateWithoutAnalysesInput>
  }

  export type ResumeUpdateWithoutAnalysesInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutResumesNestedInput
    sections?: ResumeSectionUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateWithoutAnalysesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    sections?: ResumeSectionUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeCreateManyUserInput = {
    id?: number
    fileName: string
    fileType: string
    fileData: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profileSummary?: string | null
  }

  export type ResumeUpdateWithoutUserInput = {
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    sections?: ResumeSectionUpdateManyWithoutResumeNestedInput
    analyses?: ResumeAnalysisUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
    sections?: ResumeSectionUncheckedUpdateManyWithoutResumeNestedInput
    analyses?: ResumeAnalysisUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileData?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profileSummary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResumeSectionCreateManyResumeInput = {
    id?: number
    title: string
    content: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeAnalysisCreateManyResumeInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    executiveSummary: string
    overview?: string | null
    contentQuality?: string | null
    atsCompatibility?: string | null
    industryFit?: string | null
    formattingReview?: string | null
    skillsAnalysis?: string | null
    careerTrajectory?: string | null
    improvementSuggestions?: string | null
    overallScore: number
    contentScore: number
    atsOptimizationScore: number
    industryAlignmentScore: number
    formattingScore: number
    skillsScore: number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    grammarScore?: number
    clarityScore?: number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ResumeSectionUpdateWithoutResumeInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeSectionUncheckedUpdateWithoutResumeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeSectionUncheckedUpdateManyWithoutResumeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeAnalysisUpdateWithoutResumeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executiveSummary?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    contentQuality?: NullableStringFieldUpdateOperationsInput | string | null
    atsCompatibility?: NullableStringFieldUpdateOperationsInput | string | null
    industryFit?: NullableStringFieldUpdateOperationsInput | string | null
    formattingReview?: NullableStringFieldUpdateOperationsInput | string | null
    skillsAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    careerTrajectory?: NullableStringFieldUpdateOperationsInput | string | null
    improvementSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    overallScore?: FloatFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    atsOptimizationScore?: IntFieldUpdateOperationsInput | number
    industryAlignmentScore?: IntFieldUpdateOperationsInput | number
    formattingScore?: IntFieldUpdateOperationsInput | number
    skillsScore?: IntFieldUpdateOperationsInput | number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    grammarScore?: IntFieldUpdateOperationsInput | number
    clarityScore?: IntFieldUpdateOperationsInput | number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ResumeAnalysisUncheckedUpdateWithoutResumeInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executiveSummary?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    contentQuality?: NullableStringFieldUpdateOperationsInput | string | null
    atsCompatibility?: NullableStringFieldUpdateOperationsInput | string | null
    industryFit?: NullableStringFieldUpdateOperationsInput | string | null
    formattingReview?: NullableStringFieldUpdateOperationsInput | string | null
    skillsAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    careerTrajectory?: NullableStringFieldUpdateOperationsInput | string | null
    improvementSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    overallScore?: FloatFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    atsOptimizationScore?: IntFieldUpdateOperationsInput | number
    industryAlignmentScore?: IntFieldUpdateOperationsInput | number
    formattingScore?: IntFieldUpdateOperationsInput | number
    skillsScore?: IntFieldUpdateOperationsInput | number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    grammarScore?: IntFieldUpdateOperationsInput | number
    clarityScore?: IntFieldUpdateOperationsInput | number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ResumeAnalysisUncheckedUpdateManyWithoutResumeInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executiveSummary?: StringFieldUpdateOperationsInput | string
    overview?: NullableStringFieldUpdateOperationsInput | string | null
    contentQuality?: NullableStringFieldUpdateOperationsInput | string | null
    atsCompatibility?: NullableStringFieldUpdateOperationsInput | string | null
    industryFit?: NullableStringFieldUpdateOperationsInput | string | null
    formattingReview?: NullableStringFieldUpdateOperationsInput | string | null
    skillsAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    careerTrajectory?: NullableStringFieldUpdateOperationsInput | string | null
    improvementSuggestions?: NullableStringFieldUpdateOperationsInput | string | null
    overallScore?: FloatFieldUpdateOperationsInput | number
    contentScore?: IntFieldUpdateOperationsInput | number
    atsOptimizationScore?: IntFieldUpdateOperationsInput | number
    industryAlignmentScore?: IntFieldUpdateOperationsInput | number
    formattingScore?: IntFieldUpdateOperationsInput | number
    skillsScore?: IntFieldUpdateOperationsInput | number
    aiGeneratedImprovements?: NullableJsonNullValueInput | InputJsonValue
    positionedSuggestions?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    grammarScore?: IntFieldUpdateOperationsInput | number
    clarityScore?: IntFieldUpdateOperationsInput | number
    grammarIssues?: NullableJsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}