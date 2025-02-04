import { Field, Provable } from 'snarkyjs';
import { Hasher } from '../model';
import { SparseMerkleProof } from './proofs';
export { DeepSparseMerkleSubTree };
/**
 * DeepSparseMerkleSubTree is a deep sparse merkle subtree for working on only a few leafs.
 *
 * @class DeepSparseMerkleSubTree
 * @template K
 * @template V
 */
declare class DeepSparseMerkleSubTree<K, V> {
    private nodeStore;
    private valueStore;
    private root;
    private hasher;
    private config;
    private keyType;
    private valueType;
    /**
     * Creates an instance of DeepSparseMerkleSubTree.
     * @param {Field} root merkle root
     * @param {Provable<K>} keyType
     * @param {Provable<V>} valueType
     * @param {{ hasher: Hasher; hashKey: boolean; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashKey: true,
     *       hashValue: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash; hashKey:
     * whether to hash the key, the default is true; hashValue: whether to hash the value,
     * the default is true.
     * @memberof DeepSparseMerkleSubTree
     */
    constructor(root: Field, keyType: Provable<K>, valueType: Provable<V>, options?: {
        hasher: Hasher;
        hashKey: boolean;
        hashValue: boolean;
    });
    /**
     * Get current root.
     *
     * @return {*}  {Field}
     * @memberof DeepSparseMerkleSubTree
     */
    getRoot(): Field;
    /**
     * Get height of the tree.
     *
     * @return {*}  {number}
     * @memberof DeepSparseMerkleSubTree
     */
    getHeight(): number;
    private getKeyField;
    private getValueField;
    /**
     * Check whether there is a corresponding key and value in the tree
     *
     * @param {V} value
     * @return {*}  {boolean}
     * @memberof DeepSparseMerkleSubTree
     */
    has(key: K, value: V): boolean;
    /**
     * Add a branch to the tree, a branch is generated by smt.prove.
     *
     * @param {SparseMerkleProof} proof
     * @param {K} key
     * @param {V} [value]
     * @param {boolean} [ignoreInvalidProof=false] whether to throw an error when proof is invalid
     * @return {*}
     * @memberof DeepSparseMerkleSubTree
     */
    addBranch(proof: SparseMerkleProof, key: K, value?: V, ignoreInvalidProof?: boolean): void;
    /**
     * Create a merkle proof for a key against the current root.
     *
     * @param {K} key
     * @return {*}  {SparseMerkleProof}
     * @memberof DeepSparseMerkleSubTree
     */
    prove(key: K): SparseMerkleProof;
    /**
     * Update a new value for a key in the tree and return the new root of the tree.
     *
     * @param {K} key
     * @param {V} [value]
     * @return {*}  {Field}
     * @memberof DeepSparseMerkleSubTree
     */
    update(key: K, value?: V): Field;
}
