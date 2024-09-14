import addOddNumbersFromList from '../exercise_2';

describe('addOddNumbersFromList', () => {
  describe('addOddNumbers with happy-path', () => {
    it('should sum only odd numbers from the list', () => {
      const result = addOddNumbersFromList([1, 2, 3, 4, 5, 6, 7, 8, -1]);
      expect(result).toBe(15); // 1 + 3 + 5 + 7 - 1 = 16
    });

    it('should handle a list with only odd numbers', () => {
      const result = addOddNumbersFromList([1, 3, 5, 7, -1]);
      expect(result).toBe(15); // 1 + 3 + 5 + 7 - 1 = 15
    });

    it('should handle a list with only even numbers', () => {
      const result = addOddNumbersFromList([2, 4, 6, 8, 10]);
      expect(result).toBe(0); // No odd numbers, sum is 0
    });
  });
  describe('addOddNumbers with edge-cases', () => {
    it('should handle an empty list', () => {
      const result = addOddNumbersFromList([]);
      expect(result).toBe(0); // No numbers to add, sum is 0
    });

    it('should handle a list with a single odd number', () => {
      const result = addOddNumbersFromList([5]);
      expect(result).toBe(5); // Only one odd number
    });

    it('should handle a list with a single even number', () => {
      const result = addOddNumbersFromList([4]);
      expect(result).toBe(0); // No odd numbers, sum is 0
    });

    it('should handle a list with negative odd numbers', () => {
      const result = addOddNumbersFromList([-1, -3, -5]);
      expect(result).toBe(-9); // -1 + (-3) + (-5) = -9
    });

    it('should handle a mix of large positive and negative numbers', () => {
      const result = addOddNumbersFromList([1000001, -1000001, 3, -3]);
      expect(result).toBe(0); // 1000001 + (-1000001) + 3 + (-3) = 0
    });

    it('should handle a list with small numbers including zero', () => {
      const result = addOddNumbersFromList([-1, 0, 1, 2]);
      expect(result).toBe(0); // -1 + 1 = 0
    });
  });

  describe('addOddNumbersFromList with Decimals', () => {
    it('should sum odd integers and include the integer part of odd decimals', () => {
      const result = addOddNumbersFromList([1.5, 2.3, 3, 4.6, 5]);
      expect(result).toBe(8); // 3 + 5 = 8 (decimals are ignored, odd integers summed)
    });
    it('should handle a list with all decimal numbers', () => {
      const result = addOddNumbersFromList([1.1, 2.2, 3.3]);
      expect(result).toBe(0); // No integers found, so result stays 0
    });
    it('should handle a list with decimals and a single odd integer', () => {
      const result = addOddNumbersFromList([0.5, 2.5, 1]);
      expect(result).toBe(1); // 1 is the only odd integer
    });
    it('should handle a list with mixed decimals and negative odd integers', () => {
      const result = addOddNumbersFromList([-1.1, -2.2, -3, 4.4, -5]);
      expect(result).toBe(-8); // -3 + (-5) = -8 (decimals are ignored, odd integers summed)
    });
    it('should handle a list with zero and decimal numbers', () => {
      const result = addOddNumbersFromList([0, 0.5, 2.2, 3.0]);
      expect(result).toBe(3); // 3.0 is considered as integer 3
    });
  });

  describe('addOddNumbersFromList with BIG numbers', () => {
    it('should handle bigINT numbers', () => {
      BigInt('9999999999991');
      BigInt('999999999999');
      const result = addOddNumbersFromList([Number(BigInt('9999999999991')), Number(BigInt('9999999999993')), 2]);

      expect(result).toBe(Number(BigInt('9999999999991')) + Number(BigInt(9999999999993)));
    });
    it('should handle bigINT numbers', () => {
      BigInt('9999999999991');
      BigInt('999999999999');
      const result = addOddNumbersFromList([Number(BigInt('9999999999991')), Number(BigInt('9999999999993')), 2]);

      expect(result).toBe(Number(BigInt('9999999999991')) + Number(BigInt(9999999999993)));
    });
    it('should handle max-integer numbers', () => {
      const desiredResult = Number(BigInt(Number.MAX_SAFE_INTEGER)) + Number(BigInt(Number.MAX_SAFE_INTEGER));
      BigInt('9999999999991');
      BigInt('999999999999');
      const result = addOddNumbersFromList([
        Number(BigInt(Number.MAX_SAFE_INTEGER)),
        Number(BigInt(Number.MAX_SAFE_INTEGER)),
        2,
      ]);

      expect(result).toBe(desiredResult);
    });
  });
});
