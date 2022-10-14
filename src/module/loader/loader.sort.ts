import { LeanDocument } from 'mongoose';

export const sortDataByIds = <T>(
  data: T[],
  keys: string[],
  property: string,
) => {
  const mapData = {};
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item && item[property]) {
      if (Array.isArray(mapData[item[property].toString()])) {
        mapData[item[property].toString()].push(item);
      } else {
        mapData[item[property].toString()] = [item];
      }
    }
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
  let result = {};

  //Chuyển đổi entity[] về { [refId]: entity[] }
  entities.forEach(entity => {
    const refId = entity[refIdFieldName];

    if (result[refId]) result[refId].push(entity);
    else result[refId] = [entity];
  });

  //refIds = [refId, refId, ...]
  //return = [ ObjectType[], ObjectType[], ... ]
  return refIds.map((refId) => result[refId] || []);
}

export class SortDataByRefIds {
  refIds: string[];

  refIdFieldName: string;

  entities: LeanDocument<any>[];
}