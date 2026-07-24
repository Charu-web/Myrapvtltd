export const mockBooking = {
  id: 'bk_2451',
  eventName: 'TechCorp Annual Retreat',
  eventType: 'Corporate Buffet',
  date: 'Oct 24, 2026',
  time: '10:00 AM',
  image: '',
  guestCount: 150,
  venue: '123 Business Way, Suite 500, Metropolis, NY 10001',
  instructions:
    'Loading dock access required for delivery vehicles. Contact security upon arrival.',
  selectedPackage: {
    name: 'Corporate Bites',
    description: "Selection of hors d'oeuvres with light refreshments.",
    image: '',
    pricePerGuest: 30,
  },
  customOptions: [
    { id: 1, name: 'Add Vegan Dessert Platter', price: 250, selected: true },
    { id: 2, name: 'Premium Beverage Upgrade', price: 450, selected: true },
    { id: 3, name: 'Live Chef Carving Station', price: 600, selected: false },
    { id: 4, name: 'Floral Centerpiece Package', price: 320, selected: false },
  ],
}
