import { Field, Poseidon } from 'snarkyjs';
export { TreeHasher };
const emptyPrefix = Field(0);
const leafPrefix = Field(1);
const nodePrefix = Field(2);
/**
 * Tree Hasher
 *
 * @class TreeHasher
 * @template K
 * @template V
 */
class TreeHasher {
    /**
     * Creates an instance of TreeHasher.
     * @param {Provable<V>} keyType
     * @param {Provable<V>} valueType
     * @param {Hasher} [hasher=Poseidon.hash]
     * @memberof TreeHasher
     */
    constructor(hasher = Poseidon.hash, keyType, valueType) {
        this.hasher = hasher;
        this.keyType = keyType;
        this.valueType = valueType;
    }
    /**
     * Tree Hasher based on Poseidon.hash
     *
     * @static
     * @template K
     * @template V
     * @param {Provable<K>} keyType
     * @param {Provable<V>} valueType
     * @return {*}  {TreeHasher<K, V>}
     * @memberof TreeHasher
     */
    static poseidon(keyType, valueType) {
        return new TreeHasher(Poseidon.hash, keyType, valueType);
    }
    digestValue(value) {
        return this.hasher(this.valueType.toFields(value));
    }
    path(k) {
        return this.hasher(this.keyType.toFields(k));
    }
    getHasher() {
        return this.hasher;
    }
    digestLeaf(path, leafData) {
        const value = [leafPrefix, path, leafData];
        return {
            hash: this.hasher(value),
            value,
        };
    }
    parseLeaf(data) {
        return {
            path: data[1],
            leaf: data[2],
        };
    }
    isLeaf(data) {
        return data[0].equals(leafPrefix).toBoolean();
    }
    isEmptyData(data) {
        return data[0].equals(emptyPrefix).toBoolean();
    }
    isEmptyDataInCircuit(data) {
        return data[0].equals(emptyPrefix);
    }
    emptyData() {
        return [emptyPrefix, Field.zero, Field.zero];
    }
    digestNode(leftData, rightData) {
        const value = [nodePrefix, leftData, rightData];
        return {
            hash: this.hasher(value),
            value,
        };
    }
    parseNode(data) {
        return {
            leftNode: data[1],
            rightNode: data[2],
        };
    }
}
