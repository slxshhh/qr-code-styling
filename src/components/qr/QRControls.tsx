import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { QRState, DotType, CornerSquareType, CornerDotType } from "@/src/types/qr";
import { Download, FileJson, Settings2, Palette, Square, Circle, Image as ImageIcon, Layout, QrCode } from "lucide-react";

interface QRControlsProps {
  options: QRState;
  setOptions: React.Dispatch<React.SetStateAction<QRState>>;
  onExportJSON: () => void;
}

export function QRControls({ options, setOptions, onExportJSON }: QRControlsProps) {
  const updateOption = (path: string, value: any) => {
    setOptions((prev) => {
      const newOptions = { ...prev };
      const keys = path.split('.');
      let current: any = newOptions;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newOptions;
    });
  };

  const renderColorOptions = (path: string, label: string, currentOptions: any) => {
    const isGradient = !!currentOptions.gradient;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>{label} Color</Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Gradient</span>
            <input 
              type="checkbox" 
              checked={isGradient}
              onChange={(e) => {
                if (e.target.checked) {
                  updateOption(`${path}.gradient`, {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                      { offset: 0, color: currentOptions.color || '#000000' },
                      { offset: 1, color: '#ffffff' }
                    ]
                  });
                } else {
                  updateOption(`${path}.gradient`, undefined);
                }
              }}
              className="w-4 h-4 accent-pink-500"
            />
          </div>
        </div>

        {!isGradient ? (
          <div className="flex gap-2">
            <Input 
              type="color" 
              value={currentOptions.color || '#000000'} 
              onChange={(e) => updateOption(`${path}.color`, e.target.value)}
              className="w-12 h-10 p-1 rounded-lg cursor-pointer"
            />
            <Input 
              value={currentOptions.color || '#000000'} 
              onChange={(e) => updateOption(`${path}.color`, e.target.value)}
              className="flex-1 rounded-xl"
            />
          </div>
        ) : (
          <div className="space-y-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="space-y-2">
              <Label className="text-xs">Gradient Type</Label>
              <Select 
                value={currentOptions.gradient.type} 
                onValueChange={(v) => updateOption(`${path}.gradient.type`, v)}
              >
                <SelectTrigger className="h-8 rounded-lg text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs">Rotation ({currentOptions.gradient.rotation}°)</Label>
              <Slider 
                value={[currentOptions.gradient.rotation]} 
                min={0} max={360} step={1}
                onValueChange={(v) => updateOption(`${path}.gradient.rotation`, v[0])}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Color 1</Label>
                <Input 
                  type="color" 
                  value={currentOptions.gradient.colorStops[0].color} 
                  onChange={(e) => {
                    const newStops = [...currentOptions.gradient.colorStops];
                    newStops[0].color = e.target.value;
                    updateOption(`${path}.gradient.colorStops`, newStops);
                  }}
                  className="w-full h-8 p-1 rounded-lg cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Color 2</Label>
                <Input 
                  type="color" 
                  value={currentOptions.gradient.colorStops[1].color} 
                  onChange={(e) => {
                    const newStops = [...currentOptions.gradient.colorStops];
                    newStops[1].color = e.target.value;
                    updateOption(`${path}.gradient.colorStops`, newStops);
                  }}
                  className="w-full h-8 p-1 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {/* 1. Main */}
      <AccordionItem value="main" className="border rounded-2xl px-4 bg-white/50">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
              <Settings2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-700">Main</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6 space-y-4">
          <div className="space-y-2">
            <Label>Data</Label>
            <Input 
              value={options.data} 
              onChange={(e) => updateOption('data', e.target.value)}
              placeholder="https://example.com"
              className="rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Width ({options.width}px)</Label>
              <Slider 
                value={[options.width || 300]} 
                min={100} max={1000} step={10}
                onValueChange={(v) => updateOption('width', v[0])}
              />
            </div>
            <div className="space-y-2">
              <Label>Height ({options.height}px)</Label>
              <Slider 
                value={[options.height || 300]} 
                min={100} max={1000} step={10}
                onValueChange={(v) => updateOption('height', v[0])}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Margin ({options.margin}px)</Label>
            <Slider 
              value={[options.margin || 0]} 
              min={0} max={100} step={1}
              onValueChange={(v) => updateOption('margin', v[0])}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 2. Dots */}
      <AccordionItem value="dots" className="border rounded-2xl px-4 bg-white/50">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Palette className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-700">Dots</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6 space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select 
              value={options.dotsOptions.type} 
              onValueChange={(v) => updateOption('dotsOptions.type', v)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['rounded', 'dots', 'classy', 'classy-rounded', 'square', 'extra-rounded'].map(t => (
                  <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {renderColorOptions('dotsOptions', 'Dots', options.dotsOptions)}
        </AccordionContent>
      </AccordionItem>

      {/* 3. Corners Square */}
      <AccordionItem value="corners-square" className="border rounded-2xl px-4 bg-white/50">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <Square className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-700">Corners Square</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6 space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select 
              value={options.cornersSquareOptions.type} 
              onValueChange={(v) => updateOption('cornersSquareOptions.type', v)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['dot', 'square', 'extra-rounded'].map(t => (
                  <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {renderColorOptions('cornersSquareOptions', 'Corners Square', options.cornersSquareOptions)}
        </AccordionContent>
      </AccordionItem>

      {/* 4. Corners Dot */}
      <AccordionItem value="corners-dot" className="border rounded-2xl px-4 bg-white/50">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <Circle className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-700">Corners Dot</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6 space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select 
              value={options.cornersDotOptions.type} 
              onValueChange={(v) => updateOption('cornersDotOptions.type', v)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['dot', 'square'].map(t => (
                  <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {renderColorOptions('cornersDotOptions', 'Corners Dot', options.cornersDotOptions)}
        </AccordionContent>
      </AccordionItem>

      {/* 5. Background */}
      <AccordionItem value="background" className="border rounded-2xl px-4 bg-white/50">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
              <Layout className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-700">Background</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6 space-y-4">
          {renderColorOptions('backgroundOptions', 'Background', options.backgroundOptions)}
        </AccordionContent>
      </AccordionItem>


      {/* 6. Image */}
      <AccordionItem value="image" className="border rounded-2xl px-4 bg-white/50">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <ImageIcon className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-700">Image</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6 space-y-4">
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input 
              value={options.image} 
              onChange={(e) => updateOption('image', e.target.value)}
              placeholder="https://example.com/logo.png"
              className="rounded-xl"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Hide Background Dots</Label>
            <input 
              type="checkbox" 
              checked={options.imageOptions.hideBackgroundDots}
              onChange={(e) => updateOption('imageOptions.hideBackgroundDots', e.target.checked)}
              className="w-5 h-5 accent-pink-500"
            />
          </div>
          <div className="space-y-2">
            <Label>Size ({options.imageOptions.imageSize * 100}%)</Label>
            <Slider 
              value={[options.imageOptions.imageSize]} 
              min={0.1} max={1} step={0.05}
              onValueChange={(v) => updateOption('imageOptions.imageSize', v[0])}
            />
          </div>
          <div className="space-y-2">
            <Label>Margin ({options.imageOptions.margin}px)</Label>
            <Slider 
              value={[options.imageOptions.margin]} 
              min={0} max={50} step={1}
              onValueChange={(v) => updateOption('imageOptions.margin', v[0])}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 7. QR Options */}
      <AccordionItem value="qr-options" className="border rounded-2xl px-4 bg-white/50">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-100 text-teal-600">
              <QrCode className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-700">QR Options</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-6 space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select 
              value={options.type} 
              onValueChange={(v) => updateOption('type', v)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="svg">SVG</SelectItem>
                <SelectItem value="canvas">Canvas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Type Number ({options.qrOptions.typeNumber === 0 ? 'Auto' : options.qrOptions.typeNumber})</Label>
            <Slider 
              value={[options.qrOptions.typeNumber]} 
              min={0} max={40} step={1}
              onValueChange={(v) => updateOption('qrOptions.typeNumber', v[0])}
            />
          </div>
          <div className="space-y-2">
            <Label>Mode</Label>
            <Select 
              value={options.qrOptions.mode} 
              onValueChange={(v) => updateOption('qrOptions.mode', v)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['Numeric', 'Alphanumeric', 'Byte', 'Kanji'].map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Error Correction Level</Label>
            <Select 
              value={options.qrOptions.errorCorrectionLevel} 
              onValueChange={(v) => updateOption('qrOptions.errorCorrectionLevel', v)}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['L', 'M', 'Q', 'H'].map(l => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 8. Export as JSON */}
      <div className="pt-4">
        <Button 
          variant="outline" 
          className="w-full h-14 rounded-2xl border-dashed border-2 hover:border-pink-400 hover:bg-pink-50 transition-all group"
          onClick={onExportJSON}
        >
          <FileJson className="w-5 h-5 mr-2 text-gray-400 group-hover:text-pink-500" />
          <span className="font-bold text-gray-600 group-hover:text-pink-600">Export as JSON</span>
        </Button>
      </div>
    </Accordion>
  );
}
