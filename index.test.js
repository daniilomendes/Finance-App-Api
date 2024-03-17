const sum = (a, b) => {
    return a + b
}

describe('sum function', () => {
    it('should sum two numbers correctly', () => {
        // arrange
        const a = 2
        const b = 2

        // act
        const result = sum(a, b)

        // assert
        expect(result).toBe(4)
    })

    test('should not return null or undefined', () => {
        // arrange
        const a = 2
        const b = 2

        // act
        const result = sum(a, b)

        // assert
        expect(result).not.toBeUndefined()
        expect(result).not.toBeNull()
    })
})
