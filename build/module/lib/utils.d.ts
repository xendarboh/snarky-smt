import { Bool, Field, Provable } from 'snarkyjs';
export { createEmptyValue, fieldToHexString, hexStringToField, strToFieldArry, countCommonPrefix, countSetBits, printBits, };
/**
 * Create a empty value for a Struct Type
 *
 * @template T
 * @param {Provable<T>} valueType
 * @return {*}  {T}
 */
declare function createEmptyValue<T>(valueType: Provable<T>): T;
/**
 * Convert field to hex string.
 *
 * @param {Field} f
 * @return {*}  {string}
 */
declare function fieldToHexString(f: Field): string;
/**
 * Convert hex strong to field.
 *
 * @param {string} hexStr
 * @return {*}  {Field}
 */
declare function hexStringToField(hexStr: string): Field;
/**
 * Convert a string to Field array.
 *
 * @param {string} str
 * @return {*}  {Field[]}
 */
declare function strToFieldArry(str: string): Field[];
declare function countCommonPrefix(data1bits: Bool[], data2bits: Bool[]): number;
declare function countSetBits(data: Bool[]): number;
/**
 * Print bits string.
 *
 * @param {Bool[]} data
 */
declare function printBits(data: Bool[], varName?: string): void;
