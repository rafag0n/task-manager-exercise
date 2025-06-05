import { createId } from "../utils/id";
import { JSONDatabaseBase } from "./types";
import { DatabaseSnapshot, DatabaseDelete, DatabaseTypes, DatabaseUpdate } from "./types";
import fs from 'fs';

//I decided to use a JSON file for simplicity of persistence in this example;
//Although it was not required, NEXT.js had sort of an unpredictable memory behavior on development;
//Which made it difficult to use the pure in-memory database.
//It was made as a key-value store to keep it simple and fast;
//A decorator pattern can still be used here for reading/writing to the JSON file;

export class JSONDatabase implements JSONDatabaseBase {
  snapshot: DatabaseSnapshot;
  filePath: string;

  constructor() {
    console.log('Initializing JSON database');
    this.filePath = './storage.json';
    this.snapshot = { tasks: {} };
    this.loadFromFile();
  }

  create = <K extends keyof DatabaseTypes>(type: K, data: Omit<DatabaseTypes[K], 'id'>):string => {
    this.loadFromFile();
    const id = createId();
    this.snapshot[type][id] = { id, ...data };
    this.saveToFile();
    return id;
  }

  deleteById = <K extends keyof DatabaseDelete>(type: K, id: string) => {
    if (id in this.snapshot[type]) {
      this.loadFromFile();
      delete this.snapshot[type][id];
      this.saveToFile();
    } else {
      throw new Error(`Item with id ${id} not found in type ${type}`);
    }
  }

  updateById = <K extends keyof DatabaseUpdate>(type: K, id: string, data: DatabaseUpdate[K]) => {
    if (id in this.snapshot[type]) {
      this.loadFromFile();
      this.snapshot[type][id] = { ...this.snapshot[type][id], ...data };
      this.saveToFile();
    } else {
      throw new Error(`Item with id ${id} not found in type ${type}`);
    }
  }

  findOneById = <K extends keyof DatabaseTypes>(type: K, id: string): DatabaseTypes[K] => {
    if (id in this.snapshot[type]) {
      this.loadFromFile();
      return this.snapshot[type][id];
    } else {
      throw new Error(`Item with id ${id} not found in collection ${type}`);
    }
  }

  findAll = <K extends keyof DatabaseTypes>(type: K): DatabaseTypes[K][] => {
    this.loadFromFile();
    return Object.values(this.snapshot[type]) as DatabaseTypes[K][];
  }

  saveToFile = () => {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(this.snapshot, null, 2),
      'utf-8'
    );
  };

  loadFromFile = () => {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      if (data.trim().length) {
        this.snapshot = JSON.parse(data);
      }
    } catch (err) {
      const nodeErr = err as NodeJS.ErrnoException;
      if (nodeErr.code === 'ENOENT') {
        this.saveToFile();
      } else console.error('Error reading database file:', err);
    }
  };

}

export const db = new JSONDatabase();