import moment from 'moment'
import axios from 'axios'

import BitcoinLogo from '../images/bitcoin.jpg'
import BritaLogo from '../images/brita2.jpg'

const bitcoinURL = 'https://www.mercadobitcoin.net/api/BTC/ticker/'
const britaURL = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)'

export const getBitcoinPrice = async () => {
    try {
        const result = await axios(bitcoinURL)
        return {
            name: 'bitcoin',
            buy: result.data.ticker.buy,
            sell: result.data.ticker.sell,
            date: moment(Date(result.data.ticker.date)).format('DD/MM/YYYY'),
            logo: BitcoinLogo,
            symbol: "฿"
        }
    } catch (error) {
        console.error(error)
        return {
            name: 'bitcoin  ',
            buy:  'Nao foi possivel obter o valor', 
            sell: 'Nao foi possivel obter o valor',
            date: moment(Date()).format('DD/MM/YYYY'),
            logo: BritaLogo,
            symbol: "$"
        }
    }
    
}

export const getBritaPrice = async (date) => {
    const dateNow = moment(date).format('DD/MM/YYYY');
    const params = {
        '@dataCotacao': `'${dateNow}'`,
        '@moeda': `'USD'`,
        '@format': 'json',
    }

    try {
        const result = await axios(britaURL, { params });
        if(result.data.value.length === 0){
            const newDate = new Date();
            newDate.setDate(newDate.getDate()-1);
            return getBritaPrice(newDate)
        }
        
        return { 
            name: 'brita',
            buy: Number(result.data.value.pop().cotacaoCompra).toFixed(2), 
            sell: Number(result.data.value.pop().cotacaoVenda).toFixed(2),
            date: moment(result.data.value.pop().dataHoraCotacao).format('MM/DD/YYYY'),
            logo: BritaLogo,
            symbol: "$"
        }
    } catch (error) {
        console.error(error)
        return {
            name: 'brita',
            buy:  'Nao foi possivel obter o valor', 
            sell: 'Nao foi possivel obter o valor',
            date: moment(Date()).format('DD/MM/YYYY'),
            logo: BritaLogo,
            symbol: "$"
        }
    }
}
