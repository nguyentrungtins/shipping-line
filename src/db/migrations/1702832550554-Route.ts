import { MigrationInterface, QueryRunner } from "typeorm";

export class Route1702832550554 implements MigrationInterface {
    name = 'Route1702832550554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_references" DROP CONSTRAINT "FK_e424c0843eff7cad3315c623a32"`);
        await queryRunner.query(`ALTER TABLE "route_references" DROP CONSTRAINT "PK_36a5ff9330a9f8a21c5636a2de5"`);
        await queryRunner.query(`ALTER TABLE "route_references" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD CONSTRAINT "PK_36a5ff9330a9f8a21c5636a2de5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "route_references" DROP COLUMN "routeId"`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD "routeId" uuid`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "PK_08affcd076e46415e5821acf52d"`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD CONSTRAINT "FK_e424c0843eff7cad3315c623a32" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_references" DROP CONSTRAINT "FK_e424c0843eff7cad3315c623a32"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "PK_08affcd076e46415e5821acf52d"`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "route_references" DROP COLUMN "routeId"`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD "routeId" integer`);
        await queryRunner.query(`ALTER TABLE "route_references" DROP CONSTRAINT "PK_36a5ff9330a9f8a21c5636a2de5"`);
        await queryRunner.query(`ALTER TABLE "route_references" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD CONSTRAINT "PK_36a5ff9330a9f8a21c5636a2de5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD CONSTRAINT "FK_e424c0843eff7cad3315c623a32" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
