import { useEffect, useState } from 'react';
import client from '../api/client';
import SEO from '../components/SEO';

import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductRail from '../components/home/ProductRail';
import CountdownBanner from '../components/home/CountdownBanner';
import CollectionTiles from '../components/home/CollectionTiles';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import InstagramFeed from '../components/home/InstagramFeed';
import JournalSection from '../components/home/JournalSection';
import Newsletter from '../components/home/Newsletter';
import FAQSection from '../components/home/FAQSection';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [flashSale, setFlashSale] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Two calls cover every rail on the page:
        //  - featured=true gives us the curated Featured Products rail
        //  - a general pool (default sort = newest) is sliced/re-sorted on the
        //    client into New Arrivals, Best Sellers, and Flash Sale, so we don't
        //    need extra backend routes for concepts the API doesn't model directly.
        const [catRes, featuredRes, poolRes] = await Promise.all([
          client.get('/categories'),
          client.get('/products?featured=true&limit=8'),
          client.get('/products?limit=24'),
        ]);

        const pool = poolRes.data.products || [];

        setCategories(catRes.data.categories || []);
        setFeatured(featuredRes.data.products || []);
        setNewArrivals(pool.slice(0, 8));
        setBestSellers([...pool].sort((a, b) => b.rating - a.rating).slice(0, 8));
        setFlashSale(pool.filter((p) => p.discountPrice > 0 && p.discountPrice < p.price).slice(0, 8));
      } catch {
        // Sections simply render their empty state — page stays usable.
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <SEO
        title="Home"
        description="Premium roasted nuts, dried fruits and chocolates — freshly packed and delivered. Nutritions With An Emotion."
      />

      <Hero />

      <CategoryGrid categories={categories} loading={loading} />

      <ProductRail
        eyebrow="Handpicked for You"
        title="Featured Products"
        subtitle="Our most-loved picks, chosen for flavor and freshness."
        products={featured}
        loading={loading}
        viewAllTo="/products?featured=true"
        emptyMessage="No featured products yet. Check back soon!"
      />

      <CountdownBanner />

      <ProductRail
        eyebrow="Top Rated"
        title="Best Sellers"
        subtitle="The nuts and dried fruits our customers reorder the most."
        products={bestSellers}
        loading={loading}
        viewAllTo="/products?sort=rating"
        tone="dark"
        emptyMessage="Ratings are coming in — check back soon!"
      />

      {flashSale.length > 0 && (
        <ProductRail
          eyebrow="Limited Time Offers"
          title="Flash Sale"
          subtitle="Discounted prices for a limited time — while stocks last."
          products={flashSale}
          loading={loading}
          viewAllTo="/products?sort=price_asc"
        />
      )}

      <CollectionTiles />

      <ProductRail
        eyebrow="Just In"
        title="New Arrivals"
        subtitle="Fresh drops from our roastery, straight to your cart."
        products={newArrivals}
        loading={loading}
        viewAllTo="/products?sort=newest"
      />

      <WhyChooseUs />
      <Testimonials />
      <InstagramFeed />
      <JournalSection />
      <Newsletter />
      <FAQSection />
    </div>
  );
};

export default Home;
