import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Users,
  Shield,
  Calendar,
  MessageSquare,
  Download,
  RefreshCw
} from "lucide-react";
import { BookingData } from "../DashboardLayout";

interface ApprovalWorkflowProps {
  data: BookingData;
  onUpdate: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ApprovalWorkflow({ data, onUpdate, onNext, onBack }: ApprovalWorkflowProps) {
  const { t } = useLanguage();
  const [currentStage, setCurrentStage] = useState<string>(data.status || 'submitted');
  const [refreshing, setRefreshing] = useState(false);

  const approvalStages = [
    {
      id: 'submitted',
      name: t('stages.submitted.name'),
      description: t('stages.submitted.desc'),
      icon: FileText,
      status: 'completed',
      eta: null,
      completedAt: new Date().toISOString()
    },
    {
      id: 'creative-review',
      name: t('stages.creativeReview.name'),
      description: t('stages.creativeReview.desc'),
      icon: Users,
      status: currentStage === 'creative-review' ? 'in-progress' : 
             ['legal-review', 'approved', 'scheduled'].includes(currentStage) ? 'completed' : 'pending',
      eta: currentStage === 'creative-review' ? '24 hours' : null,
      completedAt: ['legal-review', 'approved', 'scheduled'].includes(currentStage) ? 
                   new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() : null
    },
    {
      id: 'legal-review',
      name: t('stages.legalReview.name'),
      description: t('stages.legalReview.desc'),
      icon: Shield,
      status: currentStage === 'legal-review' ? 'in-progress' : 
             ['approved', 'scheduled'].includes(currentStage) ? 'completed' : 'pending',
      eta: currentStage === 'legal-review' ? '48 hours' : null,
      completedAt: ['approved', 'scheduled'].includes(currentStage) ? 
                   new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() : null
    },
    {
      id: 'approved',
      name: t('stages.approved.name'),
      description: t('stages.approved.desc'),
      icon: CheckCircle,
      status: currentStage === 'approved' ? 'completed' : 
             currentStage === 'scheduled' ? 'completed' : 'pending',
      eta: null,
      completedAt: currentStage === 'scheduled' ? 
                   new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() : null
    },
    {
      id: 'scheduled',
      name: t('stages.scheduled.name'),
      description: t('stages.scheduled.desc'),
      icon: Calendar,
      status: currentStage === 'scheduled' ? 'completed' : 'pending',
      eta: null,
      completedAt: currentStage === 'scheduled' ? new Date().toISOString() : null
    }
  ];

  const notifications = [
    {
      id: '1',
      type: 'info',
      title: t('notifications.creativeStarted.title'),
      message: t('notifications.creativeStarted.message'),
      timestamp: t('notifications.hoursAgo', { hours: 2 }),
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: t('notifications.paymentConfirmed.title'),
      message: t('notifications.paymentConfirmed.message', { amount: '8,400' }),
      timestamp: t('notifications.hoursAgo', { hours: 3 }),
      read: true
    },
    {
      id: '3',
      type: 'info',
      title: t('notifications.bookingSubmitted.title'),
      message: t('notifications.bookingSubmitted.message', { bookingId: data.bookingId || 'N/A' }),
      timestamp: t('notifications.hoursAgo', { hours: 3 }),
      read: true
    }
  ];

  const feedback = {
    creative: currentStage === 'legal-review' || currentStage === 'approved' || currentStage === 'scheduled' ? 
      'Creative review passed. Content meets broadcast standards.' : null,
    legal: currentStage === 'approved' || currentStage === 'scheduled' ? 
      'Legal review completed. Content complies with UAE media regulations.' : null
  };

  const getProgressPercentage = () => {
    const stageIndex = approvalStages.findIndex(stage => stage.id === currentStage);
    return ((stageIndex + 1) / approvalStages.length) * 100;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">{t('status.completed')}</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">{t('status.inProgress')}</Badge>;
      case 'pending':
        return <Badge variant="outline">{t('status.pending')}</Badge>;
      default:
        return <Badge variant="outline">{t('status.pending')}</Badge>;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    
    // Simulate API call to check status
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate progression through stages (for demo)
    if (currentStage === 'creative-review') {
      // Randomly progress to next stage
      if (Math.random() > 0.7) {
        setCurrentStage('legal-review');
        onUpdate({ status: 'legal-review' });
      }
    } else if (currentStage === 'legal-review') {
      if (Math.random() > 0.8) {
        setCurrentStage('approved');
        onUpdate({ status: 'approved' });
      }
    }
    
    setRefreshing(false);
  };

  const handleContinue = () => {
    if (currentStage === 'scheduled') {
      onNext(); // Go to success page
    }
  };

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      if (currentStage !== 'scheduled') {
        handleRefresh();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [currentStage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('dashboard.backToDashboard')}
            </Button>
            <div>
              <h1 className="text-2xl font-medium">{t('approval.title')}</h1>
              <p className="text-gray-600">{t('approval.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {t('approval.refresh')}
            </Button>
            <Badge variant="outline" className="text-xs">
              {t('approval.reference')}: {data.bookingId}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t('approval.progressTitle')}</span>
                  <span className="text-sm font-normal text-gray-600">
                    {Math.round(getProgressPercentage())}{t('approval.progressComplete')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={getProgressPercentage()} className="mb-4" />
                <p className="text-sm text-gray-600">
                  {currentStage === 'scheduled' 
                    ? t('approval.fullyApproved')
                    : t('approval.currentlyIn') + ' ' + (approvalStages.find(s => s.id === currentStage)?.name || '')
                  }
                </p>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>{t('approval.statusTimeline')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {approvalStages.map((stage, index) => {
                    const Icon = stage.icon;
                    const isLast = index === approvalStages.length - 1;
                    
                    return (
                      <div key={stage.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`p-2 rounded-full border-2 ${
                            stage.status === 'completed' 
                              ? 'border-green-500 bg-green-50'
                              : stage.status === 'in-progress'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 bg-gray-50'
                          }`}>
                            <Icon className={`h-5 w-5 ${
                              stage.status === 'completed' 
                                ? 'text-green-500'
                                : stage.status === 'in-progress'
                                ? 'text-blue-500'
                                : 'text-gray-400'
                            }`} />
                          </div>
                          {!isLast && (
                            <div className={`w-0.5 h-12 mt-2 ${
                              stage.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                        
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{stage.name}</h4>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(stage.status)}
                              {stage.eta && (
                                <Badge variant="outline" className="text-xs">
                                  {t('approval.eta')}: {stage.eta}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                          
                          {stage.completedAt && (
                            <p className="text-xs text-gray-500">
                              {t('approval.completed')}: {new Date(stage.completedAt).toLocaleString()}
                            </p>
                          )}
                          
                          {stage.status === 'in-progress' && (
                            <div className="flex items-center gap-2 mt-2">
                              <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" />
                              <span className="text-xs text-blue-600">{t('approval.currentlyProcessing')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            {(feedback.creative || feedback.legal) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    {t('approval.reviewFeedback')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {feedback.creative && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900">{t('feedback.creativeTitle')}</h4>
                          <p className="text-sm text-green-700 mt-1">{t('feedback.creative')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {feedback.legal && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900">{t('feedback.legalTitle')}</h4>
                          <p className="text-sm text-green-700 mt-1">{t('feedback.legal')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle>{t('approval.bookingDetails')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">{t('approval.mediaOutlet')}</p>
                  <p className="font-medium">{data.mediaOutlet?.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('approval.program')}</p>
                  <p className="font-medium">{data.program?.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('approval.scheduledDate')}</p>
                  <p className="font-medium">{data.program?.date} at {data.program?.timeSlot}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('approval.totalAmount')}</p>
                  <p className="font-medium">AED {data.pricing?.totalPrice.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>{t('approval.recentUpdates')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('approval.actions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  {t('approval.downloadReceipt')}
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t('approval.contactSupport')}
                </Button>
                
                {currentStage === 'scheduled' && (
                  <Button onClick={handleContinue} className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t('approval.viewConfirmation')}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Help */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">{t('approval.needHelp')}</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      {t('approval.helpDescription')}
                    </p>
                    <Button variant="link" className="text-yellow-700 p-0 mt-2 h-auto">
                      {t('approval.contactSupportLink')}
                    </Button>
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