import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FiCheckCircle } from 'react-icons/fi';

const PROMISE = [
  {
    title: 'Ingredient Integrity',
    desc: 'Only real nuts, fruits and fine cocoa, with a touch of sweetness. No shortcuts, no artificial flavors.',
  },
  {
    title: 'Balanced Nutrition',
    desc: 'Every recipe is designed for flavorful satisfaction with mindful portions and quality fats.',
  },
  {
    title: 'Consistent Quality',
    desc: 'Small-batch craft and careful preparation for the texture and freshness you can trust every time.',
  },
];

const PROCESS = [
  { title: 'Roast & Prepare', desc: 'Nuts are carefully roasted and fruits are selected to preserve their natural texture and aroma.' },
  { title: 'Blend', desc: 'Ingredients are combined with balanced sweetness — nothing overpowers the natural flavor.' },
  { title: 'Pack', desc: 'Small-batch packaging locks in freshness — ready for gifting or your everyday treat.' },
];

const VALUES = [
  'Premium nuts and fruits',
  'Small-batch craftsmanship',
  'No artificial flavors or preservatives',
  'Balanced flavor and nutrition',
];

const About = () => {
  return (
    <div>
      <SEO
        title="About Us"
        description="Fruits & Nuts was born from a love of real ingredients — premium nuts, fruits and ethical cocoa. Learn our story, our process and our promise."
      />

      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white">
        <div className="container-x py-16 md:py-20 text-center">
          <p className="uppercase tracking-widest text-brand-200 text-sm font-semibold">Our Story</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Born from a love of real ingredients
          </h1>
          <p className="mt-4 text-brand-100 max-w-2xl mx-auto text-lg">
            Premium nuts, fruits, and ethical cocoa — no shortcuts, no artificial flavors.
          </p>
          <Link to="/products" className="btn bg-white text-brand-700 hover:bg-brand-50 mt-8 inline-flex">
            Explore Products
          </Link>
        </div>
      </section>

      <section className="container-x py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our Promise</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PROMISE.map((p) => (
            <div key={p.title} className="card p-6">
              <h3 className="font-semibold text-brand-700 text-lg">{p.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-50">
        <div className="container-x py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-800">Our Mission</h2>
            <p className="mt-4 text-gray-700">
              Our mission is simple — make honest snacks and chocolates with real ingredients, bringing
              natural flavor and nutrition to everyday treats, gifting, and special moments.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-2">
                <FiCheckCircle className="text-brand-600 mt-1 shrink-0" />
                <span className="text-gray-700">Real ingredients — premium nuts, dried fruits, fine cocoa</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheckCircle className="text-brand-600 mt-1 shrink-0" />
                <span className="text-gray-700">Balanced taste — bold flavor, gentle sweetness, clean finish</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheckCircle className="text-brand-600 mt-1 shrink-0" />
                <span className="text-gray-700">Small-batch consistency — reliable texture and flavor in every batch</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {PROCESS.map((step, i) => (
              <div key={step.title} className="card p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto font-semibold text-sm">
                  {i + 1}
                </div>
                <p className="font-medium mt-3 text-sm">{step.title}</p>
                <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What We Stand For</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {VALUES.map((v) => (
            <div key={v} className="card p-4 text-center text-sm font-medium text-gray-700">
              {v}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cocoa-500 text-white">
        <div className="container-x py-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Connect With Us</h2>
          <p className="mt-3 text-cocoa-100 max-w-xl mx-auto">
            Browse our shop, or reach out for corporate and festival gifting — we listen and we deliver.
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link to="/products" className="btn bg-white text-cocoa-600 hover:bg-cocoa-50">
              Explore Products
            </Link>
            <Link to="/contact" className="btn border border-white/60 text-white hover:bg-white/10">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
