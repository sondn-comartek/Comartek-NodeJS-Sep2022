import { LeanDocument } from 'mongoose';

export const sortDataByIds = <T>(
  data: T[],
  keys: string[],
  property = '_id',
) => {
  const mapData = {};
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item && item[property]) mapData[item[property].toString()] = item;
  }
  return keys.map((k) => {
    return mapData[k] || null;
  }) as T[];
};

export function sortDataByRefIds({
  refIdFieldName,
  entities,
  refIds,
}: SortDataByRefIds) {
  const result = {};

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
