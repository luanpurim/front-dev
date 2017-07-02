import pessoas from "./person.json"
import moment from 'moment'

class dashboardService {
    constructor($http) {
        'ngInject';   
        this.$http = $http;  
    }   

    /**
     * @returns lista de pessoas cadastradas
     * @author Luan Purim
     */
    getPessoas(){ 
           return pessoas;        
    } 

    /**
     * @param {pessoa} {checkIn} 
     * @returns valor de gastos calculados
     * @author Luan Purim
     */
    calculaValorGasto(checkIn){
        let value = 0;
        
        if(checkIn){
            let initialDate = moment(checkIn.dataEntrada, 'YYYY-MM-DDTHH:mm:ss');
            let finalDate = moment(checkIn.dataSaida, 'YYYY-MM-DDTHH:mm:ss');

            while(initialDate.isSameOrBefore(finalDate)){
                value += this.retornaValorDiaria(initialDate,checkIn.adicionalVeiculo);
                initialDate.add(1, "days");
            }
            if(finalDate.hour() >= 16 && finalDate.minutes() >= 30) {
                value += this.retornaValorDiaria(finalDate, checkIn.adicionalVeiculo);
            }
        }

        return value;
    }

    /**
     * @param {date} date 
     * @returns valor da diaria
     * @author Luan Purim
     */
    retornaValorDiaria(date, adicionalVeiculo) {
        let value = 0;
        if(date.day() == 0 || date.day() == 6) {
            value += 150;
            if(adicionalVeiculo) {value += 20}
        } else {
            value += 120;
            if(adicionalVeiculo) {value += 15}
        }
            
        return value;
    }
}

export default dashboardService;