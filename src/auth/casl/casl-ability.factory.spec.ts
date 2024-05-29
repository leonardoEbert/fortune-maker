import { CaslAbilityFactory } from './casl-ability.factory';

describe('CaslAbilityFactory', () => {
  it('should be defined', () => {
    // @ts-expect-error temporary disabling error message
    expect(new CaslAbilityFactory()).toBeDefined();
  });
});
