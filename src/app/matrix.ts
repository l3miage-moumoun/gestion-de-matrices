/**
 * Vector interface, N elements of type T
 */
export interface Vector<T, N extends number> extends Iterable<T> {
  readonly length: N;
  at(i: number): T | undefined;
  map<U>(f: (v: T, i: number) => U): Vector<U, N>;
  reduce<U>(f: (acc: U, v: T, i: number) => U, initialValue: U): U;
}

/**
* Extract the size type of a Vector
*/
type VECTOR_SIZE<T> = T extends Vector<unknown, infer N> ? N : never;

/**
* Scalar product of two vectors of the same size
* @param V1 Vector 1, size N
* @param V2 Vector 2, size N
* @returns the scalar product V1 . V2
*/
export function ScalarProduct<T extends Vector<number, number>>(V1: T, V2: Vector<number, VECTOR_SIZE<typeof V1>>): number {
  return V1.reduce( (S, x, i) => S + x * V2.at(i)!, 0);
}

/**
 * Matrix interface, L lines, C columns, based on a L-vector of C-vectors
 */
export interface Matrix<T, L extends number, C extends number> extends Vector<Vector<T, C>, L> {}

/**
 * Extract the number of lines types of a Matrix
 */
export type NbLines  <T> = T extends Matrix<unknown, infer N, number> ? N : never;
export type NbColumns<T> = T extends Matrix<unknown, number, infer N> ? N : never;


/**
 * Initialize a vector of length N with the value returned by fValue
 * @param fValue a function that returns the value of the vector at the given index
 * @param length the length of the vector to be initialized
 * @returns a vector of length N with the value returned by fValue
 */
export function initVector<T, N extends number>(fValue: (index: number) => T, length: N): Vector<T, N> {
  return Array.from( Array(length), (_, i) => fValue(i) ) as unknown as Vector<T, N>;
}

/**
 * Initialize a matrix of size nbLines x nbColumns with the value returned by fValue
 * @param fValue a function that returns the value of the matrix at the given indexes (i, j)
 * @param nbLines number of lines of the matrix to be initialized
 * @param nbColumns number of columns of the matrix to be initialized
 * @returns a matrix of size nbLines x nbColumns with the value returned by fValue
 */
export function initMatrix<T, L extends number, C extends number>(fValue: (i: number, j: number) => T, nbLines: L, nbColumns: C): Matrix<T, L, C> {
  return initVector( i => initVector( j => fValue(i, j), nbColumns), nbLines);
}

/**
 * Get the line i of the matrix M
 * @param M a matrix L x C
 * @param i the index of the line to be returned
 * @returns the vector of the line i of the matrix M
 */
export function getMatrixLine<T, L extends number, C extends number>(M: Matrix<T, L, C>, i: number): Vector<T, C> | undefined {
  return M.at(i);
}

/**
 * Get the column j of the matrix M
 * @param M a matrix L x C
 * @param j the index of the column to be returned
 * @returns the vector of the column j of the matrix M
 */
export function getMatrixColumn<T, L extends number, C extends number>(M: Matrix<T, L, C>, j: number): Vector<T, L> | undefined {
  return M.map( (_, i) => M.at(i)!.at(j)! );
}

/**
 * Initialize a matrix of size nbLines x nbColumns with random values between 0 and 9
 * @param nbLines number of lines of the matrix to be initialized
 * @param nbColumns number of columns of the matrix to be initialized
 * @returns a matrix of size nbLines x nbColumns with random values between 0 and 9
 */
export function initMatrixIntRandom<L extends number, C extends number>(nbLines: L, nbColumns: C): Matrix<number, L, C> {
  return initVector( i => initVector( j => (10*Math.random())|0, nbColumns), nbLines);
}

/**
 * Transpose a matrix (basically : swap lines and columns)
 * @param M a matrix L x C
 * @returns the transpose of the matrix M, a matrix C x L
 */
export function transpose<T, L extends number, C extends number>(M: Matrix<T, L, C>): Matrix<T, C, L> {
  return initMatrix( (i, j) => M.at(j)!.at(i)!, M.at(0)?.length ?? 0 as C, M.length);
}

/**
 * Add two matrixes of the same size
 * @param M1 First Matrix
 * @param M2 Second Matrix
 * @returns the sum of the two matrixes
 */
export function addIntMatrixes<L extends number, C extends number>(M1: Matrix<number, L, C>, M2: Matrix<number, NbLines<typeof M1>, NbColumns<typeof M1>>): Matrix<number, L, C> {
  return initMatrix( (i, j) => M1.at(i)!.at(j)! + M2.at(i)!.at(j)!, M1.length, M1.at(0)?.length ?? 0 as C);
}


/**
 * Multiply two matrixes, the first of size L x C, the second of size C x L
 * @param M1 First Matrix, size L x C
 * @param M2 Second Matrix, size C x L
 * @returns M1 x M2, a matrix of size L x L
 */
export function multiplyIntMatrixes<L extends number, C extends number>(M1: Matrix<number, L, C>, M2: Matrix<number, NbColumns<typeof M1>, NbLines<typeof M1>>): Matrix<number, L, L> {
  if (M1.length === 0) return [] as unknown as Matrix<number, L, L>;

  const M2t = transpose(M2);
  return initMatrix( (i, j) => ScalarProduct( M1.at(i)!, M2t.at(j)! ), M1.length, M1.length);
}


// const m1 = initMatrixIntRandom(3, 4);
// const m2 = initMatrixIntRandom(3, 4);
// const m3 = initMatrixIntRandom(4, 3);

// addIntMatrixes(m1, m2);
// addIntMatrixes(m1, m3);
// multiplyIntMatrixes(m1, m2);
// multiplyIntMatrixes(m1, m3);
// multiplyIntMatrixes(m3, m1);
