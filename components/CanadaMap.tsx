import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Canada provinces GeoJSON
const CANADA_PROVINCES_GEOJSON =
  'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson';

// Province codes to names (for tooltip)
const PROVINCE_CODES: Record<string, string> = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NS: 'Nova Scotia',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  YT: 'Yukon',
};

// Blue color palette
const PRIMARY = '#0F4C75';
const HOVER = '#3282B8';
const BORDER = '#E2E8F0';

export default function CanadaMap({
  provinceData = [],
}: {
  provinceData?: { code: string; avgTemp?: number }[];
}) {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Map province code to avgTemp
  const tempMap = Object.fromEntries((provinceData || []).map((p) => [p.code, p.avgTemp]));

  return (
    <div style={{ width: '100%', maxWidth: 500, margin: '0 auto', position: 'relative' }}>
      <ComposableMap
        projection="geoAlbers"
        projectionConfig={{ center: [-5, 62], scale: 400 }}
        width={500}
        height={300}
        style={{ width: '100%', height: 'auto', background: 'none' }}
      >
        <Geographies geography={CANADA_PROVINCES_GEOJSON}>
          {({ geographies }: any) =>
            geographies.map((geo: any) => {
              // Province code from GeoJSON property (e.g., 'code_hasc' or 'name')
              // We'll use the first two letters of 'code_hasc' (e.g., 'CA.AB' -> 'AB')
              const code = geo.properties.code_hasc?.split('.')[1] || '';
              const name = geo.properties.name || PROVINCE_CODES[code] || code;
              const isHovered = hovered === code;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setHovered(code);
                    setTooltip(
                      name + (tempMap[code] !== undefined ? `: ${tempMap[code].toFixed(1)}°C` : ''),
                    );
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    setTooltip(null);
                  }}
                  style={{
                    default: {
                      fill: isHovered ? HOVER : PRIMARY,
                      stroke: BORDER,
                      strokeWidth: 1,
                      outline: 'none',
                      transition: 'fill 0.2s',
                      cursor: 'pointer',
                    },
                    hover: {
                      fill: HOVER,
                      stroke: BORDER,
                      strokeWidth: 1.5,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: HOVER,
                      stroke: BORDER,
                      strokeWidth: 1.5,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 8,
            transform: 'translateX(-50%)',
            background: '#fff',
            color: PRIMARY,
            border: `1px solid ${BORDER}`,
            borderRadius: 8,
            padding: '8px 16px',
            fontWeight: 600,
            fontSize: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}
