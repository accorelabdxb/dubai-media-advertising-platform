import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Calendar } from "../../ui/calendar";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Users,
  Star,
  CheckCircle,
  XCircle
} from "lucide-react";
import { BookingData } from "../DashboardLayout";
import { DateRange } from "react-day-picker";

interface ProgramTimeSlotProps {
  data: BookingData;
  onUpdate: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ProgramTimeSlot({ data, onUpdate, onNext, onBack }: ProgramTimeSlotProps) {
  const { t } = useLanguage();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined
  });
  const [viewMode, setViewMode] = useState<'programs' | 'timeslots'>('programs');

  // Calculate number of days selected
  const getDaysCount = () => {
    if (!selectedDateRange?.from) return 1;
    if (!selectedDateRange?.to) return 1;
    
    const timeDiff = selectedDateRange.to.getTime() - selectedDateRange.from.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates
    return Math.max(1, daysDiff);
  };

  // Calculate total price based on days
  const calculateTotalPrice = (basePrice: number) => {
    return basePrice * getDaysCount();
  };

  const programs = [
    {
      id: '1',
      name: t('program.morningDubai.name'),
      category: t('program.morningDubai.category'),
      timeSlot: '07:00 - 09:00',
      duration: `2 ${t('program.hours')}`,
      thumbnail: '🌅',
      audience: `450K ${t('program.viewers')}`,
      demographic: `${t('program.adults')} 25-54`,
      premium: true,
      basePrice: 5000
    },
    {
      id: '2',
      name: t('program.cityPulse.name'),
      category: t('program.cityPulse.category'),
      timeSlot: '12:00 - 13:00',
      duration: `1 ${t('program.hour')}`,
      thumbnail: '🏙️',
      audience: `320K ${t('program.viewers')}`,
      demographic: `${t('program.adults')} 18-45`,
      premium: false,
      basePrice: 3000
    },
    {
      id: '3',
      name: t('program.primeTimeNews.name'),
      category: t('program.primeTimeNews.category'),
      timeSlot: '20:00 - 21:00',
      duration: `1 ${t('program.hour')}`,
      thumbnail: '📺',
      audience: `680K ${t('program.viewers')}`,
      demographic: `${t('program.adults')} 30+`,
      premium: true,
      basePrice: 8000
    },
    {
      id: '4',
      name: t('program.businessToday.name'),
      category: t('program.businessToday.category'),
      timeSlot: '18:00 - 18:30',
      duration: `30 ${t('program.minutes')}`,
      thumbnail: '💼',
      audience: `180K ${t('program.viewers')}`,
      demographic: t('program.professionals'),
      premium: false,
      basePrice: 2500
    }
  ];

  const timeSlots = [
    { time: '06:00', status: 'available', price: 2000, type: 'morning' },
    { time: '07:00', status: 'premium', price: 5000, type: 'morning' },
    { time: '08:00', status: 'premium', price: 5000, type: 'morning' },
    { time: '09:00', status: 'available', price: 3000, type: 'morning' },
    { time: '10:00', status: 'available', price: 2500, type: 'morning' },
    { time: '11:00', status: 'booked', price: 0, type: 'morning' },
    { time: '12:00', status: 'available', price: 3000, type: 'afternoon' },
    { time: '13:00', status: 'available', price: 3000, type: 'afternoon' },
    { time: '14:00', status: 'available', price: 2500, type: 'afternoon' },
    { time: '15:00', status: 'booked', price: 0, type: 'afternoon' },
    { time: '16:00', status: 'available', price: 3500, type: 'afternoon' },
    { time: '17:00', status: 'available', price: 4000, type: 'afternoon' },
    { time: '18:00', status: 'premium', price: 6000, type: 'evening' },
    { time: '19:00', status: 'premium', price: 7000, type: 'evening' },
    { time: '20:00', status: 'premium', price: 8000, type: 'evening' },
    { time: '21:00', status: 'premium', price: 7000, type: 'evening' },
    { time: '22:00', status: 'available', price: 4000, type: 'evening' },
    { time: '23:00', status: 'available', price: 2000, type: 'late' }
  ];

  const handleProgramSelect = (program: typeof programs[0]) => {
    const totalPrice = calculateTotalPrice(program.basePrice);
    const dateStr = selectedDateRange?.from ? selectedDateRange.from.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const dateRangeStr = selectedDateRange?.to 
      ? `${selectedDateRange.from?.toISOString().split('T')[0]} to ${selectedDateRange.to.toISOString().split('T')[0]}`
      : dateStr;

    onUpdate({
      program: {
        id: program.id,
        name: program.name,
        timeSlot: program.timeSlot,
        date: dateRangeStr,
        duration: program.duration,
        category: program.category,
        daysCount: getDaysCount()
      },
      pricing: {
        basePrice: program.basePrice,
        addOns: [],
        totalPrice: totalPrice,
        daysCount: getDaysCount(),
        pricePerDay: program.basePrice
      }
    });
  };

  const handleTimeSlotSelect = (slot: typeof timeSlots[0]) => {
    if (slot.status === 'booked') return;
    
    const totalPrice = calculateTotalPrice(slot.price);
    const dateStr = selectedDateRange?.from ? selectedDateRange.from.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const dateRangeStr = selectedDateRange?.to 
      ? `${selectedDateRange.from?.toISOString().split('T')[0]} to ${selectedDateRange.to.toISOString().split('T')[0]}`
      : dateStr;
    
    onUpdate({
      program: {
        id: `slot-${slot.time}`,
        name: `${slot.time} ${t('programTime.timeSlotLabel')}`,
        timeSlot: `${slot.time} - ${(parseInt(slot.time.split(':')[0]) + 1).toString().padStart(2, '0')}:00`,
        date: dateRangeStr,
        duration: `1 ${t('programTime.hour')}`,
        category: t('programTime.timeSlotLabel'),
        daysCount: getDaysCount()
      },
      pricing: {
        basePrice: slot.price,
        addOns: [],
        totalPrice: totalPrice,
        daysCount: getDaysCount(),
        pricePerDay: slot.price
      }
    });
  };

  const getSlotStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'premium':
        return <Star className="h-4 w-4 text-yellow-500" />;
      case 'booked':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getSlotStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'border-green-200 bg-green-50 hover:bg-green-100';
      case 'premium':
        return 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100';
      case 'booked':
        return 'border-red-200 bg-red-50 cursor-not-allowed opacity-60';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const isSelected = (id: string) => {
    return data.program?.id === id;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('programTime.back')}
            </Button>
            <div>
              <h1 className="text-2xl font-medium">{t('programTime.title')}</h1>
              <p className="text-gray-600">{data.mediaOutlet?.name} - {t('programTime.subtitle')}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {t('programTime.step2of6')}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {t('programTime.selectDate')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="range"
                selected={selectedDateRange}
                onSelect={setSelectedDateRange}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
                numberOfMonths={1}
              />
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium">{getDaysCount() > 1 ? t('programTime.selectedDates') : t('programTime.selectedDate')}:</p>
                {selectedDateRange?.from ? (
                  <div>
                    <p>{selectedDateRange.from.toLocaleDateString('en-AE', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                    {selectedDateRange.to && selectedDateRange.to !== selectedDateRange.from && (
                      <>
                        <p className="text-gray-400">{t('programTime.to')}</p>
                        <p>{selectedDateRange.to.toLocaleDateString('en-AE', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </>
                    )}
                    <div className="mt-2 p-2 bg-blue-50 rounded-md">
                      <p className="font-medium text-blue-800">
                        {getDaysCount()} {getDaysCount() > 1 ? t('programTime.daysSelected') : t('programTime.daySelected')}
                      </p>
                      <p className="text-xs text-blue-600">
                        {t('programTime.pricingPerDay')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>{t('programTime.noDateSelected')}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Programs/Time Slots */}
          <div className="lg:col-span-2">
            {/* View Toggle */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={viewMode === 'programs' ? 'default' : 'outline'}
                onClick={() => setViewMode('programs')}
              >
                {t('programTime.programs')}
              </Button>
              <Button
                variant={viewMode === 'timeslots' ? 'default' : 'outline'}
                onClick={() => setViewMode('timeslots')}
              >
                {t('programTime.timeSlots')}
              </Button>
            </div>

            {viewMode === 'programs' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('programTime.availablePrograms')}</h3>
                {programs.map((program) => (
                  <Card
                    key={program.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected(program.id)
                        ? 'ring-2 ring-primary border-primary bg-primary/5'
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => handleProgramSelect(program)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{program.thumbnail}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{program.name}</h4>
                              <p className="text-sm text-gray-600">{program.category}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="outline">{program.duration}</Badge>
                              {program.premium && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Star className="h-3 w-3 mr-1" />
                                  {t('programTime.premium')}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{program.timeSlot}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span>{program.audience}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div>
                                <span className="font-medium">AED {calculateTotalPrice(program.basePrice).toLocaleString()}</span>
                                {getDaysCount() > 1 && (
                                  <div className="text-xs text-gray-500">
                                    AED {program.basePrice.toLocaleString()}/{t('programTime.day')} × {getDaysCount()} {t('programTime.days')}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mt-2">
                            {t('programTime.target')}: {program.demographic}
                          </p>
                        </div>
                        
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          isSelected(program.id)
                            ? 'border-primary bg-primary'
                            : 'border-gray-300'
                        }`}>
                          {isSelected(program.id) && (
                            <div className="w-full h-full rounded-full bg-white transform scale-50" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('programTime.availableTimeSlots')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {timeSlots.map((slot) => (
                    <Card
                      key={slot.time}
                      className={`cursor-pointer transition-all ${getSlotStatusClass(slot.status)} ${
                        isSelected(`slot-${slot.time}`)
                          ? 'ring-2 ring-primary border-primary'
                          : ''
                      }`}
                      onClick={() => handleTimeSlotSelect(slot)}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="flex justify-center mb-2">
                          {getSlotStatusIcon(slot.status)}
                        </div>
                        <p className="font-medium text-sm">{slot.time}</p>
                        {slot.status !== 'booked' && (
                          <div className="text-xs text-gray-600 mt-1">
                            <p>AED {calculateTotalPrice(slot.price).toLocaleString()}</p>
                            {getDaysCount() > 1 && (
                              <p className="text-xs text-gray-400">
                                {getDaysCount()}{t('programTime.day').substring(0,1)} × {slot.price.toLocaleString()}
                              </p>
                            )}
                          </div>
                        )}
                        {slot.status === 'booked' && (
                          <p className="text-xs text-red-600 mt-1">{t('programTime.booked')}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="flex gap-4 text-sm text-gray-600 mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{t('programTime.available')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{t('programTime.premium')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>{t('programTime.booked')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Program/Slot Summary */}
        {data.program && (
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-blue-900">
                    {t('programTime.selected')}: {data.program.name}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {data.program.date} {t('programTime.at')} {data.program.timeSlot} ({data.program.duration})
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-900">
                    AED {data.pricing?.totalPrice?.toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600">
                    {data.pricing?.daysCount && data.pricing.daysCount > 1 
                      ? `${t('programTime.total')} (${data.pricing.daysCount} ${t('programTime.days')} × AED ${data.pricing.pricePerDay?.toLocaleString()})`
                      : t('programTime.basePrice')
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={onNext}
            disabled={!data.program}
            size="lg"
          >
            {t('programTime.continue')}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}