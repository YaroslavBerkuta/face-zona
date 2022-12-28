import { Repository } from "typeorm";
import { ISession } from "./session.interface";

export type ISessionsRepository = Repository<ISession>;
