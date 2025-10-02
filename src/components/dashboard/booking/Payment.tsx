import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Badge } from "../../ui/badge";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  ArrowLeft, 
  ArrowRight, 
  CreditCard, 
  Building, 
  Wallet,
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  Receipt
} from "lucide-react";
import { BookingData } from "../DashboardLayout";

interface PaymentProps {
  data: BookingData;
  onUpdate: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Payment({ data, onUpdate, onNext, onBack }: PaymentProps) {
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'wallet'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    swiftCode: '',
    bankName: ''
  });
  const [processing, setProcessing] = useState(false);

  const vatRate = 0.05; // 5% VAT
  const subtotal = data.pricing?.totalPrice || 0;
  const vatAmount = subtotal * vatRate;
  const totalWithVat = subtotal + vatAmount;

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate invoice reference
    const invoiceRef = `INV-${Date.now().toString().slice(-8)}`;
    
    onUpdate({
      status: 'creative-review' // Move to next stage after payment
    });
    
    setProcessing(false);
    onNext();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('payment.back')}
            </Button>
            <div>
              <h1 className="text-2xl font-medium">{t('payment.title')}</h1>
              <p className="text-gray-600">{t('payment.subtitle')}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {t('payment.step')}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>{t('payment.method')}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as any)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{t('payment.creditCard')}</p>
                        <p className="text-sm text-gray-600">{t('payment.creditCardDesc')}</p>
                      </div>
                    </label>
                    <Badge variant="secondary">{t('payment.instant')}</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="bank" id="bank" />
                    <label htmlFor="bank" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Building className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">{t('payment.bankTransfer')}</p>
                        <p className="text-sm text-gray-600">{t('payment.bankTransferDesc')}</p>
                      </div>
                    </label>
                    <Badge variant="outline">{t('payment.days1to2')}</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Wallet className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">{t('payment.digitalWallet')}</p>
                        <p className="text-sm text-gray-600">{t('payment.digitalWalletDesc')}</p>
                      </div>
                    </label>
                    <Badge variant="secondary">{t('payment.instant')}</Badge>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details */}
            {paymentMethod === 'card' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {t('payment.cardDetails')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">{t('payment.cardNumber')} *</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({
                        ...cardDetails,
                        number: formatCardNumber(e.target.value)
                      })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">{t('payment.expiryDate')} *</Label>
                      <Input
                        id="expiry"
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({
                          ...cardDetails,
                          expiry: formatExpiryDate(e.target.value)
                        })}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">{t('payment.cvv')} *</Label>
                      <Input
                        id="cvv"
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({
                          ...cardDetails,
                          cvv: e.target.value.replace(/\D/g, '')
                        })}
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">{t('payment.cardholderName')} *</Label>
                    <Input
                      id="cardName"
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({
                        ...cardDetails,
                        name: e.target.value
                      })}
                      placeholder={t('payment.cardNamePlaceholder')}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === 'bank' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Bank Transfer Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Transfer to:</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Bank:</strong> Emirates NBD</p>
                      <p><strong>Account Name:</strong> Media Intelligence LLC</p>
                      <p><strong>Account Number:</strong> 1234567890123</p>
                      <p><strong>SWIFT Code:</strong> EBILAEAD</p>
                      <p><strong>IBAN:</strong> AE070260001234567890123</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reference">Reference Number</Label>
                    <Input
                      id="reference"
                      type="text"
                      value={data.bookingId || ''}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">
                      Please include this reference number with your transfer
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === 'wallet' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Digital Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Select your preferred digital wallet to complete the payment.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-16 flex flex-col gap-1">
                      <span className="text-2xl">🍎</span>
                      <span className="text-sm">Apple Pay</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1">
                      <span className="text-2xl">🟢</span>
                      <span className="text-sm">Google Pay</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1">
                      <span className="text-2xl">📱</span>
                      <span className="text-sm">Samsung Pay</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Secure Payment</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your payment information is encrypted and secure. We use industry-standard 
                      SSL encryption and do not store your payment details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Booking Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Media Outlet</span>
                    <span className="font-medium">{data.mediaOutlet?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Program</span>
                    <span className="font-medium">{data.program?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="font-medium">
                      {data.program?.date} {data.program?.timeSlot}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>AED {subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">VAT (5%)</span>
                    <span className="text-gray-600">AED {vatAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-medium">
                    <span>Total Amount</span>
                    <span>AED {totalWithVat.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={processing || (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name))}
                  className="w-full mt-6"
                  size="lg"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Pay AED {totalWithVat.toLocaleString()}
                    </div>
                  )}
                </Button>

                {paymentMethod === 'bank' && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium">Bank Transfer Note</p>
                        <p>Your booking will be confirmed once payment is received (1-2 business days).</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trust Indicators */}
                <div className="mt-6 text-center space-y-2">
                  <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>256-bit SSL Encrypted</span>
                  </div>
                  <div className="flex justify-center gap-4 text-2xl">
                    <span>💳</span>
                    <span>🔒</span>
                    <span>✅</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}