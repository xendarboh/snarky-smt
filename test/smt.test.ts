import { Circuit, Field, Poseidon } from 'snarkyjs';
import { MemoryStore } from '../src/lib/store/memory_store';
import { SparseMerkleTree } from '../src/lib/smt/smt';
import { SMTUtils } from '../src/lib/smt/proofs';
import { ProvableSMTUtils } from '../src/lib/smt/verify_circuit';

describe('SparseMerkleTree', () => {
  let tree: SparseMerkleTree<Field, Field>;

  // beforeAll(async () => {
  // });

  // afterAll(async () => {
  // });

  beforeEach(async () => {
    tree = await SparseMerkleTree.build<Field, Field>(
      new MemoryStore<Field>(),
      Field,
      Field
    );
  });

  it('should create and verify proof correctly', async () => {
    let keys: Field[] = [];
    let values: Field[] = [];
    const updateTimes = 5;

    for (let i = 0; i < updateTimes; i++) {
      const key = Field(Math.floor(Math.random() * 1000000000000));
      const value = Field(Math.floor(Math.random() * 1000000000000));
      keys.push(key);
      values.push(value);
      await tree.update(key, value);
    }

    const root = tree.getRoot();
    for (let i = 0; i < updateTimes; i++) {
      const proof = await tree.prove(keys[i]);
      expect(
        SMTUtils.checkMembership(proof, root, keys[i], Field, values[i], Field)
      );
    }

    const key = Poseidon.hash(keys[0].toFields());
    const nonMembershipProof = await tree.prove(key);
    expect(SMTUtils.checkNonMembership(nonMembershipProof, root, key, Field));
  });

  it('should delete element correctly', async () => {
    const x = Field(1);
    const y = Field(2);
    await tree.update(x, y);
    const root = await tree.delete(x);

    const nonMembershipProof = await tree.prove(x);
    expect(SMTUtils.checkNonMembership(nonMembershipProof, root, x, Field));
  });

  it('should get and check element correctly', async () => {
    const x = Field(3);
    const y = Field(4);
    await tree.update(x, y);
    const exist = await tree.has(x);
    expect(exist);

    const element = await tree.get(x);
    expect(element !== null && element.equals(y).toBoolean());
  });

  it('should compact and decompact proof correctly', async () => {
    const x = Field(5);
    const y = Field(6);
    const root = await tree.update(x, y);

    const cproof = await tree.proveCompact(x);
    const proof = SMTUtils.decompactProof(cproof);
    expect(SMTUtils.checkMembership(proof, root, x, Field, y, Field));
  });

  function log(...objs: any) {
    Circuit.asProver(() => {
      console.log(objs);
    });
  }

  it('should verify proof in circuit correctly', async () => {
    const x = Field(7);
    const y = Field(8);
    const z = Field(9);
    const root = await tree.update(x, y);

    const cproof = await tree.proveCompact(x);
    const proof = SMTUtils.decompactProof(cproof);

    const zproof = await tree.prove(z);

    Circuit.runAndCheck(() => {
      ProvableSMTUtils.checkNonMembership(zproof, root, z, Field).assertTrue();
      log('z nonMembership assert success');

      ProvableSMTUtils.checkMembership(
        proof,
        root,
        x,
        Field,
        y,
        Field
      ).assertTrue();
      log('x y membership assert success');
    });
  });
});
