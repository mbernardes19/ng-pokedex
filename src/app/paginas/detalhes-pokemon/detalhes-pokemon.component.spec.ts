import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPokemonComponent } from './detalhes-pokemon.component';

describe('DetalhesPokemonComponent', () => {
  let component: DetalhesPokemonComponent;
  let fixture: ComponentFixture<DetalhesPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
