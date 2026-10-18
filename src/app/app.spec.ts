import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { afterEach, vi } from 'vitest';

afterEach(() => vi.restoreAllMocks());

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
    expect(compiled.querySelector('.solution-card img[alt="Jio smart EV charger installed beside an electric vehicle"]')?.getAttribute('src')).toBe('/community-chargers.webp');
    expect(compiled.querySelector('.solution-card img[alt="Electric vehicle plugged in at a highway charging station"]')?.getAttribute('src')).toBe('/highway-charging-hub.jpg');
    expect(compiled.querySelector('.solution-card img[alt="Electric vehicle charging at a modern workplace"]')?.getAttribute('src')).toBe('/corporate-office-charger.jpg');
    expect(compiled.querySelectorAll('.director-card')).toHaveLength(3);
    const directorImages = compiled.querySelectorAll<HTMLImageElement>('.director-image');
    expect(Array.from(directorImages, (image) => image.getAttribute('src'))).toEqual([
      '/sunil-optimized.jpg',
      '/mohit-optimized.jpg',
      '/darpan-optimized.jpg',
    ]);
    expect(Array.from(directorImages, (image) => image.getAttribute('loading'))).toEqual(['lazy', 'lazy', 'lazy']);
    expect(Array.from(directorImages, (image) => image.alt)).toEqual([
      'Sunil Dahiya',
      'Mohit Choudhary',
      'Darpan Bhavsar',
    ]);
    expect(compiled.querySelectorAll('.vision-label')).toHaveLength(3);
    expect(compiled.querySelectorAll('.director-contact a')).toHaveLength(6);
    expect(compiled.textContent).toContain('Director of the Company');
    expect(compiled.textContent).toContain('Sunil Dahiya');
    expect(compiled.textContent).toContain('Mohit Choudhary');
    expect(compiled.textContent).toContain('Darpan Bhavsar');
    expect(compiled.querySelector('a[href="tel:+919717112334"]')?.textContent).toContain('+919717112334');
    expect(compiled.querySelector('a[href="mailto:mohit.choudhary@billioncompany.in"]')?.textContent).toContain('mohit.choudhary@billioncompany.in');
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

  it('sends the contact form fields using the mailer service contract', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.querySelector<HTMLInputElement>('[name="name"]')!.value = 'Nitin Sharma';
    form.querySelector<HTMLInputElement>('[name="email"]')!.value = 'nitin.sharma@globalsoltech.in';
    form.querySelector<HTMLSelectElement>('[name="service"]')!.value = 'EV charging';
    form.querySelector<HTMLTextAreaElement>('[name="message"]')!.value = 'Hello';

    const event = new Event('submit');
    Object.defineProperty(event, 'target', { value: form });
    await fixture.componentInstance.sendContact(event);

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://billion-miles-mailer-60092344629.catalystserverless.in/server/billion_mailer_function/send',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Nitin Sharma',
          email: 'nitin.sharma@globalsoltech.in',
          message: 'Hello',
          service: 'EV charging',
        }),
      },
    );
    expect(fixture.componentInstance.contactStatus()).toBe('success');
  });
});
