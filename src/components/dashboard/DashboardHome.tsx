import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useLanguage } from "../../contexts/LanguageContext";
import { 
  Plus, 
  Calendar, 
  Clock, 
  CreditCard, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye
} from "lucide-react";

interface DashboardHomeProps {
  onStartBooking: () => void;
}

export function DashboardHome({ onStartBooking }: DashboardHomeProps) {
  const { t } = useLanguage();
  const upcomingAds = [
    {
      id: '1',
      title: 'Summer Sale Campaign',
      channel: 'Dubai TV',
      date: '2024-03-15',
      time: '20:30',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Product Launch Ad',
      channel: 'Noor Dubai',
      date: '2024-03-18',
      time: '08:00',
      status: 'confirmed'
    }
  ];

  const pendingApprovals = [
    {
      id: '1',
      title: 'Ramadan Special',
      channel: 'Al Bayan',
      submittedDate: '2024-03-10',
      status: 'creative-review'
    }
  ];

  const paymentsDue = [
    {
      id: '1',
      title: 'March Campaign Bundle',
      amount: 15000,
      dueDate: '2024-03-20',
      status: 'pending'
    }
  ];

  const stats = [
    {
      title: t('stats.totalCampaigns'),
      value: '24',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: t('dashboard.stats.activeBookings'),
      value: '8',
      change: '+3',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: t('stats.totalReach'),
      value: '2.4M',
      change: '+18%',
      icon: Eye,
      color: 'text-purple-600'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-100 text-green-800">{t('status.confirmed')}</Badge>;
      case 'creative-review':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{t('status.creativeReview')}</Badge>;
      case 'pending':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">{t('status.paymentDue')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-600 mt-1">{t('dashboard.welcome')}</p>
        </div>
        <Button onClick={onStartBooking} size="lg" className="bg-primary text-white">
          <Plus className="h-5 w-5 mr-2" />
          {t('dashboard.createNewBooking')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-medium text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} {t('stats.fromLastMonth')}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Ads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {t('dashboard.upcomingAds')}
            </CardTitle>
            <Badge variant="outline">{upcomingAds.length} {t('dashboard.upcomingAds.scheduled')}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAds.length > 0 ? (
              upcomingAds.map((ad) => (
                <div key={ad.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{ad.title}</h4>
                    <p className="text-sm text-gray-600">{ad.channel}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{ad.date} at {ad.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(ad.status)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>{t('dashboard.upcomingAds.noScheduled')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              {t('dashboard.pendingApprovals')}
            </CardTitle>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              {pendingApprovals.length} {t('dashboard.pendingApprovals.pending')}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.length > 0 ? (
              pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{approval.title}</h4>
                    <p className="text-sm text-gray-600">{approval.channel}</p>
                    <p className="text-sm text-gray-500 mt-1">{t('dashboard.pendingApprovals.submitted')} {approval.submittedDate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(approval.status)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>{t('dashboard.pendingApprovals.allApproved')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payments Due */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-red-500" />
            {t('dashboard.paymentsDue')}
          </CardTitle>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            {paymentsDue.length} {t('dashboard.paymentsDue.overdue')}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentsDue.length > 0 ? (
            paymentsDue.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{payment.title}</h4>
                  <p className="text-sm text-gray-500">{t('dashboard.paymentsDue.due')} {payment.dueDate}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">AED {payment.amount.toLocaleString()}</p>
                    {getStatusBadge(payment.status)}
                  </div>
                  <Button variant="default" size="sm">
                    {t('dashboard.paymentsDue.payNow')}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p>{t('dashboard.paymentsDue.allUpToDate')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={onStartBooking}>
              <Plus className="h-6 w-6" />
              <span>{t('dashboard.quickActions.newBooking')}</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Calendar className="h-6 w-6" />
              <span>{t('dashboard.quickActions.viewSchedule')}</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>{t('dashboard.quickActions.analytics')}</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <CreditCard className="h-6 w-6" />
              <span>{t('dashboard.quickActions.billing')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}