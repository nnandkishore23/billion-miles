import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly contactStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  readonly contactError = signal('');
  readonly interests = ['EV charging', 'Solar inverters', 'Solar PV modules', 'Power transformers', 'Other'];

  async sendContact(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      service: String(formData.get('service') ?? ''),
    };
    this.contactStatus.set('sending');
    this.contactError.set('');
    try {
      const response = await fetch('https://billion-miles-mailer-60092344629.development.catalystserverless.in/server/billion_mailer_function/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Message could not be sent (HTTP ${response.status}). Please try again.`);
      }
      form.reset();
      this.contactStatus.set('success');
    } catch (err) {
      this.contactError.set(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      this.contactStatus.set('error');
    }
  }

  readonly brandName = 'Billion Miles';
  readonly currentYear = new Date().getFullYear();
  readonly navItems = [
    { label: 'About', href: '#about' },
    { label: 'Product range', href: '#solutions' },
    { label: 'Directors', href: '#directorship' },
    { label: 'Contact Us', href: '#contact' },
  ];

  readonly highlights = [
    { value: 'Highway hubs', label: 'Fast, connected public charging' },
    { value: 'Community', label: 'Smart chargers for shared spaces' },
    { value: 'Corporate offices', label: 'Convenient workplace charging' },
  ];

  readonly solutions = [
    {
      category: 'Community charging',
      title: 'Community chargers',
      details: 'Smart & connected charging',
      description: 'Reliable shared chargers for residential communities, designed to make everyday charging more convenient.',
      icon: '▦',
      image: '/community-chargers.webp',
      alt: 'Jio smart EV charger installed beside an electric vehicle',
      partner: 'JioThings · TruePower',
    },
    {
      category: 'Highway charging',
      title: 'Highway charging hub stations',
      details: 'Commercial DC fast charging',
      description: 'Smart, connected fast-charging hubs for highway corridors, fleet depots, bus depots and public charging locations.',
      icon: '➜',
      image: '/highway-charging-hub.jpg',
      alt: 'Electric vehicle plugged in at a highway charging station',
      partner: 'JioThings · TruePower',
    },
    {
      category: 'Corporate charging',
      title: 'Corporate office chargers',
      details: 'Workplace charging solutions',
      description: 'Convenient EV charging for corporate offices, commercial workplaces, retail destinations and visitor parking.',
      icon: '↗',
      image: '/corporate-office-charger.jpg',
      alt: 'Electric vehicle charging at a modern workplace',
      partner: 'JioThings · TruePower',
    },
    {
      category: 'Solar inverters',
      title: 'Solar inverters',
      details: 'Commercial & utility-scale',
      description: 'Reliable energy conversion and inverter selection support tailored to project requirements and solar applications.',
      icon: 'ϟ',
      image: '/solar-inverter.jpg',
      alt: 'Wall-mounted solar inverters and energy storage equipment',
      partner: '',
    },
    {
      category: 'Solar panels & PV modules',
      title: 'Solar PV modules',
      details: 'For commercial & industrial projects',
      description: 'PV module supply and product coordination for solar EPCs, developers and industrial facilities.',
      icon: '▤',
      image: '/solar-pv-modules.jpg',
      alt: 'Solar PV panels at a utility-scale solar farm',
      partner: '',
    },
    {
      category: 'Power transformers',
      title: 'Power transformers',
      details: 'Solutions for growing energy needs',
      description: 'Dependable transformer solutions and coordination for industrial and infrastructure applications.',
      icon: '⌁',
      image: '/power-transformers.jpg',
      alt: 'Large power transformer at an electrical substation',
      partner: '',
    },
  ];

  readonly directors = [
    {
      name: 'Sunil Dahiya',
      vision: 'Make dependable clean-energy and mobility solutions more accessible to communities, businesses and industries.',
      phone: '+919717112334',
      email: 'sunil.dahiya@billioncompany.in',
    },
    {
      name: 'Mohit Choudhary',
      vision: 'Build trusted, future-ready infrastructure that helps accelerate India’s transition to smarter mobility.',
      phone: '+919896161511',
      email: 'mohit.choudhary@billioncompany.in',
    },
    {
      name: 'Darpan Bhavsar',
      vision: 'Connect technology, reliable products and customer-focused support to power a cleaner energy future.',
      phone: '+919510863030',
      email: 'darpan.bhavsar@billioncompany.in',
    },
  ];

  readonly trustedPartners = [
    { name: 'Jio', image: '/partner-logos/jio.png', alt: 'Jio logo' },
    { name: 'Jio-BP', image: '/partner-logos/jio-bp.png', alt: 'Jio-BP logo' },
    { name: 'Schindler', image: '/partner-logos/schindler.png', alt: 'Schindler logo' },
    { name: 'OMAXE', image: '/partner-logos/omaxe.webp', alt: 'OMAXE logo' },
    { name: 'Synergys', image: '/partner-logos/synergys.svg', alt: 'Synergys wordmark' },
    { name: 'Fortis', image: '/partner-logos/fortis.png', alt: 'Fortis logo' },
    { name: 'ACE Group', image: '/partner-logos/ace-group.webp', alt: 'ACE Group logo' },
    { name: 'Atul', image: '/partner-logos/atul.svg', alt: 'Atul logo' },
  ];

  readonly steps = [
    { number: '01', title: 'Smart technology', description: 'Modern, future-ready solutions for evolving energy needs.' },
    { number: '02', title: 'End-to-end support', description: 'Support from product selection through deployment and ongoing service.' },
    { number: '03', title: 'Reliable & safe', description: 'Certified products with advanced safety features for worry-free operation.' },
    { number: '04', title: 'Lower energy costs', description: 'Efficient solutions designed to help reduce operational and energy costs.' },
  ];
}
