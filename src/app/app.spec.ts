import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the business landing page', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('cleaner future.');
    expect(compiled.textContent).toContain('Billion Miles');
    expect(compiled.textContent).toContain('JioThings');
    expect(compiled.querySelector('.brand-mark')?.getAttribute('src')).toBe('/billion-logo.png');
    expect(compiled.querySelectorAll('.solution-card')).toHaveLength(6);
    expect(compiled.textContent).toContain('Highway charging hub stations');
    expect(compiled.textContent).toContain('Community chargers');
    expect(compiled.textContent).toContain('Corporate office chargers');
    expect(compiled.textContent).toContain('Solar inverters');
    expect(compiled.textContent).toContain('Solar PV modules');
    expect(compiled.textContent).toContain('Power transformers');
    expect(compiled.querySelectorAll('.product-partner')).toHaveLength(3);
    expect(compiled.querySelectorAll('.director-card')).toHaveLength(3);
    expect(compiled.querySelectorAll('.vision-label')).toHaveLength(3);
    expect(compiled.textContent).toContain('Director of the Company');
    expect(compiled.textContent).toContain('Sunil Dhaiya');
    expect(compiled.textContent).toContain('Mohit Choudhary');
    expect(compiled.textContent).toContain('Darpan Bhavsar');
    expect(compiled.querySelector('#gallery')).toBeNull();
    expect(compiled.textContent).not.toContain('Aries');
    expect(compiled.textContent).not.toContain('Voltis');
    expect(compiled.textContent).not.toContain('String & central');
    expect(compiled.textContent).toContain('Leadership & directorship');
    expect(compiled.textContent).toContain('Contact Us');
    expect(compiled.textContent).toContain('+91 77388 96005');
    expect(compiled.textContent).toContain('info@billioncompany.in');
    const partnerLogos = compiled.querySelectorAll<HTMLImageElement>('.partner-logo');
    expect(partnerLogos).toHaveLength(8);
    expect(Array.from(partnerLogos, (image) => image.alt)).toEqual([
      'Jio logo',
      'Jio-BP logo',
      'Schindler logo',
      'OMAXE logo',
      'Synergys wordmark',
      'Fortis logo',
      'ACE Group logo',
      'Atul logo',
    ]);
    expect(compiled.querySelector('.solution-card img[alt="Wall-mounted solar inverters and energy storage equipment"]')?.getAttribute('src')).toBe('/solar-inverter.jpg');
    expect(compiled.querySelector('.solution-card img[alt="Large power transformer at an electrical substation"]')?.getAttribute('src')).toBe('/power-transformers.jpg');
    expect(compiled.querySelector('.hero-visual img')?.getAttribute('src')).toBe('/ev-charging-feature.jpg');
    expect(compiled.textContent).not.toContain('Home charging');
    expect(compiled.textContent).not.toContain('Residential Homes');
    expect(compiled.textContent).not.toContain('Land & Plots');
  });
});
