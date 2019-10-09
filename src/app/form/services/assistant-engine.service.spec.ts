import { TestBed } from '@angular/core/testing';

import { AssistantEngineService } from './assistant-engine.service';

describe('AssistantEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssistantEngineService = TestBed.get(AssistantEngineService);
    expect(service).toBeTruthy();
  });
});
