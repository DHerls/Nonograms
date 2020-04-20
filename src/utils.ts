import { FILLED } from "./store/types";

const boardToChunks = (segment: string[]): number[] => {
    let length = 0;
    const chunks = [];
    for (let i = 0; i < segment.length; i++) {
        if (segment[i] == FILLED) {
            length++;
        } else if (length > 0) {
            chunks.push(length);
            length = 0;
        }
    }
    if (length > 0) {
        chunks.push(length);
    }
    return chunks;
}

export const getSingleLineSoveState = (hints: number[], ranges: number[][], line: string[]): boolean[] => {
    const chunks = boardToChunks(line);
    if (arraysEqual(hints, chunks)) {
        return hints.map(() => true);
    }

    return hints.map((hint, index) => blockHasExclusivePlacement(hints, ranges, index, line))

    return hints.map(() => false);
}

export const arraysEqual = (arr1: any[], arr2: any[]) : boolean => {
    if (arr1.length !== arr2.length){
        return false
    }
    for (let i = 0; i < arr1.length; i++){
        if (arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true;
}

/**
 * For each hint, return a range of valid start values
 * 
 * @param hints Array of hints for a row or column
 * @param maxLength The length of the row or column
 */
export const findSolutionRanges = (hints: number[], maxLength: number): number[][] => {
    let lastSquare = 0;
    const solutionRanges: number[][] = []
    for (let i = 0; i < hints.length; i++) {
        solutionRanges.push([lastSquare]);
        lastSquare = lastSquare + hints[i] + 1;
    }
    const diff = maxLength - lastSquare + 1;
    for (let i = 0; i < hints.length; i++) {
        solutionRanges[i].push(solutionRanges[i][0] + diff);
    }
    return solutionRanges;
}

/**
 * 
 * Return whether a chunk of length l starts at index i in line
 * 
 * @param start Potential starting location of chunk
 * @param length Length of the chunk
 * @param line Partially filled line from game board
 */
export const chunkStartsAt = (start: number, length: number, line: string[]) : boolean => {
    
    if (start > 0 && line[start-1] == FILLED){
        return false;
    }
    
    if (start + length > line.length) {
        return false;
    }

    if (start + length < line.length && line[start + length] == FILLED){
        return false;
    }

    for (let i = start; i < start + length; i++){
        if (line[i] != FILLED) {
            return false;
        }
    }

    return true;

}

/**
 * 
 * Return a list of chunks of a given length within the line that start within the given range
 * 
 * @param start First location to search for chunks (inclusive)
 * @param end Last location to search for chunks (inclusive)
 * @param length Length of chunks to search for
 * @param line Partially filled line from game board
 */
export const getPotentialPlacements = (start: number, end: number, length: number, line: string[]) : number[] => {
    const placements = [];
    for (let i = start; i <= end; i++){
        if (chunkStartsAt(i, length, line)){
            placements.push(i);
            i += length;
        }
    }
    return placements;
}


export const blockHasExclusivePlacement = (hints: number[], ranges: number[][], hintIndex: number, line: string[]) : boolean => {
    const placements = getPotentialPlacements(ranges[hintIndex][0], ranges[hintIndex][1], hints[hintIndex], line);
    return placements.length === 1;
}
