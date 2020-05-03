import { TArgsUnicodePath } from 'resources/publicGraphql/apolloServer/resolvers/page/TArgsUnicodePath';
import { TArgsId } from 'resources/publicGraphql/apolloServer/resolvers/TArgsId';

const isArgsId: (args: TArgsId | TArgsUnicodePath) => args is TArgsId = (
  args: TArgsId | TArgsUnicodePath,
): args is TArgsId => {
  if ((args as TArgsId).id !== undefined) {
    return true;
  }
  return false;
};

export { isArgsId };
