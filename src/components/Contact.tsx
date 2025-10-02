import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Phone, Mail, HelpCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Contact() {
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-bold text-4xl">{t('contact.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MessageCircle className="w-5 h-5" />
                  {t('contact.liveChat')}
                </CardTitle>
              </CardHeader>
              <CardContent className={isRTL ? 'text-right' : ''}>
                <p className="text-muted-foreground mb-4">
                  {t('contact.liveChat.description')}
                </p>
                <Button className="w-full">
                  {t('contact.startChat')}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-5 h-5" />
                  {t('contact.callUs')}
                </CardTitle>
              </CardHeader>
              <CardContent className={isRTL ? 'text-right' : ''}>
                <p className="text-muted-foreground mb-2">
                  {t('contact.callUs.description')}
                </p>
                <p className="font-semibold mb-4">{t('contact.phone')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('contact.phone.hours')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className="w-5 h-5" />
                  {t('contact.emailSupport')}
                </CardTitle>
              </CardHeader>
              <CardContent className={isRTL ? 'text-right' : ''}>
                <p className="text-muted-foreground mb-2">
                  {t('contact.emailSupport.description')}
                </p>
                <p className="font-semibold">{t('contact.email')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className={isRTL ? 'text-right' : ''}>{t('contact.sendMessage')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className={`block mb-2 ${isRTL ? 'text-right' : ''}`}>
                        {t('contact.firstName')}
                      </label>
                      <Input id="firstName" placeholder={t('contact.firstName.placeholder')} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={`block mb-2 ${isRTL ? 'text-right' : ''}`}>
                        {t('contact.lastName')}
                      </label>
                      <Input id="lastName" placeholder={t('contact.lastName.placeholder')} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className={`block mb-2 ${isRTL ? 'text-right' : ''}`}>
                        {t('contact.email_label')}
                      </label>
                      <Input id="email" type="email" placeholder={t('contact.email.placeholder')} />
                    </div>
                    <div>
                      <label htmlFor="company" className={`block mb-2 ${isRTL ? 'text-right' : ''}`}>
                        {t('contact.company')}
                      </label>
                      <Input id="company" placeholder={t('contact.company.placeholder')} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className={`block mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t('contact.subject')}
                    </label>
                    <Input id="subject" placeholder={t('contact.subject.placeholder')} />
                  </div>

                  <div>
                    <label htmlFor="message" className={`block mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {t('contact.message')}
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder={t('contact.message.placeholder')}
                      rows={5}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {t('contact.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className={`mb-4 font-bold text-4xl flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <HelpCircle className="w-8 h-8" />
              {t('contact.faq.title')}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`text-lg ${isRTL ? 'text-right' : ''}`}>{t('contact.faq.q1')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  {t('contact.faq.a1')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`text-lg ${isRTL ? 'text-right' : ''}`}>{t('contact.faq.q2')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  {t('contact.faq.a2')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`text-lg ${isRTL ? 'text-right' : ''}`}>{t('contact.faq.q3')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  {t('contact.faq.a3')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`text-lg ${isRTL ? 'text-right' : ''}`}>{t('contact.faq.q4')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  {t('contact.faq.a4')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className={`fixed bottom-6 z-50 ${isRTL ? 'left-6' : 'right-6'}`}>
        <Button size="lg" className="rounded-full shadow-lg">
          <MessageCircle className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('contact.chatNow')}
        </Button>
      </div>
    </section>
  );
}