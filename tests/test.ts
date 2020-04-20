import { chunkStartsAt, getPotentialPlacements } from "../src/utils"
import { FILLED, EMPTY } from "../src/store/types"

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