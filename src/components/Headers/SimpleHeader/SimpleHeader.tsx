import tandemLogoLight from "@/assets/images/tandem-logo-light.png";
import ThemeToggle from "@/components/theme-toggle/ThemeToggle";

const SimpleHeader = () => {
  return (
    <div className="flex justify-between items-center px-lg py-md">
      <img
        src={tandemLogoLight}
        alt="Tandem"
        className="h-8 w-auto object-contain"
      />
      <ThemeToggle />
    </div>
  );
};

export default SimpleHeader;
