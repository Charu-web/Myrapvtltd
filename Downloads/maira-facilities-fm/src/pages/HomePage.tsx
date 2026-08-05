import { useEffect } from 'react'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import SolutionsSection from '../sections/SolutionsSection'
import ProjectsSection from '../sections/ProjectsSection'
import ClientsSection from '../sections/ClientsSection'
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  // Smooth scroll to elements based on both pathname (e.g. /about) and hash (e.g. #about)
  useEffect(() => {
    const handleNavigationScroll = () => {
      const pathname = window.location.pathname
      let targetId = ''
      
      if (pathname && pathname !== '/') {
        targetId = pathname.replace('/', '')
      } else {
        const hash = window.location.hash
        if (hash) {
          targetId = hash.replace('#', '')
        }
      }
      
      if (targetId) {
        const element = document.getElementById(targetId)
        if (element) {
          setTimeout(() => {
            const navbarHeight = 85
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            try {
              window.scrollTo({
                top: elementPosition - navbarHeight,
                behavior: 'smooth'
              })
            } catch {
              window.scrollTo(0, elementPosition - navbarHeight)
            }
          }, 150)
        }
      }
    }

    handleNavigationScroll()

    window.addEventListener('hashchange', handleNavigationScroll)
    window.addEventListener('popstate', handleNavigationScroll)
    
    return () => {
      window.removeEventListener('hashchange', handleNavigationScroll)
      window.removeEventListener('popstate', handleNavigationScroll)
    }
  }, [])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SolutionsSection />
      <ProjectsSection />
      <ClientsSection />
      <ContactSection />
    </>
  )
}
