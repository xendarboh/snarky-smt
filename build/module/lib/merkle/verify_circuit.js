import { arrayProp, Circuit, Field, Poseidon } from 'snarkyjs';
import { EMPTY_VALUE } from '../constant';
import { BaseMerkleProof } from './proofs';
export { ProvableMerkleTreeUtils };
/**
 * Collection of utility functions for merkle tree in the circuit.
 *
 * @class ProvableMerkleTreeUtils
 */
class ProvableMerkleTreeUtils {
    /**
     * Create a meerkle proof circuit value type based on the specified tree height.
     *
     * @static
     * @param {number} height
     * @return {*}  {typeof BaseMerkleProof}
     * @memberof ProvableMerkleTreeUtils
     */
    static MerkleProof(height) {
        class MerkleProof_ extends BaseMerkleProof {
        }
        MerkleProof_.height = height;
        if (!MerkleProof_.prototype.hasOwnProperty('_fields')) {
            MerkleProof_.prototype._fields = [];
        }
        MerkleProof_.prototype._fields.push(['root', Field]);
        arrayProp(Field, height)(MerkleProof_.prototype, 'sideNodes');
        return MerkleProof_;
    }
    /**
     * Calculate new root based on index and value.
     *
     * @static
     * @template V
     * @param {BaseMerkleProof} proof
     * @param {Field} index
     * @param {V} value
     * @param {Provable<V>} valueType
     * @param {{ hasher?: Hasher; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashValue: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash;
     * hashValue: whether to hash the value, the default is true.
     * @return {*}  {Field}
     * @memberof ProvableMerkleTreeUtils
     */
    static computeRoot(proof, index, value, valueType, options = {
        hasher: Poseidon.hash,
        hashValue: true,
    }) {
        let hasher = Poseidon.hash;
        if (options.hasher !== undefined) {
            hasher = options.hasher;
        }
        let valueFields = valueType.toFields(value);
        let valueHashOrValueField = valueFields[0];
        if (options.hashValue) {
            valueHashOrValueField = hasher(valueFields);
        }
        return computeRootByFieldInCircuit(proof, index, valueHashOrValueField, hasher);
    }
    /**
     * Returns true if the value is in the tree and it is at the index from the key
     *
     * @static
     * @template V
     * @param {BaseMerkleProof} proof
     * @param {Field} expectedRoot
     * @param {Field} index
     * @param {V} value
     * @param {Provable<V>} valueType
     * @param {{ hasher?: Hasher; hashValue: boolean }} [options={
     *       hasher: Poseidon.hash,
     *       hashValue: true,
     *     }]  hasher: The hash function to use, defaults to Poseidon.hash;
     * hashValue: whether to hash the value, the default is true.
     * @return {*}  {Bool}
     * @memberof ProvableMerkleTreeUtils
     */
    static checkMembership(proof, expectedRoot, index, value, valueType, options = {
        hasher: Poseidon.hash,
        hashValue: true,
    }) {
        const currentRoot = this.computeRoot(proof, index, value, valueType, options);
        return expectedRoot.equals(currentRoot);
    }
    /**
     * Returns true if there is no value at the index from the key
     *
     * @static
     * @param {BaseMerkleProof} proof
     * @param {Field} expectedRoot
     * @param {Field} index
     * @param {Hasher} [hasher=Poseidon.hash]
     * @return {*}  {Bool}
     * @memberof ProvableMerkleTreeUtils
     */
    static checkNonMembership(proof, expectedRoot, index, hasher = Poseidon.hash) {
        const currentRoot = computeRootByFieldInCircuit(proof, index, EMPTY_VALUE, hasher);
        return expectedRoot.equals(currentRoot);
    }
}
/**
 * Empty value for merkle tree
 *
 * @static
 * @memberof ProvableMerkleTreeUtils
 */
ProvableMerkleTreeUtils.EMPTY_VALUE = EMPTY_VALUE;
function computeRootByFieldInCircuit(proof, index, valueHashOrValueField, hasher = Poseidon.hash) {
    let h = proof.height();
    let currentHash = valueHashOrValueField;
    const pathBits = index.toBits(h);
    for (let i = h - 1; i >= 0; i--) {
        let node = proof.sideNodes[i];
        let currentValue = Circuit.if(pathBits[i], [node, currentHash], [currentHash, node]);
        currentHash = hasher(currentValue);
    }
    return currentHash;
}
