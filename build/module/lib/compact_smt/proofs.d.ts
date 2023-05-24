import { Field, Provable } from 'snarkyjs';
import { Hasher } from '../model';
export { CompactSparseMerkleProof, CSMTUtils };
export type { CSparseCompactMerkleProof };
declare const CompactSparseMerkleProof_base: (new (value: {
    sideNodes: Field[];
    nonMembershipLeafData: Field[];
    siblingData: Field[];
    root: Field;
}) => {
    sideNodes: Field[];
    nonMembershipLeafData: Field[];
    siblingData: Field[];
    root: Field;
}) & {
    _isStruct: true;
} & import("snarkyjs/dist/node/snarky").ProvablePure<{
    sideNodes: Field[];
    nonMembershipLeafData: Field[];
    siblingData: Field[];
    root: Field;
}> & {
    toInput: (x: {
        sideNodes: Field[];
        nonMembershipLeafData: Field[];
        siblingData: Field[];
        root: Field;
    }) => {
        fields?: Field[] | undefined;
        packed?: [Field, number][] | undefined;
    };
    toJSON: (x: {
        sideNodes: Field[];
        nonMembershipLeafData: Field[];
        siblingData: Field[];
        root: Field;
    }) => {
        sideNodes: string[];
        nonMembershipLeafData: string[];
        siblingData: string[];
        root: string;
    };
    fromJSON: (x: {
        sideNodes: string[];
        nonMembershipLeafData: string[];
        siblingData: string[];
        root: string;
    }) => {
        sideNodes: Field[];
        nonMembershipLeafData: Field[];
        siblingData: Field[];
        root: Field;
    };
};
/**
 * Proof for compact sparse merkle tree
 *
 * @class CompactSparseMerkleProof
 * @extends {Struct({
 *   sideNodes: Circuit.array(Field, CSMT_DEPTH),
 *   nonMembershipLeafData: Circuit.array(Field, 3),
 *   siblingData: Circuit.array(Field, 3),
 *   root: Field,
 * })}
 */
declare class CompactSparseMerkleProof extends CompactSparseMerkleProof_base {
    constructor(value: {
        sideNodes: Field[];
        nonMembershipLeafData: Field[];
        siblingData: Field[];
        root: Field;
    });
}
/**
 * SparseCompactMerkleProof for compact sparse merkle tree
 *
 * @interface CSparseCompactMerkleProof
 */
interface CSparseCompactMerkleProof {
    sideNodes: Field[];
    nonMembershipLeafData: Field[];
    bitMask: Field;
    numSideNodes: number;
    siblingData: Field[];
    root: Field;
}
/**
 * Collection of utility functions for compact sparse merkle tree
 *
 * @class CSMTUtils
 */
