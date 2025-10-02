import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  CheckCircle, 
  Calendar, 
  Download, 
  Share2,
  Star,
  Plus,
  ArrowRight,
  Clock,
  Bell,
  Mail,
  MessageSquare
} from "lucide-react";
import { BookingData } from "../DashboardLayout";

interface BookingSuccessProps {
  data: BookingData;
  onBookAnother: () => void;
  onViewBookings: () => void;
}

export function BookingSuccess({ data, onBookAnother, onViewBookings }: BookingSuccessProps) {
  const { t } = useLanguage();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const suggestedActions = [
    {
      title: 'Book Prime Time Slot',
      description: 'Book additional slots during peak hours for maximum reach',
      icon: Star,
      badge: 'Popular',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Multi-Channel Campaign',
      description: 'Extend your campaign across TV, Radio, and Digital',
      icon: Share2,
      badge: 'Recommended',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Weekend Special',
      description: 'Target weekend audiences with special programming',
      icon: Calendar,
      badge: 'Limited Time',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const upcomingMilestones = [
    {
      title: 'Creative Review Complete',
      date: 'Within 24 hours',
      description: 'Your ad will be reviewed and approved',
      icon: CheckCircle
    },
    {
      title: 'Broadcast Confirmation',
      date: data.program?.date,
      description: 'Your advertisement goes live',
      icon: Calendar
    },
    {
      title: 'Performance Report',
      date: 'Next day',
      description: 'Detailed analytics and reach metrics',
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-medium mb-4">{t('success.title')}</h1>
          <p className="text-xl text-green-100 mb-6">
            {t('success.subtitle')} and is now being processed.
          </p>
          <div className="flex justify-center">
            <Badge className="bg-white/20 text-white text-lg px-4 py-2">
              {t('success.bookingReference')} {data.bookingId}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{t('success.bookingSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{t('success.mediaOutlet')}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg">{data.mediaOutlet?.logo}</span>
                      <span className="font-medium">{data.mediaOutlet?.name}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('success.program')}</p>
                    <p className="font-medium mt-1">{data.program?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Broadcast Date</p>
                    <p className="font-medium mt-1">
                      {data.program?.date && formatDate(data.program.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('success.timeSlot')}</p>
                    <p className="font-medium mt-1 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {data.program?.timeSlot}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Investment</span>
                  <span className="text-2xl font-medium text-green-600">
                    AED {data.pricing?.totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">Payment Confirmed</h4>
                      <p className="text-sm text-green-700">
                        Your payment has been processed successfully. You will receive an invoice via email shortly.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  What Happens Next
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                          <p className="text-sm text-primary font-medium mt-1">{milestone.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Maximize Your Campaign Impact</CardTitle>
                <p className="text-sm text-gray-600">
                  Consider these additional opportunities to boost your advertising reach
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {suggestedActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${action.bgColor} border-${action.color.split('-')[1]}-200`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-white/60`}>
                              <Icon className={`h-5 w-5 ${action.color}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{action.title}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {action.badge}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{action.description}</p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={onBookAnother} className="w-full" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Book Another Slot
                </Button>
                
                <Button variant="outline" onClick={onViewBookings} className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View My Bookings
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Booking
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Stay Updated
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Email Updates</p>
                      <p className="text-xs text-blue-700">
                        You'll receive email notifications at each approval stage
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">SMS Alerts</p>
                      <p className="text-xs text-green-700">
                        Get instant SMS updates for critical milestones
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Assistance?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Our support team is here to help with any questions about your booking.
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span>Live Chat: Available 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>Email: support@mi.ae</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-gray-400" />
                    <span>Phone: +971 4 123 4567</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            {/* Rating */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="font-medium text-yellow-900 mb-2">Rate Your Experience</h4>
                  <div className="flex justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-yellow-800">
                    Help us improve by rating your booking experience
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}