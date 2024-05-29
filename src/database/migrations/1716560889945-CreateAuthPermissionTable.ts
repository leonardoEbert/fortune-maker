import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAuthPermissionTable1716560889945
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_permission',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'action',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'object_id',
            type: 'uuid',
            isNullable: false,
            generationStrategy: 'uuid',
          },
          {
            name: 'condition',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'auth_permission',
      new TableForeignKey({
        columnNames: ['object_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'auth_object',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('auth_permission');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('object_id') !== -1,
    );
    await queryRunner.dropForeignKey('auth_permission', foreignKey);
    await queryRunner.dropTable('auth_permission', true);
  }
}
