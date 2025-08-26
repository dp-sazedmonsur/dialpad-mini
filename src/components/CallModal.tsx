import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CallModal = ({ open, onOpenChange }: CallModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length >= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 3) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return cleaned;
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const startCall = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter a phone number to call",
        variant: "destructive",
      });
      return;
    }

    setIsCallActive(true);
    setCallDuration(0);
    
    // Simulate call duration timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Store timer ID for cleanup
    (window as any).callTimer = timer;

    toast({
      title: "Call started",
      description: `Calling ${phoneNumber}...`,
    });
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    
    // Clear the timer
    if ((window as any).callTimer) {
      clearInterval((window as any).callTimer);
      (window as any).callTimer = null;
    }

    toast({
      title: "Call ended",
      description: "Thank you for using Dialpad Demo",
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    if (isCallActive) {
      endCall();
    }
    setPhoneNumber("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass border-0 shadow-elegant">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl flex items-center justify-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <span>Dialpad Demo</span>
          </DialogTitle>
          <DialogDescription>
            {isCallActive 
              ? "Calling... - Demo mode" 
              : "Enter a phone number to start a demo call"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!isCallActive ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="(555) 123-4567"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  maxLength={14}
                  className="text-lg text-center transition-smooth focus:ring-primary"
                />
              </div>
              
              <Button
                variant="call"
                size="lg"
                onClick={startCall}
                className="w-full"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Start Call
              </Button>
            </>
          ) : (
            <div className="text-center space-y-6">
              {/* Call Status */}
              <div className="space-y-2">
                <div className="w-20 h-20 gradient-primary rounded-full mx-auto flex items-center justify-center shadow-lg animate-glow">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="text-lg font-semibold">{phoneNumber}</div>
                <div className="text-sm text-muted-foreground">Connected (Demo)</div>
              </div>

              {/* Call Duration */}
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-primary mb-2">
                  {formatDuration(callDuration)}
                </div>
                <div className="text-sm text-muted-foreground">Call Duration</div>
              </div>

              {/* End Call Button */}
              <Button
                variant="danger"
                size="lg"
                onClick={endCall}
                className="w-full"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l1.5 1.5M16.5 16.5L18 18M22 12h-2.5M12 2v2.5M12 19.5V22M8.5 8.5L7 7M16.5 7.5L18 6"
                  />
                </svg>
                End Call
              </Button>
            </div>
          )}
        </div>

        {/* Demo Notice */}
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            This is a demo application. No actual calls are made.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;