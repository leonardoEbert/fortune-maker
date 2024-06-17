import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateVendorTable1717502472108 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vendor',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: false,
            isNullable: true,
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

    await queryRunner.createTable(
      new Table({
        name: 'vendor_classifications_vendor',
        columns: [
          {
            name: 'vendor_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'vendor_classification_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'vendor_classifications_vendor',
      new TableForeignKey({
        columnNames: ['vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vendor',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vendor_classifications_vendor',
      new TableForeignKey({
        columnNames: ['vendor_classification_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vendor_classification',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('vendor_classifications_vendor');
    const vendorForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('vendor_id') !== -1,
    );
    const classificationForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('vendor_classification_id') !== -1,
    );

    await queryRunner.dropForeignKey(
      'vendor_classifications_vendor',
      vendorForeignKey,
    );
    await queryRunner.dropForeignKey(
      'vendor_classifications_vendor',
      classificationForeignKey,
    );

    await queryRunner.dropTable('vendor_classifications_vendor');

    await queryRunner.dropTable('vendor');
  }
}
