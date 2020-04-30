/**
 * for use in preload fields.
 * @see resources/shared/typeDefs/enums/Preload.ts
 */
enum EPreload {
  NO = 'NO',
  SELF = 'SELF',
  SELF_AND_CHILDREN = 'SELF_AND_CHILDREN',
  // TODO: think about this. it should probably go to pageType (ie. news article, don't preload)
  // but then, if the pageType has it, why do we need children and not just use boolean?
}

export { EPreload };
