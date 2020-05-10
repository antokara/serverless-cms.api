import { IEnumResolver } from 'graphql-tools';
import { AttributeMap, QueryOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { IPage } from 'resources/shared/models/Page';
import { TArgsId } from 'resources/publicGraphql/apolloServer/resolvers/TArgsId';
import { page as pageResolver } from 'resources/publicGraphql/apolloServer/resolvers/page';
import { TResolverFn } from './TResolverFn';

/* 
  we have to disable this eslint rule because we need this behavior (page -> pageToPages -> page)
  @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md#when-not-to-use-it
*/
/* eslint import/no-cycle: [0] */
/**
 * resolver function for the pageToPages query.
 * returns the list of all children pages for the pageId provided, sorted by the "sort" attribute
 *
 * note: so far this resolver, is only used by the page parseAttributeMap
 * @see resources/shared/models/Page.ts
 */
const pageToPages: TResolverFn<IPage[], TArgsId> = async (
  parent: IEnumResolver,
  args: TArgsId,
  ctx: TContext,
): Promise<IPage[]> =>
  ctx.dynamoDB
    .query({
      TableName: 'pageToPages',
      KeyConditionExpression: 'pageId = :pageId',
      ExpressionAttributeValues: {
        ':pageId': { S: args.id },
      },
    })
    .promise()
    .then(
      async (data: QueryOutput): Promise<IPage[]> =>
        Promise.all(
          // iterate every child page or
          // return an empty array of there are no items
          data?.Items?.map(
            // return a Page object or undefined
            async (item: AttributeMap): Promise<IPage | undefined> =>
              // type guard to make sure we have the childPageId
              typeof item.childPageId?.S !== 'undefined'
                ? pageResolver(parent, { id: item.childPageId.S }, ctx)
                : Promise.resolve(undefined),
          ) ?? [],
        ).then((pages: (IPage | undefined)[]) =>
          // make sure we remove any undefined array items
          // so that our final list has only objects
          pages.filter(
            // filter using a type guard
            (page: IPage | undefined): page is IPage =>
              typeof page !== 'undefined',
          ),
        ),
    );

export { pageToPages };
