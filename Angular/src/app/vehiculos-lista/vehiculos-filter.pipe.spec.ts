import { VehiculosFilterPipe } from './vehiculos-filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new VehiculosFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
