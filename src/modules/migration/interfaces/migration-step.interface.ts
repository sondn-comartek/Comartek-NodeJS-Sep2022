import { MigrationCommand } from '../migration.command';

export interface MigrationStep {
  name: string;
  up(migrationCommand: MigrationCommand): Promise<any>;
}
