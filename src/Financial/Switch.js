import { useState, createContext } from 'react'; 
import CurrencyValue from './CurrencyValue'
import MarketStat from './MarketStat';
import { AiOutlineDollar } from 'react-icons/ai';
import { BiSolidBarChartAlt2 } from 'react-icons/bi';
import './currency.css'



const Language = () => {
  const [display, setDisplay] = useState('')
  const [logo, setLogo] = useState('')


    const popup = () => {
        setDisplay(!display)
    }
    const Logo = () => {
        setLogo(!logo)
    }


  

  return (
  
    <div>
        <div className='popup'>
          <span className='popu' onClick={Logo}>
          <button style={{height:'3rem', borderRadius:'10px'}} onClick={popup} className='popup_btn'>
            {logo ? 
      <span style={{height:'100%', width:'100%', background:'#dbf580', fontSize:'16px'}}>
              X
            </span>
            :
            <span  className='sign'>
  <AiOutlineDollar />
            </span>
            }
        </button>
          </span>

            {
                display ?
            <div className='popup_value'>
              <div>
                <CurrencyValue />
              </div>
                    </div> :
                    <div>
              <div>
                <MarketStat />
              </div>
                    </div> }
        </div>
      </div>
  )
}

export default Language










