import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionParticipationChatComponent } from './session-participation-chat.component';

describe('SessionParticipationChatComponent', () => {
  let component: SessionParticipationChatComponent;
  let fixture: ComponentFixture<SessionParticipationChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionParticipationChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionParticipationChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
