import { Bool, Field, Provable } from 'snarkyjs';
import { Hasher } from '../model';
import { SparseMerkleProof } from './proofs';
export { ProvableSMTUtils };
/**
 * Collection of utility functions for sparse merkle tree in the circuit.
 *
 * @class ProvableSMTUtils
 */
declare class ProvableSMTUtils {
    /**
     * Empty value for sparse merkle tree
     *
     * @static
     * @memberof ProvableSMTUtils
     */
    static EMPTY_VALUE: Field;
    /**
     * Verify a merkle proof by root, keyHashOrKeyField and valueHashOrValueField
     *
     * @static
     * @param {SparseMerkleProof} proof
     * @param {Field} expectedRoot
     * @param {Field} keyHashOrKeyField
     * @param {Field} valueHashOrValueField
     * @param {Hasher} [hasher=Poseidon.hash]
     * @return {*}  {Bool}
     * @memberof ProvableSMTUtils
     */
    static verifyProofByField: typeof verifyProofByFieldInCircuit;
    /**
     * Calculate new root based on sideNodes, keyHashOrKeyField and valueHashOrValueField
     *
     * @static
     * @param {Field[]} sideNodes
     * @param {Field} keyHashOrKeyField
     * @param {Field} valueHashOrValueField
     * @param {Hasher} [hasher=Poseidon.hash]
     * @return {*}  {Field}
     * @memberof ProvableSMTUtils
     */
    static computeRootByField: typeof computeRootByFieldInCircuit;
    /**
     * Returns true if the value is in the tree and it is at the index from the key
     *
     * @static
     * @template K
     * @template V
     * @param {SparseMerkleProof} proof
     * @param {Field} expectedRoot
     * @param {K} key
     * @param {Provable<K>} keyType
     * @param {V} value
     * @param {Provable<V>} valueType
     * @param {{ hasher?: Hasher; hashKey: boolean; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashKey: true,
     *       hashValue: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash; hashKey:
     * whether to hash the key, the default is true; hashValue: whether to hash the value,
     * the default is true.
     * @return {*}  {Bool}
     * @memberof ProvableSMTUtils
     */
    static checkMembership<K, V>(proof: SparseMerkleProof, expectedRoot: Field, key: K, keyType: Provable<K>, value: V, valueType: Provable<V>, options?: {
        hasher?: Hasher;
        hashKey: boolean;
        hashValue: boolean;
    }): Bool;
    /**
     * Returns true if there is no value at the index from the key
     *
     * @static
     * @template K
     * @param {SparseMerkleProof} proof
     * @param {Field} expectedRoot
     * @param {K} key
     * @param {Provable<K>} keyType
     * @param {{ hasher?: Hasher; hashKey: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashKey: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash; hashKey:
     * whether to hash the key, the default is true; hashValue: whether to hash the value,
     * the default is true.
     * @return {*}  {Bool}
     * @memberof ProvableSMTUtils
     */
    static checkNonMembership<K>(proof: SparseMerkleProof, expectedRoot: Field, key: K, keyType: Provable<K>, options?: {
        hasher?: Hasher;
        hashKey: boolean;
    }): Bool;
    /**
     * Calculate new root based on sideNodes, key and value
     *
     * @static
     * @template K
     * @template V
     * @param {Field[]} sideNodes
     * @param {K} key
     * @param {Provable<K>} keyType
     * @param {V} value
     * @param {Provable<V>} valueType
     * @param {{ hasher?: Hasher; hashKey: boolean; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashKey: true,
     *       hashValue: true,
     *     }]
     * @return {*}  {Field}
     * @memberof ProvableSMTUtils
     */
    static computeRoot<K, V>(sideNodes: Field[], key: K, keyType: Provable<K>, value: V, valueType: Provable<V>, options?: {
        hasher?: Hasher;
        hashKey: boolean;
        hashValue: boolean;
    }): Field;
}
/**
 * Verify a merkle proof by root, keyHashOrKeyField and valueHashOrValueField in circuit.
 *
 * @param {SparseMerkleProof} proof
 * @param {Field} expectedRoot
 * @param {Field} keyHashOrKeyField
 * @param {Field} valueHashOrValueField
 * @param {Hasher} [hasher=Poseidon.hash]
 * @return {*}  {Bool}
 */
declare function verifyProofByFieldInCircuit(proof: SparseMerkleProof, expectedRoot: Field, keyHashOrKeyField: Field, valueHashOrValueField: Field, hasher?: Hasher): Bool;
/**
 * Calculate new root based on sideNodes, keyHashOrKeyField and valueHashOrValueField in circuit.
 *
 * @param {Field[]} sideNodes
 * @param {Field} keyHashOrKeyField
 * @param {Field} valueHashOrValueField
 * @param {Hasher} [hasher=Poseidon.hash]
 * @return {*}  {Field}
 */
declare function computeRootByFieldInCircuit(sideNodes: Field[], keyHashOrKeyField: Field, valueHashOrValueField: Field, hasher?: Hasher): Field;
