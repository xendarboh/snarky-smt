import { Level } from 'level';
import { Field } from 'snarkyjs';
import { LevelStore } from '../src/lib/store/level_store';

describe('LevelStore', () => {
  let store: LevelStore<Field>;

  // beforeAll(async () => {
  // });

  // afterAll(async () => {
  // });

  beforeEach(async () => {
    const levelDb = new Level<string, any>('./db');
    store = new LevelStore(levelDb, Field, 'test');
  });

  it('should set, get elements and update root correctly', async () => {
    let keys: Field[] = [];
    let nodes: Field[] = [];
    let paths: Field[] = [];
    let values: Field[] = [];
    const updateTimes = 5;

    for (let i = 0; i < updateTimes; i++) {
      const key = Field(Math.floor(Math.random() * 1000000000000));
      const node = Field(Math.floor(Math.random() * 1000000000000));
      const path = Field(Math.floor(Math.random() * 1000000000000));
      const value = Field(Math.floor(Math.random() * 1000000000000));
      keys.push(key);
      nodes.push(node);
      paths.push(path);
      values.push(value);

      store.preparePutNodes(key, [node]);
      store.preparePutValue(path, value);
    }

    const root = Field(999);
    store.prepareUpdateRoot(root);

    store.prepareDelNodes(keys[0]);
    store.prepareDelValue(paths[0]);

    await store.commit();

    await expect(store.getNodes(keys[0])).rejects.toThrowError();

    await expect(store.getValue(paths[0])).rejects.toThrowError();

    const nodes1 = await store.getNodes(keys[1]);
    expect(nodes1[0].equals(nodes[1]).toBoolean());

    const value1 = await store.getValue(paths[1]);
    expect(value1.equals(values[1]).toBoolean());

    const updateRoot = await store.getRoot();
    expect(updateRoot.equals(root).toBoolean());
  });
});
