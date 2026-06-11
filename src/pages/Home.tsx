import { Hero } from '../components/sections/Hero';
import { FeaturedDishes } from '../components/sections/FeaturedDishes';
import { ReviewsSection } from '../components/sections/ReviewsSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { LocationSection } from '../components/sections/LocationSection';

export function Home() {
  return (
    <div className="bg-dark-900">
      <Hero />
      <FeaturedDishes />
      <ServicesSection />
      <ReviewsSection />
      <LocationSection />
    </div>
  );
}
