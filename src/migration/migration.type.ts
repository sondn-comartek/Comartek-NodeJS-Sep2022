export type MigrationSteps = {
   [key: string]: (...arg: any) => Promise<any>
}
