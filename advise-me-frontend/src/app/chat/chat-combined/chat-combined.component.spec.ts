import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCombinedComponent } from './chat-combined.component';

describe('ChatCombinedComponent', () => {
  let component: ChatCombinedComponent;
  let fixture: ComponentFixture<ChatCombinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCombinedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCombinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
