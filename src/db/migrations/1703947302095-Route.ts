import { MigrationInterface, QueryRunner } from "typeorm";

export class Route1703947302095 implements MigrationInterface {
    name = 'Route1703947302095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "port_rotation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "route" character varying NOT NULL, "image" character varying NOT NULL, "port" character varying NOT NULL, "dock" character varying NOT NULL, "eta" character varying, "etaTime" integer, "etd" character varying, "etdTime" integer, "referenceId" uuid, CONSTRAINT "PK_bb1261c714417519e418faa85b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route_references" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying NOT NULL, "routeId" integer, CONSTRAINT "PK_36a5ff9330a9f8a21c5636a2de5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "port_rotation" ADD CONSTRAINT "FK_616a2a094c8ec2fff567642d60d" FOREIGN KEY ("referenceId") REFERENCES "route_references"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route_references" ADD CONSTRAINT "FK_e424c0843eff7cad3315c623a32" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_references" DROP CONSTRAINT "FK_e424c0843eff7cad3315c623a32"`);
        await queryRunner.query(`ALTER TABLE "port_rotation" DROP CONSTRAINT "FK_616a2a094c8ec2fff567642d60d"`);
        await queryRunner.query(`DROP TABLE "route"`);
        await queryRunner.query(`DROP TABLE "route_references"`);
        await queryRunner.query(`DROP TABLE "port_rotation"`);
    }

}
