import { useState } from 'react';
import { FiInfo, FiPackage } from 'react-icons/fi';

// The current Product model only stores name/description/shortDescription/tags —
// there are no nutrition/ingredients/benefits/storage fields yet. Rather than
// invent specific numbers or claims (a food-labeling accuracy risk), this reads
// product.nutrition / product.ingredients / product.benefits / product.storageInstructions
// if an admin adds them later, and otherwise shows an honest "see packaging" note.
const TABS = ['Description', 'Nutrition Facts', 'Ingredients', 'Benefits', 'Storage'];

const ProductInfoTabs = ({ product }) => {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <div className="mt-14">
      <div className="flex gap-1 border-b border-black/5 dark:border-white/10 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              tab === t
                ? 'border-primary-600 text-primary-700 dark:text-secondary-300'
                : 'border-transparent text-gray-500 hover:text-ink dark:hover:text-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="py-6 max-w-3xl text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {tab === 'Description' && <p className="whitespace-pre-line">{product.description}</p>}

        {tab === 'Nutrition Facts' &&
          (product.nutrition ? (
            <table className="w-full text-left">
              <tbody>
                {Object.entries(product.nutrition).map(([k, v]) => (
                  <tr key={k} className="border-b border-black/5 dark:border-white/10">
                    <td className="py-2 capitalize">{k}</td>
                    <td className="py-2 font-medium text-ink dark:text-white text-right">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="flex items-start gap-2 text-gray-500">
              <FiInfo className="shrink-0 mt-0.5" />
              Detailed nutrition information is printed on the product packaging. Message us on WhatsApp if you have
              specific dietary or allergy questions before ordering.
            </p>
          ))}

        {tab === 'Ingredients' &&
          (product.ingredients?.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {product.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          ) : (
            <p className="flex items-start gap-2 text-gray-500">
              <FiInfo className="shrink-0 mt-0.5" />
              Full ingredient list is available on the product packaging. This product is tagged:{' '}
              {product.tags?.join(', ') || '—'}.
            </p>
          ))}

        {tab === 'Benefits' &&
          (product.benefits?.length ? (
            <ul className="grid sm:grid-cols-2 gap-3">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary-400 shrink-0" /> {b}
                </li>
              ))}
            </ul>
          ) : (
            <p>{product.shortDescription || 'A wholesome, natural snacking option — great on its own or added to your favorite recipes.'}</p>
          ))}

        {tab === 'Storage' && (
          <p className="flex items-start gap-2">
            <FiPackage className="shrink-0 mt-0.5 text-primary-600" />
            {product.storageInstructions ||
              'Store in a cool, dry place away from direct sunlight. Once opened, keep in an airtight container to preserve freshness and crunch.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductInfoTabs;
