import { paraCentimetros } from './paraCentimetros.pipe';

describe('TraduzAlturaPipe', () => {
  it('create an instance', () => {
    const pipe = new paraCentimetros();
    expect(pipe).toBeTruthy();
  });
});