declare class CSMTUtils {
    /**
     * Verify Compact Proof for Compact Sparse Merkle Tree
     *
     * @static
     * @template K
     * @template V
     * @param {CSparseCompactMerkleProof} cproof
     * @param {Field} expectedRoot
     * @param {K} key
     * @param {Provable<K>} keyType
     * @param {V} [value]
     * @param {Provable<V>} [valueType]
     * @param {{ hasher: Hasher; hashKey: boolean; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashKey: true,
     *       hashValue: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash; hashKey:
     * whether to hash the key, the default is true; hashValue: whether to hash the value,
     * the default is true.
     * @return {*}  {boolean}
     * @memberof CSMTUtils
     */
    static verifyCompactProof<K, V>(cproof: CSparseCompactMerkleProof, expectedRoot: Field, key: K, keyType: Provable<K>, value?: V, valueType?: Provable<V>, options?: {
        hasher: Hasher;
        hashKey: boolean;
        hashValue: boolean;
    }): boolean;
    /**
     * Verify a merkle proof, return result and updates.
     *
     * @static
     * @template K
     * @template V
     * @param {CompactSparseMerkleProof} proof
     * @param {Field} expectedRoot
     * @param {K} key
     * @param {Provable<K>} keyType
     * @param {V} [value]
     * @param {Provable<V>} [valueType]
     * @param {{ hasher: Hasher; hashKey: boolean; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashKey: true,
     *       hashValue: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash; hashKey:
     * whether to hash the key, the default is true; hashValue: whether to hash the value,
     * the default is true.
     * @return {*}  {({
     *     ok: boolean;
     *     updates: [Field, Field[]][] | null;
     *   })}
     * @memberof CSMTUtils
     */
    static verifyProofWithUpdates<K, V>(proof: CompactSparseMerkleProof, expectedRoot: Field, key: K, keyType: Provable<K>, value?: V, valueType?: Provable<V>, options?: {
        hasher: Hasher;
        hashKey: boolean;
        hashValue: boolean;
    }): {
        ok: boolean;
        updates: [Field, Field[]][] | null;
    };
    /**
     * Returns true if the value is in the tree and it is at the index from the key
     *
     * @static
     * @template K
     * @template V
     * @param {CompactSparseMerkleProof} proof
     * @param {Field} expectedRoot
     * @param {K} key
     * @param {Provable<K>} keyType
     * @param {V} [value]
     * @param {Provable<V>} [valueType]
     * @param {{ hasher: Hasher; hashKey: boolean; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashKey: true,
     *       hashValue: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash; hashKey:
     * whether to hash the key, the default is true; hashValue: whether to hash the value,
     * the default is true.
     * @return {*}  {boolean}
     * @memberof CSMTUtils
     */
    static checkMemebership<K, V>(proof: CompactSparseMerkleProof, expectedRoot: Field, key: K, keyType: Provable<K>, value?: V, valueType?: Provable<V>, options?: {
        hasher: Hasher;
        hashKey: boolean;
        hashValue: boolean;
    }): boolean;
    /**
     * Returns true if there is no value at the index from the key
     *
     * @static
     * @template K
     * @template V
     * @param {CompactSparseMerkleProof} proof
     * @param {Field} expectedRoot
     * @param {K} key
     * @param {Provable<K>} keyType
     * @param {{ hasher: Hasher; hashKey: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashKey: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash;
     * hashKey: whether to hash the key, the default is true
     * @return {*}  {boolean}
     * @memberof CSMTUtils
     */
    static checkNonMemebership<K, V>(proof: CompactSparseMerkleProof, expectedRoot: Field, key: K, keyType: Provable<K>, options?: {
        hasher: Hasher;
        hashKey: boolean;
    }): boolean;
    /**
     * Verify Proof of Compact Sparse Merkle Tree
     *
     * @static
     * @template K
     * @template V
     * @param {CompactSparseMerkleProof} proof
     * @param {Field} root
     * @param {K} key
     * @param {Provable<K>} keyType
     * @param {V} [value]
     * @param {Provable<V>} [valueType]
     * @param {{ hasher: Hasher; hashKey: boolean; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashKey: true,
     *       hashValue: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash; hashKey:
     * whether to hash the key, the default is true; hashValue: whether to hash the value,
     * the default is true.
     * @return {*}  {boolean}
     * @memberof CSMTUtils
     */
    static verifyProof<K, V>(proof: CompactSparseMerkleProof, root: Field, key: K, keyType: Provable<K>, value?: V, valueType?: Provable<V>, options?: {
        hasher: Hasher;
        hashKey: boolean;
        hashValue: boolean;
    }): boolean;
    /**
     * Compact proof Of Compact Sparse Merkle Tree
     *
     * @static
     * @param {CompactSparseMerkleProof} proof
     * @param {Hasher} [hasher=Poseidon.hash]
     * @return {*}  {CSparseCompactMerkleProof}
     * @memberof CSMTUtils
     */
    static compactProof(proof: CompactSparseMerkleProof, hasher?: Hasher): CSparseCompactMerkleProof;
    /**
     * Decompact compact proof of Compact Sparse Merkle Tree
     *
     * @static
     * @param {CSparseCompactMerkleProof} proof
     * @param {Hasher} [hasher=Poseidon.hash]
     * @return {*}  {CompactSparseMerkleProof}
     * @memberof CSMTUtils
     */
    static decompactProof(proof: CSparseCompactMerkleProof, hasher?: Hasher): CompactSparseMerkleProof;
}
