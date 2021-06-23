import sum from './helper';

describe('Test sum helper', () => {
	it('should sum 10 + 10', () => {
		// when
		const result = sum(10, 10);

		// then
		expect(result).toEqual(20);
	});
});
