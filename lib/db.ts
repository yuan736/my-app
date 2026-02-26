import Dexie from 'dexie';

export interface Phrase {
  id?: number;
  category: string;
  content: string;
  usageCount: number;
  lastUsed?: Date;
}

export interface Category {
  id?: number;
  name: string;
  sortOrder?: number;  
  createdAt?: Date;
}

export class SalesDB extends Dexie {
  phrases!: Dexie.Table<Phrase, number>;
  category!: Dexie.Table<Category, number>;

  constructor() {
    super('SalesAssistantDB');
    this.version(1).stores({
      phrases: '++id, category, usageCount, lastUsed',
      category:'++id, name, sortOrder, createAt'
    });
  }
}

export const db = new SalesDB();