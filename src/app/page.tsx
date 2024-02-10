import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Slider/>
      <Featured/>
      <Offer/>
      <Contact/>
    </main>
  )
}
