import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1712535508477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            generationStrategy: 'uuid',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
