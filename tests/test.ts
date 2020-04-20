import { chunkStartsAt, getPotentialPlacements, hintsCanBeSatisfied, blockHasExclusivePlacement, findSolutionRanges } from "../src/utils"
import { FILLED, EMPTY, BLOCKED } from "../src/store/types"

describe('chunkStartsAt', () => {
    it('should return true when things go right', () => {
        expect(chunkStartsAt(0, 1, [FILLED])).toBeTrue();
        expect(chunkStartsAt(0, 1, [FILLED, EMPTY])).toBeTrue();
        expect(chunkStartsAt(1, 1, [EMPTY, FILLED])).toBeTrue();
        expect(chunkStartsAt(0, 2, [FILLED, FILLED])).toBeTrue();
        expect(chunkStartsAt(2, 1, [FILLED, EMPTY, FILLED])).toBeTrue();
    });

    it("should return false when the previous square is filled", () => {
        expect(chunkStartsAt(1, 1, [FILLED, FILLED])).toBeFalse();
        expect(chunkStartsAt(1, 1, [FILLED, FILLED, EMPTY])).toBeFalse();
    });

    it("should return false when the subsequent square is filled", () => {
        expect(chunkStartsAt(0, 1, [FILLED, FILLED])).toBeFalse();
        expect(chunkStartsAt(1, 1, [EMPTY, FILLED, FILLED])).toBeFalse();
    });

    it("should return false when the chunk is not filled", () => {
        expect(chunkStartsAt(0, 1, [EMPTY])).toBeFalse();
        expect(chunkStartsAt(0, 2, [FILLED])).toBeFalse();
    })
});

describe("getPotentialPlacements", () => {
    it("Should return the start of chunks in the range", () => {
        expect(getPotentialPlacements(0, 1, 1, [FILLED, EMPTY])).toEqual([0]);
        expect(getPotentialPlacements(0, 1, 1, [EMPTY, FILLED])).toEqual([1]);
        expect(getPotentialPlacements(0, 1, 1, [EMPTY, EMPTY])).toEqual([]);
        expect(getPotentialPlacements(0, 1, 1, [FILLED, FILLED])).toEqual([]);
        expect(getPotentialPlacements(0, 2, 1, [FILLED, EMPTY, FILLED])).toEqual([0, 2]);
    })
});

describe("hintsCanBeSatisfied", () => {
    it("Should return true", () => {
        expect(hintsCanBeSatisfied([1], 0, 0, [EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([1], 0, 0, [FILLED])).toBeTrue();
        expect(hintsCanBeSatisfied([1], 0, 1, [BLOCKED, EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([1], 1, 1, [BLOCKED, EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([2], 0, 1, [EMPTY, EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([2], 0, 1, [FILLED, EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([2], 0, 1, [FILLED, FILLED])).toBeTrue();
        expect(hintsCanBeSatisfied([2], 0, 2, [BLOCKED, EMPTY, EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([2], 0, 2, [EMPTY, FILLED, FILLED])).toBeTrue();
        expect(hintsCanBeSatisfied([1, 1], 0, 2, [EMPTY, EMPTY, EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([1, 1], 0, 2, [EMPTY, BLOCKED, EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([1, 2], 0, 3, [EMPTY, EMPTY, EMPTY, EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([2, 2], 0, 4, [EMPTY, EMPTY, BLOCKED, EMPTY, EMPTY])).toBeTrue();
        expect(hintsCanBeSatisfied([2, 2], 0, 4, [FILLED, EMPTY, BLOCKED, EMPTY, FILLED])).toBeTrue();
        expect(hintsCanBeSatisfied([1, 2], 0, 7, [BLOCKED, BLOCKED, EMPTY, BLOCKED, EMPTY, BLOCKED, EMPTY, EMPTY])).toBeTrue();
    });
    it("Should return false", () => {
        expect(hintsCanBeSatisfied([1], 0, 0, [BLOCKED])).toBeFalse();
        expect(hintsCanBeSatisfied([1], 0, 0, [BLOCKED, EMPTY])).toBeFalse();
        expect(hintsCanBeSatisfied([2], 0, 1, [BLOCKED, EMPTY])).toBeFalse();
        expect(hintsCanBeSatisfied([2], 0, 0, [EMPTY])).toBeFalse();
        expect(hintsCanBeSatisfied([2], 0, 1, [EMPTY, BLOCKED])).toBeFalse();
        expect(hintsCanBeSatisfied([2], 0, 1, [FILLED, BLOCKED])).toBeFalse();
        expect(hintsCanBeSatisfied([1, 1], 0, 1, [EMPTY, EMPTY])).toBeFalse();
        expect(hintsCanBeSatisfied([1, 2], 0, 2, [FILLED, EMPTY, FILLED])).toBeFalse();
        expect(hintsCanBeSatisfied([1, 2], 0, 2, [FILLED, EMPTY, EMPTY])).toBeFalse();
        expect(hintsCanBeSatisfied([2, 2], 0, 3, [EMPTY, EMPTY, BLOCKED, EMPTY])).toBeFalse();
    })
});

describe("blockHasExclusivePlacement", () => {
    it("Should return True", () => {
        expect(blockHasExclusivePlacement([1], findSolutionRanges([1], 2), 0, [FILLED, EMPTY])).toBeTrue();
        expect(blockHasExclusivePlacement([1], findSolutionRanges([1], 2), 0, [EMPTY, FILLED])).toBeTrue();
        expect(blockHasExclusivePlacement([2], findSolutionRanges([2], 2), 0, [FILLED, FILLED])).toBeTrue();
        expect(blockHasExclusivePlacement([3, 1], findSolutionRanges([3, 1], 6), 1, [EMPTY, EMPTY, EMPTY, EMPTY, FILLED, EMPTY])).toBeTrue();
    });
    it("Should return False", () => {
        expect(blockHasExclusivePlacement([1], findSolutionRanges([1], 2), 0, [FILLED, FILLED])).toBeFalse();
        expect(blockHasExclusivePlacement([2], findSolutionRanges([2], 2), 0, [FILLED, EMPTY])).toBeFalse();
    });
    it("Complex fuckery", () => {
        expect(blockHasExclusivePlacement([2, 2, 2], findSolutionRanges([2, 2, 2], 10), 0, [FILLED, FILLED, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY])).toBeTrue();
        expect(blockHasExclusivePlacement([2, 2, 2], findSolutionRanges([2, 2, 2], 10), 0, [EMPTY, FILLED, FILLED, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY])).toBeTrue();
        expect(blockHasExclusivePlacement([2, 2, 2], findSolutionRanges([2, 2, 2], 10), 1, [FILLED, FILLED, EMPTY, FILLED, FILLED, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY])).toBeTrue();
        expect(blockHasExclusivePlacement([2, 2, 2], findSolutionRanges([2, 2, 2], 15), 1, [FILLED, FILLED, EMPTY, FILLED, FILLED, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY])).toBeTrue();
    })
})