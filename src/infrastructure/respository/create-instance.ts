import { Sequelize } from "sequelize-typescript";

export default class CreateDbInstance {
  private readonly _sequelize: Sequelize;

  constructor() {
    this._sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
  }

  get sequelize(): Sequelize {
    return this._sequelize;
  }
}

const database = new CreateDbInstance();
export const sequelizeInstance = database.sequelize;
