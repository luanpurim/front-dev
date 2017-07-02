import moment from 'moment';

export default class dashboardController {

    constructor(dashboardService) {
        "ngInject";   
        this.dashboardService = dashboardService;    
        this.pessoas = [];
    }

    $onInit() {        
        this.pessoas = this.dashboardService.getPessoas();
    } 

    /**
     * Apaga os valores do formulario de pessoas e altera os valores 'pristine' e 'untouched' para true
     * 
     * @param {Form} form 
     * @author Luan Purim
     */
    resetarFormPessoa(form){
        this.pessoa = undefined;
        this.showForm = false;
        form.$setPristine();
        form.$setUntouched();
    }

    /**
     * Apaga os valores contidos no formulario de checkin
     * 
     * @author Luan Purim
     */
    resetarFormCheckIn(){
        this.pessoaCheckIn = undefined;
    }

    /**
     * Adiciona a pessoa a lista de hospedes e resteta o formulario
     * 
     * @param {Pesso} pessoa 
     * @param {Form} form 
     * @author Luan Purim
     */
    salvarPessoa(pessoa, form) {
        this.pessoas.push(pessoa);
        this.resetarFormPessoa(form);
    }

    /**
     * Retorna o valor gasto pelo hospede
     * 
     * @param {Pessoa.checkIn} checkIn 
     * @author Luan Purim
     */
    calculaValorGasto(checkIn){
        return  this.dashboardService.calculaValorGasto(checkIn);
    }

    /**
     * Realiza filtro na tabela de hospedes atraves do nome e documento
     * 
     * @param {String} valor 
     * @author Luan Purim
     */
    filtrarPessoas(valor){   
        this.pessoas = this.pessoas.filter(({nome, documento}) => {
            let comparaNome = nome.toLowerCase().includes(valor.toLowerCase());
            let comparaDocumento = documento.toLowerCase().includes(valor.toLowerCase());
            return  comparaDocumento || comparaNome;
        })
        if(this.pessoas.length == 0 || !valor){
            this.pessoas = this.dashboardService.getPessoas();
        }
    }
    
    /**
    * Realiza filtro na tabela de hospedes apenas para pessoas que estao no hotel
    * 
    * @param {boolean} valor 
    * @author Luan Purim
    */
    filtrarPessoasPresentes(valor){
        if(valor) {
            this.listarAusentes = false;
            let dataHoje = moment();
            this.pessoas = this.dashboardService.getPessoas().filter(pessoa => {
                if(pessoa.checkIn){
                    return moment(pessoa.checkIn.dataSaida).isAfter(dataHoje);
                }
            })
        } else {
            this.pessoas = this.dashboardService.getPessoas();
        }       
    }

    /**
     * Realiza filtro na tabela de hospedes apenas para pessoas que nao estao no hotel
     * 
     * @param {boolean} valor 
     * @author Luan Purim
     */

    filtrarPessoasAusentes(valor){
        if(valor) {
            let dataHoje = moment();
            this.listarPresentes = false;
            this.pessoas = this.dashboardService.getPessoas().filter(pessoa => {
                if(pessoa.checkIn){
                    return moment(pessoa.checkIn.dataSaida).isBefore(dataHoje);
                }
            })
        } else {
            this.pessoas = this.dashboardService.getPessoas();
        }
    }

    /**
     * Realiza o checkin da pessoa
     * 
     * @param {pessoa} pessoa 
     * @author Luan Purim
     */
    fazerCheckIn(pessoa) {
        for(let i = 0; i < this.pessoas.length; i++)
            if(this.pessoas[i].nome.toLowerCase() == pessoa.nome.toLowerCase()){
                this.pessoas[i] = pessoa;
        };
        this.resetarFormCheckIn();
    }

    /**
     * Passa os valores da pessoa selecionada para o form de check in
     * 
     * @param {pesso} pessoa 
     * @author Luan Purim
     */
    bindPessoaSelecionada(pessoa){        
        if(pessoa && pessoa.nome) {
            this.pessoaCheckIn = pessoa;
            this.pessoaCheckIn.checkIn.dataEntrada = moment(pessoa.checkIn.dataEntrada, 'YYYY-MM-DDTHH:mm:ss').toDate();
            this.pessoaCheckIn.checkIn.dataSaida = moment(pessoa.checkIn.dataSaida, 'YYYY-MM-DDTHH:mm:ss').toDate();
            this.pessoaCheckIn.checkIn.adicionalVeiculo = pessoa.checkIn.adicionalVeiculo;
        }
    }
}