/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MainLayout } from "@/src/components/layout/MainLayout";
import { QRControls } from "@/src/components/qr/QRControls";
import { QRPreview } from "@/src/components/qr/QRPreview";
import { useQRCode } from "@/src/hooks/useQRCode";
import { QRState } from "@/src/types/qr";
import { Download } from "lucide-react";

const initialOptions: QRState = {
  width: 300,
  height: 300,
  type: 'svg',
  data: "https://qr-code-styling.com",
  image: "",
  margin: 10,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q'
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
    crossOrigin: 'anonymous',
  },
  dotsOptions: {
    type: 'rounded',
    color: '#24292e',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
    color: '#24292e',
  },
  cornersDotOptions: {
    type: 'dot',
    color: '#24292e',
  }
};

export default function App() {
  const [options, setOptions] = useState<QRState>(initialOptions);
  const { containerRef, download, exportAsJSON } = useQRCode(options);

  // Sync options to hook (hook handles update internally via useEffect)
  // But we need to pass the current options to the hook if we want it to manage state
  // Actually, let's adjust the hook to accept the setter or just use its own state
  
  // Re-implementing hook usage for better sync:
  const { setOptions: updateQR, containerRef: qrRef, download: dl, exportAsJSON: ex } = useQRCode(options);

  // We'll use the local state for the form and update the hook state on change
  const handleOptionsChange = (newOptions: React.SetStateAction<QRState>) => {
    setOptions(newOptions);
    updateQR(newOptions);
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Customization Options */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Customize your QR</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider">
                v1.8.3
              </span>
            </div>
          </div>
          
          <QRControls 
            options={options} 
            setOptions={handleOptionsChange} 
            onExportJSON={ex}
          />
        </div>

        {/* Right Side: QR Preview */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 space-y-6">
            <QRPreview containerRef={qrRef} />
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => dl('png')}
                className="w-full py-4 bg-[#24292e] text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PNG
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => dl('jpeg')}
                  className="py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-pink-300 hover:text-pink-600 transition-all"
                >
                  JPEG
                </button>
                <button 
                  onClick={() => dl('svg')}
                  className="py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-pink-300 hover:text-pink-600 transition-all"
                >
                  SVG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


