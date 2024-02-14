import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import Contact from '@/components/Contact'
import Gallery from '@/components/Gallery'

export default function Home() {
  return (
    <main>
      <Slider/>
      <Featured/>
      <Offer/>
      <Contact/>
      <Gallery/>
    </main>
  )
}
