import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const getTestimonials = (t: (key: string) => string) => [
  {
    id: 1,
    name: t('testimonials.sarah.name'),
    company: t('testimonials.sarah.company'),
    role: t('testimonials.sarah.role'),
    content: t('testimonials.sarah.content'),
    rating: 5,
    campaign: t('testimonials.sarah.campaign'),
    results: t('testimonials.sarah.results'),
    avatar: "SJ"
  },
  {
    id: 2,
    name: t('testimonials.michael.name'),
    company: t('testimonials.michael.company'),
    role: t('testimonials.michael.role'),
    content: t('testimonials.michael.content'),
    rating: 5,
    campaign: t('testimonials.michael.campaign'),
    results: t('testimonials.michael.results'),
    avatar: "MC"
  },
  {
    id: 3,
    name: t('testimonials.emily.name'),
    company: t('testimonials.emily.company'),
    role: t('testimonials.emily.role'),
    content: t('testimonials.emily.content'),
    rating: 5,
    campaign: t('testimonials.emily.campaign'),
    results: t('testimonials.emily.results'),
    avatar: "ER"
  },
  {
    id: 4,
    name: t('testimonials.david.name'),
    company: t('testimonials.david.company'),
    role: t('testimonials.david.role'),
    content: t('testimonials.david.content'),
    rating: 5,
    campaign: t('testimonials.david.campaign'),
    results: t('testimonials.david.results'),
    avatar: "DT"
  }
];

export function Testimonials() {
  const { t } = useLanguage();
  const testimonials = getTestimonials(t);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-bold text-4xl">{t('testimonials.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Featured Testimonial */}
        <Card className="mb-12 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <blockquote className="text-xl leading-relaxed mb-6">
              "{currentTestimonial.content}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {currentTestimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="font-semibold">{currentTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.role}, {currentTestimonial.company}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <Badge variant="secondary" className="mb-2">
                  {currentTestimonial.campaign}
                </Badge>
                <p className="text-sm font-semibold text-green-600">
                  {currentTestimonial.results}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={prevTestimonial}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button variant="outline" size="icon" onClick={nextTestimonial}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-sm leading-relaxed mb-4 line-clamp-4">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}