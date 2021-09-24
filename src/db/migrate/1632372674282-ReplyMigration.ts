import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class ReplyMigration1632372674282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reply',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'intent',
            type: 'varchar',
          },
          {
            name: 'reply',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true
    );

    await queryRunner.createIndex(
      'reply',
      new TableIndex({
        name: 'IDX_REPLY_INTENT',
        columnNames: ['intent'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('reply', 'IDX_REPLY_INTENT');
    await queryRunner.dropTable('reply');
  }
}
