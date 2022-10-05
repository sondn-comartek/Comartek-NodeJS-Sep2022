export async function asyncForEach(array: Array<any>, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function run(func: () => void) {
  await func();
}

export default {
  asyncForEach,
  run,
};
