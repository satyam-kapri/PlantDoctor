import './App.css'
import Navbar from './components/Navbar'
import plant from './assets/plant.png'
import plantdoctor from './assets/plantdoctor.png'
import Page2 from './components/Page2'

function App() {
  
  const scrollToSection = () => {
    const element = document.getElementById("section2");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <div className='magicbody'>
        <img src={plant} className='plant'></img>
        <img src={plantdoctor} className='plantdoctor'/>
        <div className='floatingtxt1'>Scan the plants</div>
        <div className='floatingtxt2'>Get Best Treatments</div>
      </div>

      <div className='landing-text'>
       <h1>Instant Plant Disease <span className='grad-text'>Detection</span></h1>
       <span style={{width:'500px',textAlign:'left',marginBottom:'20px'}}>Identify plant diseases early to prevent yield loss, reduce costs, and boost productivity. Our advanced AI-powered tool provides rapid analysis from just a photo, delivering accurate diagnoses and actionable insights for healthier crops and a more sustainable future.</span>
       <button className='button-33' onClick={scrollToSection}><i class="animation"></i>Get Started<i class="animation"></i></button>
      </div>
      <Page2></Page2>
    </>
  )
}

export default App
