import { LeanDocument } from 'mongoose';

export function sortDataByRefIds({
  refIdFieldName,
  entities,
  refIds,
}: SortDataByRefIds) {
  console.log({ refIdFieldName, entities, refIds });

  let result = {};

  entities.forEach((entity) => {
    const refId = entity[refIdFieldName];

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
