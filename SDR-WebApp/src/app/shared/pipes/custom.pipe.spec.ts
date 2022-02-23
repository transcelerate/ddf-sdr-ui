import { TestBed } from '@angular/core/testing';
import { CustomPipe } from './custom.pipe';

describe('CustomPipe', () => {
  let pipe: CustomPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CustomPipe] });
    pipe = TestBed.inject(CustomPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'sampleData';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('Sample Data');
  });
});
