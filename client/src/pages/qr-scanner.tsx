
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function QRScanner() {
  const [, setLocation] = useLocation();
  const [torchOn, setTorchOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.log("Camera access denied or not available");
      }
    };

    startCamera();
    
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleBack = () => {
    setLocation("/my-profile");
  };

  const handleAlbum = () => {
    // Navigate to photo album or gallery
    console.log("Open album");
  };

  const toggleTorch = () => {
    setTorchOn(!torchOn);
    // In a real implementation, you would control the camera flash here
  };

  const simulateQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult("https://example.com/product/123");
      // Handle the scanned QR code result here
      console.log("QR Code scanned:", "https://example.com/product/123");
    }, 2000);
  };

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden">
      {/* Camera Background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex items-center justify-between px-4 py-4 pt-12">
          <Button onClick={handleBack} className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-white">Scan QR Code</h1>
          <Button onClick={handleAlbum} className="text-white text-sm">
            Album
          </Button>
        </div>
      </header>

      {/* Instructions */}
      <div className="absolute top-1/3 left-0 right-0 text-center px-8 z-40">
        <p className="text-white text-lg">Put the QR code into the box.</p>
      </div>

      {/* Scanning Box */}
      <div className="absolute inset-0 flex items-center justify-center z-40">
        <div className="relative w-64 h-64">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
          
          {/* Scanning Line */}
          {(isScanning || !scanResult) && (
            <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2">
              <div className="h-1 bg-green-400 animate-pulse"></div>
            </div>
          )}

          {/* Clickable area for demo */}
          <Button
            onClick={simulateQRScan}
            className="absolute inset-0 bg-transparent"
            disabled={isScanning}
          />
        </div>
      </div>

      {/* Torch Button */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          onClick={toggleTorch}
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            torchOn ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white'
          } backdrop-blur-sm transition-colors`}
        >
          <Zap className="h-8 w-8" />
        </Button>
      </div>

      {/* Scanning Animation Overlay */}
      {isScanning && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white text-lg">Scanning...</p>
          </div>
        </div>
      )}

      {/* Scan Result */}
      {scanResult && (
        <div className="absolute bottom-32 left-4 right-4 bg-white/90 rounded-lg p-4 z-50">
          <p className="text-black text-sm">QR Code detected:</p>
          <p className="text-black font-medium">{scanResult}</p>
        </div>
      )}
    </div>
  );
}
