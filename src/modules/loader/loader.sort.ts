import { LeanDocument } from 'mongoose';

export function sortDataByRefIds({
  refIdFieldName,
  entities,
  refIds,
}: SortDataByRefIds) {
  // console.log({
  //   refIdFieldName,
  //   entities,
  //   refIds,
  // });

  console.log(entities);

  const result = {};

  entities.forEach((entity) => {
    const refId = entity[refIdFieldName]?._id;

    if (result[refId]) result[refId].push(entity);
    else result[refId] = [entity];
  });

  return refIds.map((refId) => result[refId] || []);
}

export class SortDataByRefIds {
  refIds: string[];

  refIdFieldName: string;

  entities: LeanDocument<any>[];
}
