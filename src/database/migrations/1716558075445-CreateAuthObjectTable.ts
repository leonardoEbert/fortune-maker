import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthObjectTable1716558075445 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "auth_object",
      columns: [
        {
          name: 'id',
          type: 'uuid',
          generationStrategy: 'uuid',
          default: 'gen_random_uuid()',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '50',
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
      ]
    }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('auth_object', true);
  }

}
