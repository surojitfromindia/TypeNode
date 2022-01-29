it('each call must increase the count by 1', () => {
  const mockFun = jest.fn((x) => x);
  let vat = 0;
  function b(callback: (x: number) => number) {
    vat = vat + 1;
    callback(vat);
  }

  b(mockFun);
  b(mockFun);
  b(mockFun);

  expect(mockFun.mock.calls[0][0]).toBe(1);
  expect(mockFun.mock.calls[2][0]).toBe(3);
});
