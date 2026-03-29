import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Ingredients from "../components/Ingredients";
import Products from "../components/Products";
import Reviews from "../components/Reviews";
import Story from "../components/Story";
import Shipping from "../components/Shipping";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";
import PaymentModal from "../components/PaymentModal";
import FloatingButtons from "../components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ingredients />
      <Reviews />
      <Products />
      <Story />
      <Shipping />
      <Contact />
      <Footer />
      <CartSidebar />
      <PaymentModal />
      <FloatingButtons />
    </>
  );
}
