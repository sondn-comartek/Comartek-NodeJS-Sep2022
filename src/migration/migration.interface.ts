export interface MigrationSteps {
   [key: string]: (...arg: any) => Promise<any>
}
