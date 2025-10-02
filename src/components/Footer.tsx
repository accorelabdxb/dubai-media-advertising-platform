import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Tv, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t, isRTL } = useLanguage();
  
  const getFooterLinks = () => ({
    platform: [
      { name: t('footer.platform.howItWorks'), href: "#" },
      { name: t('footer.platform.pricing'), href: "#" },
      { name: t('footer.platform.programs'), href: "#" },
      { name: t('footer.platform.analytics'), href: "#" }
    ],
    support: [
      { name: t('footer.support.help'), href: "#" },
      { name: t('footer.support.contact'), href: "#" },
      { name: t('footer.support.chat'), href: "#" },
      { name: t('footer.support.docs'), href: "#" }
    ],
    company: [
      { name: t('footer.company.about'), href: "#" },
      { name: t('footer.company.careers'), href: "#" },
      { name: t('footer.company.press'), href: "#" },
      { name: t('footer.company.blog'), href: "#" }
    ],
    legal: [
      { name: t('footer.legal.privacy'), href: "#" },
      { name: t('footer.legal.terms'), href: "#" },
      { name: t('footer.legal.cookies'), href: "#" },
      { name: t('footer.legal.compliance'), href: "#" }
    ]
  });

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" }
  ];

  const footerLinks = getFooterLinks();
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              
              <span className="text-xl font-bold text-white">{t('footer.brand')}</span>
            </div>
            <p className={`mb-6 text-gray-400 max-w-md ${isRTL ? 'text-right' : ''}`}>
              {t('footer.description')}
            </p>
            
            {/* Newsletter Signup */}
            <div>
              <h4 className={`font-semibold text-white mb-3 ${isRTL ? 'text-right' : ''}`}>{t('footer.newsletter.title')}</h4>
              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm">{t('footer.newsletter.subscribe')}</Button>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className={`font-semibold text-white mb-4 ${isRTL ? 'text-right' : ''}`}>{t('footer.platform.title')}</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={`hover:text-white transition-colors ${isRTL ? 'text-right' : ''}`}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className={`font-semibold text-white mb-4 ${isRTL ? 'text-right' : ''}`}>{t('footer.support.title')}</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={`hover:text-white transition-colors ${isRTL ? 'text-right' : ''}`}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`font-semibold text-white mb-4 ${isRTL ? 'text-right' : ''}`}>{t('footer.company.title')}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={`hover:text-white transition-colors ${isRTL ? 'text-right' : ''}`}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-8" />

        {/* Bottom Footer */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className="flex flex-wrap gap-6">
            {footerLinks.legal.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm">{t('footer.followUs')}</span>
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  aria-label={social.name}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <Separator className="bg-gray-700 my-8" />

        {/* Copyright */}
        <div className={`text-center text-sm text-gray-400 ${isRTL ? 'text-right' : ''}`}>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}