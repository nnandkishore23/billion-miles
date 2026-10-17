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
    this.contactStatus.set('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
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
      image: 'https://images.unsplash.com/photo-1671785253964-bdb43087ed99?auto=format&fit=crop&w=900&q=85',
      alt: 'Electric vehicle connected to a community charging point',
      partner: 'JioThings · TruePower',
    },
    {
      category: 'Highway charging',
      title: 'Highway charging hub stations',
      details: 'Commercial DC fast charging',
      description: 'Smart, connected fast-charging hubs for highway corridors, fleet depots, bus depots and public charging locations.',
      icon: '➜',
      image: '/ev-charging-feature.jpg',
      alt: 'Electric vehicle plugged in at a highway charging station',
      partner: 'JioThings · TruePower',
    },
    {
      category: 'Corporate charging',
      title: 'Corporate office chargers',
      details: 'Workplace charging solutions',
      description: 'Convenient EV charging for corporate offices, commercial workplaces, retail destinations and visitor parking.',
      icon: '↗',
      image: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?auto=format&fit=crop&w=900&q=85',
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
      alt: 'Solar PV modules shown in the product brochure',
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
      name: 'Sunil Dhaiya',
      vision: 'Make dependable clean-energy and mobility solutions more accessible to communities, businesses and industries.',
    },
    {
      name: 'Mohit Choudhary',
      vision: 'Build trusted, future-ready infrastructure that helps accelerate India’s transition to smarter mobility.',
    },
    {
      name: 'Darpan Bhavsar',
      vision: 'Connect technology, reliable products and customer-focused support to power a cleaner energy future.',
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
