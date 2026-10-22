import HeroSection from "@/components/home/HeroSection";
import BrandIntro from "@/components/home/BrandIntro";
import SignatureServices from "@/components/home/SignatureServices";
import ArtistryStyles from "@/components/home/ArtistryStyles";
import HomeGalleryPreview from "@/components/home/HomeGalleryPreview";
import MeetArtistSection from "@/components/home/MeetArtistSection";
import AppointmentJourney from "@/components/home/AppointmentJourney";
import AftercarePreview from "@/components/home/AftercarePreview";
import LocationCTA from "@/components/home/LocationCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandIntro />
      <SignatureServices />
      <ArtistryStyles />
      <HomeGalleryPreview />
      <MeetArtistSection />
      <AppointmentJourney />
      <AftercarePreview />
      <LocationCTA />
    </>
  );
}
