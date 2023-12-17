import { MigrationInterface, QueryRunner } from "typeorm";

export class Route1702832381388 implements MigrationInterface {
    name = 'Route1702832381388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "route_references" ("id" SERIAL NOT NULL, "referenceName" character varying NOT NULL, "image" character varying NOT NULL, "routeId" integer, CONSTRAINT "PK_36a5ff9330a9f8a21c5636a2de5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD CONSTRAINT "FK_e424c0843eff7cad3315c623a32" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_references" DROP CONSTRAINT "FK_e424c0843eff7cad3315c623a32"`);
        await queryRunner.query(`DROP TABLE "route"`);
        await queryRunner.query(`DROP TABLE "route_references"`);
    }

}
