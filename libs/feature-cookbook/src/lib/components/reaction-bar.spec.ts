import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, viewChild } from '@angular/core';
import { StorageService } from '@bmad-demo/shared-data';
import { ReactionBarComponent } from './reaction-bar';

class MockStorageService {
  getReactions() {
    return [];
  }
  toggleReaction(entryId: string, emoji: string) {
    return [{ emoji, count: 1, userReacted: true }];
  }
}

@Component({
  standalone: true,
  imports: [ReactionBarComponent],
  template: `<app-reaction-bar entryId="test-1" />`,
})
class TestHostComponent {
  readonly reactionBar = viewChild(ReactionBarComponent);
}

describe('ReactionBarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: StorageService, useClass: MockStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance.reactionBar()).toBeTruthy();
  });

  it('should have active:scale-95 class on reaction buttons for micro-interaction', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
    for (const button of buttons) {
      expect(button.classList.contains('active:scale-95')).toBe(true);
    }
  });

  it('should have motion-safe:transition-transform class on reaction buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    for (const button of buttons) {
      expect(button.classList.contains('motion-safe:transition-transform')).toBe(true);
    }
  });
});
