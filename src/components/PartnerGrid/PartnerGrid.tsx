import { Partner } from '../../types';

interface PartnerGridProps {
  partners: Partner[];
}

export default function PartnerGrid({ partners }: PartnerGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {partners.map((partner) => (
        <div
          key={partner.id}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/10 group"
        >
          <div className="aspect-square flex items-center justify-center mb-4">
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {partner.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <h3 className="text-white font-semibold text-sm text-center group-hover:text-primary transition-colors duration-300">
            {partner.name}
          </h3>
          {partner.description && (
            <p className="text-gray-400 text-xs text-center mt-2">
              {partner.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}