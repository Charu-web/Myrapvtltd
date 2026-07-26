import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image }) => {
  const fullTitle = title ? `${title} | Fruits & Nuts` : 'Fruits & Nuts | Nutritions With An Emotion';
  const desc = description || 'Premium roasted nuts, dried fruits and chocolates — freshly packed and delivered.';
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
