import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionParticipationPromptsComponent } from './session-participation-prompts.component';

describe('SessionParticipationPromptsComponent', () => {
  let component: SessionParticipationPromptsComponent;
  let fixture: ComponentFixture<SessionParticipationPromptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionParticipationPromptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionParticipationPromptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
