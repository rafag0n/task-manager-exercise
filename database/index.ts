import { createId } from "../utils/id";
import { MemoryDatabaseBase } from "./types";
import { Database, DatabaseDelete, DatabaseTypes, DatabaseUpdate } from "./types";


export class MemoryDatabase implements MemoryDatabaseBase {
  database: Database;

  constructor() {
    this.database = {
      tasks: {}
    }
  }

  create = <K extends keyof DatabaseTypes>(type: K, data: Omit<DatabaseTypes[K], 'id'>):string => {
    const id = createId();
    this.database[type][id] = { id, ...data };
    return id;
  }

  deleteById = <K extends keyof DatabaseDelete>(type: K, id: string) => {
    if (id in this.database[type]) {
      delete this.database[type][id];
    }
  }

  updateById = <K extends keyof DatabaseUpdate>(type: K, id: string, data: DatabaseUpdate[K]) => {
    if (id in this.database[type]) {
      this.database[type][id] = { ...this.database[type][id], ...data };
    }
  }

  findOneById = <K extends keyof DatabaseTypes>(type: K, id: string): DatabaseTypes[K] | null => {
    if (id in this.database[type]) {
      return this.database[type][id];
    }
    return null;
  }

  findAll = <K extends keyof DatabaseTypes>(type: K): DatabaseTypes[K][] => {
    return Object.values(this.database[type]) as DatabaseTypes[K][];
  }

}

export const db = new MemoryDatabase();