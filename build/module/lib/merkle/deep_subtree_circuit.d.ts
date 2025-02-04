import { Field, Provable } from 'snarkyjs';
import { Hasher } from '../model';
import { BaseMerkleProof } from './proofs';
export { ProvableDeepMerkleSubTree };
/**
 * ProvableDeepMerkleSubTree is a deep merkle subtree for working on only a few leafs in circuit.
 *
 * @class ProvableDeepMerkleSubTree
 * @template V
 */
declare class ProvableDeepMerkleSubTree<V> {
    private nodeStore;
    private valueStore;
    private root;
    private height;
    private hasher;
    private hashValue;
    private valueType;
    /**
     * Creates an instance of ProvableDeepMerkleSubTree.
     * @param {Field} root merkle root
     * @param {number} height height of tree
     * @param {Provable<V>} valueType
     * @param {{ hasher?: Hasher; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashValue: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash;
     * hashValue: whether to hash the value, he default is true.
     * @memberof ProvableDeepMerkleSubTree
     */
    constructor(root: Field, height: number, valueType: Provable<V>, options?: {
        hasher?: Hasher;
        hashValue: boolean;
    });
    private getValueField;
    /**
     * Get current root.
     *
     * @return {*}  {Field}
     * @memberof ProvableDeepMerkleSubTree
     */
    getRoot(): Field;
    /**
     * Get height of the tree.
     *
     * @return {*}  {number}
     * @memberof ProvableDeepMerkleSubTree
     */
    getHeight(): number;
    /**
     * Add a branch to the tree, a branch is generated by smt.prove.
     *
     * @param {BaseMerkleProof} proof
     * @param {Field} index
     * @param {V} [value]
     * @memberof ProvableDeepMerkleSubTree
     */
    addBranch(proof: BaseMerkleProof, index: Field, value?: V): void;
    /**
     * Create a merkle proof for a key against the current root.
     *
     * @param {Field} index
     * @return {*}  {BaseMerkleProof}
     * @memberof ProvableDeepMerkleSubTree
     */
    prove(index: Field): BaseMerkleProof;
    /**
     * Update a new value for a key in the tree and return the new root of the tree.
     *
     * @param {Field} index
     * @param {V} [value]
     * @return {*}  {Field}
     * @memberof ProvableDeepMerkleSubTree
     */
    update(index: Field, value?: V): Field;
}
